import { useEffect, useRef } from 'react';

class Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  color: string;
  size: number;
  vx: number;
  vy: number;
  ease: number;
  friction: number;
  dx: number;
  dy: number;
  distance: number;
  randomFactor: number;

  constructor(x: number, y: number, color: string) {
    this.x = x + Math.random() * 60 - 30; // Initial explosive scatter before forming
    this.y = y + Math.random() * 60 - 30;
    this.originX = x;
    this.originY = y;
    this.color = color;
    this.size = Math.random() * 1.5 + 0.8;
    this.vx = 0;
    this.vy = 0;
    this.ease = 0.02 + Math.random() * 0.08;
    this.friction = 0.82 + Math.random() * 0.1;
    this.dx = 0;
    this.dy = 0;
    this.distance = 0;
    this.randomFactor = Math.random();
  }

  update(smoothedVelocity: number, centerX: number, centerY: number) {
    const speed = Math.abs(smoothedVelocity);
    
    // Dissolve outward and drift intensely when scrolling fast
    if (speed > 0.05) {
      const angleFromCenter = Math.atan2(this.y - centerY, this.x - centerX);
      
      // Explosion pushing particles outward radially from center
      const explosionForce = speed * 0.2 * this.randomFactor;
      // Directional wind shearing particles sideways mimicking momentum
      const windForce = -smoothedVelocity * 0.15 * this.randomFactor;

      this.vx += Math.cos(angleFromCenter) * explosionForce + windForce;
      this.vy += Math.sin(angleFromCenter) * explosionForce;
      
      // Add chaotic jitter to make the dissolve dusty/noisy
      this.vx += (Math.random() - 0.5) * speed * 0.4;
      this.vy += (Math.random() - 0.5) * speed * 0.4;
    }

    this.dx = this.originX - this.x;
    this.dy = this.originY - this.y;
    this.distance = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    
    // When scrolling fast, drastically reduce gravity/ease so they fly off
    // When stopped, tightening ease so they snap back into shape perfectly
    const dynamicEase = speed > 0.5 ? this.ease * 0.05 : this.ease;

    this.vx += this.dx * dynamicEase;
    this.vy += this.dy * dynamicEase;

    this.vx *= this.friction;
    this.vy *= this.friction;

    this.x += this.vx;
    this.y += this.vy;
  }

  draw(context: CanvasRenderingContext2D) {
    // Dynamic shimmer/fade based on individual particle velocity
    const shimmer = Math.min(1, (Math.abs(this.vx) + Math.abs(this.vy)) * 0.1);
    context.fillStyle = this.color;
    context.globalAlpha = Math.max(0.1, 1 - shimmer * 0.7);
    
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    context.fill();
    context.globalAlpha = 1.0;
  }
}

export function ParticleLogo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastScrollYRef = useRef(0);
  const smoothedVelocityRef = useRef(0);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let animationFrameId: number;
    let particlesArray: Particle[] = [];
    
    // Use a larger resolution specifically to allow particles to scatter wide
    const width = 300;
    const height = 300;
    canvas.width = width;
    canvas.height = height;
    
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Render hidden text to extract layout mask framework
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Draw Site Name
    ctx.font = '900 56px Inter, sans-serif'; 
    ctx.fillText('CV', centerX, centerY - 20);
    ctx.font = '900 24px Inter, sans-serif';
    ctx.fillText('CReation', centerX, centerY + 24);
    
    // Draw Orbital Boundary Ring
    const radius = 95;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.stroke();

    const textCoordinates = ctx.getImageData(0, 0, width, height);
    
    // Decrease step for immense density (+1 pixel resolution)
    const step = 2; 
    const neonGreen = '#39FF14';

    // Seed Particles mapping precisely to the visible pixels
    for (let y = 0; y < textCoordinates.height; y += step) {
      for (let x = 0; x < textCoordinates.width; x += step) {
        if (textCoordinates.data[(y * 4 * textCoordinates.width) + (x * 4) + 3] > 128) {
          // Inject minor organic noise gaps cutting geometry evenly
          if (Math.random() > 0.25) {
            particlesArray.push(new Particle(x, y, neonGreen));
          }
        }
      }
    }
    
    const animate = () => {
      // 1. Get raw scroll velocity 
      const currentScrollY = window.scrollY;
      const rawVelocity = currentScrollY - lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;

      // 2. Smoothly lerp velocity for natural easing vs immediate harsh drops
      smoothedVelocityRef.current += (rawVelocity - smoothedVelocityRef.current) * 0.1;

      ctx.clearRect(0, 0, width, height);
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update(smoothedVelocityRef.current, centerX, centerY);
        particlesArray[i].draw(ctx);
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // slight delay avoids GSAP initial scroll pop
    setTimeout(() => {
       animate();
    }, 100);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none opacity-15 mix-blend-screen scale-100 md:scale-150">
      <canvas ref={canvasRef} className="w-[300px] h-[300px] drop-shadow-[0_0_15px_rgba(57,255,20,0.4)]"></canvas>
    </div>
  );
}
