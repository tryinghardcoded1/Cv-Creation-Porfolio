import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export function Panel4() {
  return (
    <div className="w-[100vw] h-full flex items-center justify-center relative shrink-0">
      <div className="flex flex-col items-center justify-center gap-12 text-center px-4">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-9xl font-sans font-black tracking-tighter text-white"
        >
          The future of <br/>
          <span className="text-[var(--color-neon-green)] font-serif italic font-normal tracking-wide">business</span> is here
        </motion.h2>

        <motion.div
           initial={{ x: -50, opacity: 0 }}
           whileInView={{ x: 0, opacity: 1 }}
           transition={{ duration: 0.5, delay: 0.5 }}
        >
          <ArrowRight className="w-16 h-16 md:w-32 md:h-32 text-gray-500 animate-pulse" strokeWidth={1} />
        </motion.div>
      </div>
    </div>
  );
}
