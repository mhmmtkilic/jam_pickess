import { User, MessageCircle, TrendingUp, Tag, Bookmark } from 'lucide-react';

interface PostDetailSidebarProps {
  author: {
    name: string;
    username: string;
    avatar: string;
    badge?: {
      text: string;
      color: string;
    };
    bio?: string;
  };
  relatedPosts?: Array<{
    id: number;
    title: string;
    author: string;
    stats: {
      upvotes: number;
      comments: number;
    };
  }>;
  tags?: string[];
}

export function PostDetailSidebar({ author, relatedPosts, tags }: PostDetailSidebarProps) {
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
    <aside className="space-y-4 sticky top-20 max-w-[320px] w-full">
      {/* Author Info Card */}
      <div className="bg-white border border-border rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <User className="w-5 h-5 text-accent" />
          <h3>Yazar Hakkında</h3>
        </div>

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

        {author.bio && (
          <p className="text-sm text-muted-foreground leading-relaxed mt-3">
            {author.bio}
          </p>
        )}
      </div>

      {/* Tags Card */}
      {tags && tags.length > 0 && (
        <div className="bg-white border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <Tag className="w-5 h-5 text-accent" />
            <h3>Etiketler</h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <button
                key={index}
                className="px-2.5 py-1.5 bg-secondary text-xs rounded-md hover:bg-violet-50 hover:text-accent transition-colors"
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Related Posts Card */}
      {relatedPosts && relatedPosts.length > 0 && (
        <div className="bg-white border border-border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-accent" />
            <h3>İlgili Gönderiler</h3>
          </div>

          <div className="space-y-3">
            {relatedPosts.map((post) => (
              <button
                key={post.id}
                className="w-full text-left p-3 rounded-lg hover:bg-secondary transition-colors group"
              >
                <h4 className="text-sm line-clamp-2 mb-2 group-hover:text-accent transition-colors">
                  {post.title}
                </h4>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{post.author}</span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      {post.stats.comments}
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {post.stats.upvotes}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <button className="w-full text-xs text-accent hover:text-accent/80 transition-colors mt-3 py-2 border-t border-border">
            Daha Fazla Göster
          </button>
        </div>
      )}

      {/* Quick Actions Card */}
      <div className="bg-white border border-border rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <Bookmark className="w-5 h-5 text-accent" />
          <h3>Hızlı İşlemler</h3>
        </div>

        <div className="space-y-2">
          <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-secondary transition-colors">
            Kaydedilenlerime Ekle
          </button>
          <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-secondary transition-colors">
            Rapor Et
          </button>
          <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-secondary transition-colors">
            Bağlantıyı Kopyala
          </button>
        </div>
      </div>
    </aside>
  );
}
