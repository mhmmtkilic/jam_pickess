import { Download, MessageCircle, Star, FileText, FileSpreadsheet, Archive, ArrowUp, ArrowDown, Bookmark, MoreHorizontal, Share2, Heart } from 'lucide-react';
import { useState } from 'react';

interface AcademicCardProps {
  id: number;
  courseCode: string;
  courseName: string;
  university?: string;
  department?: string;
  uploader: {
    name: string;
    username: string;
    avatar: string;
    badge?: {
      text: string;
      color: string;
    };
  };
  timestamp: string;
  file: {
    name: string;
    type: 'pdf' | 'doc' | 'zip';
    size: string;
    pages?: number;
  };
  description: string;
  rating: number;
  ratingCount: number;
  downloads: number;
  comments: number;
}

export function AcademicCard({
  courseCode,
  courseName,
  university,
  department,
  uploader,
  timestamp,
  file,
  description,
  rating,
  ratingCount,
  downloads,
  comments,
}: AcademicCardProps) {
  const [userRating, setUserRating] = useState<number | null>(null);
  const [voteState, setVoteState] = useState<'up' | 'down' | null>(null);
  const [upvoteCount, setUpvoteCount] = useState(downloads);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(34);

  const getFileIcon = () => {
    switch (file.type) {
      case 'pdf':
        return <FileText className="w-10 h-10 text-red-500" />;
      case 'doc':
        return <FileSpreadsheet className="w-10 h-10 text-blue-500" />;
      case 'zip':
        return <Archive className="w-10 h-10 text-yellow-600" />;
    }
  };

  const getFileColor = () => {
    switch (file.type) {
      case 'pdf':
        return 'bg-red-50 border-red-200';
      case 'doc':
        return 'bg-blue-50 border-blue-200';
      case 'zip':
        return 'bg-yellow-50 border-yellow-200';
    }
  };

  const formatDownloads = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  const getBadgeColor = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-100 text-blue-700';
      case 'orange':
        return 'bg-orange-100 text-orange-700';
      case 'purple':
        return 'bg-purple-100 text-purple-700';
      case 'green':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
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
    <div className="bg-white border border-border rounded-lg mb-4 hover:border-muted transition-colors overflow-hidden">
      <div className="p-3 lg:p-5">
        {/* Header: User Info + Actions */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <img 
              src={uploader.avatar} 
              alt={uploader.name}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-gray-100"
            />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="leading-tight">{uploader.name}</h4>
                {uploader.badge && (
                  <span className={`px-2 py-0.5 rounded-full text-xs ${getBadgeColor(uploader.badge.color)}`}>
                    {uploader.badge.text}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">@{uploader.username} · {timestamp}</p>
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

        {/* Breadcrumb with Course Info */}
        <div className="text-xs text-muted-foreground mb-3 flex items-center flex-wrap gap-1">
          {university && (
            <button className="hover:text-accent hover:underline transition-colors">
              {university}
            </button>
          )}
          {university && department && <span>•</span>}
          {department && (
            <button className="hover:text-accent hover:underline transition-colors">
              {department}
            </button>
          )}
          {(university || department) && (courseCode || courseName) && <span>•</span>}
          {courseCode && (
            <button className="hover:text-accent hover:underline transition-colors">
              {courseCode}
            </button>
          )}
          {courseCode && courseName && <span>-</span>}
          {courseName && (
            <button className="hover:text-accent hover:underline transition-colors">
              {courseName}
            </button>
          )}
        </div>

        {/* File Container - Digital Dosya Rafı */}
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 mb-4">
          <div className="flex items-center gap-4">
            {/* File Icon with Badge */}
            <div className="relative shrink-0">
              {getFileIcon()}
              <div className="absolute -top-1 -right-1 bg-white rounded px-1.5 py-0.5 text-[10px] font-medium shadow-sm border border-border">
                {file.type.toUpperCase()}
              </div>
            </div>

            {/* File Info */}
            <div className="flex-1 min-w-0">
              <h4 className="font-medium mb-1 truncate text-gray-900">{file.name}</h4>
              <div className="text-sm text-muted-foreground">
                {file.size}
                {file.pages && ` • ${file.pages} Sayfa`}
                {downloads && ` • ${formatDownloads(downloads)} indirme`}
              </div>
            </div>

            {/* Download Button */}
            <div className="shrink-0">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg transition-colors">
                <Download className="w-4 h-4" />
                <span className="text-sm">İndir</span>
              </button>
            </div>
          </div>
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