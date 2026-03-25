import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { PROJECTS, CATEGORY_PRIORITY } from '../constants';
import { Sparkles } from 'lucide-react';

const ProjectOverview: React.FC<{ onCategorySelect: (category: string) => void }> = ({ onCategorySelect }) => {
  const categoryStats = useMemo(() => {
    const counts: { [key: string]: number } = {};
    PROJECTS.forEach(p => { counts[p.category] = (counts[p.category] || 0) + 1; });
    return Object.entries(counts)
      .sort((a, b) => (CATEGORY_PRIORITY[a[0]] || 99) - (CATEGORY_PRIORITY[b[0]] || 99));
  }, []);

  return (
    <div className="w-full py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-1"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[10px] font-mono font-black tracking-[0.4em] uppercase text-cocoa/40">Aperçu</span>
            <div className="h-[1px] w-12 bg-accent/30" />
          </div>
          <h2 className="text-5xl font-black text-cocoa mb-8 tracking-tighter leading-[0.9] font-display uppercase">
            Exploration par <span className="text-accent italic">Domaine</span>
          </h2>
          <p className="text-cocoa/60 text-base leading-relaxed max-w-xs font-medium">
            Une archive sélectionnée de systèmes déployés. Filtrez par domaine technique pour inspecter les capacités spécifiques.
          </p>
        </motion.div>

        {/* Stats / Filter */}
        <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-6 w-full">
          {categoryStats.map(([name, count], index) => (
            <motion.button 
              key={name} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onClick={() => onCategorySelect(name)}
              className="group relative blob-shape border border-cocoa/5 p-10 hover:border-cocoa/20 transition-all duration-700 text-left shadow-2xl overflow-hidden bg-cocoa/5"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="flex justify-between items-start mb-10 relative z-10">
                <span className="text-5xl font-black text-cocoa tracking-tighter transition-all duration-500">
                  {count.toString().padStart(2, '0')}
                </span>
                <Sparkles size={16} className="text-cocoa/10 group-hover:text-accent transition-colors" />
              </div>
              <div className="flex flex-col relative z-10">
                <span className="text-[9px] font-mono font-black text-cocoa/40 uppercase tracking-widest mb-2">Secteur</span>
                <span className="text-xs font-mono font-black text-cocoa group-hover:text-cocoa/80 transition-colors uppercase tracking-widest leading-tight">{name}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectOverview;
