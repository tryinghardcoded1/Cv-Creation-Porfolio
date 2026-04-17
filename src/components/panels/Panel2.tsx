import { motion } from 'motion/react';

const CrossShape = ({ className, delay = 0 }: { className?: string, delay?: number }) => (
  <motion.div 
    initial={{ rotate: 0, scale: 0.8, opacity: 0 }}
    whileInView={{ rotate: 90, scale: 1, opacity: 0.8 }}
    transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay }}
    className={`absolute w-12 h-12 flex items-center justify-center ${className}`}
  >
    <div className="absolute w-full h-1 bg-current rounded-full" />
    <div className="absolute h-full w-1 bg-current rounded-full" />
  </motion.div>
);

export function Panel2() {
  return (
    <div className="w-[100vw] h-full flex items-center justify-center relative shrink-0 overflow-hidden bg-black">
      
      {/* Background glowing crosses */}
      <CrossShape className="top-1/4 left-1/4 text-zinc-600 blur-[2px] opacity-40 scale-150" delay={0} />
      <CrossShape className="bottom-1/3 left-1/3 text-zinc-500 blur-[1px] opacity-60 scale-75" delay={0.5} />
      <CrossShape className="top-1/3 right-1/4 text-zinc-700 blur-[4px] opacity-30 scale-200" delay={1} />
      <CrossShape className="bottom-1/4 right-1/3 text-gray-400 blur-[2px] opacity-20 scale-125" delay={1.5} />

      <div className="relative z-10 flex flex-col font-sans font-black text-[#111] uppercase select-none mix-blend-difference overflow-hidden">
        {/* We use massive viewport-based units and extremely tight line height */}
        <motion.div 
          initial={{ x: -100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }}
          className="text-[25vw] leading-[0.75] tracking-tighter text-white"
        >
          PRO
        </motion.div>
        <motion.div 
          initial={{ x: 100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[25vw] leading-[0.75] tracking-tighter text-gray-300 ml-[5vw]"
        >
          JEC
        </motion.div>
        <motion.div 
          initial={{ x: -100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[25vw] leading-[0.75] tracking-tighter text-gray-500 ml-[15vw]"
        >
          TS.
        </motion.div>
      </div>

    </div>
  );
}
