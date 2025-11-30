import { Trophy, Medal, Award, TrendingUp, Crown, Zap } from 'lucide-react';
import { leaderboard, users, getUserById } from '../data/mock';
import { useMemo } from 'react';

interface LeaderboardUser {
  rank: number;
  name: string;
  title: string;
  points: number;
  level: number;
  avatar: string;
  change?: number; // +5 means up 5 positions, -3 means down 3
}

// Transform leaderboard from JSON to component format
const transformLeaderboard = (): LeaderboardUser[] => {
  return leaderboard.thisWeek.map((entry) => {
    const user = getUserById(entry.userId);
    if (!user) {
      return {
        rank: entry.rank,
        name: 'Bilinmeyen Kullanıcı',
        title: '',
        points: entry.points,
        level: 0,
        avatar: '',
        change: entry.change,
      };
    }

    // Map role to title
    let title = user.role || '';
    if (user.role === 'konya_bilgesi') title = 'Konya Bilgesi';
    else if (user.role === 'seyyah') title = 'Seyyah';
    else if (user.role === 'gezgin') title = 'Gezgin';
    else if (user.role === 'kasif_meraklisi') title = 'Kaşif Meraklısı';

    return {
      rank: entry.rank,
      name: user.displayName || user.username,
      title,
      points: entry.points,
      level: user.level || 0,
      avatar: user.avatar,
      change: entry.change,
    };
  });
};

export function Leaderboard() {
  const leaderboardData = useMemo(() => transformLeaderboard(), []);

  return (
    <div className="flex-1 min-w-0">
      {/* Single Combined Card */}
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        {/* Header */}
        <div className="p-4 lg:p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent rounded-lg">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="mb-0">Haftanın Liderleri</h2>
              <p className="text-xs text-muted-foreground">
                23-30 Kasım 2025
              </p>
            </div>
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="p-6 lg:p-8 border-b border-border">
          <div className="flex items-end justify-center gap-6 lg:gap-10">
            {/* 2nd Place - Left */}
            <div className="flex flex-col items-center flex-1 max-w-[160px]">
              <div className="relative mb-3">
                <img
                  src={leaderboardData[1].avatar}
                  alt={leaderboardData[1].name}
                  className="w-20 h-20 lg:w-24 lg:h-24 rounded-full object-cover border-[3px] border-gray-300"
                />
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                  <span className="text-white text-sm">2</span>
                </div>
              </div>
              <h4 className="text-sm mb-2 text-center truncate w-full">
                {leaderboardData[1].name}
              </h4>
              <div className="bg-gradient-to-r from-emerald-400 to-teal-400 text-white px-3 py-1 rounded-full text-xs mb-3 shadow-sm">
                {leaderboardData[1].points.toLocaleString()} XP
              </div>
              <div className="w-full bg-gradient-to-b from-gray-100 to-gray-200 rounded-t-lg pt-14 pb-5 flex items-center justify-center border border-gray-200">
                <span className="text-5xl text-gray-300">2</span>
              </div>
            </div>

            {/* 1st Place - Center (Taller) */}
            <div className="flex flex-col items-center flex-1 max-w-[160px] -mt-6">
              <div className="relative mb-3">
                <img
                  src={leaderboardData[0].avatar}
                  alt={leaderboardData[0].name}
                  className="w-24 h-24 lg:w-28 lg:h-28 rounded-full object-cover border-[3px] border-yellow-400 shadow-md"
                />
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-9 h-9 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                  <Crown className="w-4 h-4 text-white" />
                </div>
              </div>
              <h4 className="text-sm mb-2 text-center truncate w-full">
                {leaderboardData[0].name}
              </h4>
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 rounded-full text-xs mb-3 shadow-sm">
                {leaderboardData[0].points.toLocaleString()} XP
              </div>
              <div className="w-full bg-gradient-to-b from-yellow-50 to-yellow-100 rounded-t-lg pt-20 pb-5 flex items-center justify-center border border-yellow-200 shadow-sm">
                <span className="text-5xl text-yellow-300">1</span>
              </div>
            </div>

            {/* 3rd Place - Right */}
            <div className="flex flex-col items-center flex-1 max-w-[160px]">
              <div className="relative mb-3">
                <img
                  src={leaderboardData[2].avatar}
                  alt={leaderboardData[2].name}
                  className="w-20 h-20 lg:w-24 lg:h-24 rounded-full object-cover border-[3px] border-orange-300"
                />
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                  <span className="text-white text-sm">3</span>
                </div>
              </div>
              <h4 className="text-sm mb-2 text-center truncate w-full">
                {leaderboardData[2].name}
              </h4>
              <div className="bg-gradient-to-r from-orange-400 to-pink-400 text-white px-3 py-1 rounded-full text-xs mb-3 shadow-sm">
                {leaderboardData[2].points.toLocaleString()} XP
              </div>
              <div className="w-full bg-gradient-to-b from-orange-50 to-orange-100 rounded-t-lg pt-10 pb-5 flex items-center justify-center border border-orange-200">
                <span className="text-5xl text-orange-200">3</span>
              </div>
            </div>
          </div>
        </div>

        {/* Full Leaderboard List */}
        <div className="space-y-0">
          {leaderboardData.slice(3).map((user) => (
            <div
              key={user.rank}
              className="flex items-center gap-3 lg:gap-4 p-4 border-b border-border last:border-b-0 hover:bg-gray-50 transition-colors"
            >
              {/* Rank */}
              <div className="w-8 shrink-0 text-center">
                <span className="text-sm text-muted-foreground">#{user.rank}</span>
              </div>

              {/* User Info */}
              <img
                src={user.avatar}
                alt={user.name}
                className="w-11 h-11 rounded-full object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm mb-0.5 truncate">{user.name}</h4>
                <p className="text-xs text-muted-foreground truncate">
                  @{user.title.toLowerCase().replace(/\s+/g, '')}
                </p>
              </div>

              {/* Points */}
              <div className="flex items-center gap-1.5 shrink-0">
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-[10px]">⭐</span>
                </div>
                <span className="text-sm">{Math.floor(user.points / 100)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}