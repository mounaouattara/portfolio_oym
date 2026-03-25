import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Github, Calendar, Zap } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-bg/90 backdrop-blur-xl"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden bg-bg border border-black/20 flex flex-col md:flex-row shadow-[0_0_50px_rgba(0,0,0,0.05)] tech-card"
        >
          {/* HUD Corners */}
          <div className="hud-corner hud-corner-tl" />
          <div className="hud-corner hud-corner-br" />
          
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-50 p-3 bg-black/10 backdrop-blur-md text-black hover:bg-black hover:text-bg transition-all hover:scale-110 border border-black/20"
          >
            <X size={20} />
          </button>

          <div className="w-full md:w-2/5 relative overflow-hidden bg-black/5 border-r border-black/10">
            <img 
              src={project.imageUrl || `https://picsum.photos/seed/${project.title}/800/1200`}
              alt={project.title}
              className="w-full h-full object-cover grayscale brightness-50 hover:grayscale-0 hover:brightness-100 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
            
            {/* Scanning Line Overlay */}
            <motion.div 
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-[1px] bg-black/40 shadow-[0_0_10px_rgba(0,0,0,0.1)] z-20"
            />
            
            <div className="absolute bottom-12 left-12 right-12">
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-black mb-4 block">
                MODULE_ID: {project.category}
              </span>
              <h2 className="text-5xl font-mono font-bold text-fg leading-none tracking-tighter mb-6 uppercase">
                {project.title}
              </h2>
            </div>
          </div>

          {/* Right: Details */}
          <div className="w-full md:w-3/5 p-12 md:p-16 overflow-y-auto custom-scrollbar bg-black/5 backdrop-blur-xl">
            <div className="space-y-16">
              <section>
                <div className="flex items-center gap-4 mb-8 text-black/60">
                  <Calendar size={14} />
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em]">
                    TIMESTAMP: {new Date(project.date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <p className="text-xl md:text-2xl text-fg/80 font-mono leading-relaxed">
                  {'>'} {project.description}
                </p>
              </section>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                <section>
                  <h3 className="text-[10px] font-mono font-bold text-black uppercase tracking-[0.4em] mb-6">CORE_PROTOCOLS</h3>
                  <div className="flex flex-wrap gap-3">
                    {project.hardSkills?.map(skill => (
                      <span key={skill} className="px-4 py-2 bg-black/5 border border-black/20 text-[9px] font-mono text-black/80 uppercase tracking-widest">
                        [{skill}]
                      </span>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-[10px] font-mono font-bold text-black uppercase tracking-[0.4em] mb-6">COGNITIVE_ASSETS</h3>
                  <div className="flex flex-wrap gap-3">
                    {project.softSkills?.map(skill => (
                      <span key={skill} className="px-4 py-2 bg-black/5 border border-black/20 text-[9px] font-mono text-black/80 uppercase tracking-widest">
                        [{skill}]
                      </span>
                    ))}
                  </div>
                </section>
              </div>

              <section>
                <h3 className="text-[10px] font-mono font-bold text-black uppercase tracking-[0.4em] mb-10">OPERATIONAL_WORKFLOW</h3>
                <div className="space-y-8">
                  {project.workflow.map((step, i) => (
                    <div key={i} className="flex items-start gap-6 group">
                      <span className="text-[10px] font-mono text-black/40 pt-1 group-hover:text-black transition-colors">[{i+1}]</span>
                      <div>
                        <div className="text-[10px] font-mono text-black/50 uppercase tracking-[0.2em] mb-2">{step.stage}</div>
                        <div className="text-sm font-bold text-fg uppercase tracking-tight font-mono">{step.tools.join(' // ')}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <div className="pt-12 border-t border-black/10 flex flex-wrap gap-10">
                {project.github && (
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-fg hover:text-black transition-all font-mono text-[10px] uppercase tracking-[0.4em] group"
                  >
                    <Github size={18} className="group-hover:scale-110 transition-transform" />
                    ACCESS_SOURCE_CODE
                  </a>
                )}
                <div className="flex items-center gap-3 text-black/40 font-mono text-[10px] uppercase tracking-[0.4em] cursor-not-allowed">
                  <Zap size={18} />
                  LIVE_DEMO_OFFLINE
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
