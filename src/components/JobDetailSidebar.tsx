import { ArrowUp, MessageCircle, TrendingUp, Briefcase, Home, BookOpen, ShoppingBag } from 'lucide-react';

interface JobDetailSidebarProps {
  author: {
    name: string;
    username: string;
    avatar: string;
    bio: string;
    badge?: {
      text: string;
      color: string;
    };
  };
  category: string;
  relatedJobs: Array<{
    id: number;
    title: string;
    category: string;
    payment: string;
    stats: {
      upvotes: number;
      comments: number;
    };
  }>;
}

export function JobDetailSidebar({ author, category, relatedJobs }: JobDetailSidebarProps) {
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

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'tutor':
        return <BookOpen className="w-4 h-4 text-blue-600" />;
      case 'roommate':
        return <Home className="w-4 h-4 text-green-600" />;
      case 'sale':
        return <ShoppingBag className="w-4 h-4 text-orange-600" />;
      default:
        return <Briefcase className="w-4 h-4 text-purple-600" />;
    }
  };

  return (
    <div className="w-80 space-y-5">
      {/* Author Info Card */}
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

        {author.bio && (
          <p className="text-sm text-gray-700 mt-3">{author.bio}</p>
        )}
      </div>

      {/* Related Jobs */}
      <div className="bg-white border border-border rounded-lg overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-accent" />
            Benzer İlanlar
          </h3>
        </div>
        <div className="divide-y divide-border">
          {relatedJobs.map((job) => (
            <div
              key={job.id}
              className="p-4 hover:bg-secondary/50 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-2 mb-2">
                {getCategoryIcon(job.category)}
                <h4 className="text-sm flex-1 line-clamp-2">{job.title}</h4>
              </div>
              <p className="text-xs text-accent font-medium mb-2">{job.payment}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <ArrowUp className="w-3 h-3" />
                  <span>{job.stats.upvotes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-3 h-3" />
                  <span>{job.stats.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200 rounded-lg p-4">
        <h3 className="text-sm font-medium mb-2 text-violet-900">💡 İpucu</h3>
        <p className="text-xs text-violet-700 leading-relaxed">
          İlan sahibiyle iletişime geçmeden önce profil bilgilerini inceleyin ve ilan detaylarını dikkatlice okuyun.
        </p>
      </div>
    </div>
  );
}