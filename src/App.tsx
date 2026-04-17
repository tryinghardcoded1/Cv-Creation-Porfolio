import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ParticleLogo } from './components/ParticleLogo';
import { Panel1 } from './components/panels/Panel1';
import { Panel2 } from './components/panels/Panel2';
import { Panel3 } from './components/panels/Panel3';
import { Panel4 } from './components/panels/Panel4';
import { Panel5 } from './components/panels/Panel5';
import { Panel6 } from './components/panels/Panel6';
import { Panel7 } from './components/panels/Panel7';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);

  const [currentPanel, setCurrentPanel] = useState(0);

  // Track the current panel via scroll position natively
  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;
      
      const progress = window.scrollY / maxScroll;
      setCurrentPanel(Math.round(progress * 6));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useGSAP(() => {
    const panelsContainer = panelsRef.current;
    if (!panelsContainer) return;

    // Refresh GSAP on load to ensure proper dimension calculations for snapping
    ScrollTrigger.refresh();

    const getScrollAmount = () => -(panelsContainer.scrollWidth - window.innerWidth);

    (window as any).scrollToPanel = (index: number) => {
      const maxScroll = panelsContainer.scrollWidth - window.innerWidth;
      gsap.to(window, { scrollTo: (index / 6) * maxScroll, duration: 1, ease: "power2.inOut" });
    };

    const scrollTween = gsap.to(panelsContainer, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: scrollWrapperRef.current,
        pin: true,
        scrub: 1.2, // Smooth mobile-optimized scrubbing mechanism natively
        end: () => `+=${panelsContainer.scrollWidth - window.innerWidth}`,
        invalidateOnRefresh: true,
      }
    });

    // Parallax logic for Panel 3 linked beautifully to the horizontal container animation
    gsap.fromTo('.js-parallax-down', 
      { y: -150 },
      { 
        y: 150,
        ease: "none",
        scrollTrigger: {
          trigger: '.js-panel-3',
          containerAnimation: scrollTween,
          start: "left right",
          end: "right left",
          scrub: true,
        }
      }
    );

    gsap.fromTo('.js-parallax-up', 
      { y: 150 },
      { 
        y: -150,
        ease: "none",
        scrollTrigger: {
          trigger: '.js-panel-3',
          containerAnimation: scrollTween,
          start: "left right",
          end: "right left",
          scrub: true,
        }
      }
    );

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="bg-[#000] text-white selection:bg-[#fff] selection:text-black">
      
      {/* Navigation Layer - Clickable Arrows */}
      <div className={`fixed inset-y-0 left-4 md:left-8 flex items-center z-50 pointer-events-none transition-opacity duration-300 ${currentPanel === 0 ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
        <button 
          onClick={() => {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const target = Math.max(0, currentPanel - 1);
            gsap.to(window, { scrollTo: (target / 6) * maxScroll, duration: 1, ease: "expo.inOut" });
          }}
          className="pointer-events-auto p-4 md:p-6 rounded-full bg-zinc-950/60 hover:bg-zinc-800 text-white border border-white/10 backdrop-blur transition-all active:scale-95"
        >
          <ChevronLeft size={32} strokeWidth={1.5} />
        </button>
      </div>
      
      <div className={`fixed inset-y-0 right-4 md:right-8 flex items-center z-50 pointer-events-none transition-opacity duration-300 ${currentPanel >= 6 ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
        <button 
          onClick={() => {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const target = Math.min(6, currentPanel + 1);
            gsap.to(window, { scrollTo: (target / 6) * maxScroll, duration: 1, ease: "expo.inOut" });
          }}
          className="pointer-events-auto p-4 md:p-6 rounded-full bg-zinc-950/60 hover:bg-zinc-800 text-white border border-white/20 backdrop-blur transition-all shadow-2xl active:scale-95"
        >
          <ChevronRight size={32} strokeWidth={2} />
        </button>
      </div>

      <ParticleLogo />
      
      <div ref={scrollWrapperRef} className="bg-[#000] h-[100dvh] overflow-hidden flex">
        <div ref={panelsRef} className="flex h-full w-[700vw] flex-nowrap items-center will-change-transform">
          <div className="w-screen h-full shrink-0 flex items-center justify-center relative"><Panel1 /></div>
          <div className="w-screen h-full shrink-0 flex items-center justify-center relative"><Panel2 /></div>
          <div className="w-screen h-full shrink-0 flex items-center justify-center relative js-panel-3"><Panel3 /></div>
          <div className="w-screen h-full shrink-0 flex items-center justify-center relative"><Panel4 /></div>
          <div className="w-screen h-full shrink-0 flex items-center justify-center relative"><Panel5 /></div>
          <div className="w-screen h-full shrink-0 flex items-center justify-center relative"><Panel7 /></div>
          <div className="w-screen h-full shrink-0 flex items-center justify-center relative"><Panel6 /></div>
        </div>
      </div>
    </div>
  );
}
