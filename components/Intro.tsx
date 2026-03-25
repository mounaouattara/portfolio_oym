import React from 'react';
import { motion } from 'motion/react';
import { Database, Cpu, Layers, Activity } from 'lucide-react';

const Intro: React.FC = () => {
  return (
    <section className="py-32 px-12 relative overflow-hidden max-w-7xl mx-auto bg-clinical-white">
      <div className="flex items-center gap-6 mb-16">
        <div className="medical-label text-accent">Manifesto_v2.0</div>
        <div className="h-px w-24 bg-white/20 shadow-[0_0_10px_#00F0FF]" />
      </div>

      <div className="flex flex-col lg:flex-row gap-24 items-start mb-32">
        <div className="lg:w-1/2">
          <h2 className="text-7xl md:text-8xl font-bold leading-[0.9] tracking-tighter text-fg uppercase">
            The Art of <span className="text-accent italic">Structure</span> in Chaos.
          </h2>
        </div>
        
        <div className="lg:w-1/2 pt-8">
          <div className="clinical-glass glossy p-12 relative overflow-hidden border-l-4 border-accent">
            <div className="scan-line" />
            <p className="text-2xl md:text-3xl text-fg/60 font-bold italic leading-relaxed uppercase tracking-tight">
              "EVERY BIT OF INFORMATION IS A PARTICLE OF REALITY. MY ROLE IS TO ASSEMBLE THEM INTO COHERENT, ELEGANT, AND MEANINGFUL SYSTEMS."
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {[
          {
            title: "DEEP_ANALYSIS",
            desc: "DIVING INTO THE OCEAN OF DATA TO EXTRACT PEARLS OF KNOWLEDGE.",
            icon: <Database size={24} />
          },
          {
            title: "SYSTEMIC_DESIGN",
            desc: "CRAFTING ARCHITECTURES THAT ADAPT AND GROW WITH YOUR NEEDS.",
            icon: <Layers size={24} />
          },
          {
            title: "ETHICAL_AI",
            desc: "DEPLOYING INTELLIGENT MODELS THAT RESPECT AND AUGMENT HUMANITY.",
            icon: <Cpu size={24} />
          }
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="p-12 clinical-glass glossy group relative overflow-hidden"
          >
            <div className="scan-line" />
            
            <div className="w-12 h-12 rounded-full border border-fg/10 flex items-center justify-center text-fg/20 mb-12 group-hover:text-accent group-hover:border-accent/40 transition-all duration-700 group-hover:scale-110 glossy">
              {feature.icon}
            </div>
            <div className="medical-label text-accent mb-4">{feature.title}</div>
            <p className="text-sm text-fg/60 leading-relaxed font-mono uppercase tracking-tight">
              {feature.desc}
            </p>
            
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-2">
              <Activity size={12} className="text-accent animate-pulse" />
              <div className="text-[8px] font-mono text-fg/20 uppercase tracking-widest">System_Active</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Intro;
