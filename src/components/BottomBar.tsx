import { Sparkles, MessageSquare, Store, Megaphone, BookOpen, Award, ArrowLeft } from 'lucide-react';

interface BottomBarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onCreatePost: () => void;
  isCreateModalOpen?: boolean;
}

export function BottomBar({ currentPage, onNavigate, onCreatePost, isCreateModalOpen = false }: BottomBarProps) {
  const navItems = [
    { id: 'feed', icon: Sparkles, label: 'Akış' },
    { id: 'topic-list', icon: MessageSquare, label: 'Başlıklar' },
    { id: 'venue-list', icon: Store, label: 'Mekanlar' },
    { id: 'jobs', icon: Megaphone, label: 'İlanlar' },
    { id: 'academic', icon: BookOpen, label: 'Akademik' },
  ];

  // If on profile page, show overview button, otherwise show create button
  const isProfilePage = currentPage === 'profile';
  const isOverviewPage = currentPage === 'overview';

  return (
    <>
      {/* Floating Create/Overview Button */}
      {!isCreateModalOpen && (
        <button
          onClick={
            isOverviewPage 
              ? () => onNavigate('profile') 
              : isProfilePage 
              ? () => onNavigate('overview') 
              : onCreatePost
          }
          className="lg:hidden fixed bottom-20 right-4 w-14 h-14 bg-accent text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center z-50 hover:scale-110 active:scale-95"
          aria-label={
            isOverviewPage 
              ? "Profile'e Dön" 
              : isProfilePage 
              ? "Genel Bakış" 
              : "Yeni Oluştur"
          }
        >
          {isOverviewPage ? (
            <ArrowLeft className="w-6 h-6" />
          ) : isProfilePage ? (
            <Award className="w-6 h-6" />
          ) : (
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          )}
        </button>
      )}

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border z-40 lg:hidden">
        <div className="flex items-center justify-around px-2 py-2 max-w-[600px] mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id || 
              (item.id === 'feed' && (currentPage === 'feed' || currentPage === 'post-detail' || currentPage === 'wiki-detail')) ||
              (item.id === 'topic-list' && currentPage === 'topic-detail') ||
              (item.id === 'venue-list' && currentPage === 'venue-detail');

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center justify-center py-2 px-2 rounded-lg transition-all ${
                  isActive 
                    ? 'text-accent' 
                    : 'text-gray-400'
                }`}
              >
                <Icon className={`w-6 h-6 mb-1 transition-all ${
                  isActive ? 'fill-accent/10' : ''
                }`} />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}