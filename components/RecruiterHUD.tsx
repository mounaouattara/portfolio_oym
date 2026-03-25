
import React from 'react';

interface RecruiterHUDProps {
    onContactClick: () => void;
}

const RecruiterHUD: React.FC<RecruiterHUDProps> = ({ onContactClick }) => {
    return (
        <div className="relative w-[340px]">
            
            {/* ID CARD PANEL */}
            <div className="glass-panel cut-corners p-8 bg-[#0a0a0c]/90 relative overflow-hidden group">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
                <div className="absolute top-4 right-4 flex gap-1">
                    <div className="w-1 h-3 bg-white/10"></div>
                    <div className="w-1 h-3 bg-white/20"></div>
                    <div className="w-1 h-3 bg-white/30"></div>
                </div>

                {/* Header */}
                <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-6">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(0,240,255,0.8)]"></div>
                            <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping opacity-40"></div>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-tech text-[10px] font-bold tracking-[0.3em] text-white">SYSTEM_STATUS</span>
                            <span className="text-[9px] font-mono text-cyan-400/70 uppercase">Online & Operational</span>
                        </div>
                    </div>
                </div>

                {/* Profile Info */}
                <div className="mb-8">
                    <div className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mb-1">Subject_ID</div>
                    <h3 className="text-white font-display text-2xl font-bold tracking-tight mb-1">Mouna Ouattara</h3>
                    <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                        <p className="text-gray-400 text-xs font-tech tracking-widest uppercase">Senior Data Scientist</p>
                    </div>
                </div>

                {/* Quick Metrics */}
                <div className="grid grid-cols-1 gap-4 mb-8">
                     <div className="bg-white/[0.02] p-4 border border-white/5 relative group/item overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-cyan-400/30 group-hover/item:bg-cyan-400 transition-colors"></div>
                        <div className="flex justify-between items-start mb-2">
                            <div className="text-[9px] text-white/30 font-mono uppercase tracking-[0.2em]">Core_Specialty</div>
                            <span className="text-[8px] font-mono text-cyan-400/50">98% Match</span>
                        </div>
                        <div className="text-white text-sm font-tech tracking-wider mb-3">NEURAL ARCHITECTURE & LLMs</div>
                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-cyan-400 w-[98%] animate-[shimmer_2s_infinite]"></div>
                        </div>
                     </div>
                     <div className="bg-white/[0.02] p-4 border border-white/5 relative group/item overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-purple-400/30 group-hover/item:bg-purple-400 transition-colors"></div>
                        <div className="flex justify-between items-start mb-2">
                            <div className="text-[9px] text-white/30 font-mono uppercase tracking-[0.2em]">Deployment_Zone</div>
                            <span className="text-[8px] font-mono text-purple-400/50">Active</span>
                        </div>
                        <div className="text-white text-sm font-tech tracking-wider mb-3">PARIS, FR (REMOTE_OK)</div>
                        <div className="flex gap-1">
                            {[1,2,3,4,5,6,7,8].map(i => (
                                <div key={i} className={`h-1 flex-1 ${i < 7 ? 'bg-purple-400' : 'bg-white/10'}`}></div>
                            ))}
                        </div>
                     </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-4">
                    <button className="group/btn relative w-full py-4 bg-white text-black font-tech text-[10px] font-extrabold uppercase tracking-[0.3em] hover:bg-cyan-400 transition-all duration-500 cut-corners-sm overflow-hidden">
                        <span className="relative z-10">Download_Dossier</span>
                        <div className="absolute inset-0 bg-black translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500"></div>
                        <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 z-20">GET_PDF.V2</span>
                    </button>
                    
                    <button onClick={onContactClick} className="w-full py-4 border border-white/10 text-white font-tech text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white/5 hover:border-white/30 transition-all duration-300 cut-corners-sm">
                        Establish_Link
                    </button>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
                    <div className="flex flex-col">
                        <p className="text-[8px] text-white/20 font-mono uppercase tracking-widest">Protocol</p>
                        <p className="text-[9px] text-white/40 font-mono">AES-256-GCM</p>
                    </div>
                    <div className="text-right">
                        <p className="text-[8px] text-white/20 font-mono uppercase tracking-widest">Hash</p>
                        <p className="text-[9px] text-white/40 font-mono">MO-2025-DS</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecruiterHUD;
