import { MessageCircle, ArrowUp, ArrowDown, Eye, Bookmark, Share2 } from 'lucide-react';
import { useState } from 'react';

interface TopicCardProps {
  id: number;
  title: string;
  description?: string;
  author: {
    name: string;
    username: string;
    avatar: string;
    badge?: {
      text: string;
      color: string;
    };
  };
  category: string;
  timestamp: string;
  postCount: number;
  upvotes: number;
  views: number;
  lastActivity?: string;
  onClick?: () => void;
}

export function TopicCard({
  id,
  title,
  description,
  author,
  category,
  timestamp,
  postCount,
  upvotes,
  views,
  lastActivity,
  onClick,
}: TopicCardProps) {
  const [voteState, setVoteState] = useState<'up' | 'down' | null>(null);
  const [upvoteCount, setUpvoteCount] = useState(upvotes);
  const [isSaved, setIsSaved] = useState(false);
  const [commentCount] = useState(postCount);

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
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const handleUpvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (voteState === 'up') {
      setVoteState(null);
      setUpvoteCount(upvoteCount - 1);
    } else {
      setVoteState('up');
      setUpvoteCount(voteState === 'down' ? upvoteCount + 2 : upvoteCount + 1);
    }
  };

  const handleDownvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (voteState === 'down') {
      setVoteState(null);
      setUpvoteCount(upvoteCount + 1);
    } else {
      setVoteState('down');
      setUpvoteCount(voteState === 'up' ? upvoteCount - 2 : upvoteCount - 1);
    }
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={onClick}
      className="bg-white border border-border rounded-lg mb-4 hover:border-muted transition-colors overflow-hidden cursor-pointer"
    >
      <div className="p-3 lg:p-5">
        {/* Header: User Info + Actions */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <img
              src={author.avatar}
              alt={author.name}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-100"
            />
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h4 className="leading-tight">{author.name}</h4>
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
              <p className="text-xs text-muted-foreground">
                @{author.username} · {timestamp}
                {lastActivity && (
                  <>
                    {' · '}
                    <span>Son: {lastActivity}</span>
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleSave}
              className={`p-2 rounded-md transition-all ${
                isSaved
                  ? 'text-accent bg-violet-50'
                  : 'text-gray-400 hover:text-accent hover:bg-secondary'
              }`}
              title="Kaydet"
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-accent' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-secondary transition-all"
              title="Paylaş"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg mb-2">{title}</h3>

        {/* Description */}
        {description && (
          <p className="mb-4 text-gray-800 leading-relaxed line-clamp-2">
            {description}
          </p>
        )}

        {/* Category Tag */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="px-2.5 py-1 bg-secondary text-xs rounded-md hover:bg-muted transition-colors cursor-pointer">
            #{category}
          </span>
        </div>

        {/* Interaction Bar */}
        <div className="flex items-center gap-4 pt-3 border-t border-border/50">
          {/* Upvote/Downvote */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleUpvote}
              className={`p-1.5 rounded-md transition-all ${
                voteState === 'up'
                  ? 'text-green-600 bg-green-50'
                  : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              <ArrowUp
                className={`w-4 h-4 transition-all ${
                  voteState === 'up' ? 'fill-green-600' : ''
                }`}
              />
            </button>
            <span
              className={`text-sm font-medium min-w-[1.5rem] text-center ${
                voteState === 'up'
                  ? 'text-green-600'
                  : voteState === 'down'
                  ? 'text-red-600'
                  : 'text-gray-700'
              }`}
            >
              {upvoteCount}
            </span>
            <button
              onClick={handleDownvote}
              className={`p-1.5 rounded-md transition-all ${
                voteState === 'down'
                  ? 'text-red-600 bg-red-50'
                  : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
              }`}
            >
              <ArrowDown
                className={`w-4 h-4 transition-all ${
                  voteState === 'down' ? 'fill-red-600' : ''
                }`}
              />
            </button>
          </div>

          {/* Comments */}
          <button
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm">{commentCount}</span>
          </button>

          <div className="flex-1"></div>

          {/* Views - Right aligned */}
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Eye className="w-4 h-4" />
            <span>{views}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
