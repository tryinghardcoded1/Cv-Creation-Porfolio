import { motion } from 'motion/react';
import { Phone } from 'lucide-react';

export function Panel1() {
  return (
    <div className="w-[100vw] h-full flex items-center justify-start relative shrink-0">
      <div className="w-full max-w-[90rem] mx-auto px-8 lg:px-24 flex flex-col justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6 max-w-5xl"
        >
          <h1 className="text-white font-sans font-bold text-[10vw] sm:text-[9vw] md:text-7xl lg:text-[6.5rem] xl:text-[7.5rem] leading-[0.88] tracking-tight uppercase">
            I BUILD SYSTEMS<br />
            THAT WORK.<br />
            MARKETING<br />
            THAT DELIVERS.
          </h1>
          <p className="text-gray-400 text-sm md:text-lg lg:text-xl font-sans leading-relaxed tracking-wide max-w-3xl mt-4 font-medium">
            Tired of developers who can't finish a build and agencies that charge high fees with zero sales? I build for performance and market for profit. See the results first—pay once they're delivered.
          </p>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mt-8 font-sans">
            <button className="border-2 border-white text-black bg-white px-8 py-3 text-sm font-bold tracking-widest uppercase hover:bg-transparent hover:text-white transition-colors cursor-pointer pointer-events-auto">
              Get Started
            </button>
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Call my AI Receptionist</span>
              <div className="flex items-center gap-3">
                <div className="bg-[#39FF14]/20 p-2 rounded-full border border-[#39FF14]/50">
                  <Phone className="w-5 h-5 text-[#39FF14] fill-current" />
                </div>
                <a href="tel:+17867518929" className="text-white font-bold tracking-wide text-lg md:text-xl hover:text-[#39FF14] transition-colors cursor-pointer pointer-events-auto">
                  +1 (786) 751 8929
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
