import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

interface ScrollProgressProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  label: string;
}

const ScrollProgress: React.FC<ScrollProgressProps> = ({ containerRef, label }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const checkScroll = () => {
      if (containerRef.current) {
        const { scrollHeight, clientHeight } = containerRef.current;
        setIsVisible(scrollHeight > clientHeight);
      }
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [containerRef]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[110] px-6 py-4 pointer-events-none">
      <div className="max-w-7xl mx-auto flex flex-col items-end gap-2">
        <div className="flex items-center gap-3">
          <span className="text-[9px] font-mono text-sand/60 uppercase tracking-[0.3em]">
            {label}
          </span>
          <div className="w-32 h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-sand shadow-[0_0_10px_rgba(232,209,167,0.5)]"
              style={{ scaleX, transformOrigin: "0%" }}
            />
          </div>
        </div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-[8px] font-mono text-sand/40 uppercase tracking-widest"
        >
          Scroll pour explorer ↓
        </motion.div>
      </div>
    </div>
  );
};

export default ScrollProgress;
