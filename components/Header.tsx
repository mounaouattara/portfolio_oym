import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sparkles } from 'lucide-react';

interface HeaderProps {
  onTabChange: (tab: 'home' | 'about' | 'projects' | 'toolkit' | 'contact') => void;
  activeTab: string;
}

const Header: React.FC<HeaderProps> = ({ onTabChange, activeTab }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: 'home' | 'about' | 'projects' | 'toolkit' | 'contact'; label: string }[] = [
    { id: 'home', label: "Accueil" },
    { id: 'about', label: "À propos" },
    { id: 'projects', label: "Projets" },
    { id: 'toolkit', label: "Outils" },
    { id: 'contact', label: "Contact" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
        isScrolled 
          ? 'py-4 bg-cocoa/80 backdrop-blur-3xl border-b border-white/5' 
          : 'py-8 bg-cocoa/10 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <button 
          onClick={() => onTabChange('home')}
          className="flex items-center gap-3 md:gap-4 group text-left"
        >
          <div className="relative w-10 h-10 md:w-12 md:h-12 bg-white/5 backdrop-blur-3xl rounded-2xl flex items-center justify-center overflow-hidden border border-white/10 group-hover:border-sand/50 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-sand/20 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-xl md:text-2xl font-black text-white relative z-10 group-hover:scale-110 transition-transform">M</span>
          </div>
          <div className="flex flex-col max-w-[150px] md:max-w-none">
            <span className="text-base md:text-xl font-black text-white tracking-tighter uppercase leading-none font-display group-hover:surreal-text transition-all truncate">Mouna Ouattara</span>
            <span className="text-[8px] md:text-[9px] font-bold text-white/70 uppercase tracking-[0.4em] mt-1 font-mono group-hover:text-white/90 transition-colors">Data Scientist</span>
          </div>
        </button>

        {/* Desktop Nav - Contact button */}
        <nav className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => onTabChange('contact')}
            className={`px-8 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all duration-500 border ${
              activeTab === 'contact' 
                ? 'bg-white text-black border-white' 
                : 'bg-white/5 backdrop-blur-3xl text-white border-white/10 hover:border-white/30'
            }`}
          >
            Me Contacter
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-3 bg-white/5 backdrop-blur-3xl rounded-xl text-white border border-white/10"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-cocoa/95 backdrop-blur-3xl border-b border-white/10 overflow-hidden md:hidden"
          >
            <div className="p-8 flex flex-col gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    onTabChange(link.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-lg font-black uppercase tracking-widest text-left flex justify-between items-center ${
                    activeTab === link.id ? 'surreal-text' : 'text-white/70 hover:text-white transition-colors'
                  }`}
                >
                  {link.label}
                  {activeTab === link.id && <Sparkles size={16} className="text-sand" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
