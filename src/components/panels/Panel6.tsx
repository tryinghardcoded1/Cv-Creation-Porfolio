import { motion } from 'motion/react';

const services = [
  { name: 'App Development', gradient: 'from-zinc-100 to-zinc-300', text: 'text-black' },
  { name: 'Paid Advertising', gradient: 'from-zinc-800 to-zinc-900', text: 'text-white' },
  { name: 'Branding', gradient: 'from-white to-zinc-200', text: 'text-black' },
  { name: 'Web Design', gradient: 'from-zinc-900 to-zinc-950', text: 'text-white' },
  { name: 'SEO', gradient: 'from-zinc-700 to-zinc-800', text: 'text-white' },
];

export function Panel6() {
  return (
    <div className="w-[100vw] h-full flex items-center justify-center relative shrink-0">
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl px-8 lg:px-24 gap-16 md:gap-8">
        
        {/* Left Side: Headings */}
        <div className="flex-1 flex flex-col gap-4">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-gray-400 font-sans tracking-[0.2em] uppercase text-sm font-bold"
          >
            YOU WANT IT I BUILD IT
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[var(--color-neon-green)] font-serif text-5xl md:text-7xl lg:text-8xl leading-none"
          >
            From Vision<br/>
            <span className="text-white italic font-light inline-block mt-2">to Reality</span>
          </motion.h2>
        </div>

        {/* Right Side: Services Pills */}
        <div className="flex-1 flex flex-col gap-4 items-start md:items-end w-full">
          {services.map((service, idx) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 * idx }}
              className={`px-8 py-4 md:py-6 rounded-full bg-gradient-to-r ${service.gradient} ${service.text} font-sans font-bold text-xl md:text-3xl tracking-tight shadow-xl shadow-black/50 hover:scale-105 transition-transform cursor-default whitespace-nowrap`}
            >
              {service.name}
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
