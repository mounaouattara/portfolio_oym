import React from 'react';
import { motion } from 'motion/react';
import { TIMELINE_DATA } from '../constants';

const Timeline: React.FC = () => {
  return (
    <div className="py-48 w-full flex flex-col items-center max-w-7xl mx-auto px-10 bg-transparent relative overflow-hidden">
      <div className="mb-32 w-full text-center">
        <div className="flex items-center justify-center gap-6 mb-12">
          <div className="h-[1px] w-24 bg-black/20" />
          <span className="text-black font-mono text-[10px] font-bold tracking-[0.6em] uppercase">Temporal_Sequence</span>
          <div className="h-[1px] w-24 bg-black/20" />
        </div>
        <h2 className="text-7xl md:text-9xl font-mono font-bold text-fg tracking-tighter leading-[0.9] uppercase">
          CAREER <span className="text-black italic font-light">TIMELINE</span>
        </h2>
      </div>

      <div className="relative w-full max-w-4xl">
        {/* Central Vertical Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-black/20 -translate-x-1/2 z-0" />

        {/* Central Core Visual (Mechanical/Neural) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none opacity-20">
          <div className="w-96 h-96 rounded-full border border-black/30 flex items-center justify-center animate-spin-slow">
            <div className="w-80 h-80 rounded-full border border-dashed border-black/20 flex items-center justify-center animate-reverse-spin">
              <div className="w-64 h-64 rounded-full border border-black/10 flex items-center justify-center">
                 <div className="w-32 h-32 bg-black/5 rounded-full blur-3xl animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-32 relative z-20">
          {TIMELINE_DATA.map((event, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: idx * 0.1 }}
              className={`flex items-center w-full ${event.side === 'left' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Content Side */}
              <div className={`w-1/2 ${event.side === 'left' ? 'pr-24 text-right' : 'pl-24 text-left'}`}>
                <div className="flex flex-col gap-2">
                  <span className="text-black font-mono text-[10px] font-bold tracking-widest uppercase opacity-60">
                    {event.title}
                  </span>
                  <p className="text-sm text-fg/60 font-mono leading-relaxed max-w-xs inline-block">
                    {event.description}
                  </p>
                </div>
              </div>

              {/* Center Circle */}
              <div className="relative flex items-center justify-center">
                <div className="w-24 h-24 rounded-full border border-black/30 bg-bg flex items-center justify-center group hover:border-black transition-colors duration-500">
                  <span className="text-lg font-mono font-bold text-fg group-hover:text-black transition-colors">
                    {event.year}
                  </span>
                  {/* Decorative Orbits */}
                  <div className="absolute inset-0 rounded-full border border-dashed border-black/10 animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>

              {/* Empty Side for Spacing */}
              <div className="w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
