import React from 'react';
import { Project } from '../types';
import { X } from 'lucide-react';

interface WorkflowModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: Project | null;
}

const WorkflowModal: React.FC<WorkflowModalProps> = ({ isOpen, onClose, project }) => {
    if (!isOpen || !project) return null;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/95 backdrop-blur-xl"
                onClick={onClose}
            ></div>
            
            {/* Modal */}
            <div className="relative w-full max-w-5xl max-h-[90vh] bg-obsidian/95 backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-500 shadow-[0_0_100px_rgba(0,102,255,0.1)]" onClick={e => e.stopPropagation()}>
                {/* Decorative Scanline */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent h-40 w-full -top-40 animate-[scanline_4s_linear_infinite] pointer-events-none"></div>

                {/* Header */}
                <div className="p-8 border-b border-white/5 flex justify-between items-center relative z-10">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
                            <span className="font-mono text-[10px] text-white/40 tracking-[0.4em] uppercase">Architecture_Specs</span>
                        </div>
                        <h2 className="text-4xl font-bold text-white tracking-tight uppercase font-display">
                            {project.title}
                        </h2>
                    </div>
                    <button 
                        onClick={onClose}
                        className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl hover:bg-white hover:text-black transition-all duration-500"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        
                        {/* Left: Project Info */}
                        <div className="lg:col-span-1 space-y-10">
                            <div>
                                <span className="block font-mono text-[9px] text-white/20 uppercase tracking-widest mb-4">System_Overview</span>
                                <p className="text-white/60 text-sm font-light leading-relaxed">
                                    {project.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <span className="block font-mono text-[9px] text-white/20 uppercase tracking-widest mb-2">Domain</span>
                                    <span className="text-xs font-bold text-white uppercase tracking-wider">{project.category}</span>
                                </div>
                                <div>
                                    <span className="block font-mono text-[9px] text-white/20 uppercase tracking-widest mb-2">Deployment</span>
                                    <span className="text-xs font-bold text-white/60 uppercase tracking-wider">{project.date}</span>
                                </div>
                            </div>

                            <div>
                                <span className="block font-mono text-[9px] text-white/20 uppercase tracking-widest mb-4">Core_Technologies</span>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 text-[10px] font-mono text-white/60 uppercase tracking-widest rounded">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right: Workflow Steps */}
                        <div className="lg:col-span-2 space-y-8">
                            <span className="block font-mono text-[9px] text-white/20 uppercase tracking-widest mb-6">Execution_Workflow</span>
                            
                            <div className="space-y-6">
                                {project.workflow.map((step, idx) => (
                                    <div key={idx} className="group flex gap-8 p-6 bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-all duration-500 rounded-2xl">
                                        <div className="flex flex-col items-center">
                                            <div className="w-10 h-10 flex items-center justify-center bg-white/5 text-white border border-white/10 rounded-xl group-hover:bg-white group-hover:text-black transition-all duration-500 shadow-lg shadow-white/5">
                                                <span className="font-mono text-xs font-bold">0{idx + 1}</span>
                                            </div>
                                            {idx < project.workflow.length - 1 && (
                                                <div className="w-[1px] h-full bg-gradient-to-b from-white/20 to-transparent mt-4"></div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-lg font-bold text-white mb-2 uppercase tracking-tight group-hover:text-white/80 transition-colors">
                                                {step.stage}
                                            </h4>
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                {step.tools.map(tool => (
                                                    <span key={tool} className="text-[10px] font-mono text-white/40 border border-white/10 px-2 py-0.5 rounded">
                                                        {tool}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 bg-white/5 border-t border-white/5 flex justify-between items-center relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="w-2 h-2 bg-electric animate-pulse shadow-[0_0_10px_rgba(0,102,255,0.8)]"></div>
                        <span className="font-mono text-[9px] text-white/20 uppercase tracking-[0.5em]">Secure_Archive_Access_Granted</span>
                    </div>
                    <button className="px-8 py-3 bg-white text-black font-bold text-[10px] uppercase tracking-[0.2em] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all rounded-xl">
                        Launch_System
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WorkflowModal;