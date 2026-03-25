import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  isFadingOut: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isFadingOut }) => {
  const [status, setStatus] = useState("Initialisation...");

  useEffect(() => {
    const sequence = [
      "Chargement des archives...",
      "Synchronisation des données...",
      "Optimisation de l'interface...",
      "Prêt pour le déploiement."
    ];

    sequence.forEach((text, index) => {
      setTimeout(() => {
        setStatus(text);
      }, index * 500);
    });
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 bg-cocoa z-[9999] flex flex-col items-center justify-center"
    >
      <div className="relative flex flex-col items-center">
        {/* Logo Animation */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-20 h-20 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl flex items-center justify-center text-white font-bold text-4xl shadow-2xl mb-12"
        >
          M
        </motion.div>

        {/* Loading Bar */}
        <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden mb-6">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="h-full bg-sand rounded-full shadow-[0_0_10px_rgba(232,209,167,0.5)]"
          />
        </div>

        {/* Status Text */}
        <div className="flex flex-col items-center gap-4">
          <motion.span 
            key={status}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-bold text-white/40 uppercase tracking-[0.4em]"
          >
            {status}
          </motion.span>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-12">
        <span className="text-[8px] font-bold text-white/10 uppercase tracking-[0.8em]">
          Mouna Ouattara // Portfolio v4.0
        </span>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
