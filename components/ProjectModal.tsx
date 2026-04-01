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
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 lg:p-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-bg/80 backdrop-blur-md"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-[85vh] overflow-hidden bg-bg border border-black/10 flex flex-col md:flex-row shadow-2xl tech-card rounded-lg"
        >
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-[110] p-2 bg-white/80 backdrop-blur-md text-black hover:bg-black hover:text-white transition-all rounded-full border border-black/10 shadow-sm"
          >
            <X size={18} />
          </button>

          <div className="w-full md:w-[35%] relative h-48 md:h-auto overflow-hidden bg-black/5 border-b md:border-b-0 md:border-r border-black/10 shrink-0">
            <img 
              src={project.imageUrl || `https://picsum.photos/seed/${project.title}/800/1200`}
              alt={project.title}
              className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8 text-white">
              <span className="text-[9px] font-mono font-bold uppercase tracking-[0.3em] opacity-70 mb-1 block">
                {project.category}
              </span>
              <h2 className="text-xl md:text-2xl font-sans font-bold leading-tight tracking-tight uppercase">
                {project.title}
              </h2>
            </div>
          </div>

          {/* Right: Details */}
          <div className="w-full md:w-[65%] p-6 md:p-10 overflow-y-auto custom-scrollbar bg-white/50 backdrop-blur-xl flex-grow">
            <div className="space-y-8">
              <section>
                <div className="flex items-center gap-3 mb-4 text-black/40">
                  <Calendar size={12} />
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em]">
                    {new Date(project.date).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                  </span>
                </div>
                <p className="text-base md:text-lg text-fg/90 font-sans leading-relaxed">
                  {project.description}
                </p>
              </section>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <section>
                  <h3 className="text-[9px] font-mono font-bold text-black/40 uppercase tracking-[0.2em] mb-3">TECHNOLOGIES</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {project.hardSkills?.map(skill => (
                      <span key={skill} className="px-2 py-1 bg-black/5 border border-black/10 text-[9px] font-mono text-black/70 uppercase tracking-wider rounded-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-[9px] font-mono font-bold text-black/40 uppercase tracking-[0.2em] mb-3">COMPÉTENCES</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {project.softSkills?.map(skill => (
                      <span key={skill} className="px-2 py-1 bg-black/5 border border-black/10 text-[9px] font-mono text-black/70 uppercase tracking-wider rounded-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>
              </div>

              <section>
                <h3 className="text-[9px] font-mono font-bold text-black/40 uppercase tracking-[0.2em] mb-6">MÉTHODOLOGIE</h3>
                <div className="grid grid-cols-1 gap-4">
                  {project.workflow.map((step, i) => (
                    <div key={i} className="flex items-start gap-4 p-3 bg-black/[0.02] border border-black/[0.05] rounded-md group hover:bg-black/[0.04] transition-colors">
                      <span className="text-[10px] font-mono text-black/20 pt-0.5">0{i+1}</span>
                      <div>
                        <div className="text-[9px] font-mono text-black/40 uppercase tracking-wider mb-0.5">{step.stage}</div>
                        <div className="text-xs font-bold text-fg/80 uppercase tracking-tight font-mono">{step.tools.join(' • ')}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <div className="pt-8 border-t border-black/5 flex flex-wrap items-center gap-6">
                {project.github && (
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-black/60 hover:text-black transition-all font-mono text-[10px] uppercase tracking-widest group"
                  >
                    <Github size={16} className="group-hover:scale-110 transition-transform" />
                    Code Source
                  </a>
                )}
                <div className="flex items-center gap-2 text-black/20 font-mono text-[10px] uppercase tracking-widest">
                  <Zap size={16} />
                  Demo Indisponible
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
