const POINTS_KEY = 'user_points';
const LAST_VISIT_KEY = 'last_visit_date';

interface PointsData {
  total: number;
  lastUpdated: string;
  activities: {
    action: string;
    points: number;
    timestamp: string;
    description: string;
  }[];
}

// Points configuration
export const POINTS_CONFIG = {
  daily_visit: { points: 10, description: 'Daily visit bonus' },
  shared_idea: { points: 5, description: 'Shared an idea' },
  submitted_idea: { points: 15, description: 'Submitted a new idea' },
};

export const getPoints = (): number => {
  if (typeof window === 'undefined') return 0;
  const data = localStorage.getItem(POINTS_KEY);
  return data ? JSON.parse(data).total : 0;
};

export const addPoints = (action: keyof typeof POINTS_CONFIG, customPoints?: number): { newTotal: number; points: number } => {
  if (typeof window === 'undefined') return { newTotal: 0, points: 0 };
  
  const now = new Date().toISOString();
  const data: PointsData = localStorage.getItem(POINTS_KEY)
    ? JSON.parse(localStorage.getItem(POINTS_KEY) || '{}')
    : { total: 0, activities: [], lastUpdated: now };

  const points = customPoints || POINTS_CONFIG[action]?.points || 0;
  const description = POINTS_CONFIG[action]?.description || 'Completed an action';
  
  data.total += points;
  data.lastUpdated = now;
  data.activities.unshift({
    action,
    points,
    timestamp: now,
    description,
  });

  localStorage.setItem(POINTS_KEY, JSON.stringify(data));
  return { newTotal: data.total, points };
};

export const getActivityHistory = () => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(POINTS_KEY);
  return data ? JSON.parse(data).activities : [];
};

export const checkDailyVisit = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const today = new Date().toDateString();
  const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
  
  if (lastVisit !== today) {
    localStorage.setItem(LAST_VISIT_KEY, today);
    return true;
  }
  
  return false;
};

export const getPointsData = (): PointsData => {
  if (typeof window === 'undefined') return { total: 0, activities: [], lastUpdated: '' };
  const data = localStorage.getItem(POINTS_KEY);
  return data ? JSON.parse(data) : { total: 0, activities: [], lastUpdated: '' };
};
