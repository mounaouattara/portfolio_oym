import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Terminal, Cpu, Database, Layers, Zap } from 'lucide-react';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <section ref={containerRef} className="min-h-screen flex flex-col justify-center px-12 relative overflow-hidden bg-clinical-white">
      <motion.div 
        style={{ opacity, scale }}
        className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="medical-label mb-8 text-fg/40">SUBJECT_ID: MOUNA_OUATTARA_02</div>
          
          <h1 className="text-[10vw] lg:text-[12rem] font-bold tracking-tighter leading-[0.85] mb-12 text-fg uppercase">
            PROTO<br />
            <span className="text-accent glossy px-6 inline-block">TYPE</span>
          </h1>
          
          <div className="flex flex-col gap-8 max-w-xl">
            <div className="clinical-glass p-8 border-l-4 border-accent relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 text-[8px] font-mono text-fg/20">REF_2839061374</div>
              <p className="text-lg text-fg/70 leading-relaxed font-mono">
                [SYSTEM_LOG]: Initializing high-performance data processing unit. 
                Specialization: Machine Learning, MLOps, and Biomechanical Data Architecture.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              {[
                { label: 'CORE_TEMP', val: '36.5°C' },
                { label: 'SYNC_RATE', val: '99.9%' },
                { label: 'PHASE', val: '02_B' }
              ].map((stat, i) => (
                <div key={i} className="clinical-glass p-4 border-t border-white/40">
                  <div className="text-[9px] font-mono text-fg/30 mb-1 uppercase tracking-widest">{stat.label}</div>
                  <div className="text-xl font-mono text-fg font-bold">{stat.val}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-6 mt-4">
              <motion.button
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 py-5 clinical-glass glossy text-accent font-mono text-xs tracking-[0.4em] uppercase border border-accent/20 hover:border-accent/50 transition-all text-center"
              >
                Initialize_Sequence
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02, x: -5 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-5 clinical-glass text-fg/40 font-mono text-xs tracking-[0.4em] uppercase border border-white/20 hover:text-fg transition-all text-center"
              >
                LOGS
              </motion.button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-square flex items-center justify-center"
        >
          {/* Biomechanical Core Visual */}
          <div className="absolute inset-0 clinical-glass rounded-full opacity-10 animate-pulse blur-3xl" />
          
          <div className="w-full h-full rounded-full border border-white/20 flex items-center justify-center relative glossy shadow-2xl">
            {/* Inner Rotating Rings */}
            <div className="absolute inset-12 border-2 border-accent/10 rounded-full animate-[spin_30s_linear_infinite]" />
            <div className="absolute inset-24 border border-fg/5 rounded-full animate-[spin_20s_linear_reverse_infinite]" />
            
            <div className="w-64 h-64 rounded-full clinical-glass flex items-center justify-center relative glossy border-white/50">
              <div className="absolute inset-0 bg-accent/5 animate-pulse rounded-full" />
              <div className="w-32 h-32 rounded-full bg-white/40 flex items-center justify-center glossy border border-white/60 shadow-inner">
                <Cpu size={64} strokeWidth={1} className="text-accent animate-pulse" />
              </div>
              
              {/* Floating Data Nodes */}
              {[Terminal, Database, Layers, Zap].map((Icon, i) => (
                <motion.div
                  key={i}
                  className="absolute w-12 h-12 clinical-glass rounded-full flex items-center justify-center text-accent glossy border-white/60 shadow-lg"
                  animate={{
                    y: [0, -30, 0],
                    x: [0, 15, 0],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 6 + i,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{
                    top: `${10 + i * 25}%`,
                    right: i % 2 === 0 ? '-10%' : 'auto',
                    left: i % 2 !== 0 ? '-10%' : 'auto',
                  }}
                >
                  <Icon size={20} strokeWidth={1.5} />
                </motion.div>
              ))}
            </div>
            
            {/* HUD Scanning Line */}
            <motion.div 
              animate={{ top: ['0%', '100%', '0%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 h-[2px] bg-accent/30 shadow-[0_0_20px_rgba(0,240,255,0.5)] z-20 pointer-events-none"
            />
          </div>
          
          {/* Medical Label Overlays */}
          <div className="absolute -top-12 -right-12 medical-label text-[9px] text-fg/20 text-right">
            REF_ID: 2839061374<br />
            STATUS: PROTOTYPE_PHASE_02<br />
            LOCATION: CLINICAL_VOID_01
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative Background Elements */}
      <div className="absolute top-1/4 -left-24 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
};

export default Hero;
