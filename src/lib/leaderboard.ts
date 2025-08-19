// This is a mock leaderboard service
// In a real app, this would fetch from a backend

export interface LeaderboardEntry {
  id: string;
  name: string;
  points: number;
  avatar: string;
  rank: number;
}

// Generate random user data for the leaderboard
const generateMockUsers = (count: number): LeaderboardEntry[] => {
  const names = [
    'Alex Johnson', 'Taylor Swift', 'Jamie Smith', 'Jordan Lee', 'Casey Kim', 
    'Riley Park', 'Morgan Taylor', 'Drew Wilson', 'Sam Chen', 'Jessie Brown'
  ];
  
  const avatars = [
    '👨‍💻', '👩‍🎨', '🧑‍🍳', '👨‍🔬', '👩‍🚀', '🧑‍🎤', '👨‍🎓', '👩‍💼', '🧑‍🔧', '👨‍🚒'
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `user-${i + 1}`,
    name: names[i % names.length],
    points: Math.floor(Math.random() * 1000) + 100,
    avatar: avatars[i % avatars.length],
    rank: i + 1
  })).sort((a, b) => b.points - a.points)
    .map((user, index) => ({ ...user, rank: index + 1 }));
};

export const getLeaderboard = (): Promise<LeaderboardEntry[]> => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateMockUsers(10));
    }, 500); // Simulate network delay
  });
};

// Get current user's position in leaderboard
export const getUserRank = (): Promise<LeaderboardEntry> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 'current-user',
        name: 'You',
        points: JSON.parse(localStorage.getItem('user_points') || '{}').total || 0,
        avatar: '😎',
        rank: Math.floor(Math.random() * 5) + 1 // Random rank for demo
      });
    }, 500);
  });
};
