'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';
import { checkDailyVisit, addPoints, getPointsData, POINTS_CONFIG } from '@/lib/points';

export function usePoints() {
  useEffect(() => {
    // Check for daily visit bonus
    if (checkDailyVisit()) {
      const { points } = addPoints('daily_visit');
      
      toast.success('Daily Bonus!', {
        description: `You earned ${points} points for visiting today!`,
        duration: 3000,
        action: {
          label: 'View Points',
          onClick: () => {
            // You can navigate to a points history page here
            console.log('Navigating to points history');
          },
        },
      });
    }
  }, []);

  const awardPoints = (action: keyof typeof POINTS_CONFIG, customPoints?: number) => {
    const { newTotal, points } = addPoints(action, customPoints);
    
    toast.success('Points Earned!', {
      description: `+${points} points! Total: ${newTotal}`,
      duration: 3000,
    });
    
    return { newTotal, points };
  };

  return {
    points: getPointsData().total,
    awardPoints,
    getPointsData,
  };
}
