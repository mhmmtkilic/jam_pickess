import { ArrowRight, Coins, TrendingUp, Zap, Target, Award, Star } from 'lucide-react';

export function GamificationWidget() {
  return (
    <div className="bg-white rounded-lg border border-border hover:border-muted transition-colors">
      <div className="relative p-5 bg-gradient-to-br from-violet-50 to-purple-50 rounded-lg border border-violet-200 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-2 right-2 text-4xl">🧳</div>
        </div>
        
        <div className="relative">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">🧳</span>
                <div>
                  <p className="text-xs text-muted-foreground">Mevcut Rütbe</p>
                  <p className="text-lg">Seyyah</p>
                </div>
              </div>
            </div>
            <div className="px-3 py-1.5 bg-accent text-white rounded-lg text-sm shadow-sm">
              Level 12
            </div>
          </div>

          {/* XP Stats */}
          <div className="flex items-center justify-between mb-2 text-sm">
            <span className="text-muted-foreground">İlerleme</span>
            <span className="text-accent">750 / 1,000 XP</span>
          </div>

          {/* Progress Bar */}
          <div className="relative h-3 bg-white rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-violet-500 to-purple-600 rounded-full relative overflow-hidden"
              style={{ width: '75%' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-muted-foreground">Sıradaki: 🎒 Gezgin (Level 13)</p>
            <p className="text-xs text-accent">250 XP kaldı</p>
          </div>
        </div>
      </div>
    </div>
  );
}
