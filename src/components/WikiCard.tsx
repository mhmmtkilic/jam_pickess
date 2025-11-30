import { ArrowUp, ArrowDown, MessageCircle, Share2, Bookmark, MoreHorizontal, MapPin, BookOpen, Heart } from 'lucide-react';
import { useState } from 'react';

interface WikiCardProps {
  id: number;
  author: {
    name: string;
    username: string;
    avatar: string;
    badge?: {
      text: string;
      color: string;
    };
  };
  content: string;
  timestamp: string;
  topicLink?: {
    icon: 'venue' | 'course';
    text: string;
  };
  upvotes: number;
  downvotes: number;
  comments: number;
  image?: string;
  tags?: string[];
}

export function WikiCard({
  author,
  content,
  timestamp,
  topicLink,
  upvotes,
  downvotes,
  comments,
  image,
  tags,
}: WikiCardProps) {
  const [voteState, setVoteState] = useState<'up' | 'down' | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);

  const displayContent = content.length > 200 && !showFullContent 
    ? content.slice(0, 200) + '...' 
    : content;

  const getBadgeColor = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-blue-100 text-blue-700',
      orange: 'bg-orange-100 text-orange-700',
      purple: 'bg-purple-100 text-purple-700',
    };
    return colors[color] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="bg-white border border-border rounded-lg mb-4 hover:border-muted transition-colors overflow-hidden">
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
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="leading-tight">{author.name}</h4>
                {author.badge && (
                  <span className={`px-2 py-0.5 rounded-full text-xs ${getBadgeColor(author.badge.color)}`}>
                    {author.badge.text}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">@{author.username} · {timestamp}</p>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-2 rounded-md transition-all ${
                isBookmarked 
                  ? 'text-accent bg-violet-50' 
                  : 'text-gray-400 hover:text-accent hover:bg-secondary'
              }`}
              title="Kaydet"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-accent' : ''}`} />
            </button>
            <button 
              className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-secondary transition-all"
              title="Paylaş"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Topic Link */}
        {topicLink && (
          <div className="flex items-center gap-1 mb-3 text-sm text-muted-foreground">
            {topicLink.icon === 'venue' ? (
              <MapPin className="w-3.5 h-3.5" />
            ) : (
              <BookOpen className="w-3.5 h-3.5" />
            )}
            <span className="hover:text-accent cursor-pointer">{topicLink.text}</span>
            <span>başlığına yazdı</span>
          </div>
        )}

        {/* Post Content */}
        <p className="mb-4 text-gray-800 leading-relaxed">
          {displayContent}
          {content.length > 200 && (
            <button 
              onClick={() => setShowFullContent(!showFullContent)}
              className="text-accent hover:underline ml-1"
            >
              {showFullContent ? 'Daha az göster' : 'Devamını gör'}
            </button>
          )}
        </p>

        {image && (
          <img 
            src={image} 
            alt="Post content"
            className="w-full rounded-lg object-cover mb-4"
          />
        )}

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span 
                key={index}
                className="px-2.5 py-1 bg-secondary text-xs rounded-md hover:bg-muted transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Interaction Bar */}
        <div className="flex items-center gap-4 pt-3 border-t border-border/50">
          {/* Upvote/Downvote */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setVoteState(voteState === 'up' ? null : 'up')}
              className={`p-1.5 rounded-md transition-all ${
                voteState === 'up' 
                  ? 'text-green-600 bg-green-50' 
                  : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              <ArrowUp className={`w-4 h-4 transition-all ${
                voteState === 'up' ? 'fill-green-600' : ''
              }`} />
            </button>
            <span className={`text-sm font-medium min-w-[1.5rem] text-center ${
              voteState === 'up' ? 'text-green-600' : voteState === 'down' ? 'text-red-600' : 'text-gray-700'
            }`}>
              {upvotes - downvotes + (voteState === 'up' ? 1 : voteState === 'down' ? -1 : 0)}
            </span>
            <button
              onClick={() => setVoteState(voteState === 'down' ? null : 'down')}
              className={`p-1.5 rounded-md transition-all ${
                voteState === 'down' 
                  ? 'text-red-600 bg-red-50' 
                  : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
              }`}
            >
              <ArrowDown className={`w-4 h-4 transition-all ${
                voteState === 'down' ? 'fill-red-600' : ''
              }`} />
            </button>
          </div>

          <button 
            onClick={() => setIsLiked(!isLiked)}
            className={`flex items-center gap-2 transition-all ${
              isLiked ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500' : ''}`} />
            <span className="text-sm">{isLiked ? 43 : 42}</span>
          </button>

          <button className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-all">
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm">{comments}</span>
          </button>

          <div className="flex-1"></div>

          {/* Bookmark - Desktop only (mobile has it in header) */}
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`hidden sm:flex items-center gap-2 transition-all ${
              isBookmarked 
                ? 'text-accent' 
                : 'text-muted-foreground hover:text-accent'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-accent' : ''}`} />
          </button>

          {/* More Options - Desktop only */}
          <button className="hidden sm:flex items-center gap-2 text-muted-foreground hover:text-accent transition-all">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}