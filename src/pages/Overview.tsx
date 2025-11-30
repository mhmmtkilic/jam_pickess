import { Navigation } from '../components/Navigation';
import { Header } from '../components/Header';
import { BottomBar } from '../components/BottomBar';
import { GamificationWidget } from '../components/GamificationWidget';
import { BadgeShowcase } from '../components/BadgeShowcase';
import { ReferralCard } from '../components/ReferralCard';
import { Target, Coins, Award } from 'lucide-react';
import { useState } from 'react';

interface OverviewProps {
  onNavigate?: (page: string) => void;
}

export default function Overview({ onNavigate }: OverviewProps = {}) {
  const [activeFilter, setActiveFilter] = useState<'newest' | 'trends' | 'followings'>('newest');
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#fcfcfc]">
      <Navigation 
        currentPage="overview" 
        onCreateClick={() => setShowCreateModal(true)}
        isCollapsed={isNavCollapsed}
        setIsCollapsed={setIsNavCollapsed}
        onNavigate={onNavigate}
      />
      
      <div className={`flex-1 transition-all duration-500 lg:${isNavCollapsed ? 'ml-20' : 'ml-64'}`}>
        <Header 
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          onProfileClick={() => onNavigate?.('profile')}
        />
        
        <main className="p-3 pb-24 lg:p-[20px] lg:pb-[20px] max-w-[1200px] mx-auto">
          <div className="space-y-5">
            {/* Page Title */}
            <div className="mb-6">
              <h1 className="text-2xl mb-2">Genel Bakış</h1>
              <p className="text-muted-foreground">Cüzdan, görevler ve rozetlerinizi görüntüleyin</p>
            </div>

            {/* Wallet Widget */}
            <button 
              onClick={() => onNavigate?.('wallet')}
              className="w-full text-left relative bg-gradient-to-br from-violet-600 to-violet-700 rounded-xl p-6 overflow-hidden cursor-pointer hover:opacity-95 transition-opacity">
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
              
              {/* Header */}
              <div className="relative flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-white/90" />
                  <span className="text-sm text-white/90">GençCoin Cüzdan</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-7 h-7 bg-violet-400 rounded-full flex items-center justify-center">
                    <Coins className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-7 h-7 bg-violet-500/80 rounded-full flex items-center justify-center -ml-3">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Balance */}
              <div className="relative mb-6">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl text-white tracking-wider">
                    2.450
                  </span>
                  <span className="text-sm text-white/80">
                    Coin
                  </span>
                </div>
                <p className="text-xs text-white/70">≈ 1 Kahve Parası Değerinde</p>
              </div>

              {/* Progress */}
              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-white/80">Kahve ödülüne</span>
                  <span className="text-xs text-white">50 Coin kaldı</span>
                </div>
                <div className="h-2 bg-violet-400/30 rounded-full overflow-hidden backdrop-blur-sm">
                  <div className="h-full bg-white rounded-full transition-all duration-300" style={{ width: '80%' }}></div>
                </div>
              </div>
            </button>

            {/* Quests Widget */}
            <div className="bg-white border border-border rounded-lg p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-accent" />
                  <h3>Aktif Görevler</h3>
                </div>
                <button className="text-xs text-accent hover:text-accent/80 transition-colors">
                  Tümü
                </button>
              </div>

              <div className="space-y-4">
                {/* Quest 1 */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h4 className="text-sm mb-1">İlk Postunu Paylaş</h4>
                      <p className="text-xs text-muted-foreground">
                        Forum'da ilk içeriğini oluştur
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-accent shrink-0">
                      <Coins className="w-3.5 h-3.5" />
                      <span className="text-xs">50</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full transition-all duration-300" style={{ width: '0%' }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">0/1</p>
                </div>

                {/* Quest 2 */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h4 className="text-sm mb-1">5 Yorum Yap</h4>
                      <p className="text-xs text-muted-foreground">
                        Diğer gönderilere katkıda bulun
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-accent shrink-0">
                      <Coins className="w-3.5 h-3.5" />
                      <span className="text-xs">25</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full transition-all duration-300" style={{ width: '40%' }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">2/5</p>
                </div>

                {/* Quest 3 */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h4 className="text-sm mb-1">Mekan İncele</h4>
                      <p className="text-xs text-muted-foreground">
                        Gittiğin bir mekanı incele
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-accent shrink-0">
                      <Coins className="w-3.5 h-3.5" />
                      <span className="text-xs">100</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-accent rounded-full transition-all duration-300" style={{ width: '0%' }}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">0/1</p>
                </div>
              </div>
            </div>
            
            {/* Gamification & Badges */}
            <div className="grid lg:grid-cols-2 gap-4">
              <GamificationWidget />
              <BadgeShowcase />
            </div>

            {/* Referral Card */}
            <ReferralCard />
          </div>
        </main>
      </div>

      {/* Bottom Navigation Bar - Mobile Only */}
      <BottomBar
        currentPage="overview"
        onNavigate={(page) => onNavigate?.(page)}
        onCreatePost={() => setShowCreateModal(true)}
      />
    </div>
  );
}
