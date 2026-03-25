import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CORE_COMPETENCIES, TOOLKIT } from '../constants';
import { 
  Box, Circle, Triangle, Square, 
  Layers, Database, Terminal, Cpu, BarChart3, Cloud,
  Folder, ArrowRight, Tag, Image as ImageIcon, Zap,
  ChevronRight, FileText, Monitor
} from 'lucide-react';

const MiniPipeline: React.FC<{ task: string; active: boolean }> = ({ task, active }) => {
  const t = task.toLowerCase();
  let icons: any[] = [];

  // User requested: "dossier fleche boite label ia flech dossier img généré"
  // We'll map this to: Folder -> ArrowRight -> Box -> Tag -> Cpu -> ArrowRight -> Folder -> ImageIcon
  
  if (t.includes('ia') || t.includes('générative') || t.includes('generative') || t.includes('llm')) {
    icons = [Folder, ArrowRight, Box, Tag, Cpu, ArrowRight, Folder, ImageIcon];
  } else if (t.includes('prédic') || t.includes('predictive') || t.includes('modélisation')) {
    icons = [Database, ArrowRight, Box, ArrowRight, BarChart3, ArrowRight, Zap];
  } else if (t.includes('analyse') || t.includes('visualisation') || t.includes('kpi')) {
    icons = [FileText, ArrowRight, BarChart3, ArrowRight, Monitor, ArrowRight, Zap];
  } else if (t.includes('pipeline') || t.includes('ingénierie') || t.includes('etl') || t.includes('big data')) {
    icons = [Database, ArrowRight, Layers, ArrowRight, Cloud, ArrowRight, Database];
  } else if (t.includes('déploiement') || t.includes('mlops') || t.includes('conteneurisation')) {
    icons = [Box, ArrowRight, Cloud, ArrowRight, Zap, ArrowRight, Monitor];
  } else {
    icons = [Terminal, ArrowRight, Cpu, ArrowRight, Zap];
  }

  return (
    <div className={`flex items-center gap-1 flex-wrap ${active ? 'opacity-100' : 'opacity-40'}`}>
      {icons.map((Icon, i) => (
        <React.Fragment key={i}>
          <Icon size={10} strokeWidth={2.5} className={i % 2 === 1 ? 'opacity-30' : ''} />
        </React.Fragment>
      ))}
    </div>
  );
};

const SkillsSection: React.FC = () => {
  const [viewMode, setViewMode] = useState<'skills' | 'stack'>('skills');
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeItem, setActiveItem] = useState(0);

  const currentData = viewMode === 'skills' ? CORE_COMPETENCIES : TOOLKIT;
  const currentCategory = currentData[activeCategory % currentData.length];

  const handleCategoryChange = (idx: number) => {
    setActiveCategory(idx);
    setActiveItem(0);
  };

  const getIconForCategory = (idx: number) => {
    const icons = [Box, Circle, Triangle, Square, Layers, Database, Terminal, Cpu, BarChart3, Cloud];
    const Icon = icons[idx % icons.length];
    return <Icon size={20} strokeWidth={1.5} />;
  };

  return (
    <div className="w-full h-full flex flex-col gap-8 font-mono select-none">
      {/* View Mode Toggle */}
      <div className="flex gap-4 p-1 border border-fg/10 bg-fg/5 self-start">
        <button 
          onClick={() => { setViewMode('skills'); setActiveCategory(0); setActiveItem(0); }}
          className={`px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${viewMode === 'skills' ? 'bg-fg text-bg' : 'text-fg/40 hover:text-fg'}`}
        >
          Domaines
        </button>
        <button 
          onClick={() => { setViewMode('stack'); setActiveCategory(0); setActiveItem(0); }}
          className={`px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${viewMode === 'stack' ? 'bg-fg text-bg' : 'text-fg/40 hover:text-fg'}`}
        >
          Outils
        </button>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-0">
        {/* Left: Selection */}
        <div className="lg:col-span-3 flex flex-col gap-6 overflow-hidden">
          {/* Categories List */}
          <div className="flex flex-col border border-fg/10 bg-fg/[0.02] overflow-hidden">
            <div className="px-4 py-2 border-b border-fg/10 bg-fg/5 flex justify-between items-center">
              <span className="text-[9px] font-bold uppercase tracking-widest opacity-40">
                Catégories
              </span>
              <div className="w-1.5 h-1.5 bg-fg rounded-full animate-pulse" />
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {currentData.map((cat, idx) => (
                <button 
                  key={idx}
                  onClick={() => handleCategoryChange(idx)}
                  className={`w-full px-4 py-4 text-left transition-all border-b border-fg/5 last:border-0 flex items-center gap-4 ${
                    activeCategory === idx 
                      ? 'bg-fg/10 text-fg' 
                      : 'text-fg/40 hover:text-fg/70 hover:bg-fg/5'
                  }`}
                >
                  <div className={`p-2 border transition-colors ${activeCategory === idx ? 'border-fg bg-fg text-bg' : 'border-fg/10'}`}>
                    {getIconForCategory(idx)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-tight leading-none mb-1">
                      {cat.category}
                    </span>
                    <span className="text-[7px] opacity-40 uppercase tracking-widest">
                      Module_0{idx + 1}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Visualization */}
        <div className="lg:col-span-9 flex flex-col border border-fg/10 bg-fg/[0.01] p-8 relative overflow-hidden">
          {/* Category Description */}
          <div className="mb-12 max-w-xl relative z-20">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-8 bg-fg/20" />
              <div className="flex flex-col">
                <span className="text-[9px] font-bold tracking-widest opacity-30 uppercase">Description_Domaine</span>
                <span className="text-[11px] font-bold uppercase tracking-tighter text-fg/80">{currentCategory.category}</span>
              </div>
            </div>
            <p className="text-sm font-bold uppercase tracking-tight text-fg/60 leading-relaxed italic pl-4">
              {">"} {(currentCategory as any).description || "Exploration des outils et technologies maîtrisés dans ce domaine spécifique."}
            </p>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center relative">
            {/* Background Grid for Visualization */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(var(--fg) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            
            {viewMode === 'stack' ? (
              /* Histogram for Tools */
              <div className="w-full max-w-xl h-48 flex items-end gap-1 md:gap-2">
                {(currentCategory as any).tools.map((tool: any, idx: number) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer" onClick={() => setActiveItem(idx)}>
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${tool.level}%` }}
                      transition={{ type: 'spring', stiffness: 100, damping: 20, delay: idx * 0.03 }}
                      className={`w-full relative transition-colors duration-300 ${activeItem === idx ? 'bg-fg' : 'bg-fg/20 group-hover:bg-fg/40'}`}
                    >
                      {activeItem === idx && (
                        <motion.div 
                          layoutId="active-bar-indicator"
                          className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold"
                        >
                          {tool.level}%
                        </motion.div>
                      )}
                    </motion.div>
                    <span className={`text-[7px] uppercase tracking-tighter transition-opacity ${activeItem === idx ? 'opacity-100' : 'opacity-20 group-hover:opacity-40'}`}>
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              /* Neural Map for Skills/Domaines */
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Central Domain Node */}
                <motion.div 
                  layoutId="central-node"
                  className="w-40 h-40 rounded-full border border-fg flex items-center justify-center bg-bg z-20 shadow-[0_0_50px_rgba(0,0,0,0.05)] relative"
                >
                  <div className="text-center p-6">
                    <span className="text-[9px] font-bold opacity-30 uppercase tracking-[0.4em]">Core_Module</span>
                    <div className="text-[12px] font-bold uppercase leading-tight mt-2 tracking-tighter">{currentCategory.category}</div>
                  </div>
                  
                  {/* Rotating Orbits */}
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-15px] border border-dashed border-fg/10 rounded-full"
                  />
                  <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-30px] border border-dotted border-fg/5 rounded-full"
                  />
                  
                  {/* Pulsing Aura */}
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.15, 0.05] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute inset-0 bg-fg rounded-full blur-3xl -z-10"
                  />
                </motion.div>

                {/* Connection Lines & Competency Nodes */}
                {(currentCategory as any).tasks.map((task: string, idx: number) => {
                  const total = (currentCategory as any).tasks.length;
                  const angle = (idx / total) * Math.PI * 2 - Math.PI / 2;
                  const radius = 220;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;

                  return (
                    <React.Fragment key={idx}>
                      {/* Connection Line */}
                      <motion.div 
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ 
                          scaleX: 1, 
                          opacity: activeItem === idx ? 0.6 : 0.1,
                          width: activeItem === idx ? '220px' : '200px'
                        }}
                        className="absolute h-[1px] bg-fg origin-left z-10"
                        style={{ 
                          left: '50%', 
                          top: '50%', 
                          rotate: `${angle * (180 / Math.PI)}deg` 
                        }}
                      >
                        {activeItem === idx && (
                          <motion.div 
                            animate={{ left: ['0%', '100%'] }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="absolute top-[-2px] w-4 h-[5px] bg-fg rounded-full blur-[2px]"
                          />
                        )}
                      </motion.div>
                      
                      {/* Competency Node */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ 
                          opacity: 1, 
                          scale: activeItem === idx ? 1.05 : 1,
                          x: x,
                          y: y
                        }}
                        transition={{ delay: idx * 0.05, type: 'spring', stiffness: 100 }}
                        className={`absolute w-52 p-4 border transition-all cursor-pointer z-30 group ${
                          activeItem === idx 
                            ? 'bg-fg text-bg border-fg shadow-[0_0_30px_rgba(0,0,0,0.1)]' 
                            : 'bg-bg text-fg border-fg/10 hover:border-fg/30 hover:bg-fg/[0.02]'
                        }`}
                        onClick={() => setActiveItem(idx)}
                      >
                        <div className="flex flex-col gap-3">
                          <div className="flex justify-between items-start gap-2">
                            <span className="text-[10px] font-bold uppercase leading-tight flex-1 tracking-tight">
                              {task.split(' (')[0]}
                            </span>
                            <div className={`p-1 border ${activeItem === idx ? 'border-bg/40' : 'border-fg/10'}`}>
                              <ChevronRight size={10} className={`transition-transform duration-300 ${activeItem === idx ? 'rotate-90' : ''}`} />
                            </div>
                          </div>
                          <div className={`h-[1px] w-full ${activeItem === idx ? 'bg-bg/20' : 'bg-fg/5'}`} />
                          <div className="flex flex-col gap-1.5">
                            <div className="flex justify-between items-center">
                              <span className={`text-[7px] uppercase tracking-widest font-bold ${activeItem === idx ? 'opacity-60' : 'opacity-20'}`}>Data_Pipeline</span>
                              <span className={`text-[6px] font-mono ${activeItem === idx ? 'opacity-40' : 'opacity-10'}`}>[0x{idx.toString(16).toUpperCase()}]</span>
                            </div>
                            <MiniPipeline task={task} active={activeItem === idx} />
                          </div>
                        </div>
                        
                        {/* Corner Accents for Active Node */}
                        {activeItem === idx && (
                          <>
                            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-bg" />
                            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-bg" />
                          </>
                        )}
                      </motion.div>
                    </React.Fragment>
                  );
                })}
              </div>
            )}

            {/* Focus Info - Only for Stack or as a detailed fallback */}
            {viewMode === 'stack' && (
              <div className="text-center space-y-2 mt-8">
                <span className="text-[9px] font-bold tracking-[0.3em] opacity-30 uppercase">Focus_Module</span>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase leading-none max-w-2xl">
                  {(currentCategory as any).tools[activeItem]?.name}
                </h2>
                <div className="flex items-center justify-center gap-4 pt-2">
                  <div className="h-[1px] w-8 bg-fg/10" />
                  <span className="text-xl font-bold">{(currentCategory as any).tools[activeItem]?.level}%</span>
                  <div className="h-[1px] w-8 bg-fg/10" />
                </div>
              </div>
            )}
          </div>

          {/* Bottom Metadata */}
          <div className="flex justify-between items-end text-[9px] font-bold opacity-20 uppercase tracking-widest mt-auto">
            <div className="flex gap-4">
              <span>CAT: {currentCategory.category}</span>
              <span>ID: 0{activeCategory + 1}</span>
            </div>
            <div className="flex gap-4">
              <span>VER: 4.1.0</span>
              <span>REF: {activeCategory}{activeItem}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
