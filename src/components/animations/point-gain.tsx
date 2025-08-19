'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

type PointGainProps = {
  points: number;
  message?: string;
  className?: string;
};

export function PointGain({ points, message, className }: PointGainProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000); // Auto-dismiss after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{
            type: 'spring',
            damping: 20,
            stiffness: 300,
          }}
          className={cn(
            'fixed bottom-8 right-8 z-50 bg-white p-4 rounded-xl shadow-lg border border-gray-200',
            'flex items-center space-x-3',
            className
          )}
          onClick={() => setIsVisible(false)}
        >
          <div className="relative">
            <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute -right-2 -top-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
            >
              +{points}
            </motion.div>
          </div>
          <div>
            <p className="font-medium text-gray-900">Points Earned!</p>
            <p className="text-sm text-gray-600">
              {message || `You've earned ${points} points`}
            </p>
          </div>
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <CheckCircle2 className="w-5 h-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Floating point gain animation for in-place feedback
export function FloatingPointGain({ points, className }: { points: number; className?: string }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={cn(
        'absolute -top-8 right-0 bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded-full',
        'flex items-center space-x-1',
        className
      )}
    >
      <Sparkles className="w-3 h-3" />
      <span>+{points}</span>
    </motion.div>
  );
}
