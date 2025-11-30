import { Navigation } from '../components/Navigation';
import { Header } from '../components/Header';
import { BottomBar } from '../components/BottomBar';
import { ProfileHeader } from '../components/ProfileHeader';
import { GamificationWidget } from '../components/GamificationWidget';
import { BadgeShowcase } from '../components/BadgeShowcase';
import { ReferralCard } from '../components/ReferralCard';
import { PostCard } from '../components/PostCard';
import { WikiCard } from '../components/WikiCard';
import { JobCard } from '../components/JobCard';
import { AcademicCard } from '../components/AcademicCard';
import { Target, Coins, Award } from 'lucide-react';
import { useState } from 'react';

// Mock data for user's posts
const userPosts = [
  {
    id: 1,
    type: 'post',
    author: {
      name: 'Ayşe Yılmaz',
      username: 'ayseyilmaz',
      avatar: 'https://images.unsplash.com/photo-1612361844688-c6c9c44f3966?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlcnNvbnxlbnwxfHx8fDE3NjQwNzA2OTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    title: 'Startup Projesinde Kullanıcı Deneyimi Başarısı',
    content: 'Yeni başladığım startup projesinde kullanıcı deneyimi konusunda harika geri dönümler alıyoruz! Gençlerin ihtiyaçlarına yönelik çözümler geliştirmek gerçekten heyecan verici. 🚀',
    timestamp: '2 gün önce',
    upvotes: 24,
    helpfulCount: 18,
    categories: ['Teknoloji', 'Startup', 'UX/UI'],
  },
  {
    id: 2,
    type: 'wiki',
    author: {
      name: 'Ayşe Yılmaz',
      username: 'ayseyilmaz',
      avatar: 'https://images.unsplash.com/photo-1612361844688-c6c9c44f3966?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlcnNvbnxlbnwxfHx8fDE3NjQwNzA2OTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    content: 'Urban Bistro\'da harika bir deneyim yaşadım! Özellikle priz ve wifi açısından çok iyi. Kahveleri biraz pahalı ama ortamı ve müziği çalışmak için çok uygun.',
    timestamp: '5 gün önce',
    topicLink: {
      icon: 'venue',
      text: 'Urban Bistro',
    },
    upvotes: 128,
    downvotes: 12,
    comments: 8,
    tags: ['Kahve', 'DersÇalışma', 'PrizVar'],
  },
  {
    id: 3,
    type: 'job',
    author: {
      name: 'Ayşe Yılmaz',
      username: 'ayseyilmaz',
      avatar: 'https://images.unsplash.com/photo-1612361844688-c6c9c44f3966?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlcnNvbnxlbnwxfHx8fDE3NjQwNzA2OTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    category: 'freelance',
    title: 'UI/UX Tasarımcı - Freelance Proje',
    details: {
      location: 'Uzaktan',
      payment: '5,000₺ / Proje',
      time: 'Esnek',
    },
    description: 'Startup ve küçük işletmeler için UI/UX tasarım hizmeti veriyorum. Figma ile profesyonel tasarımlar.',
    timestamp: '1 hafta önce',
  },
];

const bookmarkedPosts = [
  {
    id: 101,
    type: 'academic',
    courseCode: 'MAT101',
    courseName: 'Diferansiyel Denklemler',
    university: 'Selçuk Üni.',
    department: 'Bilgisayar Müh.',
    uploader: {
      name: 'İnek Öğrenci',
      username: 'inek_ogrenci',
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxwb3J0cmFpdCUyMG1hbnxlbnwxfHx8fDE3NjQxNzc0OTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    timestamp: 'Dün',
    file: {
      name: '2023_Vize_Cikmis_Sorular.pdf',
      type: 'pdf',
      size: '2.4 MB',
      pages: 7,
    },
    description: 'Hocanın derste vurguladığı 3. ünite sorularını içerir.',
    rating: 4.8,
    ratingCount: 42,
    downloads: 1200,
    comments: 5,
  },
  {
    id: 102,
    type: 'post',
    author: {
      name: 'Elif Yıldız',
      username: 'elifylz',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc2NDE3NzQ5NHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    title: 'Junior Developer İçin CV Hazırlama Rehberi',
    content: 'Junior developer pozisyonları için CV hazırlama rehberi hazırladım. 50\'den fazla başvuru sonucunda öğrendiklerimi paylaşıyorum.',
    timestamp: '2 gün önce',
    upvotes: 421,
    helpfulCount: 356,
    categories: ['Kariyer', 'Teknoloji', 'İş Başvurusu'],
  },
];

const likedPosts = [
  {
    id: 201,
    type: 'post',
    author: {
      name: 'Burak Aslan',
      username: 'burakaslan',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxwb3J0cmFpdCUyMG1hbnxlbnwxfHx8fDE3NjQxNzc0OTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    title: 'ChatGPT\'nin Yeni Özellikleri',
    content: 'ChatGPT\'nin yeni özellikleri gerçekten etkileyici! Özellikle kod yazma ve debugging konusunda büyük yardımcı oluyor.',
    timestamp: '1 gün önce',
    upvotes: 284,
    helpfulCount: 197,
    categories: ['Teknoloji', 'Yapay Zeka'],
  },
  {
    id: 202,
    type: 'wiki',
    author: {
      name: 'Selin Kara',
      username: 'selinkara',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc2NDE3NzQ5NHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    content: 'Beşiktaş\'ta öğrenciler için uygun fiyatlı ve kaliteli restoran listesi! 10 mekan denedim ve en iyilerini derledim.',
    timestamp: '3 gün önce',
    topicLink: {
      icon: 'venue',
      text: 'Beşiktaş Restoran Rehberi',
    },
    upvotes: 512,
    downvotes: 8,
    comments: 45,
    tags: ['Restoran', 'Beşiktaş', 'Öğrenci'],
  },
];

interface ProfileProps {
  onNavigate?: (page: string) => void;
}

export default function Profile({ onNavigate }: ProfileProps = {}) {
  const [activeFilter, setActiveFilter] = useState<'newest' | 'trends' | 'followings'>('newest');
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [profileTab, setProfileTab] = useState<'posts' | 'bookmarks' | 'likes'>('posts');

  const getDisplayedContent = () => {
    switch (profileTab) {
      case 'bookmarks':
        return bookmarkedPosts;
      case 'likes':
        return likedPosts;
      default:
        return userPosts;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#fcfcfc]">
      <Navigation 
        currentPage="profile" 
        onCreateClick={() => setShowCreateModal(true)}
        isCollapsed={isNavCollapsed}
        setIsCollapsed={setIsNavCollapsed}
        onNavigate={onNavigate}
      />
      
      <div className={`flex-1 transition-all duration-500 ${isNavCollapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        <Header 
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          onProfileClick={() => {}}
        />
        
        <main className="flex items-start gap-5 p-3 pb-24 lg:p-[20px] lg:pb-[20px] max-w-[1800px] mx-auto">
            {/* Main Content */}
            <div className="flex-1 min-w-0 space-y-5">
              <ProfileHeader />
              
              {/* Profile Content Tabs */}
              <div className="bg-white border border-border rounded-lg p-1 flex gap-1">
                <button
                  onClick={() => setProfileTab('posts')}
                  className={`flex-1 px-3 py-1.5 rounded-md transition-colors text-sm ${
                    profileTab === 'posts'
                      ? 'bg-violet-50 text-accent'
                      : 'text-text/60 hover:bg-background hover:text-text'
                  }`}
                >
                  Gönderiler
                </button>
                <button
                  onClick={() => setProfileTab('bookmarks')}
                  className={`flex-1 px-3 py-1.5 rounded-md transition-colors text-sm ${
                    profileTab === 'bookmarks'
                      ? 'bg-violet-50 text-accent'
                      : 'text-text/60 hover:bg-background hover:text-text'
                  }`}
                >
                  Kaydedilenler
                </button>
                <button
                  onClick={() => setProfileTab('likes')}
                  className={`flex-1 px-3 py-1.5 rounded-md transition-colors text-sm ${
                    profileTab === 'likes'
                      ? 'bg-violet-50 text-accent'
                      : 'text-text/60 hover:bg-background hover:text-text'
                  }`}
                >
                  Beğeniler
                </button>
              </div>

              {/* Content List */}
              <div>
                {getDisplayedContent().map((post: any) => {
                  if (post.type === 'wiki') {
                    return <WikiCard key={post.id} {...post} />;
                  } else if (post.type === 'job') {
                    return <JobCard key={post.id} {...post} />;
                  } else if (post.type === 'academic') {
                    return <AcademicCard key={post.id} {...post} />;
                  } else {
                    return <PostCard key={post.id} {...post} />;
                  }
                })}
              </div>
            </div>
            
            {/* Sidebar */}
            <aside className="hidden lg:block space-y-4 sticky top-20 max-w-[320px] w-full shrink-0">
              {/* Wallet Widget */}
              <button 
                onClick={() => onNavigate?.('wallet')}
                className="w-full text-left relative bg-gradient-to-br from-violet-600 to-violet-700 rounded-xl p-5 overflow-hidden cursor-pointer hover:opacity-95 transition-opacity">
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
              <div className="bg-white border border-border rounded-lg p-4">
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
              
              <GamificationWidget />
              <BadgeShowcase />
              <ReferralCard />
            </aside>
        </main>
      </div>

      {/* Bottom Navigation Bar - Mobile Only */}
      <BottomBar
        currentPage="profile"
        onNavigate={(page) => onNavigate?.(page)}
        onCreatePost={() => setShowCreateModal(true)}
      />
    </div>
  );
}