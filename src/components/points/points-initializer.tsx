'use client';

import { usePoints } from '@/hooks/use-points';

export function PointsInitializer() {
  // This will trigger the daily visit check in the usePoints hook
  usePoints();
  
  // This component doesn't render anything, it just initializes the points system
  return null;
}
