'use client';

import { Trophy, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getPointsData } from '@/lib/points';

type PointChange = {
  id: number;
  points: number;
  timestamp: number;
};

export function PointsDisplay() {
  const [points, setPoints] = useState(0);
  const [recentChanges, setRecentChanges] = useState<PointChange[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  // Clean up old point changes
  useEffect(() => {
    if (recentChanges.length === 0) return;
    
    const timer = setTimeout(() => {
      setRecentChanges(prev => 
        prev.filter(change => Date.now() - change.timestamp < 3000)
      );
    }, 1000);

    return () => clearTimeout(timer);
  }, [recentChanges]);

  // Update points when storage changes
  useEffect(() => {
    const updatePoints = () => {
      const data = getPointsData();
      const oldPoints = points;
      const newPoints = data.total;
      
      if (newPoints > oldPoints) {
        // Add point gain animation
        setRecentChanges(prev => [
          ...prev,
          {
            id: Date.now(),
            points: newPoints - oldPoints,
            timestamp: Date.now()
          }
        ]);
      }
      
      setPoints(newPoints);
    };

    // Initial load
    updatePoints();

    // Listen for storage changes
    window.addEventListener('storage', updatePoints);

    // Cleanup
    return () => {
      window.removeEventListener('storage', updatePoints);
    };
  }, [points]);

  return (
    <div 
      className="relative flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-full border border-yellow-100 shadow-sm hover:shadow transition-shadow duration-200">
        <Trophy className="w-4 h-4 text-amber-500" />
        <span className="text-sm font-medium text-amber-800">{points}</span>
      </div>
      
      {/* Animated point gains */}
      <AnimatePresence>
        {recentChanges.map(change => (
          <motion.div
            key={change.id}
            initial={{ opacity: 1, y: 0, x: -16 }}
            animate={{ opacity: 0, y: -20, x: -16 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute -right-2 -top-2 bg-green-500 text-white text-xs font-bold rounded-full px-2 py-0.5 flex items-center z-10 shadow-md"
          >
            <Sparkles className="w-3 h-3 mr-0.5" />
            +{change.points}
          </motion.div>
        ))}
      </AnimatePresence>
      
      {/* Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 right-0 bg-white text-xs text-gray-600 p-2 rounded-md shadow-lg border border-gray-100 w-48 z-20"
          >
            <div className="font-medium text-gray-900 mb-1">Your Points</div>
            <p className="text-xs text-gray-500">Earn more by being active!</p>
            <div className="mt-2 pt-2 border-t border-gray-100">
              <div className="flex justify-between">
                <span>Daily Visit:</span>
                <span className="font-medium">+10</span>
              </div>
              <div className="flex justify-between">
                <span>Share Idea:</span>
                <span className="font-medium">+5</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
