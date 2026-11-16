import React from 'react';
import { motion } from 'motion/react';
import { Zap } from 'lucide-react';

interface SplashLoaderProps {
  onFinish: () => void;
}

export const SplashLoader: React.FC<SplashLoaderProps> = ({ onFinish }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 0.95, duration: 0.35 }}
      onAnimationComplete={onFinish}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#090B1A] gaming-grid-bg px-6"
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="flex flex-col items-center text-center"
      >
        <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-600 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-[0_0_38px_rgba(139,92,246,0.65)] mb-5">
          <Zap className="w-10 h-10 text-amber-300" />
        </div>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          INFORMATIKA 8
        </h1>
        <p className="text-sm sm:text-base font-medium text-cyan-300 mt-1">
          LEVEL UP YOUR BRAIN!
        </p>

        {/* Animated Loading Bar */}
        <div className="w-56 h-2 rounded-full bg-slate-800/90 overflow-hidden mt-6 border border-slate-700">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.85, ease: 'easeInOut' }}
            className="h-full bg-gradient-to-r from-violet-500 via-cyan-400 to-pink-500"
          />
        </div>
        <span className="text-xs text-slate-400 mt-2.5">
          Menyiapkan dunia belajar digitalmu...
        </span>
      </motion.div>
    </motion.div>
  );
};
