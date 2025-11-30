import { MapPin, Clock, Users, Calendar } from 'lucide-react';
import { useState } from 'react';

interface LiveEvent {
  id: number;
  name: string;
  venue: string;
  time: string;
  attendees: number;
  location: { lat: number; lng: number };
  category: string;
  description: string;
  status: 'live' | 'upcoming';
  date?: string;
}

const liveEvents: LiveEvent[] = [
  {
    id: 1,
    name: 'Caz Akşamı',
    venue: 'Mevlana Kültür Merkezi',
    time: '19:00 - 22:00',
    attendees: 145,
    location: { lat: 37.8719, lng: 32.4844 },
    category: 'Müzik',
    description: 'Konya\'nın en iyi caz müzisyenleri sahneye çıkıyor. Akşam boyunca klasik ve modern caz eserleri seslendirilecek.',
    status: 'live'
  },
  {
    id: 2,
    name: 'Şiir Dinletisi',
    venue: 'Alaaddin Tepesi Kültür Evi',
    time: '18:30 - 20:30',
    attendees: 67,
    location: { lat: 37.8715, lng: 32.4850 },
    category: 'Edebiyat',
    description: 'Genç şairler eserlerini seslendirecek. Açık mikrofon bölümünde herkes kendi şiirlerini okuyabilir.',
    status: 'live'
  },
  {
    id: 3,
    name: 'Geleneksel El Sanatları Sergisi',
    venue: 'Karatay Medresesi',
    time: '10:00 - 18:00',
    attendees: 234,
    location: { lat: 37.8722, lng: 32.4838 },
    category: 'Sergi',
    description: 'Konya\'nın geleneksel el sanatları sergisi. Çini, hat, ebru ve daha fazlası. Ustalardan canlı gösteriler.',
    status: 'live'
  },
  {
    id: 4,
    name: 'Sema Gösterisi',
    venue: 'Mevlana Müzesi Bahçesi',
    time: '20:00 - 21:00',
    attendees: 412,
    location: { lat: 37.8712, lng: 32.4855 },
    category: 'Gösteri',
    description: 'Mevlevi sema ayini gösterisi. Geleneksel kostümler ve müzik eşliğinde unutulmaz bir deneyim.',
    status: 'live'
  },
  {
    id: 5,
    name: 'Klasik Müzik Konseri',
    venue: 'Konya Büyükşehir Belediyesi Konser Salonu',
    date: '5 Aralık',
    time: '20:00',
    attendees: 89,
    location: { lat: 37.8705, lng: 32.4865 },
    category: 'Müzik',
    description: 'Beethoven ve Mozart eserlerinin seslendirildiği klasik müzik gecesi.',
    status: 'upcoming'
  },
  {
    id: 6,
    name: 'Fotoğraf Sergisi: Konya\'dan Kareler',
    venue: 'Kültür A.Ş. Sanat Galerisi',
    date: '8 Aralık',
    time: '14:00',
    attendees: 52,
    location: { lat: 37.8728, lng: 32.4820 },
    category: 'Sergi',
    description: 'Konya\'nın tarihi ve doğal güzelliklerini yansıtan fotoğraf sergisi.',
    status: 'upcoming'
  },
  {
    id: 7,
    name: 'Tiyatro: Keşanlı Ali Destanı',
    venue: 'Konya Devlet Tiyatrosu',
    date: '10 Aralık',
    time: '19:30',
    attendees: 156,
    location: { lat: 37.8698, lng: 32.4875 },
    category: 'Tiyatro',
    description: 'Haldun Taner\'in ünlü oyunu Konya sahnesinde.',
    status: 'upcoming'
  }
];

interface LiveEventsProps {
  onBack: () => void;
}

export function LiveEvents({ onBack }: LiveEventsProps) {
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  const liveEventsFiltered = liveEvents.filter(e => e.status === 'live');
  const upcomingEventsFiltered = liveEvents.filter(e => e.status === 'upcoming');
  const allEvents = liveEvents;

  return (
    <div className="flex-1 min-w-0">
      {/* Map View - Now at Top */}
      <div className="bg-white border border-border rounded-lg overflow-hidden mb-5">
        {/* Map Header */}
        <div className="p-4 border-b border-border">
          <h3 className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-accent" />
            Etkinlik Haritası
          </h3>
        </div>

        {/* Map Container */}
        <div className="relative bg-gray-50 h-[300px]">
          <svg viewBox="0 0 900 400" className="w-full h-full">
            {/* Background */}
            <rect width="900" height="400" fill="#f2efe9" />
            
            {/* Green areas - Parks */}
            <ellipse cx="240" cy="320" rx="70" ry="50" fill="#c8e6c9" />
            <ellipse cx="720" cy="100" rx="80" ry="56" fill="#c8e6c9" />
            <rect x="30" y="15" width="90" height="50" rx="6" fill="#c8e6c9" />
            <ellipse cx="480" cy="210" rx="60" ry="40" fill="#c8e6c9" />
            
            {/* Water body - Light blue */}
            <path d="M 0 270 Q 150 260, 300 270 T 600 270 L 600 400 L 0 400 Z" fill="#b3e5fc" opacity="0.5" />
            
            {/* Secondary roads - White */}
            <g stroke="#ffffff" strokeWidth="5" fill="none" strokeLinecap="round">
              <line x1="0" y1="130" x2="900" y2="130" />
              <line x1="0" y1="240" x2="900" y2="240" />
              <line x1="360" y1="0" x2="360" y2="400" />
              <line x1="660" y1="0" x2="660" y2="400" />
              <line x1="180" y1="0" x2="180" y2="400" />
            </g>

            {/* Main roads - Yellow/Orange */}
            <g stroke="#fdb462" strokeWidth="6" fill="none" strokeLinecap="round">
              <line x1="0" y1="185" x2="900" y2="185" />
              <line x1="540" y1="0" x2="540" y2="400" />
            </g>

            {/* Buildings - Small gray rectangles */}
            <g fill="#d1d5db" opacity="0.6">
              <rect x="60" y="145" width="28" height="22" rx="2" />
              <rect x="225" y="65" width="32" height="26" rx="2" />
              <rect x="300" y="145" width="36" height="32" rx="2" />
              <rect x="450" y="80" width="30" height="24" rx="2" />
              <rect x="585" y="145" width="28" height="28" rx="2" />
              <rect x="735" y="200" width="32" height="36" rx="2" />
              <rect x="270" y="255" width="26" height="22" rx="2" />
              <rect x="435" y="255" width="30" height="26" rx="2" />
              <rect x="90" y="255" width="24" height="24" rx="2" />
              <rect x="630" y="255" width="32" height="24" rx="2" />
              <rect x="780" y="80" width="28" height="30" rx="2" />
              <rect x="705" y="310" width="30" height="26" rx="2" />
            </g>

            {/* Event Markers */}
            {allEvents.map((event, index) => {
              const positions = [
                { x: 210, y: 100 },
                { x: 690, y: 100 },
                { x: 210, y: 290 },
                { x: 690, y: 290 },
                { x: 450, y: 160 },
                { x: 270, y: 215 },
                { x: 630, y: 215 }
              ];
              
              const pos = positions[index % positions.length];
              const x = pos.x;
              const y = pos.y;
              const isHovered = hoveredEvent === event.id;
              const isSelected = selectedEvent === event.id;
              const isLive = event.status === 'live';

              return (
                <g key={event.id} className="cursor-pointer" 
                   onMouseEnter={() => setHoveredEvent(event.id)}
                   onMouseLeave={() => setHoveredEvent(null)}
                   onClick={() => setSelectedEvent(event.id === selectedEvent ? null : event.id)}>
                  {/* Pulse effect */}
                  {(isHovered || isSelected) && (
                    <circle
                      cx={x}
                      cy={y}
                      r="30"
                      fill="#7c3aed"
                      opacity="0.2"
                      className="animate-pulse"
                    />
                  )}
                  
                  {/* Pin - Google Maps style */}
                  <g transform={`translate(${x},${y})`}>
                    <path
                      d="M0,-20 C-7,-20 -12,-15 -12,-8 C-12,-3 0,3 0,3 C0,3 12,-3 12,-8 C12,-15 7,-20 0,-20 Z"
                      fill={isHovered || isSelected ? '#7c3aed' : (isLive ? '#22c55e' : '#f59e0b')}
                      stroke="white"
                      strokeWidth="2"
                      className="transition-colors duration-200"
                    />
                    <circle cx="0" cy="-8" r="4" fill="white" />
                  </g>

                  {/* Tooltip */}
                  {(isHovered || isSelected) && (
                    <g>
                      <rect
                        x={x - 90}
                        y={y - 60}
                        width="180"
                        height="45"
                        rx="6"
                        fill="white"
                        stroke="#7c3aed"
                        strokeWidth="2"
                      />
                      <text
                        x={x}
                        y={y - 43}
                        textAnchor="middle"
                        fontSize="13"
                        fontWeight="600"
                        fill="#000"
                      >
                        {event.name}
                      </text>
                      <text
                        x={x}
                        y={y - 28}
                        textAnchor="middle"
                        fontSize="11"
                        fill="#6b7280"
                      >
                        {event.venue}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* Legend */}
            <g transform="translate(20, 345)">
              <rect width="230" height="45" rx="6" fill="white" opacity="0.95" stroke="#e5e7eb" strokeWidth="1" />
              <circle cx="18" cy="15" r="5" fill="#22c55e" />
              <text x="32" y="20" fontSize="12" fill="#374151">Canlı Etkinlik</text>
              <circle cx="18" cy="32" r="5" fill="#f59e0b" />
              <text x="32" y="37" fontSize="12" fill="#374151">Yaklaşan Etkinlik</text>
            </g>
          </svg>
        </div>
      </div>

      {/* Live Events Section */}
      <div className="mb-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
          <h2>Canlı Etkinlikler</h2>
          <span className="px-2 py-0.5 bg-green-500/10 text-green-600 text-xs rounded-full">
            {liveEventsFiltered.length} Etkinlik
          </span>
        </div>
        
        <div className="space-y-3">
          {liveEventsFiltered.map((event) => (
            <div
              key={event.id}
              className={`bg-white border rounded-lg p-4 lg:p-5 cursor-pointer transition-all duration-200 ${
                hoveredEvent === event.id || selectedEvent === event.id
                  ? 'border-accent shadow-md bg-accent/5'
                  : 'border-border hover:border-accent/50 hover:shadow-sm'
              }`}
              onMouseEnter={() => setHoveredEvent(event.id)}
              onMouseLeave={() => setHoveredEvent(null)}
              onClick={() => setSelectedEvent(event.id === selectedEvent ? null : event.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3>{event.name}</h3>
                    <span className="px-2 py-0.5 bg-accent/10 text-accent text-xs rounded-full">
                      {event.category}
                    </span>
                  </div>
                  
                  <div className="space-y-1.5 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-accent" />
                      <span>{event.venue}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-accent" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-accent" />
                      <span>{event.attendees} kişi katılıyor</span>
                    </div>
                  </div>
                </div>
              </div>

              {selectedEvent === event.id && (
                <div className="pt-3 border-t border-border">
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events Section */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="w-5 h-5 text-amber-500" />
          <h2>Yaklaşan Etkinlikler</h2>
          <span className="px-2 py-0.5 bg-amber-500/10 text-amber-600 text-xs rounded-full">
            {upcomingEventsFiltered.length} Etkinlik
          </span>
        </div>
        
        <div className="space-y-3">
          {upcomingEventsFiltered.map((event) => (
            <div
              key={event.id}
              className={`bg-white border rounded-lg p-4 lg:p-5 cursor-pointer transition-all duration-200 ${
                hoveredEvent === event.id || selectedEvent === event.id
                  ? 'border-accent shadow-md bg-accent/5'
                  : 'border-border hover:border-accent/50 hover:shadow-sm'
              }`}
              onMouseEnter={() => setHoveredEvent(event.id)}
              onMouseLeave={() => setHoveredEvent(null)}
              onClick={() => setSelectedEvent(event.id === selectedEvent ? null : event.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3>{event.name}</h3>
                    <span className="px-2 py-0.5 bg-accent/10 text-accent text-xs rounded-full">
                      {event.category}
                    </span>
                  </div>
                  
                  <div className="space-y-1.5 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-accent" />
                      <span>{event.date} - {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-accent" />
                      <span>{event.venue}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-accent" />
                      <span>{event.attendees} kişi ilgileniyor</span>
                    </div>
                  </div>
                </div>
              </div>

              {selectedEvent === event.id && (
                <div className="pt-3 border-t border-border">
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}