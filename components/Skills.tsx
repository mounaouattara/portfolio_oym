import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CORE_COMPETENCIES, TOOLKIT } from '../constants';
import { 
  Box, Circle, Triangle, Square, 
  Layers, Database, Terminal, Cpu, BarChart3, Cloud,
  Folder, ArrowRight, Tag, Image as ImageIcon, Zap,
  ChevronRight, Layout
} from 'lucide-react';

const SkillsSection: React.FC<{ lang: 'fr' | 'en' }> = ({ lang }) => {
  const [viewMode, setViewMode] = useState<'skills' | 'stack'>('skills');
  const [activeCategory, setActiveCategory] = useState(0);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  const currentData = viewMode === 'skills' ? CORE_COMPETENCIES : TOOLKIT;
  const currentCategory = currentData[activeCategory % currentData.length];

  const handleCategoryChange = (idx: number) => {
    setActiveCategory(idx);
    setSelectedTask(null);
  };

  const getIconForCategory = (idx: number) => {
    const icons = [Box, Circle, Triangle, Square, Layers, Database, Terminal, Cpu, BarChart3, Cloud];
    const Icon = icons[idx % icons.length];
    return <Icon size={18} strokeWidth={1.5} />;
  };

  // Mock task details for the info box
  const getTaskDetails = (task: string) => {
    return {
      summary: lang === 'fr' 
        ? `Expertise approfondie en ${task.toLowerCase()}, permettant de résoudre des problématiques complexes via des approches basées sur les données.`
        : `Deep expertise in ${task.toLowerCase()}, enabling the resolution of complex problems through data-driven approaches.`,
      example: lang === 'fr'
        ? `Implémentation de pipelines robustes pour l'automatisation de ${task.toLowerCase()}.`
        : `Implementation of robust pipelines for the automation of ${task.toLowerCase()}.`,
      projectLink: '#projects'
    };
  };

  return (
    <div className="w-full h-full flex flex-col gap-8 font-mono select-none relative">
      {/* Navigation Anchors */}
      <div className="absolute -top-32 left-0 w-0 h-0 invisible" id="languages" />
      <div className="absolute -top-32 left-0 w-0 h-0 invisible" id="frameworks" />
      <div className="absolute -top-32 left-0 w-0 h-0 invisible" id="tools" />

      {/* View Mode Toggle */}
      <div className="flex gap-4 p-1 border border-black/10 bg-black/5 self-start">
        <button 
          onClick={() => { setViewMode('skills'); setActiveCategory(0); setSelectedTask(null); }}
          className={`px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${viewMode === 'skills' ? 'bg-black text-white' : 'text-black/40 hover:text-black'}`}
        >
          {lang === 'fr' ? 'DOMAINES' : 'DOMAINS'}
        </button>
        <button 
          onClick={() => { setViewMode('stack'); setActiveCategory(0); setSelectedTask(null); }}
          className={`px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${viewMode === 'stack' ? 'bg-black text-white' : 'text-black/40 hover:text-black'}`}
        >
          {lang === 'fr' ? 'OUTILS' : 'TOOLS'}
        </button>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        {/* Left: Selection */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="flex flex-col border border-black/10 bg-white/50 backdrop-blur-sm">
            <div className="px-4 py-2 border-b border-black/10 bg-black/5">
              <span className="text-[9px] font-bold uppercase tracking-widest opacity-40">
                {lang === 'fr' ? 'CATÉGORIES' : 'CATEGORIES'}
              </span>
            </div>
            <div className="flex flex-col max-h-[60vh] overflow-y-auto custom-scrollbar">
              {currentData.map((cat, idx) => (
                <button 
                   key={idx}
                   onClick={() => handleCategoryChange(idx)}
                   className={`w-full px-4 py-4 text-left transition-all border-b border-black/5 last:border-0 flex items-center gap-4 ${
                     activeCategory === idx 
                       ? 'bg-black text-white' 
                       : 'text-black/40 hover:text-black hover:bg-black/5'
                   }`}
                >
                  <div className={`p-2 rounded-full ${activeCategory === idx ? 'bg-white/20' : 'bg-black/5'}`}>
                    {getIconForCategory(idx)}
                  </div>
                  <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-tight leading-tight">
                    {cat.category}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Content */}
        <div className="lg:col-span-8">
          <div className="h-full bg-white/40 backdrop-blur-md border border-black/5 p-6 md:p-10 relative overflow-hidden flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${viewMode}-${activeCategory}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="h-full flex flex-col"
              >
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-2 bg-black rounded-full animate-pulse" />
                    <span className="text-[9px] font-bold tracking-[0.3em] opacity-30 uppercase">
                      {viewMode === 'skills' ? 'Core_Competency' : 'Technical_Stack'} // 0{activeCategory + 1}
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-5xl font-mono font-bold uppercase tracking-tighter leading-none mb-4">
                    {currentCategory.category}
                  </h3>
                </div>

                <div className="flex-1">
                  {viewMode === 'skills' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                      {(currentCategory as any).tasks.map((task: string, i: number) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          onMouseEnter={() => setSelectedTask(task)}
                          onMouseLeave={() => setSelectedTask(null)}
                          className="flex flex-col gap-2 group relative"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 bg-black/20 group-hover:bg-black transition-colors shrink-0" />
                            <span className="text-[11px] md:text-[13px] font-mono font-bold opacity-70 group-hover:opacity-100 transition-opacity uppercase leading-tight">
                              {task}
                            </span>
                          </div>
                          
                          {/* Hover Explanation */}
                          <AnimatePresence>
                            {selectedTask === task && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="pl-4 border-l border-black/10 py-2">
                                  <p className="text-[10px] md:text-[11px] opacity-60 leading-relaxed italic">
                                    {getTaskDetails(task).summary}
                                  </p>
                                  <div className="mt-2 flex items-center gap-2 text-[8px] font-bold uppercase tracking-widest opacity-40">
                                    <Zap size={10} />
                                    <span>{getTaskDetails(task).example}</span>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {(currentCategory as any).tools.map((tool: any, i: number) => (
                        <motion.div
                          key={tool.name}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                          className="group relative"
                        >
                          <div className="bg-white/50 border border-black/5 p-4 md:p-6 transition-all duration-500 group-hover:border-black/20 group-hover:shadow-xl group-hover:bg-white">
                            <div className="flex flex-col items-center text-center gap-3">
                              <div className="text-[10px] font-mono font-bold opacity-30 uppercase tracking-tighter">
                                {tool.level}%
                              </div>
                              <div className="text-xs md:text-sm font-mono font-bold uppercase tracking-tight group-hover:text-black transition-colors">
                                {tool.name}
                              </div>
                              <div className="w-full h-[2px] bg-black/5 overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${tool.level}%` }}
                                  transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                                  className="h-full bg-black"
                                />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Decorative background elements */}
                <div className="absolute bottom-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                  <Layout size={300} strokeWidth={0.5} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
