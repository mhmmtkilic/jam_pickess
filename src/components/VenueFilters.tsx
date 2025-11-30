import { useState } from 'react';
import { Wifi, Zap, Cigarette, TreePine, ChevronDown, MapPin, Coffee, Sparkles } from 'lucide-react';

type SortOption = 'rating' | 'newest' | 'nearest';

interface VenueFiltersProps {
  sortBy?: SortOption;
  onSortChange?: (sort: SortOption) => void;
}

export function VenueFilters({ sortBy = 'rating', onSortChange }: VenueFiltersProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    location: false,
    type: false,
    amenities: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <aside className="space-y-4 sticky top-20 max-w-[320px] w-full">
      {/* Sıralama Bölümü */}


      {/* Filtreleme Bölümü */}
      <div className="bg-white border border-border rounded-lg p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h3>Filtrele</h3>
          <button className="text-xs px-2.5 py-1 rounded-md text-muted-foreground hover:text-accent hover:bg-violet-50 transition-all">
            Temizle
          </button>
        </div>

        {/* Özel Rozetler - Always Visible, Top Position */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-muted-foreground" />
            <h4 className="text-sm text-muted-foreground uppercase tracking-wide">Özel Rozetler</h4>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Öğrenci Dostu (Ekonomik)', emoji: '💸' },
              { label: '7/24 Açık', emoji: '🌙' },
              { label: 'Sessiz Ortam', emoji: '🤫' }
            ].map((badge) => (
              <label key={badge.label} className="flex items-center justify-between cursor-pointer group py-1 px-2 -mx-2 rounded-md hover:bg-secondary transition-colors">
                <span className="text-sm flex items-center gap-2.5">
                  <span className="text-base">{badge.emoji}</span>
                  <span className="group-hover:text-accent transition-colors select-none">{badge.label}</span>
                </span>
                <div className="relative inline-block w-10 h-5">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-10 h-5 bg-gray-200 peer-focus:ring-2 peer-focus:ring-[#7c3aed]/20 rounded-full peer peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all after:shadow-sm peer-checked:bg-[#7c3aed]"></div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Lokasyon - Accordion */}
        <div className="mb-5 pt-5 border-t border-border">
          <button
            onClick={() => toggleSection('location')}
            className="w-full flex items-center justify-between mb-3 group"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
              <h4 className="text-sm text-muted-foreground uppercase tracking-wide group-hover:text-accent transition-colors">
                Lokasyon
              </h4>
            </div>
            <ChevronDown 
              className={`w-4 h-4 text-muted-foreground group-hover:text-accent transition-all ${
                openSections.location ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openSections.location && (
            <div className="space-y-2.5">
              {[
                'Kampüs İçi (Selçuk Üni.)',
                'Bosna Hersek Mah.',
                'Zafer Meydanı / Alaaddin',
                'Yazır / Otogar Çevresi',
                'Meram'
              ].map((location) => (
                <label key={location} className="flex items-center gap-2.5 cursor-pointer group py-0.5">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded-md border-2 border-gray-300 bg-transparent appearance-none cursor-pointer transition-all checked:border-[#7c3aed] checked:bg-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20 focus:ring-offset-0 checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTMuMzMzMyA0TDYgMTEuMzMzM0wyLjY2NjY3IDgiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+')] checked:bg-center checked:bg-no-repeat"
                  />
                  <span className="text-sm group-hover:text-accent transition-colors select-none">{location}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Mekan Türü - Accordion */}
        <div className="mb-5 pt-5 border-t border-border">
          <button
            onClick={() => toggleSection('type')}
            className="w-full flex items-center justify-between mb-3 group"
          >
            <div className="flex items-center gap-2">
              <Coffee className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
              <h4 className="text-sm text-muted-foreground uppercase tracking-wide group-hover:text-accent transition-colors">
                Mekan Türü
              </h4>
            </div>
            <ChevronDown 
              className={`w-4 h-4 text-muted-foreground group-hover:text-accent transition-all ${
                openSections.type ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openSections.type && (
            <div className="space-y-2.5">
              {[
                'Ders Çalışma Kafesi',
                'Kütüphane',
                'Restoran / Yemek',
                'Çorbacı',
                'Co-Working'
              ].map((type) => (
                <label key={type} className="flex items-center gap-2.5 cursor-pointer group py-0.5">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded-md border-2 border-gray-300 bg-transparent appearance-none cursor-pointer transition-all checked:border-[#7c3aed] checked:bg-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20 focus:ring-offset-0 checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTMuMzMzMyA0TDYgMTEuMzMzM0wyLjY2NjY3IDgiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+')] checked:bg-center checked:bg-no-repeat"
                  />
                  <span className="text-sm group-hover:text-accent transition-colors select-none">{type}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* İhtiyaçlar & İmkanlar - Accordion */}
        <div className="pt-5 border-t border-border">
          <button
            onClick={() => toggleSection('amenities')}
            className="w-full flex items-center justify-between mb-3 group"
          >
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
              <h4 className="text-sm text-muted-foreground uppercase tracking-wide group-hover:text-accent transition-colors">
                İhtiyaçlar & İmkanlar
              </h4>
            </div>
            <ChevronDown 
              className={`w-4 h-4 text-muted-foreground group-hover:text-accent transition-all ${
                openSections.amenities ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openSections.amenities && (
            <div className="space-y-2.5">
              {[
                { icon: Wifi, label: 'WiFi Var' },
                { icon: Zap, label: 'Priz Masada' },
                { icon: Cigarette, label: 'Sigara Alanı' },
                { icon: TreePine, label: 'Bahçeli' }
              ].map((amenity) => (
                <label key={amenity.label} className="flex items-center gap-2.5 cursor-pointer group py-0.5">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded-md border-2 border-gray-300 bg-transparent appearance-none cursor-pointer transition-all checked:border-[#7c3aed] checked:bg-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20 focus:ring-offset-0 checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTMuMzMzMyA0TDYgMTEuMzMzM0wyLjY2NjY3IDgiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+')] checked:bg-center checked:bg-no-repeat"
                  />
                  <amenity.icon className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                  <span className="text-sm group-hover:text-accent transition-colors select-none">{amenity.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Reset Filters Button */}

      </div>
    </aside>
  );
}
