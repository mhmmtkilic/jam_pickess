import { Coins, Award, TrendingUp, ArrowRight, Send, Gift, CheckCircle, Plus } from 'lucide-react';
import { Navigation } from '../components/Navigation';
import { Header } from '../components/Header';
import { BottomBar } from '../components/BottomBar';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useState } from 'react';

interface WalletProps {
  onNavigate?: (page: 'feed' | 'venue-list' | 'jobs' | 'academic' | 'cultural' | 'profile' | 'wallet') => void;
}

export default function Wallet({ onNavigate }: WalletProps = {}) {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [transferAmount, setTransferAmount] = useState('');

  const coinHistory = [
    { id: 1, action: 'Post paylaşımı', amount: 50, time: '2 saat önce', type: 'earn' },
    { id: 2, action: 'Yorum yapıldı', amount: 10, time: '5 saat önce', type: 'earn' },
    { id: 3, action: 'Mekan incelemesi', amount: 100, time: '1 gün önce', type: 'earn' },
    { id: 4, action: 'Profil tamamlama', amount: 200, time: '2 gün önce', type: 'earn' },
    { id: 5, action: 'Günlük giriş bonusu', amount: 25, time: '2 gün önce', type: 'earn' },
  ];

  const transferHistory = [
    { id: 1, amount: 500, time: '1 hafta önce', status: 'completed' },
    { id: 2, amount: 1000, time: '2 hafta önce', status: 'completed' },
  ];

  const rewardCategories = [
    {
      id: 1,
      category: 'Etkinlikler',
      icon: '🎭',
      items: [
        { id: 1, title: 'Manga Konser Bileti', venue: 'Pentagon', logo: 'https://images.unsplash.com/photo-1709949906630-fb378d0dfd45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW50YWdvbiUyMGNvbmNlcnQlMjB2ZW51ZXxlbnwxfHx8fDE3NjQ0MjIxMjR8MA&ixlib=rb-4.1.0&q=80&w=1080', coins: 3500, description: 'Manga konseri için 1 bilet' },
        { id: 2, title: 'Tiyatro Bileti', venue: 'IF Performance', logo: 'https://images.unsplash.com/photo-1722321974501-059dff03e970?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVhdGVyJTIwcGVyZm9ybWFuY2UlMjBoYWxsfGVufDF8fHx8MTc2NDQyMjEyMXww&ixlib=rb-4.1.0&q=80&w=1080', coins: 2800, description: 'Seçili oyunlar için geçerli' },
        { id: 3, title: 'Stand-Up Gösterisi', venue: 'Babylon', logo: 'https://images.unsplash.com/photo-1638622140321-9e22fe968ac2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWJ5bG9uJTIwY2x1YiUyMHZlbnVlfGVufDF8fHx8MTc2NDQyMjEyMnww&ixlib=rb-4.1.0&q=80&w=1080', coins: 3000, description: 'Stand-up etkinliği girişi' },
      ]
    },
    {
      id: 2,
      category: 'Coffee',
      icon: '☕',
      items: [
        { id: 4, title: 'Ücretsiz 1 Kahve', venue: 'Mackbear Coffee', logo: 'https://images.unsplash.com/photo-1607681034540-2c46cc71896d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjByb2FzdGluZ3xlbnwxfHx8fDE3NjQ0MDAzMzR8MA&ixlib=rb-4.1.0&q=80&w=1080', coins: 1200, description: 'Filtre kahve veya americano' },
        { id: 5, title: 'Grande İçecek', venue: 'Starbucks', logo: 'https://images.unsplash.com/photo-1651890227034-d34bd436dbe2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFyYnVja3MlMjBjb2ZmZWUlMjBzaG9wfGVufDF8fHx8MTc2NDM1NTc2MHww&ixlib=rb-4.1.0&q=80&w=1080', coins: 1500, description: 'Tüm grande içecekler' },
        { id: 6, title: 'Özel Harman Kahve', venue: 'Petra Roasting', logo: 'https://images.unsplash.com/photo-1607681034540-2c46cc71896d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjByb2FzdGluZ3xlbnwxfHx8fDE3NjQ0MDAzMzR8MA&ixlib=rb-4.1.0&q=80&w=1080', coins: 1400, description: 'Özel harman kahve' },
      ]
    },
    {
      id: 3,
      category: 'Restaurant',
      icon: '🍔',
      items: [
        { id: 7, title: 'Burger Menü', venue: 'Bo Burger', logo: 'https://images.unsplash.com/photo-1644447381290-85358ae625cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjByZXN0YXVyYW50fGVufDF8fHx8MTc2NDQxODcxNXww&ixlib=rb-4.1.0&q=80&w=1080', coins: 2500, description: 'İmza burger + patates + içecek' },
        { id: 8, title: 'Büyük Boy Pizza', venue: 'Zula', logo: 'https://images.unsplash.com/photo-1563245738-9169ff58eccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzY0Mzk4NDAzfDA&ixlib=rb-4.1.0&q=80&w=1080', coins: 2800, description: 'Büyük boy pizza seçenekleri' },
        { id: 9, title: 'Öğle Menüsü', venue: 'Cookshop', logo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByZXN0YXVyYW50fGVufDF8fHx8MTc2NDM5MDg4Mnww&ixlib=rb-4.1.0&q=80&w=1080', coins: 2200, description: 'Günün menüsü' },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        onCreateClick={() => {}} 
        isCollapsed={isNavCollapsed} 
        setIsCollapsed={setIsNavCollapsed}
        currentPage="wallet"
        onNavigate={(page) => {
          if (onNavigate) {
            onNavigate(page);
          } else {
            // Fallback: reload to home
            window.location.href = '/';
          }
        }}
      />
      
      <div className={`transition-all duration-500 lg:${isNavCollapsed ? 'ml-20' : 'ml-64'}`}>
        <Header 
          activeFilter="newest"
          onFilterChange={() => {}}
          onProfileClick={() => {}}
        />
        
        <main className="flex items-start gap-5 p-3 pb-24 lg:p-[20px] lg:pb-[20px] max-w-[1800px] mx-auto">
          {/* Main Content */}
          <div className="flex-1 min-w-0 space-y-5">
            {/* Balance Card - Large */}
            <div className="relative bg-gradient-to-br from-violet-600 to-violet-700 rounded-xl p-8 overflow-hidden shadow-lg">
              {/* Decorative circles */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>
              
              {/* Header */}
              <div className="relative flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Coins className="w-6 h-6 text-white/90" />
                  <span className="text-white/90">Toplam Bakiyem</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-violet-400 rounded-full flex items-center justify-center">
                    <Coins className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-10 h-10 bg-violet-500/80 rounded-full flex items-center justify-center -ml-4">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Balance */}
              <div className="relative mb-8">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-5xl text-white tracking-wider">
                    2.450
                  </span>
                  <span className="text-xl text-white/80">
                    GençCoin
                  </span>
                </div>
                <p className="text-white/70">≈ 1 Kahve Parası + 950 Coin Değerinde</p>
              </div>

              {/* Progress */}
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-white/80">Bir sonraki ödüle</span>
                  <span className="text-sm text-white">50 Coin kaldı</span>
                </div>
                <div className="h-2.5 bg-violet-400/30 rounded-full overflow-hidden backdrop-blur-sm">
                  <div className="h-full bg-white rounded-full transition-all duration-300 shadow-sm" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>

            {/* Rewards Section */}
            {rewardCategories.map((category) => (
              <div key={category.id} className="bg-white rounded-lg border border-border p-6">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{category.icon}</span>
                    <h2>{category.category} Fırsatları</h2>
                  </div>
                  <button className="text-sm text-accent hover:text-accent/80 transition-colors">
                    Tümünü Gör
                  </button>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  {category.items.slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      className="p-4 bg-[#fafafa] border border-[#e5e5e5] rounded-lg hover:bg-[#f5f5f5] hover:border-[#d0d0d0] transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <ImageWithFallback 
                          src={item.logo} 
                          alt={item.venue}
                          className="w-8 h-8 rounded-md object-cover"
                        />
                        <span className="text-sm">{item.venue}</span>
                      </div>
                      
                      <h4 className="text-sm mb-2 group-hover:text-accent transition-colors">
                        {item.title}
                      </h4>
                      
                      <p className="text-xs text-muted-foreground mb-3">
                        {item.description}
                      </p>

                      <div className="flex items-center gap-1 text-accent">
                        <Coins className="w-3.5 h-3.5" />
                        <span className="text-sm">{item.coins}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Sidebar */}
          <div className="hidden lg:block w-80 space-y-5">
            {/* Transfer Section */}
            <div className="bg-white rounded-lg border border-border p-5">
              <div className="flex items-center gap-2 mb-4">
                <Send className="w-5 h-5 text-accent" />
                <h3>Genç Kültür Kart</h3>
              </div>

              <p className="text-xs text-muted-foreground mb-3">250 Coin = 1₺ bakiye</p>

              <div className="space-y-3">
                <div>
                  <label className="text-xs text-muted-foreground block mb-2">Coin Miktarı</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={transferAmount}
                      onChange={(e) => setTransferAmount(e.target.value)}
                      placeholder="500"
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:border-accent text-sm"
                    />
                  </div>
                  {transferAmount && (
                    <p className="text-xs text-muted-foreground mt-1.5">
                      ≈ {Math.floor(Number(transferAmount) / 250)}₺ bakiye
                    </p>
                  )}
                </div>

                <button className="w-full bg-accent text-white py-2.5 rounded-lg hover:bg-accent/90 transition-colors flex items-center justify-center gap-2 text-sm">
                  <Send className="w-4 h-4" />
                  Aktar
                </button>
              </div>
            </div>

            {/* Coin History */}
            <div className="bg-white rounded-lg border border-border p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-accent" />
                  <h3>Son Kazançlar</h3>
                </div>
                <button className="text-sm text-accent hover:text-accent/80 transition-colors">
                  Tümünü Gör
                </button>
              </div>

              <div className="space-y-3">
                {coinHistory.map((item) => (
                  <div key={item.id} className="flex items-center justify-between pb-3 border-b border-border last:border-0 last:pb-0">
                    <div className="flex-1">
                      <p className="text-sm">{item.action}</p>
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                    </div>
                    <div className="flex items-center gap-1 text-green-600">
                      <Plus className="w-3 h-3" />
                      <span className="text-sm">{item.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Transfer History */}
            <div className="bg-white rounded-lg border border-border p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Send className="w-5 h-5 text-accent" />
                  <h3>Aktarım Geçmişi</h3>
                </div>
                <button className="text-sm text-accent hover:text-accent/80 transition-colors">
                  Tümünü Göster
                </button>
              </div>

              {transferHistory.length > 0 ? (
                <div className="space-y-3">
                  {transferHistory.map((item) => (
                    <div key={item.id} className="flex items-center justify-between pb-3 border-b border-border last:border-0 last:pb-0">
                      <div className="flex-1">
                        <p className="text-sm">{item.amount} Coin aktarıldı</p>
                        <p className="text-xs text-muted-foreground">{item.time}</p>
                      </div>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Henüz aktarım yapmadınız
                </p>
              )}
            </div>


          </div>
        </main>
      </div>

      {/* Bottom Navigation Bar - Mobile Only */}
      <BottomBar
        currentPage="wallet"
        onNavigate={(page) => onNavigate?.(page as any)}
        onCreatePost={() => {}}
      />
    </div>
  );
}
