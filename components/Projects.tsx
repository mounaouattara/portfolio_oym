import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS, CATEGORY_PRIORITY } from '../constants';
import { Project } from '../types';
import { generateProjectVisual } from '../services/geminiService';
import { 
  Calendar, Plus, Folder, Monitor, 
  X, ExternalLink, Github, FileText,
  Image as ImageIcon, Maximize2, ArrowUpRight,
  Cpu, Activity, Database, Zap
} from 'lucide-react';
import ProjectModal from './ProjectModal';
import RoboticTree from './RoboticTree';

const ProjectCard: React.FC<{ project: Project; onOpenProject: (project: Project) => void; index: number }> = ({ project, onOpenProject, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      onClick={() => onOpenProject(project)}
      className="group relative aspect-[4/5] overflow-hidden cursor-pointer bg-black/5 border border-black/10 tech-card"
    >
      <div className="hud-corner hud-corner-tl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="hud-corner hud-corner-br opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="absolute inset-0 z-0">
        <img 
          src={`https://picsum.photos/seed/${project.title}/800/1000`}
          alt={project.title}
          className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 group-hover:scale-110 opacity-40 group-hover:opacity-100"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-90" />
        
        {/* Scanning Line Overlay */}
        <motion.div 
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-[1px] bg-black/40 shadow-[0_0_10px_rgba(0,0,0,0.2)] z-20 opacity-0 group-hover:opacity-100"
        />
      </div>

      <div className="absolute inset-x-0 bottom-0 p-8 z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-black font-mono text-[8px] font-bold tracking-[0.4em] uppercase">LOG_ENTRY: {project.category}</span>
            <div className="h-[1px] w-8 bg-black/20" />
          </div>
          <div className="flex gap-2">
            {project.tags.slice(0, 2).map((tag, i) => (
              <span key={i} className="text-[7px] font-mono border border-black/10 px-1.5 py-0.5 opacity-40 group-hover:opacity-100 transition-opacity uppercase">{tag}</span>
            ))}
          </div>
        </div>
        
        <h3 className="text-3xl font-mono font-bold text-fg mb-4 tracking-tight group-hover:text-black transition-colors uppercase leading-none">{project.title}</h3>
        
        <div className="space-y-4 overflow-hidden">
          <p className="text-[10px] text-black/60 font-mono italic line-clamp-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
            {'>'} {project.description}
          </p>
          
          {/* Tech Stack Visualization */}
          <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 transform translate-y-4 group-hover:translate-y-0">
            <div className="flex justify-between items-center">
              <span className="text-[7px] font-mono opacity-40 uppercase tracking-widest">Tech_Stack_Integration</span>
              <span className="text-[7px] font-mono opacity-40 uppercase">98%</span>
            </div>
            <div className="flex gap-1">
              {project.tags.map((_, i) => (
                <motion.div 
                  key={i}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                  className="h-[2px] flex-1 bg-black/20 group-hover:bg-black transition-colors"
                />
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200 transform translate-y-4 group-hover:translate-y-0">
            <div className="flex -space-x-2">
              {[Cpu, Activity, Database].map((Icon, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ scale: 1.3, zIndex: 10 }}
                  className="w-6 h-6 rounded-full bg-black flex items-center justify-center border border-bg relative"
                >
                  <Icon size={10} className="text-white" />
                </motion.div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <motion.div 
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-black"
              />
              <span className="text-[8px] font-mono font-bold tracking-widest uppercase opacity-40">System_Ready</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-8 right-8 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="w-12 h-12 border border-black/30 flex items-center justify-center text-black bg-white/80 backdrop-blur-md">
          <ArrowUpRight size={20} />
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection: React.FC<{ lang: 'fr' | 'en' }> = ({ lang }) => {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = useMemo(() => {
    const cats = ['Tous', ...new Set(PROJECTS.map(p => p.category))];
    return cats.sort((a, b) => (CATEGORY_PRIORITY[a] || 99) - (CATEGORY_PRIORITY[b] || 99));
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'Tous') return PROJECTS;
    return PROJECTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="w-full flex flex-col items-center max-w-7xl mx-auto px-6 md:px-10 bg-transparent relative overflow-hidden">
      {/* Navigation Anchors at the very top */}
      <div className="absolute -top-32 left-0 w-0 h-0 invisible" id="vision" />
      <div className="absolute -top-32 left-0 w-0 h-0 invisible" id="nlp" />
      <div className="absolute -top-32 left-0 w-0 h-0 invisible" id="forecast" />
      <div className="absolute -top-32 left-0 w-0 h-0 invisible" id="analytics" />
      {/* Blueprint Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'linear-gradient(var(--fg) 1px, transparent 1px), linear-gradient(90deg, var(--fg) 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
      
      {/* Decorative Robotic Trees Forest - PROGRESSIVE CASCADE */}
      {/* Top Layer - Near Selected Works */}
      <div className="absolute -left-40 -top-40 opacity-10 pointer-events-none hidden xl:block">
        <RoboticTree height={800} color="black" delay={0.2} scale={1.1} />
      </div>
      <div className="absolute -right-40 -top-20 opacity-10 pointer-events-none hidden xl:block">
        <RoboticTree height={700} color="black" delay={0.4} scale={1.0} />
      </div>

      {/* Mid Layer - Transitioning to Digital Laboratory */}
      <div className="absolute -left-60 top-[10%] opacity-15 pointer-events-none hidden xl:block">
        <RoboticTree height={1200} color="black" delay={0.8} scale={1.4} />
      </div>
      <div className="absolute -right-60 top-[20%] opacity-15 pointer-events-none hidden xl:block">
        <RoboticTree height={1000} color="black" delay={1.1} scale={1.3} />
      </div>

      {/* Main Layer - Digital Laboratory Core */}
      <div className="absolute -left-20 top-[40%] opacity-[0.08] pointer-events-none hidden xl:block">
        <RoboticTree height={1100} color="black" delay={1.5} scale={1.2} />
      </div>
      <div className="absolute -right-20 top-[50%] opacity-[0.08] pointer-events-none hidden xl:block">
        <RoboticTree height={900} color="black" delay={1.8} scale={1.1} />
      </div>

      {/* Bottom Layer - Grounding */}
      <div className="absolute left-1/2 -bottom-60 opacity-15 pointer-events-none hidden xl:block -translate-x-1/2">
        <RoboticTree height={800} color="black" delay={2.2} scale={1.3} />
      </div>

      {/* Technical Annotations */}
      <div className="absolute top-10 left-10 text-[8px] font-mono opacity-20 uppercase tracking-widest hidden lg:block">
        [SEC_ZONE_04] // LAB_ENV_INIT
      </div>
      <div className="absolute bottom-20 right-10 text-[8px] font-mono opacity-20 uppercase tracking-widest hidden lg:block rotate-90 origin-right">
        DATA_STREAM_ACTIVE // 0x44F2
      </div>

      <div className="mb-8 md:mb-12 w-full relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-end gap-8 md:gap-12">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 md:gap-3">
            {categories.map(cat => {
              const id = cat === 'Computer Vision' ? 'vision' : 
                         cat === 'NLP' ? 'nlp' : 
                         cat === 'Time Series' ? 'forecast' : 
                         cat === 'Data Analytics' ? 'analytics' : undefined;
              return (
                <button
                  key={cat}
                  id={id}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 md:px-5 md:py-2 text-[8px] md:text-[9px] font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] transition-all duration-500 border font-mono ${
                    activeCategory === cat 
                      ? 'bg-black text-white border-black shadow-[0_0_15px_rgba(0,0,0,0.1)]' 
                      : 'text-fg/40 border-black/10 hover:border-black/30 bg-white/50 backdrop-blur-sm'
                  }`}
                >
                  {cat === 'Tous' ? (lang === 'fr' ? 'TOUS' : 'ALL') : cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full relative z-10">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <ProjectCard 
              key={project.title} 
              project={project} 
              onOpenProject={setSelectedProject} 
              index={idx} 
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Laboratory Metadata Footer */}
      <div className="mt-24 w-full flex justify-between items-end text-[10px] font-mono opacity-20 uppercase tracking-[0.4em] border-t border-black/10 pt-8">
        <div className="flex flex-col gap-2">
          <span>Experiments_Count: {PROJECTS.length}</span>
          <span>Last_Update: 2026.03.25</span>
        </div>
        <div className="text-right">
          <span>System_Core: Stable</span>
        </div>
      </div>

      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </div>
  );
};

export default ProjectsSection;
