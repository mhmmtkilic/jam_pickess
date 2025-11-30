import { ArrowUp, ArrowDown, Heart, MessageCircle, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

interface CommentProps {
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
  upvotes: number;
  replies?: number;
  level?: number;
}

export function Comment({ author, content, timestamp, upvotes, replies = 0, level = 0 }: CommentProps) {
  const [voteState, setVoteState] = useState<'up' | 'down' | null>(null);
  const [upvoteCount, setUpvoteCount] = useState(upvotes);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 10));
  const [showReplyBox, setShowReplyBox] = useState(false);

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

  const handleUpvote = () => {
    if (voteState === 'up') {
      setVoteState(null);
      setUpvoteCount(upvoteCount - 1);
    } else {
      setVoteState('up');
      setUpvoteCount(voteState === 'down' ? upvoteCount + 2 : upvoteCount + 1);
    }
  };

  const handleDownvote = () => {
    if (voteState === 'down') {
      setVoteState(null);
      setUpvoteCount(upvoteCount + 1);
    } else {
      setVoteState('down');
      setUpvoteCount(voteState === 'up' ? upvoteCount - 2 : upvoteCount - 1);
    }
  };

  return (
    <div className={`${level > 0 ? 'ml-8 border-l-2 border-border/50 pl-4' : ''}`}>
      <div className="py-4 group">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <img
              src={author.avatar}
              alt={author.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-100"
            />
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h4 className="text-sm">{author.name}</h4>
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
              </p>
            </div>
          </div>

          <button className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-secondary transition-all opacity-0 group-hover:opacity-100">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <p className="text-sm mb-3 leading-relaxed">{content}</p>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Upvote/Downvote */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleUpvote}
              className={`p-1 rounded-md transition-all ${
                voteState === 'up'
                  ? 'text-green-600 bg-green-50'
                  : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              <ArrowUp
                className={`w-3.5 h-3.5 transition-all ${
                  voteState === 'up' ? 'fill-green-600' : ''
                }`}
              />
            </button>
            <span
              className={`text-xs font-medium min-w-[1.5rem] text-center ${
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
              className={`p-1 rounded-md transition-all ${
                voteState === 'down'
                  ? 'text-red-600 bg-red-50'
                  : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
              }`}
            >
              <ArrowDown
                className={`w-3.5 h-3.5 transition-all ${
                  voteState === 'down' ? 'fill-red-600' : ''
                }`}
              />
            </button>
          </div>

          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`flex items-center gap-1.5 text-xs transition-all ${
              isLiked ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-red-500' : ''}`} />
            <span>{isLiked ? likeCount + 1 : likeCount}</span>
          </button>

          <button
            onClick={() => setShowReplyBox(!showReplyBox)}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-accent transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Yanıtla</span>
          </button>

          {replies > 0 && (
            <span className="text-xs text-muted-foreground">
              {replies} yanıt
            </span>
          )}
        </div>

        {/* Reply Box */}
        {showReplyBox && (
          <div className="mt-3 ml-11">
            <textarea
              placeholder="Yanıtınızı yazın..."
              className="w-full p-3 border border-border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
              rows={3}
            />
            <div className="flex gap-2 mt-2">
              <button className="px-3 py-1.5 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors text-xs">
                Gönder
              </button>
              <button
                onClick={() => setShowReplyBox(false)}
                className="px-3 py-1.5 text-muted-foreground hover:text-text transition-colors text-xs"
              >
                İptal
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
