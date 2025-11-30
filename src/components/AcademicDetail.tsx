import { ArrowUp, ArrowDown, Heart, MessageCircle, Share2, Bookmark, Eye, MoreHorizontal, Download, FileText, FileSpreadsheet, Archive, BookOpen } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Comment } from './Comment';
import { getPostComments, getUserById } from '../data/mock';

// Helper function to format timestamp
const formatTimestamp = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return `${diffSecs}s önce`;
  if (diffMins < 60) return `${diffMins}dk önce`;
  if (diffHours < 24) return `${diffHours}s önce`;
  if (diffDays === 1) return "Dün";
  if (diffDays < 7) return `${diffDays} gün önce`;
  return date.toLocaleDateString("tr-TR");
};

// Transform comments from JSON to component format with nested structure
const transformComments = (postId: string | number) => {
  // Try different postId formats - academic might use acm_ prefix or pst_ prefix
  let postIdStr = typeof postId === 'number' ? `acm_${postId.toString().padStart(3, '0')}` : postId;
  let comments = getPostComments(postIdStr);
  
  // If no comments found with acm_ prefix, try pst_ prefix
  if (comments.length === 0 && typeof postId === 'number') {
    postIdStr = `pst_${postId.toString().padStart(3, '0')}`;
    comments = getPostComments(postIdStr);
  }
  const rootComments = comments.filter(c => !c.parentCommentId);
  
  const buildCommentTree = (comment: typeof comments[number], allComments: typeof comments): any => {
    const replies = allComments.filter(c => c.parentCommentId === comment.id);
    const author = getUserById(comment.authorId);
    
    return {
      author: author ? {
        name: author.displayName || author.username,
        username: author.username,
        avatar: author.avatar,
        ...(author.role && {
          badge: {
            text: author.role,
            color: author.role === "konya_bilgesi" ? "purple" : author.role === "seyyah" ? "blue" : "green",
          },
        }),
      } : {
        name: "Bilinmeyen Kullanıcı",
        username: "unknown",
        avatar: "",
      },
      content: comment.content,
      timestamp: formatTimestamp(comment.createdAt),
      upvotes: comment.stats.upvotes,
      replies: replies.length,
      level: 0,
      children: replies.map(reply => buildCommentTree(reply, allComments)),
    };
  };

  return rootComments.map(comment => buildCommentTree(comment, comments));
};

interface AcademicDetailProps {
  post: {
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
    views?: number;
  };
  onBack: () => void;
}


export function AcademicDetail({ post, onBack }: AcademicDetailProps) {
  const [voteState, setVoteState] = useState<'up' | 'down' | null>(null);
  const [upvoteCount, setUpvoteCount] = useState(post.downloads);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(34);
  const [isSaved, setIsSaved] = useState(false);

  // Get comments for this post dynamically
  const comments = useMemo(() => transformComments(post.id), [post.id]);
  
  // Calculate total comment count including replies
  const totalCommentCount = useMemo(() => {
    const countReplies = (comment: any): number => {
      return 1 + (comment.children?.reduce((sum: number, child: any) => sum + countReplies(child), 0) || 0);
    };
    return comments.reduce((sum, comment) => sum + countReplies(comment), 0);
  }, [comments]);

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

  const getFileIcon = () => {
    switch (post.file.type) {
      case 'pdf':
        return <FileText className="w-16 h-16 text-red-500" />;
      case 'doc':
        return <FileSpreadsheet className="w-16 h-16 text-blue-500" />;
      case 'zip':
        return <Archive className="w-16 h-16 text-yellow-600" />;
    }
  };

  const formatDownloads = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
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
    <div className="flex-1 min-w-0">
      {/* Main Post Card */}
      <div className="bg-white border border-border rounded-lg mb-5 overflow-hidden">
        <div className="p-4 lg:p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <img
                src={post.uploader.avatar}
                alt={post.uploader.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
              />
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <h4>{post.uploader.name}</h4>
                  {post.uploader.badge && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded border ${getBadgeColorClass(
                        post.uploader.badge.color
                      )}`}
                    >
                      {post.uploader.badge.text}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  @{post.uploader.username} · {post.timestamp}
                </p>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsSaved(!isSaved)}
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
                className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-secondary transition-all"
                title="Paylaş"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-secondary transition-all">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Breadcrumb with Course Info */}
          <div className="mb-4 pb-3 border-b border-border">
            <div className="text-sm flex items-center flex-wrap gap-1.5 text-muted-foreground">
              {post.university && (
                <button className="hover:text-accent transition-colors">
                  {post.university}
                </button>
              )}
              {post.university && post.department && <span>/</span>}
              {post.department && (
                <button className="hover:text-accent transition-colors">
                  {post.department}
                </button>
              )}
              {(post.university || post.department) && (post.courseCode || post.courseName) && <span>/</span>}
              {post.courseCode && (
                <button className="hover:text-accent transition-colors font-medium text-accent">
                  {post.courseCode}
                </button>
              )}
              {post.courseCode && post.courseName && <span className="mx-0.5">·</span>}
              {post.courseName && (
                <button className="hover:text-accent transition-colors text-gray-700">
                  {post.courseName}
                </button>
              )}
            </div>
          </div>

          {/* File Preview Container */}
          <div className="rounded-lg border-2 border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 p-6 mb-5">
            <div className="flex flex-col items-center text-center">
              {/* File Icon with Badge */}
              <div className="relative mb-4">
                {getFileIcon()}
                <div className="absolute -top-2 -right-2 bg-white rounded-md px-2 py-1 text-xs font-medium shadow-md border-2 border-gray-200">
                  {post.file.type.toUpperCase()}
                </div>
              </div>

              {/* File Info */}
              <h3 className="mb-2 text-gray-900">{post.file.name}</h3>
              <div className="text-sm text-muted-foreground mb-4">
                {post.file.size}
                {post.file.pages && ` • ${post.file.pages} Sayfa`}
                {post.downloads && ` • ${formatDownloads(post.downloads)} indirme`}
              </div>

              {/* Download Button */}
              <button className="flex items-center gap-2 px-8 py-3 bg-accent hover:bg-accent/90 text-white rounded-lg transition-colors shadow-lg shadow-accent/20">
                <Download className="w-5 h-5" />
                <span>Dosyayı İndir</span>
              </button>
            </div>
          </div>

          {/* Description */}
          {post.description && (
            <div className="mb-4">
              <h4 className="text-sm mb-2 text-muted-foreground">Açıklama</h4>
              <p className="leading-relaxed text-gray-800">{post.description}</p>
            </div>
          )}

          {/* Stats & Interaction Bar */}
          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <div className="flex items-center gap-4">
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

              <div className="flex items-center gap-2 text-muted-foreground">
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm">{totalCommentCount} Yorum</span>
              </div>
            </div>

            {post.views && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">{post.views} görüntülenme</span>
                <span className="sm:hidden">{post.views}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-white border border-border rounded-lg overflow-hidden">
        <div className="p-4 lg:p-5 border-b border-border">
          <h3 className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-accent" />
            Yorumlar ({totalCommentCount})
          </h3>
        </div>

        {/* Add Comment Box */}
        <div className="p-4 lg:p-5 border-b border-border bg-secondary/30">
          <textarea
            placeholder="Yorumunuzu yazın..."
            className="w-full p-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all bg-white"
            rows={3}
          />
          <div className="flex justify-end gap-2 mt-3">
            <button className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors text-sm">
              Yorum Yap
            </button>
          </div>
        </div>

        {/* Comments List */}
        <div className="divide-y divide-border">
          {comments.map((comment, index) => (
            <div key={index}>
              <div className="px-4 lg:px-5">
                <Comment {...comment} />
              </div>
              {/* Render nested replies */}
              {comment.children && comment.children.length > 0 && (
                <div className="ml-8">
                  {comment.children.map((reply: any, replyIndex: number) => (
                    <div key={replyIndex} className="px-4 lg:px-5">
                      <Comment {...reply} level={1} />
                      {/* Render deeper nested replies if any */}
                      {reply.children && reply.children.length > 0 && (
                        <div className="ml-8">
                          {reply.children.map((nestedReply: any, nestedIndex: number) => (
                            <div key={nestedIndex} className="px-4 lg:px-5">
                              <Comment {...nestedReply} level={2} />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}