import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const panels = [
  { name: 'Intro', idx: 0 },
  { name: 'Typography', idx: 1 },
  { name: 'Portfolio', idx: 2 },
  { name: 'Statement', idx: 3 },
  { name: 'Showcase', idx: 4 },
  { name: 'Services', idx: 5 },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleNav = (idx: number) => {
    setIsOpen(false);
    if ((window as any).scrollToPanel) {
      (window as any).scrollToPanel(idx);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[100] px-6 lg:px-12 py-6 flex justify-between items-center mix-blend-difference text-white pointer-events-none">
        <div className="text-xl font-bold tracking-widest font-sans uppercase">AURA</div>
        
        <nav className="hidden md:flex gap-8 pointer-events-auto text-xs uppercase tracking-widest font-medium text-gray-300">
          {panels.map((p) => (
            <button key={p.name} onClick={() => handleNav(p.idx)} className="hover:text-white transition-colors">
              {p.name}
            </button>
          ))}
        </nav>

        <button 
          className="md:hidden pointer-events-auto z-[120] text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'tween', duration: 0.4 }}
            className="fixed inset-0 z-[110] bg-zinc-950 flex flex-col items-center justify-center gap-8 pointer-events-auto"
          >
            {panels.map((p) => (
              <motion.button 
                key={p.name} 
                onClick={() => handleNav(p.idx)} 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-2xl uppercase tracking-widest font-bold text-white hover:text-gray-400"
              >
                {p.name}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
