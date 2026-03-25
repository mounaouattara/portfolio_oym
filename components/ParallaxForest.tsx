import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface ParallaxForestProps {
  mousePos: { x: number; y: number };
}

const ParallaxForest: React.FC<ParallaxForestProps> = ({ mousePos }) => {
  const calcX = (factor: number) => (mousePos.x - window.innerWidth / 2) * factor;
  const calcY = (factor: number) => (mousePos.y - window.innerHeight / 2) * factor;

  const layers = [
    { src: 'input_file_7.png', factor: 0.002, zIndex: 0, scale: 1.1 },  // Sky
    { src: 'input_file_0.png', factor: 0.005, zIndex: 1, scale: 1.1 },  // Clouds 1
    { src: 'input_file_1.png', factor: 0.008, zIndex: 2, scale: 1.1 },  // Clouds 2
    { src: 'input_file_2.png', factor: 0.012, zIndex: 3, scale: 1.1 },  // Clouds 3
    { src: 'input_file_3.png', factor: 0.015, zIndex: 4, scale: 1.1 },  // Clouds 4
    { src: 'input_file_4.png', factor: 0.025, zIndex: 5, scale: 1.1 },  // Mountains Back
    { src: 'input_file_5.png', factor: 0.04, zIndex: 6, scale: 1.1 },   // Mountains Front
    { src: 'input_file_6.png', factor: 0.08, zIndex: 7, scale: 1.1 },   // Foreground Hill
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none bg-[#7FB3D5]">
      {layers.map((layer, index) => (
        <motion.div
          key={index}
          className="absolute inset-0 bg-bottom bg-no-repeat"
          style={{
            backgroundImage: `url(${layer.src})`,
            backgroundSize: 'cover',
            zIndex: layer.zIndex,
            x: calcX(layer.factor),
            y: calcY(layer.factor),
            scale: layer.scale,
            imageRendering: 'pixelated',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: index * 0.1 }}
        />
      ))}
      
      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 z-10 opacity-10 pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

export default ParallaxForest;
