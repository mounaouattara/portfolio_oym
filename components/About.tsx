import React from 'react';
import { motion } from 'motion/react';
import { Target, Zap, Award } from 'lucide-react';

const AboutHero = () => (
  <section className="relative min-h-[80vh] flex items-center pt-48 px-10 overflow-hidden bg-bg mesh-gradient">
    {/* Overlapping Rings (Image 3) */}
    <div className="absolute top-0 right-0 w-[800px] h-[800px] opacity-10 pointer-events-none">
      <div className="ring-glow w-full h-full" />
      <div className="ring-glow w-[80%] h-[80%] top-[10%] left-[10%]" />
      <div className="ring-glow w-[60%] h-[60%] top-[20%] left-[20%]" />
    </div>
    
    <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-32 items-center relative z-10">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10"
      >
        <div className="inline-flex items-center gap-4 px-4 py-2 bg-black/5 border border-black/20 text-black text-[10px] font-mono mb-12 uppercase tracking-[0.4em] relative group overflow-hidden">
          <div className="absolute inset-0 bg-black/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
          SUBJECT_ANALYSIS_V4.0
        </div>
        
        <h1 className="text-8xl md:text-[10rem] font-bold leading-[0.8] mb-12 tracking-tighter uppercase relative">
          <span className="text-fg block">MOUNA</span>
          <span className="text-black block ml-24">OUATTARA</span>
          
          {/* HUD Elements on Text */}
          <div className="absolute -top-4 -left-4 w-8 h-8 border-t border-l border-black/40" />
          <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b border-r border-black/40" />
        </h1>
        
        <p className="text-xl md:text-2xl text-black/60 max-w-xl font-mono leading-relaxed mb-16 border-l border-black/20 pl-8">
          {'>'} DATA SCIENTIST POLYVALENTE, EXPERTE DE L'ANALYSE À LA MISE EN PRODUCTION ML/IA.
          <span className="animate-pulse">_</span>
        </p>

        <div className="flex flex-wrap gap-8">
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: '#000000', color: '#FFFFFF' }}
            className="px-12 py-6 border border-black text-black transition-all duration-500 uppercase tracking-[0.4em] text-[10px] font-mono shadow-[0_0_20px_rgba(0,0,0,0.05)] relative group overflow-hidden"
          >
            <span className="relative z-10">DOWNLOAD_TECHNICAL_DOSSIER</span>
            <div className="absolute inset-0 bg-black/5 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12" />
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative aspect-square lg:aspect-[4/5]"
      >
        <div className="relative w-full h-full overflow-hidden border border-black/20 group bg-black/5 p-4 tech-card">
          <div className="hud-corner hud-corner-tl" />
          <div className="hud-corner hud-corner-tr" />
          <div className="hud-corner hud-corner-bl" />
          <div className="hud-corner hud-corner-br" />
          
          <img 
            src="https://picsum.photos/seed/minimal-portrait/800/1000" 
            alt="Mouna Ouattara"
            className="w-full h-full object-cover grayscale brightness-50 hover:brightness-100 transition-all duration-1000 scale-105 group-hover:scale-100 opacity-60 group-hover:opacity-100"
            referrerPolicy="no-referrer"
          />
          
          {/* Scanning Line Overlay */}
          <motion.div 
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[2px] bg-black/40 shadow-[0_0_10px_rgba(0,0,0,0.2)] z-20"
          />
        </div>
        
        <motion.div 
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-8 -right-8 p-10 bg-white border border-black/20 z-20 shadow-2xl tech-card"
        >
          <div className="hud-corner hud-corner-tl" />
          <div className="text-5xl font-mono font-bold text-black mb-2">03+</div>
          <div className="text-[8px] text-black/40 uppercase tracking-[0.4em] font-mono">Years of Neural Expertise</div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

const About: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-32"
    >
      <AboutHero />
      
      <div className="max-w-7xl mx-auto px-6 mt-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
          {[
            { 
              icon: <Target size={20} />, 
              title: "COLLABORATIVE", 
              desc: "CAPABLE DE TRAVAILLER EN ÉQUIPE POUR CONCEVOIR DES SOLUTIONS FIABLES ET ORIENTÉES MÉTIER.",
              label: "METHODOLOGY"
            },
            { 
              icon: <Zap size={20} />, 
              title: "AUTONOME", 
              desc: "CAPACITÉ À GÉRER DES PROJETS DE BOUT EN BOUT, DE L'ANALYSE À LA MISE EN PRODUCTION.",
              label: "ADAPTABILITY"
            },
            { 
              icon: <Award size={20} />, 
              title: "PROACTIVE", 
              desc: "ENGAGEMENT DANS LA RÉSOLUTION DE PROBLÈMES COMPLEXES AVEC UNE APPROCHE ORIENTÉE RÉSULTATS.",
              label: "VALUES"
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 bg-accent/5 border border-accent/10 hover:border-accent/40 transition-all duration-500 group relative"
            >
              <div className="hud-corner hud-corner-tl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-12 h-12 flex items-center justify-center text-black/30 mb-8 group-hover:text-black transition-colors">
                {item.icon}
              </div>
              <span className="block text-[8px] font-mono font-bold uppercase tracking-[0.3em] text-black/40 mb-4">{item.label}</span>
              <h3 className="text-2xl font-mono font-bold text-fg mb-4 tracking-tight">{item.title}</h3>
              <p className="text-black/60 leading-relaxed font-mono text-sm">
                {'>'} {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start py-24 border-t border-black/10">
          <div className="space-y-10">
            <h2 className="text-5xl md:text-7xl font-bold text-fg leading-tight uppercase">
              L'INTELLIGENCE DES DONNÉES.
            </h2>
            <div className="space-y-6 text-lg text-black/60 leading-relaxed font-mono">
              <p>
                {'>'} DATA SCIENTIST PASSIONNÉE PAR L'ANALYSE ET LA VISUALISATION DES DONNÉES JUSQU'À LA MISE EN PRODUCTION DE MODÈLES ML/IA.
              </p>
              <p>
                {'>'} JE CONÇOIS DES SOLUTIONS FIABLES ET ORIENTÉES MÉTIER, EN ÉTANT COLLABORATIVE, AUTONOME ET PROACTIVE DANS LA RÉSOLUTION DE PROBLÈMES.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'LOCATION', value: 'PALAISEAU, FR' },
              { label: 'FOCUS', value: 'DATA_SCIENCE' },
              { label: 'EXPERTISE', value: 'MLOPS / IA' },
              { label: 'STATUS', value: 'ACTIVE_AVAILABLE' }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-black/5 border border-black/10 relative group">
                <div className="hud-corner hud-corner-tl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="text-[8px] text-black/40 font-bold uppercase tracking-[0.2em] font-mono mb-3">{item.label}</div>
                <div className="text-black font-mono font-bold text-lg">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
