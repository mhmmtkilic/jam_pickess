import {
  TrendingUp,
  Trophy,
  Tag,
  ChevronDown,
  Calendar,
  MessageCircle,
} from "lucide-react";
import { useState } from 'react';

export function TopicFilterSidebar() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    categories: true,
    time: false,
    status: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <aside className="space-y-4 sticky top-20 max-w-[320px] w-full">
      {/* Topic Filters */}
      <div className="bg-white border border-border rounded-lg p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h3>Filtrele</h3>
          <button className="text-xs px-2.5 py-1 rounded-md text-muted-foreground hover:text-accent hover:bg-violet-50 transition-all">
            Temizle
          </button>
        </div>

        {/* Categories - Accordion */}
        <div className="mb-5">
          <button
            onClick={() => toggleSection('categories')}
            className="w-full flex items-center justify-between mb-3 group"
          >
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
              <h4 className="text-sm text-muted-foreground uppercase tracking-wide group-hover:text-accent transition-colors">
                Kategoriler
              </h4>
            </div>
            <ChevronDown 
              className={`w-4 h-4 text-muted-foreground group-hover:text-accent transition-all ${
                openSections.categories ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openSections.categories && (
            <div className="flex flex-wrap gap-2">
              {[
                'Teknoloji',
                'İş & Kariyer',
                'Eğitim',
                'Tasarım',
                'Yaşam',
                'Girişimcilik',
                'Freelance',
                'Programlama'
              ].map((category) => (
                <label key={category} className="cursor-pointer group">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                  />
                  <span className="inline-block px-2.5 py-1.5 bg-secondary text-xs rounded-md hover:bg-violet-50 hover:text-accent transition-colors peer-checked:bg-violet-100 peer-checked:text-accent peer-checked:ring-2 peer-checked:ring-violet-200 select-none">
                    #{category}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Time Period - Accordion */}
        <div className="mb-5 pt-5 border-t border-border">
          <button
            onClick={() => toggleSection('time')}
            className="w-full flex items-center justify-between mb-3 group"
          >
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
              <h4 className="text-sm text-muted-foreground uppercase tracking-wide group-hover:text-accent transition-colors">
                Zaman Aralığı
              </h4>
            </div>
            <ChevronDown 
              className={`w-4 h-4 text-muted-foreground group-hover:text-accent transition-all ${
                openSections.time ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openSections.time && (
            <div className="space-y-2.5">
              {[
                'Tüm Zamanlar',
                'Bugün',
                'Bu Hafta',
                'Bu Ay',
                'Son 3 Ay'
              ].map((time) => (
                <label key={time} className="flex items-center gap-2.5 cursor-pointer group py-0.5">
                  <input
                    type="radio"
                    name="time"
                    className="w-4 h-4 rounded-full border-2 border-gray-300 bg-transparent appearance-none cursor-pointer transition-all checked:border-[#7c3aed] checked:bg-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20 focus:ring-offset-0 checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI4IiBjeT0iOCIgcj0iMyIgZmlsbD0id2hpdGUiLz48L3N2Zz4=')] checked:bg-center checked:bg-no-repeat"
                  />
                  <span className="text-sm group-hover:text-accent transition-colors select-none">{time}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Status - Accordion */}
        <div className="pt-5 border-t border-border">
          <button
            onClick={() => toggleSection('status')}
            className="w-full flex items-center justify-between mb-3 group"
          >
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
              <h4 className="text-sm text-muted-foreground uppercase tracking-wide group-hover:text-accent transition-colors">
                Durum
              </h4>
            </div>
            <ChevronDown 
              className={`w-4 h-4 text-muted-foreground group-hover:text-accent transition-all ${
                openSections.status ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openSections.status && (
            <div className="space-y-2.5">
              {[
                'Tümü',
                'Aktif (Yeni Yanıt Var)',
                'Yanıtlanmamış',
                'Çok Tartışılan (50+ Yanıt)'
              ].map((status) => (
                <label key={status} className="flex items-center gap-2.5 cursor-pointer group py-0.5">
                  <input
                    type="radio"
                    name="status"
                    className="w-4 h-4 rounded-full border-2 border-gray-300 bg-transparent appearance-none cursor-pointer transition-all checked:border-[#7c3aed] checked:bg-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20 focus:ring-offset-0 checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI4IiBjeT0iOCIgcj0iMyIgZmlsbD0id2hpdGUiLz48L3N2Zz4=')] checked:bg-center checked:bg-no-repeat"
                  />
                  <span className="text-sm group-hover:text-accent transition-colors select-none">{status}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Popular Tags Widget */}
      <div className="bg-white border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            <h3>Popüler Etiketler</h3>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {[
            { tag: 'react', count: 342 },
            { tag: 'python', count: 289 },
            { tag: 'freelance', count: 256 },
            { tag: 'kariyer', count: 234 },
            { tag: 'ui-ux', count: 198 },
            { tag: 'staj', count: 176 },
            { tag: 'yapay-zeka', count: 165 },
            { tag: 'web-dev', count: 143 }
          ].map((item) => (
            <button
              key={item.tag}
              className="px-2.5 py-1.5 bg-secondary text-xs rounded-md hover:bg-violet-50 hover:text-accent transition-colors group"
            >
              <span className="font-medium">#{item.tag}</span>
              <span className="ml-1.5 text-muted-foreground group-hover:text-accent">
                {item.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Active Contributors Widget */}
      <div className="bg-white border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-accent" />
            <h3>Aktif Katkıcılar</h3>
          </div>
          <button className="text-xs text-accent hover:text-accent/80 transition-colors">
            Tümünü Gör
          </button>
        </div>

        <div className="space-y-3">
          {[
            {
              name: 'Ayşe Demir',
              username: 'ayse_tech',
              avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop',
              badge: 'Konya Bilgesi',
              topics: 24
            },
            {
              name: 'Mehmet Kaya',
              username: 'mehmet_kariyer',
              avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&h=80&fit=crop',
              badge: 'Gezgin',
              topics: 18
            },
            {
              name: 'Zeynep Yıldız',
              username: 'zeynep_student',
              avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop',
              badge: 'Seyyah',
              topics: 15
            }
          ].map((user) => (
            <div key={user.username} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors cursor-pointer">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm truncate">{user.name}</h4>
                <p className="text-xs text-muted-foreground truncate">
                  {user.badge}
                </p>
              </div>
              <span className="text-xs font-medium text-accent shrink-0">
                {user.topics} başlık
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
