import { MapPin } from 'lucide-react';

interface PlaceCardProps {
  id: number;
  name: string;
  description: string;
  image: string;
  rating?: number;
  category: 'historic' | 'tourist';
}

export function PlaceCard({ name, image, category }: PlaceCardProps) {
  const categoryLabel = category === 'historic' ? 'Tarihi Mekan' : 'Turistik Yer';
  
  return (
    <div className="bg-white border border-border rounded-lg overflow-hidden hover:border-accent/30 transition-all duration-300 cursor-pointer group">
      {/* Image */}
      <div className="relative h-36 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2">
          <span className="px-2 py-1 bg-white text-accent text-xs rounded shadow-sm">
            {categoryLabel}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        <h4 className="mb-2 group-hover:text-accent transition-colors line-clamp-2">{name}</h4>
        
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">Konya</span>
        </div>
      </div>
    </div>
  );
}