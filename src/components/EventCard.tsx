import { MapPin, Clock } from 'lucide-react';

interface EventCardProps {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  image: string;
  category: string;
}

export function EventCard({ title, date, time, location, image }: EventCardProps) {
  // Format date to show only day and month (e.g., "15 Ara")
  const formatDate = (dateString: string) => {
    const months = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'];
    const parts = dateString.split(' ');
    if (parts.length >= 2) {
      const day = parts[0];
      const monthIndex = months.findIndex(m => dateString.includes(m));
      if (monthIndex !== -1) {
        return `${day} ${months[monthIndex]}`;
      }
    }
    return dateString.split(' ').slice(0, 2).join(' ');
  };

  return (
    <div className="bg-white border border-border rounded-lg overflow-hidden hover:border-accent/30 transition-all duration-300 cursor-pointer group">
      {/* Image */}
      <div className="relative h-36 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2">
          <span className="px-2 py-1 bg-white text-accent text-xs rounded shadow-sm">
            {formatDate(date)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3">
        <h4 className="mb-2 group-hover:text-accent transition-colors line-clamp-2">{title}</h4>

        {/* Meta Info */}
        <div className="space-y-1 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}