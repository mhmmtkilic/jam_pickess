import { ArrowUp, MessageCircle, MapPin, Star } from 'lucide-react';

interface WikiDetailSidebarProps {
  author: {
    name: string;
    username: string;
    avatar: string;
    bio?: string;
    badge?: {
      text: string;
      color: string;
    };
  };
  venue?: {
    name: string;
    category: string;
    rating?: number;
    address?: string;
    phone?: string;
    website?: string;
    hours?: string;
  };
  tags: string[];
  relatedPosts: Array<{
    id: number;
    venueName: string;
    author: string;
    stats: {
      upvotes: number;
      comments: number;
    };
  }>;
}

export function WikiDetailSidebar({ author, venue, tags, relatedPosts }: WikiDetailSidebarProps) {
  const getBadgeColorClass = (color?: string) => {
    switch (color) {
      case 'purple':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'blue':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'green':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pink':
        return 'bg-pink-100 text-pink-700 border-pink-200';
      case 'orange':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="w-80 space-y-5 shrink-0">
      {/* Author Card */}
      <div className="bg-white border border-border rounded-lg p-5">
        <div className="flex items-start gap-3">
          <img
            src={author.avatar}
            alt={author.name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="truncate">{author.name}</h4>
              {author.badge && (
                <span
                  className={`text-xs px-2 py-0.5 rounded border ${getBadgeColorClass(
                    author.badge.color
                  )}`}
                >
                  {author.badge.text}
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">@{author.username}</p>
          </div>
        </div>

        {author.bio && <p className="text-sm text-muted-foreground mt-3">{author.bio}</p>}
      </div>

      {/* Venue Quick Info - Only show if venue exists */}
      {venue && (
        <div className="bg-white border border-border rounded-lg p-5">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-accent" />
            <h3 className="text-sm">Mekan Bilgisi</h3>
          </div>

          <div className="space-y-3">
            <div>
              <p className="font-medium mb-1">{venue.name}</p>
              <p className="text-xs text-muted-foreground">{venue.category}</p>
            </div>

            {venue.rating && (
              <div className="flex items-center gap-1.5 py-2 px-3 bg-secondary/50 rounded-lg">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{venue.rating}</span>
                <span className="text-xs text-muted-foreground">/5.0</span>
              </div>
            )}

            <button className="w-full py-2 border border-border rounded-lg hover:bg-secondary transition-colors text-sm">
              Mekanı Görüntüle
            </button>
          </div>
        </div>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div className="bg-white border border-border rounded-lg p-5">
          <h3 className="text-sm mb-3">Etiketler</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-2.5 py-1 bg-secondary text-xs rounded-md hover:bg-muted transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Related Posts */}
      <div className="bg-white border border-border rounded-lg p-5">
        <h3 className="text-sm mb-4">Benzer Yorumlar</h3>
        <div className="space-y-3">
          {relatedPosts.map((post) => (
            <div
              key={post.id}
              className="pb-3 border-b border-border last:border-0 last:pb-0 cursor-pointer hover:bg-secondary/30 -mx-2 px-2 py-2 rounded transition-colors"
            >
              <div className="flex items-start gap-2 mb-2">
                <MapPin className="w-3.5 h-3.5 text-accent mt-0.5 shrink-0" />
                <p className="text-sm font-medium leading-snug">{post.venueName}</p>
              </div>
              <p className="text-xs text-muted-foreground mb-2">@{post.author}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <ArrowUp className="w-3 h-3" />
                  <span>{post.stats.upvotes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-3 h-3" />
                  <span>{post.stats.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
