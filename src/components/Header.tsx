import { Trophy, Gem, Search, Bell, ChevronDown, Coins, Sparkles, Bot } from 'lucide-react';
import { useState } from 'react';
import { NotificationDrawer } from './NotificationDrawer';
import { LevelDrawer } from './LevelDrawer';
import { AISearchModal } from './AISearchModal';

type FilterType = 'newest' | 'trends' | 'followings';

interface HeaderProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  onProfileClick?: () => void;
}

const categories: { label: string; value: FilterType }[] = [
  { label: 'Newest', value: 'newest' },
  { label: 'Trends', value: 'trends' },
  { label: 'Followings', value: 'followings' },
];

export function Header({ activeFilter, onFilterChange, onProfileClick }: HeaderProps) {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isLevelOpen, setIsLevelOpen] = useState(false);
  const [isAISearchOpen, setIsAISearchOpen] = useState(false);

  return (
    <>
    <header className="sticky top-0 z-10 bg-white border-b border-border">
      <div className="flex items-center justify-between h-16 px-3 lg:px-[20px] py-[0px] gap-3 lg:gap-5 max-w-[1800px] mx-auto">

        {/* Left: Logo + AI Button */}
        <div className="flex-1 min-w-0 flex items-center gap-2 lg:gap-4">
          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex items-center flex-1 max-w-lg">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Ara..."
                className="w-full h-[42px] pl-10 pr-4 bg-gray-50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
              />
            </div>
          </div>
          
          {/* AI Sor Button */}
          <button 
            onClick={() => setIsAISearchOpen(true)}
            className="hidden lg:flex items-center gap-2 h-[42px] px-4 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white rounded-lg transition-all shadow-sm hover:shadow-md whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">AI'a Sor</span>
          </button>
        </div>
        
        {/* Right: Search + Notifications + Profile + Level */}
        <div className="flex items-center gap-2 lg:gap-4 lg:w-80 shrink-0 justify-end">
          {/* Search Icon Button - Mobile Only */}
          <button className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors">
            <Search className="w-5 h-5 text-muted-foreground" />
          </button>
          
          {/* Notification Bell */}
          <button 
            onClick={() => setIsNotificationOpen(true)}
            className="relative p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <Bell className="w-5 h-5 text-muted-foreground" />
            <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>
          </button>
          
          {/* Mobile: Profile + Level Progress */}
          <button 
            onClick={() => setIsLevelOpen(true)}
            className="lg:hidden flex items-center gap-2 hover:bg-secondary transition-colors rounded-lg p-1.5"
          >
            <img 
              src="https://images.unsplash.com/photo-1612361844688-c6c9c44f3966?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlcnNvbnxlbnwxfHx8fDE3NjQwNzA2OTF8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover shrink-0"
            />
            <div className="flex flex-col items-end min-w-0">
              <span className="text-xs font-medium truncate">Seyyah</span>
              <div className="h-1 bg-gray-200 rounded-full overflow-hidden w-16">
                <div className="h-full bg-accent rounded-full transition-all" style={{ width: '50%' }}></div>
              </div>
            </div>
          </button>
          
          {/* Desktop: User Profile */}
          <button 
            onClick={onProfileClick}
            className="hidden lg:block p-1 rounded-lg hover:bg-secondary transition-colors"
          >
            <img 
              src="https://images.unsplash.com/photo-1612361844688-c6c9c44f3966?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlcnNvbnxlbnwxfHx8fDE3NjQwNzA2OTF8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
          </button>
          
          {/* Divider */}
          <div className="hidden lg:block w-px h-8 bg-border"></div>
          
          {/* Desktop: Level Progress */}
          <button 
            onClick={() => setIsLevelOpen(true)}
            className="hidden lg:block hover:bg-secondary transition-colors rounded-lg px-2 py-1"
          >
            <div className="flex items-center gap-3 mb-1 justify-end">
              <span className="text-xs text-muted-foreground">125/250 XP</span>
              <span className="text-sm font-medium">Seyyah</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden w-full">
              <div className="h-full bg-accent rounded-full transition-all" style={{ width: '50%' }}></div>
            </div>
          </button>
        </div>
      </div>
    </header>
    
    <NotificationDrawer 
      isOpen={isNotificationOpen}
      onClose={() => setIsNotificationOpen(false)}
    />
    
    <LevelDrawer 
      isOpen={isLevelOpen}
      onClose={() => setIsLevelOpen(false)}
    />
    
    <AISearchModal 
      isOpen={isAISearchOpen}
      onClose={() => setIsAISearchOpen(false)}
    />
    </>
  );
}