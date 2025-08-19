'use client';

import { Leaderboard } from '@/components/leaderboard/leaderboard';

export default function LeaderboardPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Leaderboard</h1>
        <p className="text-gray-600 mb-8">
          Compete with others and see who&apos;s on top!
        </p>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <Leaderboard />
        </div>
        
        <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
          <h2 className="text-xl font-semibold text-blue-800 mb-3">How to Earn Points</h2>
          <ul className="space-y-2">
            <li className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                <span className="text-sm font-medium">1</span>
              </div>
              <span>Daily Visit: <span className="font-medium">+10 points</span></span>
            </li>
            <li className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                <span className="text-sm font-medium">2</span>
              </div>
              <span>Share an Idea: <span className="font-medium">+5 points</span></span>
            </li>
            <li className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                <span className="text-sm font-medium">3</span>
              </div>
              <span>Submit an Idea: <span className="font-medium">+15 points</span></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
