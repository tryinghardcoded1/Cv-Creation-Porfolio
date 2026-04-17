import { motion } from 'motion/react';
import { Phone } from 'lucide-react';

export function Panel5() {
  return (
    <div className="w-[100vw] h-full flex items-center justify-center relative shrink-0">
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl px-8 lg:px-24 gap-16">
        
        {/* Text Content */}
        <div className="flex-1 flex flex-col gap-6 select-none z-10">
          <motion.h3 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white font-sans font-bold text-5xl md:text-7xl lg:text-8xl leading-none tracking-tighter"
          >
            AI<br/>
            RECEPTIONIST
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 font-sans text-xl md:text-3xl font-medium tracking-wide"
          >
            Never miss a call,<br/>never lose a sale.
          </motion.p>
          
          {/* Contact Box Addition */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col mt-4"
          >
            <span className="text-[10px] sm:text-xs text-gray-500 font-bold uppercase tracking-widest mb-3">Do a live test call</span>
            <div className="flex items-center gap-3 relative z-20">
              <div className="bg-[#39FF14]/20 p-3 rounded-full border border-[#39FF14]/50 shadow-[0_0_15px_rgba(57,255,20,0.2)]">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-[#39FF14] fill-current" />
              </div>
              <a href="tel:+17867518929" className="text-white font-bold tracking-wide text-2xl sm:text-3xl whitespace-nowrap hover:text-[#39FF14] transition-colors cursor-pointer pointer-events-auto">
                +1 (786) 751 8929
              </a>
            </div>
          </motion.div>
        </div>

        {/* Dashboards Mockup */}
        <motion.div 
          initial={{ opacity: 0, x: 100, rotateY: 15 }}
          whileInView={{ opacity: 1, x: 0, rotateY: -5 }}
          transition={{ duration: 1, type: "spring", stiffness: 50 }}
          style={{ perspective: "1000px" }}
          className="flex-1 max-w-[500px] w-full relative"
        >
          {/* Main Screenshot - AI Receptionist UI */}
          <div className="relative w-full rounded-2xl border-[4px] border-zinc-800 bg-zinc-950 shadow-2xl shadow-zinc-900/50 overflow-hidden transform-gpu z-10 aspect-[4/3]">
            <img 
              src="https://djautofleet.com/wp-content/uploads/2026/03/Ai-Receptionist.png" 
              alt="AI Receptionist Audio Interface" 
              className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Floating Second Screenshot - Automation Blueprint */}
          <div className="absolute -bottom-16 -right-8 w-[80%] rounded-2xl border-[4px] border-zinc-800 bg-zinc-950 shadow-2xl shadow-black overflow-hidden transform-gpu z-20 aspect-[16/9]">
             <img 
               src="https://djautofleet.com/wp-content/uploads/2026/04/59889014-9f0aa34a8fa91b001efa1ff1de6aca61.png" 
               alt="Automation Workflow" 
               className="w-full h-full object-cover opacity-95 hover:opacity-100 transition-opacity cursor-pointer" 
               referrerPolicy="no-referrer" 
             />
          </div>
        </motion.div>

      </div>
    </div>
  );
}
