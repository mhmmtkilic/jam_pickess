import { ArrowUp, ArrowDown, Heart, MessageCircle, Share2, Bookmark, Eye, MoreHorizontal, MapPin, Star, Clock, Phone, Globe, Navigation } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Comment } from './Comment';
import { WikiDetailSidebar } from './WikiDetailSidebar';
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
  // Convert postId to string format if needed
  let postIdStr: string;
  if (typeof postId === 'number') {
    postIdStr = `pst_${postId.toString().padStart(3, '0')}`;
  } else if (typeof postId === 'string' && !postId.startsWith('pst_') && !postId.startsWith('job_') && !postId.startsWith('acm_')) {
    postIdStr = `pst_${postId.padStart(3, '0')}`;
  } else {
    postIdStr = postId;
  }
  
  const comments = getPostComments(postIdStr);
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

interface WikiDetailProps {
  post: {
    id: number;
    content: string;
    author: {
      name: string;
      username: string;
      avatar: string;
      badge?: {
        text: string;
        color: string;
      };
    };
    timestamp: string;
    upvotes: number;
    downvotes: number;
    tags: string[];
    image?: string;
    venue?: {
      name: string;
      category: string;
      rating?: number;
      address?: string;
      phone?: string;
      website?: string;
      hours?: string;
    };
    views?: number;
  };
  onBack: () => void;
}


const relatedPosts = [
  {
    id: 1,
    venueName: 'Kafe Kültür',
    author: 'Zeynep Ak',
    stats: { upvotes: 34, comments: 15 },
  },
  {
    id: 2,
    venueName: 'Sanat Galerisi 42',
    author: 'Can Öztürk',
    stats: { upvotes: 28, comments: 9 },
  },
  {
    id: 3,
    venueName: 'The Coffee Lab',
    author: 'Selin Yıldız',
    stats: { upvotes: 45, comments: 22 },
  },
];

export function WikiDetail({ post, onBack }: WikiDetailProps) {
  const [voteState, setVoteState] = useState<'up' | 'down' | null>(null);
  const [upvoteCount, setUpvoteCount] = useState(post.upvotes);
  const [downvoteCount, setDownvoteCount] = useState(post.downvotes);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(42);
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

  const handleUpvote = () => {
    if (voteState === 'up') {
      setVoteState(null);
      setUpvoteCount(upvoteCount - 1);
    } else {
      setVoteState('up');
      setUpvoteCount(voteState === 'down' ? upvoteCount + 1 : upvoteCount + 1);
      if (voteState === 'down') {
        setDownvoteCount(downvoteCount - 1);
      }
    }
  };

  const handleDownvote = () => {
    if (voteState === 'down') {
      setVoteState(null);
      setDownvoteCount(downvoteCount - 1);
    } else {
      setVoteState('down');
      setDownvoteCount(voteState === 'up' ? downvoteCount + 1 : downvoteCount + 1);
      if (voteState === 'up') {
        setUpvoteCount(upvoteCount - 1);
      }
    }
  };

  return (
    <div className="flex items-start gap-3 lg:gap-5">
      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Post Card */}
        <div className="bg-white border border-border rounded-lg mb-5 overflow-hidden">
          <div className="p-4 lg:p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
                />
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <h4>{post.author.name}</h4>
                    {post.author.badge && (
                      <span
                        className={`text-xs px-2 py-0.5 rounded border ${getBadgeColorClass(
                          post.author.badge.color
                        )}`}
                      >
                        {post.author.badge.text}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    @{post.author.username} · {post.timestamp}
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

            {/* Venue Info */}
            {post.venue && (
              <div className="mb-4 p-4 bg-secondary/50 rounded-lg border border-border/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-accent" />
                    <div>
                      <h3 className="text-lg">{post.venue.name}</h3>
                      <p className="text-sm text-muted-foreground">{post.venue.category}</p>
                    </div>
                  </div>
                  {post.venue.rating && (
                    <div className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-full border border-border">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{post.venue.rating}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Content */}
            <p className="mb-4 leading-relaxed">{post.content}</p>

            {/* Image */}
            {post.image && (
              <img
                src={post.image}
                alt="Venue"
                className="w-full rounded-lg object-cover mb-4"
              />
            )}

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-1 bg-secondary text-xs rounded-md hover:bg-muted transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
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
                    {upvoteCount - downvoteCount}
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
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex items-center gap-2 transition-all ${
                    isLiked ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500' : ''}`} />
                  <span className="text-sm">{isLiked ? likeCount + 1 : likeCount}</span>
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

      {/* Sidebar */}
      <div className="hidden lg:flex">
        <WikiDetailSidebar
          author={{
            ...post.author,
            bio: 'Şehir gezgini ve mekan kaşifi. En iyi kafeleri ve kültür mekanlarını keşfediyorum.',
          }}
          venue={post.venue}
          tags={post.tags}
          relatedPosts={relatedPosts}
        />
      </div>
    </div>
  );
}