import { MapPin, Star, CheckCircle, Wifi, Plug, Coffee, BookOpen, Moon, DollarSign, Zap, Heart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { SlidersHorizontal } from 'lucide-react';
import { venues } from '../data/mock';
import { useMemo } from 'react';

interface Venue {
  id: string;
  name: string;
  verified: boolean;
  category: string;
  description: string;
  image: string;
  address: string;
  rating: number;
  reviewCount: number;
  amenities: ('WiFi' | 'Priz' | 'Kahve')[];
  priceLevel: '₺' | '₺₺' | '₺₺₺';
}

// Transform venues from JSON to component format
const transformVenues = (): Venue[] => {
  return venues.map((venue) => {
    // Map amenities
    const amenities: ('WiFi' | 'Priz' | 'Kahve')[] = [];
    if (venue.amenities.includes('wifi')) amenities.push('WiFi');
    if (venue.amenities.includes('priz')) amenities.push('Priz');
    if (venue.amenities.includes('kahve')) amenities.push('Kahve');

    // Map price level
    let priceLevel: '₺' | '₺₺' | '₺₺₺' = '₺';
    if (venue.priceLevel === 'orta') priceLevel = '₺₺';
    else if (venue.priceLevel === 'pahalı') priceLevel = '₺₺₺';

    // Map category
    let category = venue.category;
    if (venue.category === 'kafe') category = 'Kafe & Çalışma';
    else if (venue.category === 'çalışma kafesi') category = 'Çalışma Kafesi';
    else if (venue.category === 'kütüphane') category = 'Kütüphane';
    else if (venue.category === 'restoran') category = 'Restoran';

    return {
      id: venue.id,
      name: venue.name,
      verified: venue.verified,
      category,
      description: venue.description,
      image: venue.image,
      address: venue.address,
      rating: venue.rating,
      reviewCount: venue.reviewCount,
      amenities,
      priceLevel,
    };
  });
};

const mockVenues_OLD: Venue[] = [
  {
    id: '1',
    name: 'Kütüphane Kafe',
    verified: true,
    category: 'Kafe & Çalışma',
    description: 'Vize haftaları sabahlamak için ideal, priz sorunu yok ama kahveleri biraz pahalı. Sessiz ortam isteyenler için birebir.',
    image: 'https://images.unsplash.com/photo-1684006997322-6a5128f44816?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYWZlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY0MTQ0ODc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    address: 'Bosna Hersek Mah, Selçuk Üni. Karşısı',
    rating: 4.5,
    reviewCount: 127,
    amenities: ['WiFi', 'Priz'],
    priceLevel: '₺₺',
  },
  {
    id: 2,
    name: 'Zafer Çalışma Kafesi',
    verified: true,
    category: 'Çalışma Kafesi',
    description: 'Ödev yapmak için mükemmel, internetin hızı çok iyi. Tek sorun akşam 10\'da kapanıyor, final döneminde sıkıntı oluyor.',
    image: 'https://images.unsplash.com/photo-1716703370150-419e76c00de6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwd29ya3NwYWNlfGVufDF8fHx8MTc2NDIwNTM4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    address: 'Zafer Mah, Kent Meydanı Yanı',
    rating: 4.8,
    reviewCount: 203,
    amenities: ['WiFi', 'Priz'],
    priceLevel: '₺',
  },
  {
    id: 3,
    name: 'Kampüs Kütüphanesi',
    verified: false,
    category: 'Kütüphane',
    description: 'Gece 2\'ye kadar açık, sessiz ve ücretsiz. Ama yoğun zamanlarda yer bulamıyorsun, erkenden gitmen lazım.',
    image: 'https://images.unsplash.com/photo-1546953304-5d96f43c2e94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5JTIwc3R1ZHl8ZW58MXx8fHwxNzY0MjE1NjAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    address: 'Selçuk Üniversitesi Kampüs İçi',
    rating: 4.3,
    reviewCount: 89,
    amenities: ['WiFi', 'Priz'],
    priceLevel: '₺',
  },
  {
    id: 4,
    name: 'Code Hub',
    verified: true,
    category: 'Co-working',
    description: 'Yazılım öğrencileri için harika, toplantı odaları var. Aylık üyelik biraz tuzlu ama günlük gelme opsiyonu da mevcut.',
    image: 'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3dvcmtpbmclMjBzcGFjZXxlbnwxfHx8fDE3NjQxNzc0OTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    address: 'Selçuklu, Kulesite AVM Yanı',
    rating: 4.7,
    reviewCount: 156,
    amenities: ['WiFi', 'Priz'],
    priceLevel: '₺₺₺',
  },
  {
    id: 5,
    name: 'Çınaraltı Restoran',
    verified: true,
    category: 'Restoran',
    description: 'Öğrenci menüsü 50 TL, porsiyon dolu dolu. Öğle arası çok kalabalık oluyor, 13:00\'ten sonra gitmek daha mantıklı.',
    image: 'https://images.unsplash.com/photo-1667388969250-1c7220bf3f37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY0MjEzMDg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    address: 'Bosna Hersek Mah, Eski Sanayi',
    rating: 4.4,
    reviewCount: 178,
    amenities: ['WiFi'],
    priceLevel: '₺',
  },
  {
    id: 6,
    name: 'Gece Vakti Kafe',
    verified: true,
    category: 'Kafe',
    description: '24 saat açık, final haftası kurtarıcı. Gece 3\'te bile çalışan öğrenciyle dolu. Kahveleri güzel ama fiyatlar standart üstü.',
    image: 'https://images.unsplash.com/photo-1684006997322-6a5128f44816?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYWZlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY0MTQ0ODc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    address: 'Zafer Mah, Alaaddin Bulvarı',
    rating: 4.6,
    reviewCount: 234,
    amenities: ['WiFi', 'Priz'],
    priceLevel: '₺₺',
  },
];

const getAmenityIcon = (amenity: 'WiFi' | 'Priz' | 'Kahve') => {
  switch (amenity) {
    case 'WiFi':
      return Wifi;
    case 'Priz':
      return Plug;
    case 'Kahve':
      return Coffee;
  }
};

export function VenueList({ onVenueClick, sortBy, onSortChange, onFilterClick }: { 
  onVenueClick: (venueId: number) => void;
  sortBy: 'all' | 'rating' | 'newest' | 'nearest';
  onSortChange: (sort: 'all' | 'rating' | 'newest' | 'nearest') => void;
  onFilterClick?: () => void;
}) {
  const transformedVenues = useMemo(() => transformVenues(), []);

  // Sort venues based on selected filter
  const sortedVenues = useMemo(() => {
    const venuesCopy = [...transformedVenues];
    
    switch (sortBy) {
      case 'rating':
        return venuesCopy.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return venuesCopy.sort((a, b) => {
          const venueA = venues.find(v => v.id === a.id);
          const venueB = venues.find(v => v.id === b.id);
          const dateA = venueA ? new Date(venueA.createdAt).getTime() : 0;
          const dateB = venueB ? new Date(venueB.createdAt).getTime() : 0;
          return dateB - dateA;
        });
      case 'nearest':
        return venuesCopy; // Would need location data for real implementation
      case 'all':
      default:
        return venuesCopy;
    }
  }, [sortBy, transformedVenues]);

  return (
    <div className="flex-1 min-w-0">
      {/* Filter Tabs and Filter Button */}
      <div className="flex items-center gap-2 mb-5">
        <div className="bg-white border border-border rounded-lg p-1 flex gap-1 flex-1">
          <button
            onClick={() => onSortChange('all')}
            className={`flex-1 px-3 lg:px-3 py-2.5 rounded-md transition-colors text-sm lg:text-sm ${
              sortBy === 'all'
                ? 'bg-violet-50 text-accent'
                : 'text-text/60 hover:bg-background hover:text-text'
            }`}
          >
            Tümü
          </button>
          <button
            onClick={() => onSortChange('rating')}
            className={`flex-1 px-3 lg:px-3 py-2.5 rounded-md transition-colors text-sm lg:text-sm whitespace-nowrap ${
              sortBy === 'rating'
                ? 'bg-violet-50 text-accent'
                : 'text-text/60 hover:bg-background hover:text-text'
            }`}
          >
            <span className="hidden sm:inline">En İyiler</span>
            <span className="sm:hidden">İyi</span>
          </button>
          <button
            onClick={() => onSortChange('nearest')}
            className={`flex-1 px-3 lg:px-3 py-2.5 rounded-md transition-colors text-sm lg:text-sm whitespace-nowrap ${
              sortBy === 'nearest'
                ? 'bg-violet-50 text-accent'
                : 'text-text/60 hover:bg-background hover:text-text'
            }`}
          >
            <span className="hidden sm:inline">En Yakınlar</span>
            <span className="sm:hidden">Yakın</span>
          </button>
          <button
            onClick={() => onSortChange('newest')}
            className={`flex-1 px-3 lg:px-3 py-2.5 rounded-md transition-colors text-sm lg:text-sm ${
              sortBy === 'newest'
                ? 'bg-violet-50 text-accent'
                : 'text-text/60 hover:bg-background hover:text-text'
            }`}
          >
            <span className="hidden sm:inline">En Yeni</span>
            <span className="sm:hidden">Yeni</span>
          </button>
        </div>
        
        {/* Filter Button - Mobile Only */}
        {onFilterClick && (
          <button
            onClick={onFilterClick}
            className="lg:hidden px-3 py-2.5 rounded-md border border-border bg-white hover:bg-secondary transition-colors shrink-0"
          >
            <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Venue Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sortedVenues.map((venue) => (
          <button
            key={venue.id}
            onClick={() => onVenueClick(parseInt(venue.id.replace('ven_', '')) || 0)}
            className="bg-white rounded-lg border border-border overflow-hidden hover:shadow-md transition-all duration-300 hover:border-accent group text-left"
          >
            {/* Image */}
            <div className="relative h-36 overflow-hidden">
              <ImageWithFallback
                src={venue.image}
                alt={venue.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Rating & Price Badges - Top Left */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <div className="bg-white/95 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{venue.rating}</span>
                </div>
                <div className="bg-white/95 backdrop-blur-sm rounded-lg px-2 py-1">
                  <span className="text-sm">{venue.priceLevel}</span>
                </div>
              </div>
              
              {/* Favorite Button - Top Right */}
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  // Favorileme işlemi buraya gelecek
                }}
                className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full p-1.5 hover:bg-white transition-colors cursor-pointer"
              >
                <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 hover:fill-red-500 transition-colors" />
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="mb-2">
                <span className="inline-block px-2 py-1 rounded-full bg-secondary text-xs text-muted-foreground mb-2">
                  {venue.category}
                </span>
                <h3 className="group-hover:text-accent transition-colors">
                  {venue.name}
                </h3>
              </div>

              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {venue.description}
              </p>

              {/* Amenities */}
              <div className="flex items-center gap-2 pt-3 border-t border-border">
                {venue.amenities.map((amenity, index) => {
                  const Icon = getAmenityIcon(amenity);
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-1 text-xs text-muted-foreground"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{amenity}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}