'use client';

import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Trophy, Crown, Award, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getLeaderboard, getUserRank, LeaderboardEntry } from '@/lib/leaderboard';

export function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [userRank, setUserRank] = useState<LeaderboardEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [leaderboardData, userRankData] = await Promise.all([
          getLeaderboard(),
          getUserRank()
        ]);
        setLeaderboard(leaderboardData);
        setUserRank(userRankData);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-500 fill-yellow-500" />;
    if (rank === 2) return <Award className="w-5 h-5 text-gray-400 fill-gray-400" />;
    if (rank === 3) return <Award className="w-5 h-5 text-amber-600 fill-amber-600" />;
    return <span className="text-sm font-medium text-gray-500">{rank}</span>;
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center p-4 bg-white rounded-lg shadow">
            <Skeleton className="w-8 h-8 rounded-full mr-4" />
            <div className="flex-1">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-3 w-1/2" />
            </div>
            <Skeleton className="w-12 h-6" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* User's rank card */}
      {userRank && (
        <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100 mb-6">
          <h3 className="font-medium text-blue-800 mb-3 flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-amber-500" />
            Your Rank
          </h3>
          <div className="flex items-center p-3 bg-white rounded-lg shadow-sm">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold text-lg mr-4">
              {userRank.rank}
            </div>
            <div className="flex-1">
              <div className="font-medium">{userRank.name}</div>
              <div className="text-sm text-gray-500">{userRank.points} points</div>
            </div>
            <div className="text-blue-600 font-bold">
              {userRank.rank <= 3 ? getRankBadge(userRank.rank) : `#${userRank.rank}`}
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard */}
      <div className="space-y-2">
        <h3 className="font-medium text-gray-900 mb-2">Top Performers</h3>
        {leaderboard.map((entry) => (
          <div 
            key={entry.id}
            className={cn(
              "flex items-center p-3 rounded-lg transition-all duration-200",
              entry.id === 'current-user' 
                ? 'bg-blue-50 border border-blue-100' 
                : 'bg-white hover:bg-gray-50 border border-gray-100'
            )}
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 font-medium text-gray-700 mr-3">
              {entry.rank <= 3 ? getRankBadge(entry.rank) : entry.rank}
            </div>
            <div className="text-2xl mr-3">{entry.avatar}</div>
            <div className="flex-1">
              <div className="font-medium">
                {entry.name} {entry.id === 'current-user' && '(You)'}
              </div>
              <div className="text-sm text-gray-500">{entry.points} points</div>
            </div>
            {entry.rank <= 3 && (
              <div className="text-yellow-500">
                {entry.rank === 1 && '🥇'}
                {entry.rank === 2 && '🥈'}
                {entry.rank === 3 && '🥉'}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
