import { ChevronLeft, ChevronRight, Plus, Sparkles, Store, Megaphone, BookOpen, Telescope, BarChart3, ClipboardList, Trophy, Award, MessageSquare } from 'lucide-react';
import { useState } from 'react';

const navigationItems = [
  { icon: Sparkles, label: 'Akış', active: true },
  { icon: MessageSquare, label: 'Başlıklar', active: false },
  { icon: Store, label: 'Mekan Rehberi', active: false },
  { icon: Megaphone, label: 'İlanlar', active: false },
  { icon: BookOpen, label: 'Akademik', active: false },
  { icon: Telescope, label: 'Kültürel Keşif', active: false },
];

const gamificationItems = [
  { icon: BarChart3, label: 'Leaderboard', active: false },
  { icon: ClipboardList, label: 'Görevler', active: false },
  { icon: Trophy, label: 'Başarımlar', active: false },
  { icon: Award, label: 'Rozetler', active: false },
];

export function Navigation({ onCreateClick, isCollapsed, setIsCollapsed, currentPage, onNavigate }: { 
  onCreateClick: () => void;
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  currentPage: 'feed' | 'topic-list' | 'topic-detail' | 'venue-list' | 'venue-detail' | 'jobs' | 'academic' | 'cultural' | 'live-events' | 'wallet' | 'profile';
  onNavigate: (page: 'feed' | 'topic-list' | 'topic-detail' | 'venue-list' | 'venue-detail' | 'jobs' | 'academic' | 'cultural' | 'live-events') => void;
}) {

  return (
    <nav className={`hidden lg:block fixed left-0 top-0 h-screen bg-white border-r border-border transition-all duration-500 ease-in-out ${
      isCollapsed ? 'w-20 px-4 py-6' : 'w-64 p-6'
    }`}>
      {/* Toggle Button - Centered on right border */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 bg-white border border-border rounded-full hover:bg-secondary transition-all duration-300 flex items-center justify-center shadow-sm hover:shadow-md"
        aria-label={isCollapsed ? 'Menüyü genişlet' : 'Menüyü daralt'}
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>

      <div className="mb-12">
        {isCollapsed ? (
          <div className="flex justify-center">
            <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
              <g transform="translate(0, 0) rotate(0)">
                <path fill="#7c3aed" d="M0 20C0 12.5231 0 8.78461 1.60769 6C2.66091 4.17577 4.17577 2.66091 6 1.60769C8.78461 0 12.5231 0 20 0C27.4769 0 31.2154 0 34 1.60769C35.8242 2.66091 37.3391 4.17577 38.3923 6C40 8.78461 40 12.5231 40 20C40 27.4769 40 31.2154 38.3923 34C37.3391 35.8242 35.8242 37.3391 34 38.3923C31.2154 40 27.4769 40 20 40C12.5231 40 8.78461 40 6 38.3923C4.17577 37.3391 2.66091 35.8242 1.60769 34C0 31.2154 0 27.4769 0 20Z"></path>
                <path fill="#ffffff" d="M28.0441 7.60927C28.8868 6.80331 30.2152 6.79965 31.0622 7.58229L31.1425 7.66005L31.4164 7.94729C34.1911 10.9318 35.2251 14.4098 34.9599 17.8065C34.6908 21.2511 33.1012 24.4994 30.8836 27.0664C28.6673 29.6316 25.7084 31.6519 22.51 32.5287C19.2714 33.4164 15.7294 33.1334 12.6547 30.9629C10.0469 29.1218 9.05406 26.1465 8.98661 23.2561C7.52323 22.5384 5.98346 21.6463 4.36789 20.5615L3.941 20.2716L3.85006 20.206C2.93285 19.5053 2.72313 18.2084 3.39161 17.2564C4.06029 16.3043 5.36233 16.046 6.34665 16.6512L6.44134 16.7126L6.83024 16.9771C7.79805 17.6269 8.72153 18.1903 9.59966 18.6767C10.1661 16.6889 11.1047 14.7802 12.3413 13.207C14.1938 10.8501 16.9713 8.96525 20.374 9.24647C23.439 9.49995 25.7036 11.081 26.8725 13.3122C28.0044 15.4728 28.0211 18.0719 27.0319 20.307C26.0234 22.5857 23.976 24.484 21.0309 25.2662C18.9114 25.8291 16.4284 25.7905 13.6267 25.0367V25.0377C12.5115 24.7375 11.3427 24.323 10.1212 23.7846C9.8472 23.6638 9.60873 23.8483 10.1212 24.1686C11.5636 25.1924 13.5956 26.0505 14.1836 26.3385C14.4615 26.788 14.8061 27.1568 15.2011 27.4356C17.0188 28.7188 19.1451 28.9539 21.3396 28.3523C23.5743 27.7397 25.8141 26.2625 27.5514 24.2516C29.2873 22.2423 30.4065 19.8348 30.5909 17.4727C30.765 15.2439 30.1218 12.9543 28.1842 10.8736L27.9927 10.6731L27.9162 10.5906C27.1538 9.72748 27.2018 8.41516 28.0441 7.60927ZM20.0092 13.5651C18.6033 13.4489 17.1196 14.189 15.8013 15.8662C14.7973 17.1436 14.0376 18.8033 13.6503 20.5112C16.4093 21.4544 18.4655 21.4608 19.8942 21.0814C21.5481 20.6422 22.5399 19.6477 23.0172 18.5693C23.5137 17.4472 23.4628 16.2245 22.9813 15.3055C22.5369 14.4571 21.6422 13.7002 20.0092 13.5651Z" clipRule="evenodd" fillRule="evenodd"></path>
              </g>
            </svg>
          </div>
        ) : (
          <div className="p-[0px] flex items-center gap-3">
            <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 shrink-0">
              <g transform="translate(0, 0) rotate(0)">
                <path fill="#7c3aed" d="M0 20C0 12.5231 0 8.78461 1.60769 6C2.66091 4.17577 4.17577 2.66091 6 1.60769C8.78461 0 12.5231 0 20 0C27.4769 0 31.2154 0 34 1.60769C35.8242 2.66091 37.3391 4.17577 38.3923 6C40 8.78461 40 12.5231 40 20C40 27.4769 40 31.2154 38.3923 34C37.3391 35.8242 35.8242 37.3391 34 38.3923C31.2154 40 27.4769 40 20 40C12.5231 40 8.78461 40 6 38.3923C4.17577 37.3391 2.66091 35.8242 1.60769 34C0 31.2154 0 27.4769 0 20Z"></path>
                <path fill="#ffffff" d="M28.0441 7.60927C28.8868 6.80331 30.2152 6.79965 31.0622 7.58229L31.1425 7.66005L31.4164 7.94729C34.1911 10.9318 35.2251 14.4098 34.9599 17.8065C34.6908 21.2511 33.1012 24.4994 30.8836 27.0664C28.6673 29.6316 25.7084 31.6519 22.51 32.5287C19.2714 33.4164 15.7294 33.1334 12.6547 30.9629C10.0469 29.1218 9.05406 26.1465 8.98661 23.2561C7.52323 22.5384 5.98346 21.6463 4.36789 20.5615L3.941 20.2716L3.85006 20.206C2.93285 19.5053 2.72313 18.2084 3.39161 17.2564C4.06029 16.3043 5.36233 16.046 6.34665 16.6512L6.44134 16.7126L6.83024 16.9771C7.79805 17.6269 8.72153 18.1903 9.59966 18.6767C10.1661 16.6889 11.1047 14.7802 12.3413 13.207C14.1938 10.8501 16.9713 8.96525 20.374 9.24647C23.439 9.49995 25.7036 11.081 26.8725 13.3122C28.0044 15.4728 28.0211 18.0719 27.0319 20.307C26.0234 22.5857 23.976 24.484 21.0309 25.2662C18.9114 25.8291 16.4284 25.7905 13.6267 25.0367V25.0377C12.5115 24.7375 11.3427 24.323 10.1212 23.7846C9.8472 23.6638 9.60873 23.8483 10.1212 24.1686C11.5636 25.1924 13.5956 26.0505 14.1836 26.3385C14.4615 26.788 14.8061 27.1568 15.2011 27.4356C17.0188 28.7188 19.1451 28.9539 21.3396 28.3523C23.5743 27.7397 25.8141 26.2625 27.5514 24.2516C29.2873 22.2423 30.4065 19.8348 30.5909 17.4727C30.765 15.2439 30.1218 12.9543 28.1842 10.8736L27.9927 10.6731L27.9162 10.5906C27.1538 9.72748 27.2018 8.41516 28.0441 7.60927ZM20.0092 13.5651C18.6033 13.4489 17.1196 14.189 15.8013 15.8662C14.7973 17.1436 14.0376 18.8033 13.6503 20.5112C16.4093 21.4544 18.4655 21.4608 19.8942 21.0814C21.5481 20.6422 22.5399 19.6477 23.0172 18.5693C23.5137 17.4472 23.4628 16.2245 22.9813 15.3055C22.5369 14.4571 21.6422 13.7002 20.0092 13.5651Z" clipRule="evenodd" fillRule="evenodd"></path>
              </g>
            </svg>
            <span className="text-xl">
              <span className="text-black font-normal">Pickles</span>
              <span className="text-accent font-semibold">Pedia</span>
            </span>
          </div>
        )}
      </div>
      
      <ul className="space-y-1">
        {navigationItems.map((item, index) => {
          const isActive = (index === 0 && currentPage === 'feed') || (index === 1 && (currentPage === 'topic-list' || currentPage === 'topic-detail')) || (index === 2 && (currentPage === 'venue-list' || currentPage === 'venue-detail')) || (index === 3 && currentPage === 'jobs') || (index === 4 && currentPage === 'academic') || (index === 5 && (currentPage === 'cultural' || currentPage === 'live-events'));
          const Icon = item.icon;
          return (
            <li key={item.label}>
              <button
                onClick={() => {
                  if (index === 0) onNavigate('feed');
                  if (index === 1) onNavigate('topic-list');
                  if (index === 2) onNavigate('venue-list');
                  if (index === 3) onNavigate('jobs');
                  if (index === 4) onNavigate('academic');
                  if (index === 5) onNavigate('cultural');
                }}
                className={`flex items-center gap-3 rounded-lg transition-all duration-300 ${ 
                  isActive
                    ? 'text-accent'
                    : 'text-muted-foreground hover:bg-secondary hover:text-black'
                } ${isCollapsed ? 'justify-center w-12 h-12' : 'w-full px-3 py-2.5'}`}
                title={isCollapsed ? item.label : ''}
              >
                <Icon className="w-5 h-5" />
                {!isCollapsed && <span className={isActive ? 'font-semibold' : ''}>{item.label}</span>}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Create Button - Fixed at bottom */}
      <div className={`absolute bottom-6 ${isCollapsed ? 'left-4 right-4' : 'left-6 right-6'}`}>
        <button
          onClick={onCreateClick}
          className={`flex items-center justify-center gap-2 bg-accent text-white rounded-lg hover:opacity-90 transition-all duration-300 shadow-sm hover:shadow-md ${
            isCollapsed ? 'w-12 h-12' : 'w-full px-4 py-3'
          }`}
        >
          <Plus className="w-5 h-5" />
          {!isCollapsed && <span>Yeni Oluştur</span>}
        </button>
      </div>
    </nav>
  );
}