import React from 'react';
import { motion } from 'motion/react';

interface RoboticTreeProps {
  className?: string;
  height?: number;
  color?: string;
  delay?: number;
  scale?: number;
}

const RoboticTree: React.FC<RoboticTreeProps> = ({ 
  className = "", 
  height = 400, 
  color = "currentColor",
  delay = 0,
  scale = 1
}) => {
  return (
    <div className={`relative ${className}`} style={{ height, transform: `scale(${scale})` }}>
      <svg 
        viewBox="0 0 200 400" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        {/* Glow Filter */}
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Glitchy Background Aura */}
        <motion.circle
          cx="100" cy="200" r="150"
          stroke={color}
          strokeWidth="0.2"
          opacity="0.05"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.1, 0.05],
            x: [0, 2, -2, 0]
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        {/* Trunk - Main Structure */}
        <motion.path
          d="M100 400 V150"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="square"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay, ease: "easeOut" }}
        />
        
        {/* Trunk - Internal Circuitry */}
        <motion.path
          d="M98 380 V160 M102 380 V160"
          stroke={color}
          strokeWidth="0.5"
          opacity="0.3"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: delay + 0.2 }}
        />

        {/* Trunk Joints / Mechanical Segments */}
        {[350, 300, 250, 200].map((y, i) => (
          <g key={`joint-${i}`}>
            <motion.rect
              x="92" y={y} width="16" height="2"
              fill={color}
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: delay + 0.5 + i * 0.2 }}
            />
            <motion.circle
              cx="100" cy={y + 1} r="1.5"
              fill={color}
              filter="url(#glow)"
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
            />
          </g>
        ))}

        {/* Branches - Left (Angular/Robotic) */}
        <motion.path
          d="M100 320 L60 280 V220 L40 200"
          stroke={color}
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: delay + 0.8 }}
        />
        <motion.path
          d="M100 220 L50 170 H20"
          stroke={color}
          strokeWidth="1.5"
          strokeDasharray="4 2"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: delay + 1.2 }}
        />
        {/* Additional Small Branch */}
        <motion.path
          d="M60 250 L40 230"
          stroke={color}
          strokeWidth="1"
          opacity="0.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: delay + 1.5 }}
        />

        {/* Branches - Right (Angular/Robotic) */}
        <motion.path
          d="M100 270 L140 230 V170 L160 150"
          stroke={color}
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: delay + 1 }}
        />
        <motion.path
          d="M100 170 L150 120 H180"
          stroke={color}
          strokeWidth="1.5"
          strokeDasharray="4 2"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: delay + 1.4 }}
        />
        {/* Additional Small Branch */}
        <motion.path
          d="M140 200 L160 180"
          stroke={color}
          strokeWidth="1"
          opacity="0.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: delay + 1.7 }}
        />

        {/* Top Branch - Main Processor Path */}
        <motion.path
          d="M100 150 L100 60 L130 30"
          stroke={color}
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: delay + 1.6 }}
        />
        <motion.path
          d="M100 100 L80 80"
          stroke={color}
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: delay + 1.8 }}
        />

        {/* Data Nodes (Leaves) - Hexagonal / Square Shapes */}
        {[
          { x: 20, y: 170, type: 'square' },
          { x: 40, y: 200, type: 'circle' },
          { x: 40, y: 230, type: 'hex' },
          { x: 180, y: 120, type: 'square' },
          { x: 160, y: 150, type: 'circle' },
          { x: 160, y: 180, type: 'hex' },
          { x: 130, y: 30, type: 'hex' },
          { x: 100, y: 60, type: 'square' },
          { x: 80, y: 80, type: 'circle' }
        ].map((node, i) => (
          <g key={`node-${i}`}>
            {node.type === 'square' ? (
              <motion.rect
                x={node.x - 4} y={node.y - 4} width="8" height="8"
                fill={color}
                initial={{ scale: 0, rotate: 45 }}
                whileInView={{ scale: 1, rotate: 45 }}
                viewport={{ once: true }}
                transition={{ type: "spring", delay: delay + 2 + i * 0.1 }}
              />
            ) : node.type === 'hex' ? (
              <motion.path
                d={`M${node.x} ${node.y-6} L${node.x+5} ${node.y-3} V${node.y+3} L${node.x} ${node.y+6} L${node.x-5} ${node.y+3} V${node.y-3} Z`}
                fill={color}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", delay: delay + 2 + i * 0.1 }}
              />
            ) : (
              <motion.circle
                cx={node.x} cy={node.y} r="4"
                fill={color}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", delay: delay + 2 + i * 0.1 }}
              />
            )}
            
            {/* Pulsing Aura */}
            <motion.circle
              cx={node.x} cy={node.y} r="12"
              stroke={color}
              strokeWidth="0.5"
              opacity="0.2"
              initial={{ scale: 0.8 }}
              animate={{ scale: [0.8, 1.5, 0.8], opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
            />
          </g>
        ))}

        {/* Data Stream Particles */}
        {[0, 1, 2, 3, 4].map((p) => (
          <motion.circle
            key={`particle-${p}`}
            r="1.5"
            fill={color}
            filter="url(#glow)"
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: "100%" }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "linear",
              delay: delay + p * 1.2 
            }}
            style={{ 
              offsetPath: `path('M100 400 V150 L100 60 L${p % 2 === 0 ? '130 30' : '80 80'}')`,
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default RoboticTree;
