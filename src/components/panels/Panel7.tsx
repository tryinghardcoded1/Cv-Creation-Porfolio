import { motion } from 'motion/react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "CEO, TechFlow",
    text: "The AI Receptionist completely transformed how we handle inbound leads. We never miss a call now, mapping exactly to our CRM. Incredible build speed.",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Founder, Peak Marketing",
    text: "I was tired of agencies that overpromise. The automation suite created here cut our operational hours by 40% in the first week. Systems that actually work.",
    rating: 5
  },
  {
    name: "Elena Rodriguez",
    role: "Director, Elevate Real Estate",
    text: "The ROI on the custom SEO tools and paid ad strategies paid for itself in less than a month. The results speak for themselves.",
    rating: 5
  }
];

export function Panel7() {
  return (
    <div className="w-[100vw] h-full flex flex-col items-center justify-center relative shrink-0">
      
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#39FF14]/10 via-black to-black border-none" />

      <div className="w-full max-w-7xl px-8 lg:px-24 flex flex-col gap-16 z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-[var(--color-neon-green)] font-mono text-sm tracking-widest uppercase mb-4 block">Client Feedback</span>
          <h2 className="text-white font-serif text-5xl md:text-7xl lg:text-8xl leading-none">
            Testimonials
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full relative">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl shadow-xl flex flex-col gap-6"
            >
              <div className="flex gap-1">
                {[...Array(t.rating)].map((_, idx) => (
                  <Star key={idx} className="w-5 h-5 text-[#39FF14] fill-[#39FF14]" />
                ))}
              </div>
              
              <p className="text-gray-300 text-lg leading-relaxed italic flex-1">
                "{t.text}"
              </p>
              
              <div className="flex flex-col pt-6 border-t border-zinc-800">
                <span className="text-white font-bold tracking-tight text-lg">{t.name}</span>
                <span className="text-gray-500 font-mono text-xs uppercase tracking-wider mt-1">{t.role}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
