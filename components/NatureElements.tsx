import React from 'react';
import { motion } from 'motion/react';

export const AnimatedTree: React.FC<{ x: string; y: string; scale?: number; delay?: number }> = ({ x, y, scale = 1, delay = 0 }) => {
  return (
    <motion.div 
      className="absolute pointer-events-none z-0"
      style={{ left: x, top: y, scale }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 1.5 }}
    >
      <svg width="200" height="300" viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Trunk */}
        <motion.path 
          d="M100 300C100 300 90 200 100 150" 
          stroke="currentColor" 
          strokeWidth="4" 
          strokeLinecap="round"
          animate={{ d: ["M100 300C100 300 90 200 100 150", "M100 300C100 300 95 200 105 150", "M100 300C100 300 90 200 100 150"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Branches */}
        <motion.path 
          d="M100 150C100 150 60 100 40 80" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round"
          animate={{ rotate: [0, 2, -2, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path 
          d="M100 150C100 150 140 100 160 80" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round"
          animate={{ rotate: [0, -2, 2, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path 
          d="M100 180C100 180 70 140 50 130" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round"
          animate={{ rotate: [0, 3, -3, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path 
          d="M100 180C100 180 130 140 150 130" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round"
          animate={{ rotate: [0, -3, 3, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Leaves / Foliage as moving lines */}
        {[...Array(12)].map((_, i) => (
          <motion.path
            key={i}
            d={`M${80 + Math.random() * 40} ${50 + Math.random() * 100} Q${100} ${100} ${70 + Math.random() * 60} ${30 + Math.random() * 50}`}
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.4"
            animate={{ 
              pathLength: [0, 1, 0],
              pathOffset: [0, 0.2, 0.5]
            }}
            transition={{ 
              duration: 3 + Math.random() * 2, 
              repeat: Infinity, 
              delay: Math.random() * 2 
            }}
          />
        ))}
      </svg>
    </motion.div>
  );
};

export const River: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-20">
      <svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <motion.path
          d="M-100 800 Q 250 750 500 800 T 1100 750"
          fill="none"
          stroke="currentColor"
          strokeWidth="40"
          strokeOpacity="0.3"
          animate={{ 
            d: [
              "M-100 800 Q 250 750 500 800 T 1100 750",
              "M-100 820 Q 250 770 500 820 T 1100 770",
              "M-100 800 Q 250 750 500 800 T 1100 750"
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Ripples */}
        {[...Array(5)].map((_, i) => (
          <motion.path
            key={i}
            d={`M${-100 + i * 200} ${800 + i * 10} Q ${250 + i * 200} ${750} ${500 + i * 200} ${800}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.2"
            animate={{ 
              x: [0, 1000],
              opacity: [0, 0.5, 0]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              delay: i * 1.5,
              ease: "linear"
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export const Grass: React.FC<{ count?: number }> = ({ count = 20 }) => {
  return (
    <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none z-0 flex items-end justify-around px-10 overflow-hidden opacity-30">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="w-[2px] bg-current origin-bottom"
          style={{ height: `${20 + Math.random() * 40}px` }}
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ 
            duration: 2 + Math.random() * 2, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: Math.random() * 2
          }}
        />
      ))}
    </div>
  );
};

export const NatureCore: React.FC = () => {
  return (
    <div className="relative w-64 h-64 md:w-[450px] md:h-[450px] flex items-center justify-center">
      {/* Stylized Lotus / Flower */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-64 md:w-48 md:h-80 border border-current rounded-[100%] opacity-20"
            style={{ transform: `rotate(${i * 45}deg) translateY(-20%)` }}
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}
      </motion.div>
      
      {/* Central Seed / Life Source */}
      <motion.div 
        className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-current flex items-center justify-center relative z-10"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="text-center">
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase opacity-40">Life_Source</span>
          <div className="text-xl md:text-2xl font-bold tracking-tighter uppercase">NATURE</div>
        </div>
        
        {/* Orbits */}
        <motion.div 
          className="absolute inset-[-20px] border border-dashed border-current opacity-20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
      
      {/* Floating Petals / Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-current rounded-full"
          initial={{ 
            x: (Math.random() - 0.5) * 100, 
            y: (Math.random() - 0.5) * 100,
            opacity: 0 
          }}
          animate={{ 
            x: (Math.random() - 0.5) * 600, 
            y: (Math.random() - 0.5) * 600,
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0]
          }}
          transition={{ 
            duration: 5 + Math.random() * 5, 
            repeat: Infinity, 
            delay: Math.random() * 5 
          }}
        />
      ))}
    </div>
  );
};
