import { Wifi, Plug, Coffee, Music, CreditCard, MapPin, Clock, Phone, Globe, CheckCircle, Edit3, ChevronUp, ChevronDown, Star, BadgeCheck, ArrowLeft, Heart, MessageCircle, Share2, MoreHorizontal, Flag, ArrowUp, ArrowDown } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

interface VenueDetailProps {
  onBackClick?: () => void;
}

interface VenueReview {
  id: number;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  rating: number;
  content: string;
  timestamp: string;
  upvotes: number;
  userVote?: 'up' | 'down' | null;
}

const mockVenue = {
  name: 'Urban Bistro',
  verified: true,
  category: 'Kafe & Restoran',
  description: 'Modern ve samimi atmosferiyle gençlerin buluşma noktası. Öğrenciler için özel indirimler ve çalışma alanları mevcut.',
  coverImage: 'https://images.unsplash.com/photo-1684006997322-6a5128f44816?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYWZlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY0MTQ0ODc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  address: 'Kadıköy, İstanbul',
  phone: '+90 216 555 0123',
  website: 'www.urbanbistro.com',
  hours: '08:00 - 23:00',
  rating: 4.5,
  reviewCount: 127,
  tags: ['Çalışma Dostu', 'Öğrenci İndirimi', 'WiFi', 'Sessiz Ortam', 'Kahve', 'Brunch'],
  amenities: [
    { icon: Wifi, label: 'Ücretsiz WiFi', available: true },
    { icon: Plug, label: 'Priz', available: true },
    { icon: Coffee, label: 'Specialty Coffee', available: true },
    { icon: Music, label: 'Canlı Müzik', available: false },
    { icon: CreditCard, label: 'Kredi Kartı', available: true },
  ],
};

const mockReviews: VenueReview[] = [
  {
    id: 1,
    author: {
      name: 'Ayşe Yılmaz',
      username: 'ayseyilmaz',
      avatar: 'https://images.unsplash.com/photo-1612361844688-c6c9c44f3966?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlcnNvbnxlbnwxfHx8fDE3NjQwNzA2OTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    rating: 5,
    content: 'Kadıköy\'deki en sevdiğim çalışma mekanı! WiFi hızlı, kahveler harika ve ortam çok sakin. Özellikle sınav dönemlerinde burada ders çalışmak çok verimli oluyor.',
    timestamp: '2 gün önce',
    upvotes: 24,
    userVote: null,
  },
  {
    id: 2,
    author: {
      name: 'Mehmet Kaya',
      username: 'mkaya',
      avatar: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjQxMjI4MzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    rating: 4,
    content: 'Fiyatlar biraz yüksek ama kalite gerçekten iyi. Öğrenci indirimi yapıyorlar, o yüzden kabul edilebilir. Kahveleri mükemmel!',
    timestamp: '5 gün önce',
    upvotes: 18,
    userVote: null,
  },
  {
    id: 3,
    author: {
      name: 'Zeynep Demir',
      username: 'zdemir',
      avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY0MTIyOTkzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    rating: 5,
    content: 'Atmosfer harika, personel çok ilgili. Her masada priz var, laptop ile çalışmak için ideal. Pasta çeşitleri de çok lezzetli!',
    timestamp: '1 hafta önce',
    upvotes: 31,
    userVote: null,
  },
  {
    id: 4,
    author: {
      name: 'Can Özkan',
      username: 'canozkan',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxwb3J0cmFpdCUyMG1hbnxlbnwxfHx8fDE3NjQxNzc0OTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    rating: 4,
    content: 'Hafta sonları biraz kalabalık oluyor ama hafta içi sakin. Kahve kalitesi tutarlı, menü çeşitliliği iyi.',
    timestamp: '2 hafta önce',
    upvotes: 12,
    userVote: null,
  },
];

export function VenueDetail({ onBackClick }: VenueDetailProps) {
  const [activeTab, setActiveTab] = useState<'reviews' | 'menu' | 'info'>('reviews');

  return (
    <div className="flex-1 min-w-0">
      {/* Venue Info Card */}
      <div className="bg-white rounded-lg border border-border p-4 lg:p-6 mb-4">
        <div className="flex items-start gap-4 mb-6">
          {/* Logo */}
          <div className="shrink-0">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1559305616-3ba5c1d6b13a?w=200"
              alt={mockVenue.name}
              className="w-20 h-20 rounded-lg object-cover border border-border"
            />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h1>{mockVenue.name}</h1>
              {mockVenue.verified && (
                <BadgeCheck className="w-6 h-6 text-accent" />
              )}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground mb-3">
              <span className="text-sm">{mockVenue.category}</span>
              <span>•</span>
              <span className="text-sm">{mockVenue.address.split(',')[0]}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-sm">{mockVenue.rating}</span>
              </div>
            </div>
            {/* Special Badges */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary rounded-lg text-sm">
                <span>🚀</span>
                <span>Öğrenci Dostu</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary rounded-lg text-sm">
                <span>🌙</span>
                <span>7/24 Açık</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-4 gap-3 pt-5 border-t border-border">
          {/* WiFi Speed */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-violet-50 flex items-center justify-center">
                <Wifi className="w-4 h-4 text-accent" />
              </div>
              <span className="text-sm">Hızlı</span>
            </div>
            <span className="text-xs text-muted-foreground">WiFi</span>
          </div>
          
          {/* Crowd Level */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-violet-50 flex items-center justify-center">
                <Coffee className="w-4 h-4 text-accent" />
              </div>
              <span className="text-sm">Sakin</span>
            </div>
            <span className="text-xs text-muted-foreground">Kalabalıklık</span>
          </div>
          
          {/* Price Level */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-violet-50 flex items-center justify-center">
                <span className="text-sm text-accent">₺₺</span>
              </div>
              <span className="text-sm">Orta</span>
            </div>
            <span className="text-xs text-muted-foreground">Fiyat</span>
          </div>
          
          {/* Status */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-violet-50 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <span className="text-sm text-green-600">Açık</span>
            </div>
            <span className="text-xs text-muted-foreground">Durum</span>
          </div>
        </div>

        {/* Last Update */}

      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-border mb-4">
        <div className="flex border-b border-border">
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`px-6 py-3 border-b-2 transition-colors ${
              activeTab === 'reviews' 
                ? 'border-accent text-accent' 
                : 'border-transparent text-muted-foreground hover:text-black'
            }`}
          >
            Öğrenci Yorumları ({mockReviews.length})
          </button>
          <button 
            onClick={() => setActiveTab('menu')}
            className={`px-6 py-3 border-b-2 transition-colors ${
              activeTab === 'menu' 
                ? 'border-accent text-accent' 
                : 'border-transparent text-muted-foreground hover:text-black'
            }`}
          >
            Menü
          </button>
          <button 
            onClick={() => setActiveTab('info')}
            className={`px-6 py-3 border-b-2 transition-colors ${
              activeTab === 'info' 
                ? 'border-accent text-accent' 
                : 'border-transparent text-muted-foreground hover:text-black'
            }`}
          >
            Mekan Bilgileri
          </button>
        </div>

        {/* Tab Content */}
        <div className={activeTab === 'reviews' ? '' : 'p-6'}>
          {activeTab === 'reviews' && (
            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-muted-foreground">Toplam {mockReviews.length} yorum</h3>
                <button className="text-sm text-muted-foreground hover:text-accent transition-colors">
                  Sözlük Modu
                </button>
              </div>
              
              {mockReviews.map((review) => (
                <div key={review.id} className="bg-white rounded-lg border border-border">
                  <div className="p-5">
                    {/* Header: User Info + Actions */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={review.author.avatar}
                          alt={review.author.name}
                          className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-100"
                        />
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="leading-tight">{review.author.name}</h4>
                            <span className="px-2 py-0.5 bg-accent/10 text-accent text-xs rounded-full">Gezgin</span>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3.5 h-3.5 ${
                                    i < review.rating
                                      ? 'fill-amber-400 text-amber-400'
                                      : 'fill-gray-200 text-gray-200'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-muted-foreground">· {review.timestamp}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right Actions */}
                      <div className="flex items-center gap-1">
                        <button 
                          className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-secondary transition-all"
                          title="Daha fazla"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Review Content */}
                    <p className="text-sm text-gray-800 leading-relaxed mb-4">{review.content}</p>
                    
                    {/* Interaction Bar */}
                    <div className="flex items-center gap-6 pt-3 border-t border-border/50">
                      {/* Vote Buttons */}
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 rounded-md text-gray-400 hover:text-green-600 hover:bg-green-50 transition-all">
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-medium text-gray-700">{review.upvotes}</span>
                        <button className="p-1.5 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all">
                          <ArrowDown className="w-4 h-4" />
                        </button>
                      </div>

                      <button className="flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-all">
                        <Heart className="w-4 h-4" />
                      </button>

                      <button className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-all">
                        <MessageCircle className="w-4 h-4" />
                      </button>

                      <button className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-all">
                        <Share2 className="w-4 h-4" />
                      </button>

                      <button className="flex items-center gap-2 text-muted-foreground hover:text-orange-500 transition-all ml-auto">
                        <Flag className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'menu' && (
            <div className="space-y-6">
              <div>
                <h3 className="mb-4 text-accent">☕ Sıcak İçecekler</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 rounded-lg hover:bg-secondary transition-colors">
                    <div>
                      <p className="font-medium">Espresso</p>
                      <p className="text-sm text-muted-foreground">Tek shot, yoğun aroma</p>
                    </div>
                    <span className="text-accent">45₺</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg hover:bg-secondary transition-colors">
                    <div>
                      <p className="font-medium">Americano</p>
                      <p className="text-sm text-muted-foreground">Espresso + sıcak su</p>
                    </div>
                    <span className="text-accent">50₺</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg hover:bg-secondary transition-colors">
                    <div>
                      <p className="font-medium">Cappuccino</p>
                      <p className="text-sm text-muted-foreground">Espresso + köpüklü süt</p>
                    </div>
                    <span className="text-accent">65₺</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg hover:bg-secondary transition-colors">
                    <div>
                      <p className="font-medium">Latte</p>
                      <p className="text-sm text-muted-foreground">Espresso + sıcak süt</p>
                    </div>
                    <span className="text-accent">70₺</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg hover:bg-secondary transition-colors">
                    <div>
                      <p className="font-medium">Türk Kahvesi</p>
                      <p className="text-sm text-muted-foreground">Geleneksel yapım</p>
                    </div>
                    <span className="text-accent">40₺</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-accent">🥤 Soğuk İçecekler</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 rounded-lg hover:bg-secondary transition-colors">
                    <div>
                      <p className="font-medium">Ice Latte</p>
                      <p className="text-sm text-muted-foreground">Soğuk süt + espresso</p>
                    </div>
                    <span className="text-accent">75₺</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg hover:bg-secondary transition-colors">
                    <div>
                      <p className="font-medium">Frappe</p>
                      <p className="text-sm text-muted-foreground">Buzlu köpüklü kahve</p>
                    </div>
                    <span className="text-accent">80₺</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg hover:bg-secondary transition-colors">
                    <div>
                      <p className="font-medium">Limonata</p>
                      <p className="text-sm text-muted-foreground">Ev yapımı, ferah</p>
                    </div>
                    <span className="text-accent">55₺</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-accent">🍰 Tatlılar</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 rounded-lg hover:bg-secondary transition-colors">
                    <div>
                      <p className="font-medium">Cheesecake</p>
                      <p className="text-sm text-muted-foreground">Orman meyveli</p>
                    </div>
                    <span className="text-accent">85₺</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg hover:bg-secondary transition-colors">
                    <div>
                      <p className="font-medium">Brownie</p>
                      <p className="text-sm text-muted-foreground">Çikolata aşkına</p>
                    </div>
                    <span className="text-accent">70₺</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg hover:bg-secondary transition-colors">
                    <div>
                      <p className="font-medium">Sütlaç</p>
                      <p className="text-sm text-muted-foreground">Fırında karamelize</p>
                    </div>
                    <span className="text-accent">60₺</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'info' && (
            <div className="space-y-6">
              {/* Description */}
              <div>
                <h3 className="mb-3">📝 Mekan Açıklaması</h3>
                <p className="text-muted-foreground leading-relaxed bg-secondary/30 p-4 rounded-lg">
                  {mockVenue.description}
                </p>
              </div>

              {/* Tags */}
              <div>
                <h3 className="mb-3">🏷️ Özellikler & Etiketler</h3>
                <div className="flex flex-wrap gap-2">
                  {mockVenue.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1.5 bg-accent/10 text-accent rounded-full text-sm hover:bg-accent/20 transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-accent" />
                    Konum
                  </h3>
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mockVenue.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-sm bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors flex items-center gap-1.5"
                  >
                    <MapPin className="w-4 h-4" />
                    Yol Tarifi Al
                  </a>
                </div>
                <div className="relative w-full h-[300px] overflow-hidden rounded-lg border border-border">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1594936926580-f80887756bde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb29nbGUlMjBtYXBzJTIwaXN0YW5idWwlMjBsb2NhdGlvbnxlbnwxfHx8fDE3NjQyNDc3NzN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Konum Haritası"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 bg-white px-3 py-2 rounded-lg shadow-lg">
                    <p className="text-sm font-medium">{mockVenue.name}</p>
                    <p className="text-xs text-muted-foreground">{mockVenue.address}</p>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div>
                <h3 className="mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-accent" />
                  Çalışma Saatleri
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/30">
                    <span className="font-medium">Pazartesi</span>
                    <span className="text-muted-foreground">08:00 - 23:00</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/30">
                    <span className="font-medium">Salı</span>
                    <span className="text-muted-foreground">08:00 - 23:00</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/30">
                    <span className="font-medium">Çarşamba</span>
                    <span className="text-muted-foreground">08:00 - 23:00</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/30">
                    <span className="font-medium">Perşembe</span>
                    <span className="text-muted-foreground">08:00 - 23:00</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/30">
                    <span className="font-medium">Cuma</span>
                    <span className="text-muted-foreground">08:00 - 01:00</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-accent/10 border border-accent/20">
                    <span className="font-medium text-accent">Cumartesi</span>
                    <span className="text-accent">10:00 - 02:00</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-accent/10 border border-accent/20">
                    <span className="font-medium text-accent">Pazar</span>
                    <span className="text-accent">10:00 - 23:00</span>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>


    </div>
  );
}