import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ExternalLink, Image as ImageIcon } from 'lucide-react';

const categories = [
  { id: 1, title: 'AI Automation', image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2070&auto=format&fit=crop', desc: 'AI-driven automation suite streamlining workflows, data pipelines, and intelligent chatbots for business optimization.' },
  { id: 2, title: 'Graphic Design', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop', desc: 'Stark, minimalist, and brutalist graphic identities ranging from vector branding to immersive 3D compositions.' },
  { id: 3, title: 'Mobile APP', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070&auto=format&fit=crop', desc: 'High-performance mobile experiences optimizing cross-platform conversions with native tactile feedback and offline support.' },
  { id: 4, title: 'Web Design', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop', desc: 'Cinematic layout architecture and fluid scroll dynamics engineered for premium brand positioning and engagement.' },
  { id: 5, title: 'SEO and Paid Ads', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop', desc: 'Aggressive growth marketing spanning technical SEO audits to programmatic ad buying for maximum ROI.' },
  { id: 6, title: 'Business tools', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop', desc: 'Internal dashboards and ERP integrations aggregating disparate data streams into unified operational panes of glass.' },
];

const subProjectsMap: Record<number, { title: string; image: string; liveLink: string }[]> = {
  1: [
    { title: 'AI Automation Workflow', image: 'https://djautofleet.com/wp-content/uploads/2026/04/59889014-9f0aa34a8fa91b001efa1ff1de6aca61.png', liveLink: '#' },
    { title: 'AI Receptionist', image: 'https://djautofleet.com/wp-content/uploads/2026/03/Ai-Receptionist.png', liveLink: '#' }
  ],
  4: [
    { title: 'OG BULLET', image: 'https://djautofleet.com/wp-content/uploads/2026/03/OGbullet-1-scaled.png', liveLink: '#' },
    { title: 'Local Kush Dealer', image: 'https://djautofleet.com/wp-content/uploads/2026/03/localkushdealer-1-scaled.png', liveLink: '#' }
  ],
  6: [
    { title: 'Simple SEO TOOL', image: 'https://djautofleet.com/wp-content/uploads/2026/03/Simple-SEO-_-Google-AI-Studio.png', liveLink: '#' },
    { title: 'Legit ID CHECKER', image: 'https://djautofleet.com/wp-content/uploads/2026/03/Legit-ID-CHECKER-App-1-scaled.png', liveLink: '#' },
    { title: 'Social Media Auto Posting Tool', image: 'https://djautofleet.com/wp-content/uploads/2026/03/autopostoolresult-scaled.png', liveLink: '#' },
    { title: 'Easy Ad Spend and ROI Calculator', image: 'https://djautofleet.com/wp-content/uploads/2026/03/ad-roi-calculator-e1776447188126.png', liveLink: '#' }
  ]
};

export function Panel3() {
  const [selectedCat, setSelectedCat] = useState<typeof categories[0] | null>(null);
  const [expandedImg, setExpandedImg] = useState<string | null>(null);

  const renderModalContent = () => {
    if (!selectedCat) return null;
    const items = subProjectsMap[selectedCat.id] || [];

    return (
      <div className="flex flex-col h-full w-full">
        <div className="mb-8">
          <span className="text-gray-500 font-mono text-xs uppercase tracking-widest">{selectedCat.title} Portfolio</span>
          <h3 className="text-3xl md:text-4xl font-bold font-serif mb-2 text-white">{selectedCat.title} Projects</h3>
          <p className="text-gray-400 max-w-2xl text-sm md:text-base">{selectedCat.desc}</p>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto pr-4 pb-12 custom-scrollbar">
            {items.map((item, idx) => (
              <div key={idx} className="flex flex-col gap-4 bg-zinc-900 border border-zinc-800 p-4 rounded-xl">
                <div 
                  className="w-full aspect-video rounded-lg overflow-hidden relative group cursor-pointer bg-black"
                  onClick={() => setExpandedImg(item.image)}
                >
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                     <ImageIcon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-4 text-white tracking-tight">{item.title}</h4>
                  <a 
                    href={item.liveLink} 
                    onClick={(e) => e.preventDefault()}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-white text-black font-bold uppercase tracking-widest text-[10px] sm:text-xs hover:bg-gray-200 transition-colors rounded w-full"
                  >
                    <ExternalLink size={14} /> Click here to view live site
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 rounded-xl mt-4">
            <p className="text-zinc-500 font-mono uppercase tracking-widest text-sm">More projects coming soon.</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-[100vw] h-full flex flex-col items-center justify-center relative shrink-0">
      
      {/* Grid structure mapping the categories */}
      <div className="relative w-full max-w-7xl h-[70vh] flex gap-4 md:gap-8 px-4 md:px-12 items-center justify-center mt-0 block">
        
        {/* Left Column (Parallax Down) */}
        <motion.div className="js-parallax-down flex flex-col gap-4 md:gap-8 w-1/3 h-[120%] -mt-[10%] cursor-pointer">
          <div className="bg-zinc-900 rounded-2xl h-1/2 overflow-hidden relative group" onClick={() => setSelectedCat(categories[0])}>
            <img src={categories[0].image} alt={categories[0].title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition duration-500 scale-110 group-hover:scale-100 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 font-sans text-xl font-bold tracking-tight pointer-events-none">{categories[0].title}</div>
          </div>
          <div className="bg-zinc-800 rounded-2xl h-1/3 overflow-hidden relative group" onClick={() => setSelectedCat(categories[1])}>
             <img src={categories[1].image} alt={categories[1].title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition duration-500 scale-110 group-hover:scale-100 pointer-events-none" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
             <div className="absolute bottom-6 left-6 font-sans text-xl font-bold tracking-tight pointer-events-none">{categories[1].title}</div>
          </div>
        </motion.div>

        {/* Center Column (Parallax Up) */}
        <motion.div className="js-parallax-up flex flex-col gap-4 md:gap-8 w-1/3 h-[140%] -mt-[20%] cursor-pointer">
          <div className="bg-zinc-800 rounded-2xl h-1/3 overflow-hidden relative group" onClick={() => setSelectedCat(categories[2])}>
             <img src={categories[2].image} alt={categories[2].title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition duration-500 scale-110 group-hover:scale-100 pointer-events-none" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
             <div className="absolute bottom-6 left-6 font-sans text-xl font-bold tracking-tight pointer-events-none">{categories[2].title}</div>
          </div>
          <div className="bg-zinc-900 rounded-2xl h-1/2 overflow-hidden relative group" onClick={() => setSelectedCat(categories[3])}>
             <img src={categories[3].image} alt={categories[3].title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition duration-500 scale-110 group-hover:scale-100 pointer-events-none" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
             <div className="absolute bottom-6 left-6 font-sans text-xl font-bold tracking-tight pointer-events-none">{categories[3].title}</div>
          </div>
        </motion.div>

        {/* Right Column (Parallax Down) */}
        <motion.div className="js-parallax-down flex flex-col gap-4 md:gap-8 w-1/3 h-[110%] -mt-[5%] cursor-pointer">
          <div className="bg-zinc-900 rounded-2xl h-2/5 overflow-hidden relative group" onClick={() => setSelectedCat(categories[4])}>
             <img src={categories[4].image} alt={categories[4].title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition duration-500 scale-110 group-hover:scale-100 pointer-events-none" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
             <div className="absolute bottom-6 left-6 font-sans text-xl font-bold tracking-tight pointer-events-none">{categories[4].title}</div>
          </div>
          <div className="bg-zinc-800 rounded-2xl h-3/5 overflow-hidden relative group" onClick={() => setSelectedCat(categories[5])}>
             <img src={categories[5].image} alt={categories[5].title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition duration-500 scale-110 group-hover:scale-100 pointer-events-none" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
             <div className="absolute bottom-6 left-6 font-sans text-xl font-bold tracking-tight pointer-events-none">{categories[5].title}</div>
          </div>
        </motion.div>

      </div>

      {createPortal(
        <AnimatePresence>
          {selectedCat && !expandedImg && (
            <motion.div 
              key="main-modal"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
              onClick={() => setSelectedCat(null)}
            >
              <motion.div 
                initial={{ y: 50, opacity: 0, scale: 0.95 }} 
                animate={{ y: 0, opacity: 1, scale: 1 }} 
                exit={{ y: -50, opacity: 0, scale: 0.95 }}
                className="bg-zinc-950 border border-zinc-800 p-6 md:p-10 rounded-3xl max-w-5xl w-full text-white relative flex shadow-2xl h-[90vh] overflow-hidden"
                onClick={e => e.stopPropagation()}
              >
                <button 
                  className="absolute top-4 right-4 md:top-6 md:right-6 text-gray-500 hover:text-white transition-colors p-2 bg-zinc-900 rounded-full z-[210] cursor-pointer" 
                  onClick={() => setSelectedCat(null)}
                >
                  <X size={24} />
                </button>
                
                {renderModalContent()}

              </motion.div>
            </motion.div>
          )}

          {expandedImg && (
            <motion.div 
              key="lightbox"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 md:p-12 cursor-zoom-out"
              onClick={() => setExpandedImg(null)}
            >
               <button 
                  className="absolute top-6 right-6 text-white transition-colors p-3 bg-zinc-900/80 hover:bg-zinc-800 rounded-full z-10 cursor-pointer" 
                  onClick={(e) => { e.stopPropagation(); setExpandedImg(null); }}
                >
                  <X size={28} />
                </button>
               <motion.img 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  src={expandedImg} 
                  alt="Expanded view" 
                  className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl" 
                  onClick={(e) => e.stopPropagation()}
               />
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  );
}
