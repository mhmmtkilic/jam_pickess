import { MapPin, DollarSign, Calendar, Bookmark, Share2, Briefcase, Home, BookOpen, Heart, MessageCircle, Code, Clock, ShoppingBag, ArrowUp, ArrowDown, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

interface JobCardProps {
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
  category: 'job' | 'roommate' | 'tutor' | 'internship' | 'parttime' | 'freelance' | 'sale';
  title: string;
  details: {
    location: string;
    payment: string;
    time: string;
  };
  description: string;
  timestamp: string;
}

export function JobCard({
  author,
  category,
  title,
  details,
  description,
  timestamp,
}: JobCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(28);
  const [commentCount] = useState(5);
  const [voteState, setVoteState] = useState<'up' | 'down' | null>(null);
  const [upvoteCount, setUpvoteCount] = useState(42);

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

  const getCategoryConfig = () => {
    switch (category) {
      case 'job':
        return {
          icon: <Briefcase className="w-4 h-4" />,
          label: 'İş İlanı',
          color: 'bg-blue-50 text-blue-700 border-blue-200',
          buttonText: 'Başvur',
        };
      case 'roommate':
        return {
          icon: <Home className="w-4 h-4" />,
          label: 'Ev Arkadaşı',
          color: 'bg-green-50 text-green-700 border-green-200',
          buttonText: 'İletişime Geç',
        };
      case 'tutor':
        return {
          icon: <BookOpen className="w-4 h-4" />,
          label: 'Özel Ders',
          color: 'bg-purple-50 text-purple-700 border-purple-200',
          buttonText: 'İletişime Geç',
        };
      case 'internship':
        return {
          icon: <Briefcase className="w-4 h-4" />,
          label: 'Staj',
          color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          buttonText: 'Başvur',
        };
      case 'parttime':
        return {
          icon: <Clock className="w-4 h-4" />,
          label: 'Part-time',
          color: 'bg-amber-50 text-amber-700 border-amber-200',
          buttonText: 'Başvur',
        };
      case 'freelance':
        return {
          icon: <Code className="w-4 h-4" />,
          label: 'Freelance',
          color: 'bg-pink-50 text-pink-700 border-pink-200',
          buttonText: 'İletişime Geç',
        };
      case 'sale':
        return {
          icon: <ShoppingBag className="w-4 h-4" />,
          label: 'Satış',
          color: 'bg-orange-50 text-orange-700 border-orange-200',
          buttonText: 'Satın Al',
        };
      default:
        return {
          icon: <Briefcase className="w-4 h-4" />,
          label: 'İlan',
          color: 'bg-gray-50 text-gray-700 border-gray-200',
          buttonText: 'İletişime Geç',
        };
    }
  };

  const config = getCategoryConfig();

  const getBadgeColor = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-blue-100 text-blue-700',
      orange: 'bg-orange-100 text-orange-700',
      purple: 'bg-purple-100 text-purple-700',
      green: 'bg-green-100 text-green-700',
      pink: 'bg-pink-100 text-pink-700',
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

        {/* Job Title */}
        <h3 className="text-lg mb-3">{title}</h3>

        {/* Details Grid */}
        <div className="grid grid-cols-1 gap-2 mb-3 bg-gray-50 rounded-lg p-3">
          {/* Category Badge */}
          <div className="flex items-center gap-2 text-sm pb-2 border-b border-border/30">
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs ${config.color}`}>
              {config.icon}
              <span>{config.label}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Konum:</span>
            <span>{details.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <DollarSign className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Ücret:</span>
            <span className="text-accent">{details.payment}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Zaman:</span>
            <span>{details.time}</span>
          </div>
        </div>

        <p className="text-sm text-gray-800 leading-relaxed mb-4">
          {description}
        </p>

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
              <ArrowUp className={`w-4 h-4 transition-all ${
                voteState === 'up' ? 'fill-green-600' : ''
              }`} />
            </button>
            <span className={`text-sm font-medium min-w-[1.5rem] text-center ${
              voteState === 'up' ? 'text-green-600' : voteState === 'down' ? 'text-red-600' : 'text-gray-700'
            }`}>{upvoteCount}</span>
            <button 
              onClick={handleDownvote}
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
            onClick={() => {
              setIsLiked(!isLiked);
              setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
            }}
            className={`flex items-center gap-2 transition-all ${
              isLiked ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500' : ''}`} />
            <span className="text-sm">{likeCount}</span>
          </button>

          <button className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-all">
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm">{commentCount}</span>
          </button>

          <div className="flex-1"></div>

          {/* Desktop: Bookmark + More Options */}
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

          <button className="hidden sm:flex items-center gap-2 text-muted-foreground hover:text-accent transition-all">
            <MoreHorizontal className="w-4 h-4" />
          </button>

          {/* CTA Button - Hidden on mobile */}
          <button className="hidden sm:block px-6 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg transition-colors text-sm">
            {config.buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}