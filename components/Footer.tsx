import React from 'react';
import { motion } from 'motion/react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full py-48 px-10 relative z-10 max-w-7xl mx-auto bg-transparent">
      <div className="h-[1px] w-full bg-black/10 mb-32 relative">
        <div className="absolute top-0 left-0 w-2 h-2 bg-black -translate-y-1/2" />
        <div className="absolute top-0 right-0 w-2 h-2 bg-black -translate-y-1/2" />
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start gap-16">
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 border border-black/20 flex items-center justify-center font-bold text-xs relative">
              <div className="absolute -top-0.5 -left-0.5 w-1 h-1 border-t border-l border-black" />
              <div className="absolute -bottom-0.5 -right-0.5 w-1 h-1 border-b border-r border-black" />
              MO
            </div>
            <span className="text-sm font-bold tracking-[0.2em] uppercase">DREAMY</span>
          </div>
          <h2 className="text-3xl font-mono font-bold text-fg mb-4 tracking-tighter uppercase glitch-text" data-text="Mouna Ouattara">Mouna Ouattara</h2>
          <p className="text-[9px] font-mono font-bold text-black/40 uppercase tracking-[0.4em]">
            Data_Science // Gen_AI // 2024-PRESENT
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end">
          <div className="flex gap-12 mb-12">
            {['LinkedIn', 'GitHub', 'Twitter'].map((social) => (
              <a 
                key={social}
                href="#" 
                className="text-[10px] font-mono font-bold text-black/60 hover:text-black transition-all uppercase tracking-[0.4em] relative group"
              >
                [{social}]
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-black transition-all group-hover:w-full shadow-[0_0_10px_rgba(0,0,0,0.1)]" />
              </a>
            ))}
          </div>
          <p className="text-[10px] font-mono font-bold text-black/40 uppercase tracking-[0.4em]">
            &copy; {currentYear} MOUNA_OUATTARA. ALL_SYSTEMS_OPERATIONAL.
          </p>
        </div>
      </div>

      <div className="mt-32 flex justify-center">
        <div className="px-12 py-6 border border-black/10 text-black/40 font-mono text-[10px] uppercase tracking-[0.6em] hover:text-black/60 hover:border-black/30 transition-all duration-700 relative group">
          DESIGNED_WITH_PRECISION_V2.4
        </div>
      </div>
    </footer>
  );
};

export default Footer;
