import { TrendingUp, MapPin } from 'lucide-react';

const upcomingEvents = [
  { id: 1, title: 'Konya Kitap Fuarı', date: '15-20 Aralık' },
  { id: 2, title: 'Mevlana Anma Törenleri', date: '17 Aralık' },
  { id: 3, title: 'Selçuklu Konseri', date: '22 Aralık' }
];

const recommendedPlaces = [
  { id: 1, name: 'Mevlana Müzesi', visitors: '2.5M/yıl' },
  { id: 2, name: 'Alaeddin Tepesi', visitors: '850K/yıl' },
  { id: 3, name: 'Tropical Kelebek Bahçesi', visitors: '620K/yıl' }
];

interface CulturalSidebarProps {
  onNavigateToLiveEvents: () => void;
}

export function CulturalSidebar({ onNavigateToLiveEvents }: CulturalSidebarProps) {
  return (
    <aside className="space-y-4 sticky top-20 max-w-[320px] w-full">
      {/* Canlı Etkinlikler - Preview */}
      <div 
        className="bg-white border border-accent/30 rounded-lg p-5 cursor-pointer hover:border-accent transition-all duration-300 group"
        onClick={onNavigateToLiveEvents}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
            Canlı Etkinlikler
          </h3>
          <span className="text-sm text-muted-foreground">4 Etkinlik</span>
        </div>
        
        {/* Mini Map Preview - Google Maps Style */}
        <div className="relative h-32 bg-gray-50 rounded-lg overflow-hidden">
          <svg viewBox="0 0 300 150" className="w-full h-full">
            {/* Base - Light beige/tan background */}
            <rect width="300" height="150" fill="#f2efe9" />
            
            {/* Green areas - Parks */}
            <ellipse cx="80" cy="120" rx="35" ry="25" fill="#c8e6c9" />
            <ellipse cx="240" cy="40" rx="40" ry="28" fill="#c8e6c9" />
            <rect x="10" y="10" width="45" height="30" rx="3" fill="#c8e6c9" />
            
            {/* Water body - Light blue */}
            <path d="M 0 100 Q 50 95, 100 100 T 200 100 L 200 150 L 0 150 Z" fill="#b3e5fc" opacity="0.5" />
            
            {/* Secondary roads - White */}
            <g stroke="#ffffff" strokeWidth="3" fill="none" strokeLinecap="round">
              <line x1="0" y1="50" x2="300" y2="50" />
              <line x1="0" y1="90" x2="300" y2="90" />
              <line x1="60" y1="0" x2="60" y2="150" />
              <line x1="140" y1="0" x2="140" y2="150" />
              <line x1="220" y1="0" x2="220" y2="150" />
            </g>

            {/* Main roads - Yellow/Orange */}
            <g stroke="#fdb462" strokeWidth="4" fill="none" strokeLinecap="round">
              <line x1="0" y1="70" x2="300" y2="70" />
              <line x1="180" y1="0" x2="180" y2="150" />
            </g>

            {/* Buildings - Small gray rectangles */}
            <g fill="#d1d5db" opacity="0.6">
              <rect x="20" y="55" width="15" height="12" rx="1" />
              <rect x="75" y="25" width="18" height="15" rx="1" />
              <rect x="100" y="55" width="20" height="18" rx="1" />
              <rect x="150" y="30" width="16" height="14" rx="1" />
              <rect x="195" y="55" width="15" height="16" rx="1" />
              <rect x="245" y="75" width="18" height="20" rx="1" />
              <rect x="90" y="95" width="14" height="12" rx="1" />
              <rect x="145" y="95" width="16" height="15" rx="1" />
            </g>

            {/* Event Pins - Google Maps style */}
            <g>
              {/* Pin 1 */}
              <g transform="translate(70, 50)">
                <path d="M0,-12 C-4,-12 -7,-9 -7,-5 C-7,-2 0,2 0,2 C0,2 7,-2 7,-5 C7,-9 4,-12 0,-12 Z" 
                      fill="#ea4335" stroke="white" strokeWidth="1" />
                <circle cx="0" cy="-5" r="2.5" fill="white" />
              </g>
              
              {/* Pin 2 */}
              <g transform="translate(180, 40)">
                <path d="M0,-12 C-4,-12 -7,-9 -7,-5 C-7,-2 0,2 0,2 C0,2 7,-2 7,-5 C7,-9 4,-12 0,-12 Z" 
                      fill="#ea4335" stroke="white" strokeWidth="1" />
                <circle cx="0" cy="-5" r="2.5" fill="white" />
              </g>
              
              {/* Pin 3 */}
              <g transform="translate(120, 100)">
                <path d="M0,-12 C-4,-12 -7,-9 -7,-5 C-7,-2 0,2 0,2 C0,2 7,-2 7,-5 C7,-9 4,-12 0,-12 Z" 
                      fill="#ea4335" stroke="white" strokeWidth="1" />
                <circle cx="0" cy="-5" r="2.5" fill="white" />
              </g>
              
              {/* Pin 4 */}
              <g transform="translate(230, 90)">
                <path d="M0,-12 C-4,-12 -7,-9 -7,-5 C-7,-2 0,2 0,2 C0,2 7,-2 7,-5 C7,-9 4,-12 0,-12 Z" 
                      fill="#ea4335" stroke="white" strokeWidth="1" />
                <circle cx="0" cy="-5" r="2.5" fill="white" />
              </g>
            </g>
          </svg>
        </div>
      </div>

      {/* Yaklaşan Etkinlikler */}
      <div className="bg-white border border-border rounded-lg p-5">
        <h3 className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-accent" />
          Yaklaşan Etkinlikler
        </h3>
        <div className="space-y-3">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="pb-3 border-b border-border last:border-0 last:pb-0">
              <h4 className="text-sm mb-1 hover:text-accent cursor-pointer transition-colors">{event.title}</h4>
              <p className="text-xs text-muted-foreground">{event.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Önerilen Mekanlar */}
      <div className="bg-white border border-border rounded-lg p-5">
        <h3 className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-accent" />
          Önerilen Mekanlar
        </h3>
        <div className="space-y-3">
          {recommendedPlaces.map((place) => (
            <div key={place.id} className="pb-3 border-b border-border last:border-0 last:pb-0">
              <h4 className="text-sm mb-1 hover:text-accent cursor-pointer transition-colors">{place.name}</h4>
              <p className="text-xs text-muted-foreground">{place.visitors}</p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
