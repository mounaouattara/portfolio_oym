import React from 'react';
import { motion } from 'motion/react';
import { TOOLKIT } from '../constants';

const ToolkitSection: React.FC = () => {
  return (
    <div className="py-48 w-full flex flex-col items-center max-w-7xl mx-auto px-10 bg-bg">
      <div className="mb-32 w-full">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
          <div className="max-w-4xl">
            <div className="flex items-center gap-6 mb-12">
              <span className="text-accent font-mono text-[10px] font-bold tracking-[0.6em] uppercase">System_Modules</span>
              <div className="h-[1px] w-24 bg-accent/20" />
            </div>
            <h2 className="text-7xl md:text-9xl font-mono font-bold text-fg tracking-tighter leading-[0.9] uppercase">
              CORE <span className="text-accent italic font-light">PROTOCOLS</span>
            </h2>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-24">
        {TOOLKIT.map((category, idx) => (
          <div key={category.category} className="w-full">
            <div className="flex items-center gap-8 mb-16">
              <span className="text-accent font-mono text-[12px] font-bold">[{idx + 1}]</span>
              <h3 className="text-4xl font-mono font-bold text-fg tracking-tight uppercase tracking-widest">
                {category.category}
              </h3>
            </div>

            <div className="flex flex-wrap gap-16 justify-center lg:justify-start">
              {category.tools.map((tool, toolIdx) => (
                <motion.div
                  key={tool.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: toolIdx * 0.1 }}
                  className="toolkit-node group relative"
                >
                  <div className="relative z-10 flex flex-col items-center justify-center">
                    <span className="text-accent font-mono text-[14px] font-bold mb-1">
                      {tool.level}%
                    </span>
                    <div className="toolkit-label group-hover:opacity-100 transition-opacity duration-500 font-mono text-[10px] uppercase tracking-widest">
                      {tool.name}
                    </div>
                  </div>
                  
                  {/* Decorative Circle */}
                  <div className="absolute inset-0 border border-accent/10 rounded-full group-hover:border-accent/40 transition-all duration-700" />
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10 + toolIdx * 2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[-10px] border-t border-accent/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  
                  {/* HUD Corners for the node */}
                  <div className="absolute -inset-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="hud-corner hud-corner-tl !w-2 !h-2" />
                    <div className="hud-corner hud-corner-br !w-2 !h-2" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolkitSection;
