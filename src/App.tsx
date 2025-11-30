import { Navigation } from "./components/Navigation";
import { Header } from "./components/Header";
import { PostCreator } from "./components/PostCreator";
import { PostCard } from "./components/PostCard";
import { WikiCard } from "./components/WikiCard";
import { JobCard } from "./components/JobCard";
import { AcademicCard } from "./components/AcademicCard";
import { Sidebar } from "./components/Sidebar";
import { Leaderboard } from "./components/Leaderboard";
import { VenueSidebar } from "./components/VenueSidebar";
import { VenueFilters } from "./components/VenueFilters";
import { JobFilters } from "./components/JobFilters";
import { AcademicFilters } from "./components/AcademicFilters";
import { CreatePostModal } from "./components/CreatePostModal";
import { VenueDetail } from "./components/VenueDetail";
import { VenueList } from "./components/VenueList";
import { CulturalDiscovery } from "./components/CulturalDiscovery";
import { CulturalSidebar } from "./components/CulturalSidebar";
import { TopicList } from "./components/TopicList";
import { TopicDetail } from "./components/TopicDetail";
import { TopicFilterSidebar } from "./components/TopicFilterSidebar";
import { PostDetail } from "./components/PostDetail";
import { WikiDetail } from "./components/WikiDetail";
import { JobDetail } from "./components/JobDetail";
import { AcademicDetail } from "./components/AcademicDetail";
import { FilterDrawer } from "./components/FilterDrawer";
import { BottomBar } from "./components/BottomBar";
import { LiveEvents } from "./pages/LiveEvents";
import Profile from "./pages/Profile";
import Wallet from "./pages/Wallet";
import Overview from "./pages/Overview";
import Login from "./pages/Login";
import { useState, useMemo } from "react";
import { Trophy } from "lucide-react";
import { TrendingUp } from "lucide-react";
import { ArrowUp } from "lucide-react";
import { Heart } from "lucide-react";
import { MessageCircle } from "lucide-react";
import { SlidersHorizontal } from "lucide-react";
import { posts, jobs, academicMaterials, users, getUserById, getPostCommentCount } from "./data/mock";

// Helper function to format timestamp
const formatTimestamp = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSecs < 60) return `${diffSecs}s`;
  if (diffMins < 60) return `${diffMins}dk`;
  if (diffHours < 24) return `${diffHours}s`;
  if (diffDays === 1) return "Dün";
  if (diffDays < 7) return `${diffDays} gün önce`;
  return date.toLocaleDateString("tr-TR");
};

// Transform posts from JSON to component format
const transformPosts = () => {
  return posts.map((post) => {
    const author = getUserById(post.authorId);
    const basePost = {
      id: post.id,
      type: post.type,
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
      timestamp: formatTimestamp(post.createdAt),
    };

    if (post.type === "post") {
      return {
        ...basePost,
        title: post.title,
        content: post.content,
        upvotes: post.stats.upvotes,
        helpfulCount: post.stats.helpfulCount,
        categories: post.categories || [],
        comments: post.stats.commentCount || 0,
      };
    } else if (post.type === "wiki") {
      return {
        ...basePost,
        content: post.content,
        topicLink: post.topicLink,
        upvotes: post.stats.upvotes,
        downvotes: post.stats.downvotes,
        comments: post.stats.commentCount,
        tags: post.tags || [],
      };
    } else if (post.type === "academic") {
      // Academic posts are handled separately
      return null;
    }
    return basePost;
  }).filter(Boolean);
};

// Transform jobs from JSON to component format
const transformJobs = () => {
  return jobs.filter(job => job.isActive).map((job) => {
    const author = getUserById(job.authorId);
    return {
      id: job.id,
      type: "job",
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
      category: job.category,
      title: job.title,
      details: job.details,
      description: job.description,
      timestamp: formatTimestamp(job.createdAt),
    };
  });
};

// Transform academic materials from JSON to component format
const transformAcademicMaterials = () => {
  return academicMaterials.map((material) => {
    const author = getUserById(material.authorId);
    return {
      id: material.id,
      type: "academic",
      courseCode: material.course,
      courseName: material.title,
      university: material.university,
      department: material.department,
      uploader: author ? {
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
      timestamp: formatTimestamp(material.createdAt),
      file: {
        name: `${material.title}.${material.fileType}`,
        type: material.fileType,
        size: material.fileSize,
        ...(material.pageCount && { pages: material.pageCount }),
      },
      description: material.description,
      rating: material.stats.rating,
      ratingCount: material.stats.ratingCount,
      downloads: material.stats.downloads,
      comments: 0, // Will be calculated if needed
    };
  });
};

// Get all posts (including academic) for feed
const getAllFeedPosts = () => {
  const transformedPosts = transformPosts().filter((p): p is NonNullable<typeof p> => p !== null);
  const transformedAcademic = transformAcademicMaterials();
  return [...transformedPosts, ...transformedAcademic].sort((a, b) => {
    const dateA = new Date(posts.find(p => p.id === a.id)?.createdAt || academicMaterials.find(m => m.id === a.id)?.createdAt || "");
    const dateB = new Date(posts.find(p => p.id === b.id)?.createdAt || academicMaterials.find(m => m.id === b.id)?.createdAt || "");
    return dateB.getTime() - dateA.getTime();
  });
};

// Get trending posts (sorted by upvotes/helpfulCount)
const getTrendingPosts = () => {
  return getAllFeedPosts()
    .filter(post => post.type === "post" || post.type === "wiki")
    .sort((a, b) => {
      const aScore = (a as any).upvotes || (a as any).helpfulCount || 0;
      const bScore = (b as any).upvotes || (b as any).helpfulCount || 0;
      return bScore - aScore;
    })
    .slice(0, 10);
};

// Get following posts (mock - would filter by following in real app)
const getFollowingPosts = () => {
  return getAllFeedPosts()
    .filter(post => post.type === "post")
    .slice(0, 5);
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeFilter, setActiveFilter] = useState<
    "newest" | "trends" | "followings"
  >("newest");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState<
    | "feed"
    | "post-detail"
    | "wiki-detail"
    | "job-detail"
    | "academic-detail"
    | "topic-list"
    | "topic-detail"
    | "venue-list"
    | "venue-detail"
    | "jobs"
    | "academic"
    | "cultural"
    | "live-events"
    | "leaderboard"
    | "profile"
    | "wallet"
    | "overview"
  >("feed");
  const [selectedVenueId, setSelectedVenueId] = useState<
    number | null
  >(null);
  const [selectedTopicId, setSelectedTopicId] = useState<
    number | null
  >(null);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [venueSortBy, setVenueSortBy] = useState<
    "all" | "rating" | "newest" | "nearest"
  >("all");
  const [jobCategoryFilter, setJobCategoryFilter] = useState<
    "all" | "job" | "roommate" | "sale"
  >("all");
  const [academicTypeFilter, setAcademicTypeFilter] = useState<
    | "all"
    | "notes"
    | "book"
    | "article"
    | "video"
    | "presentation"
    | "project"
  >("all");
  const [showFilterDrawer, setShowFilterDrawer] =
    useState(false);

  const displayedPosts = useMemo(() => {
    switch (activeFilter) {
      case "trends":
        return getTrendingPosts();
      case "followings":
        return getFollowingPosts();
      default:
        return getAllFeedPosts();
    }
  }, [activeFilter]);

  const transformedJobs = useMemo(() => transformJobs(), []);

  // If not authenticated, show login screen
  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  // If on profile page, render it directly
  if (currentPage === "profile") {
    return (
      <Profile onNavigate={(page) => setCurrentPage(page)} />
    );
  }

  // If on wallet page, render it directly
  if (currentPage === "wallet") {
    return (
      <Wallet onNavigate={(page) => setCurrentPage(page)} />
    );
  }

  // If on overview page, render it directly
  if (currentPage === "overview") {
    return (
      <Overview onNavigate={(page) => setCurrentPage(page)} />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        onCreateClick={() => setShowCreateModal(true)}
        isCollapsed={isNavCollapsed}
        setIsCollapsed={setIsNavCollapsed}
        currentPage={currentPage}
        onNavigate={(page) => {
          setCurrentPage(page);
          if (
            page === "jobs" ||
            page === "academic" ||
            page === "cultural"
          ) {
            setActiveFilter("newest");
          }
        }}
      />

      <div
        className={`transition-all duration-500 ${isNavCollapsed ? "lg:ml-20" : "lg:ml-64"}`}
      >
        <Header
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          onProfileClick={() => setCurrentPage("profile")}
        />

        <main className="flex items-start gap-5 p-3 pb-24 lg:p-[20px] lg:pb-[20px] max-w-[1800px] mx-auto">
          {/* Main Content */}
          {currentPage === "feed" ? (
            <div className="flex-1 min-w-0">
              <PostCreator
                onOpenModal={() => setShowCreateModal(true)}
              />

              {/* Feed Filter Tabs */}
              <div className="bg-white border border-border rounded-lg p-1 mb-5 flex gap-1">
                <button
                  onClick={() => setActiveFilter("newest")}
                  className={`flex-1 px-3 lg:px-3 py-2.5 rounded-md transition-colors text-sm lg:text-sm ${
                    activeFilter === "newest"
                      ? "bg-violet-50 text-accent"
                      : "text-text/60 hover:bg-background hover:text-text"
                  }`}
                >
                  <span className="hidden sm:inline">
                    En Yeniler
                  </span>
                  <span className="sm:hidden">Yeni</span>
                </button>
                <button
                  onClick={() => setActiveFilter("trends")}
                  className={`flex-1 px-3 lg:px-3 py-2.5 rounded-md transition-colors text-sm lg:text-sm ${
                    activeFilter === "trends"
                      ? "bg-violet-50 text-accent"
                      : "text-text/60 hover:bg-background hover:text-text"
                  }`}
                >
                  <span className="hidden sm:inline">
                    Trendler
                  </span>
                  <span className="sm:hidden">Trend</span>
                </button>
                <button
                  onClick={() => setActiveFilter("followings")}
                  className={`flex-1 px-3 lg:px-3 py-2.5 rounded-md transition-colors text-sm lg:text-sm ${
                    activeFilter === "followings"
                      ? "bg-violet-50 text-accent"
                      : "text-text/60 hover:bg-background hover:text-text"
                  }`}
                >
                  <span className="hidden sm:inline">
                    Takip Edilenler
                  </span>
                  <span className="sm:hidden">Takip</span>
                </button>
              </div>

              <div>
                {displayedPosts.map(
                  (post: any, index: number) => {
                    const postElement = (() => {
                      if (post.type === "wiki") {
                        return (
                          <div
                            key={post.id}
                            onClick={() => {
                              // Add mock venue data for wiki posts
                              setSelectedPost({
                                ...post,
                                venue: {
                                  name:
                                    post.topicLink?.text ||
                                    "Mekan",
                                  category: "Kafe & Restoran",
                                  rating: 4.5,
                                  address: "Meram, Konya",
                                  phone: "+90 332 123 4567",
                                  website: "www.example.com",
                                  hours: "09:00 - 23:00",
                                },
                              });
                              setCurrentPage("wiki-detail");
                            }}
                            className="cursor-pointer"
                          >
                            <WikiCard {...post} />
                          </div>
                        );
                      } else if (post.type === "job") {
                        return (
                          <div
                            key={post.id}
                            onClick={() => {
                              setSelectedPost(post);
                              setCurrentPage("job-detail");
                            }}
                            className="cursor-pointer"
                          >
                            <JobCard {...post} />
                          </div>
                        );
                      } else if (post.type === "academic") {
                        return (
                          <div
                            key={post.id}
                            onClick={() => {
                              setSelectedPost(post);
                              setCurrentPage("academic-detail");
                            }}
                            className="cursor-pointer"
                          >
                            <AcademicCard {...post} />
                          </div>
                        );
                      } else {
                        return (
                          <div
                            key={post.id}
                            onClick={() => {
                              setSelectedPost(post);
                              setCurrentPage("post-detail");
                            }}
                            className="cursor-pointer"
                          >
                            <PostCard {...post} />
                          </div>
                        );
                      }
                    })();

                    return (
                      <div key={`post-wrapper-${post.id}`}>
                        {postElement}

                        {/* Leaderboard Widget after 2nd post - Mobile Only */}
                        {index === 1 && (
                          <div className="lg:hidden my-5">
                            <div className="bg-white border border-border rounded-lg p-4">
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                  <Trophy className="w-5 h-5 text-accent" />
                                  <h3>Haftanın Liderleri</h3>
                                </div>
                                <button
                                  className="text-xs text-accent hover:text-accent/80 transition-colors"
                                  onClick={() => {
                                    setCurrentPage("leaderboard");
                                    window.scrollTo({
                                      top: 0,
                                      behavior: "smooth",
                                    });
                                  }}
                                >
                                  Tümünü Gör
                                </button>
                              </div>

                              <div className="space-y-3 mb-4">
                                {/* Top 1 */}
                                <div className="flex items-center gap-3 p-2 rounded-lg bg-accent/5">
                                  <div className="w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center text-xs shrink-0">
                                    1
                                  </div>
                                  <img
                                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop"
                                    alt="User"
                                    className="w-8 h-8 rounded-full object-cover"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <h4 className="text-sm truncate">
                                      Ayşe Demir
                                    </h4>
                                    <p className="text-xs text-muted-foreground truncate">
                                      Konya Bilgesi
                                    </p>
                                  </div>
                                  <span className="text-xs font-medium text-accent shrink-0">
                                    15.400
                                  </span>
                                </div>

                                {/* Top 2 */}
                                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors">
                                  <div className="w-6 h-6 rounded-full bg-gray-400 text-white flex items-center justify-center text-xs shrink-0">
                                    2
                                  </div>
                                  <img
                                    src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&h=80&fit=crop"
                                    alt="User"
                                    className="w-8 h-8 rounded-full object-cover"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <h4 className="text-sm truncate">
                                      Mehmet Yılmaz
                                    </h4>
                                    <p className="text-xs text-muted-foreground truncate">
                                      Kampüs Kahramanı
                                    </p>
                                  </div>
                                  <span className="text-xs font-medium shrink-0">
                                    12.850
                                  </span>
                                </div>

                                {/* Top 3 */}
                                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors">
                                  <div className="w-6 h-6 rounded-full bg-orange-400 text-white flex items-center justify-center text-xs shrink-0">
                                    3
                                  </div>
                                  <img
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop"
                                    alt="User"
                                    className="w-8 h-8 rounded-full object-cover"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <h4 className="text-sm truncate">
                                      Zeynep Kara
                                    </h4>
                                    <p className="text-xs text-muted-foreground truncate">
                                      Keşif Tutkunu
                                    </p>
                                  </div>
                                  <span className="text-xs font-medium shrink-0">
                                    11.200
                                  </span>
                                </div>
                              </div>

                              {/* User Level Progress */}
                              <div className="pt-3 border-t border-border">
                                <div className="flex items-center gap-2 mb-2 justify-between">
                                  <span className="text-xs text-muted-foreground">
                                    125/250 XP
                                  </span>
                                  <span className="text-sm">
                                    Seyyah
                                  </span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden w-full">
                                  <div
                                    className="h-full bg-accent rounded-full transition-all"
                                    style={{ width: "50%" }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Popular Topics Widget after 4th post - Mobile Only */}
                        {index === 3 && (
                          <div className="lg:hidden my-5">
                            <div className="bg-white border border-border rounded-lg p-4">
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                  <TrendingUp className="w-5 h-5 text-accent" />
                                  <h3>Popüler Başlıklar</h3>
                                </div>
                                <button className="text-xs text-accent hover:text-accent/80 transition-colors">
                                  Tümünü Gör
                                </button>
                              </div>

                              <div className="space-y-3">
                                {getTrendingPosts()
                                  .slice(0, 5)
                                  .map((item: any) => ({
                                    id: item.id,
                                    title: item.title || item.content?.substring(0, 50) + "...",
                                    upvotes: item.upvotes || item.helpfulCount || 0,
                                    likes: item.helpfulCount || 0,
                                    comments: item.comments || getPostCommentCount(item.id) || 0,
                                  }))
                                  .map((item) => (
                                  <button
                                    key={item.id}
                                    className="w-full text-left p-2 rounded-lg hover:bg-secondary transition-colors group"
                                  >
                                    <h4 className="text-sm mb-2 group-hover:text-accent transition-colors line-clamp-2">
                                      {item.title}
                                    </h4>
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                      <span className="flex items-center gap-1">
                                        <ArrowUp className="w-3.5 h-3.5" />
                                        {item.upvotes}
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <Heart className="w-3.5 h-3.5" />
                                        {item.likes}
                                      </span>
                                      <span className="flex items-center gap-1">
                                        <MessageCircle className="w-3.5 h-3.5" />
                                        {item.comments}
                                      </span>
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  },
                )}
              </div>
            </div>
          ) : currentPage === "post-detail" && selectedPost ? (
            <div className="flex-1 min-w-0 w-full max-w-full">
              <PostDetail
                post={{ ...selectedPost, views: 1234 }}
                onBack={() => setCurrentPage("feed")}
              />
            </div>
          ) : currentPage === "wiki-detail" && selectedPost ? (
            <div className="flex-1 min-w-0 w-full max-w-full">
              <WikiDetail
                post={{ ...selectedPost, views: 1234 }}
                onBack={() => setCurrentPage("feed")}
              />
            </div>
          ) : currentPage === "job-detail" && selectedPost ? (
            <div className="flex-1 min-w-0 w-full max-w-full">
              <JobDetail
                post={{ ...selectedPost, views: 1234 }}
                onBack={() => setCurrentPage("feed")}
              />
            </div>
          ) : currentPage === "academic-detail" &&
            selectedPost ? (
            <div className="flex-1 min-w-0 w-full max-w-full">
              <AcademicDetail
                post={{ ...selectedPost, views: 1234 }}
                onBack={() => setCurrentPage("academic")}
              />
            </div>
          ) : currentPage === "jobs" ? (
            <div className="flex-1 min-w-0">
              <PostCreator
                onOpenModal={() => setShowCreateModal(true)}
              />

              {/* Jobs Filter Tabs and Filter Button */}
              <div className="flex items-center gap-2 mb-5">
                <div className="bg-white border border-border rounded-lg p-1 flex gap-1 flex-1 overflow-x-auto">
                  <button
                    onClick={() => setJobCategoryFilter("all")}
                    className={`flex-1 px-3 lg:px-3 py-2.5 rounded-md transition-colors text-sm lg:text-sm ${
                      jobCategoryFilter === "all"
                        ? "bg-violet-50 text-accent"
                        : "text-text/60 hover:bg-background hover:text-text"
                    }`}
                  >
                    Tümü
                  </button>
                  <button
                    onClick={() => setJobCategoryFilter("job")}
                    className={`flex-1 px-3 lg:px-3 py-2.5 rounded-md transition-colors text-sm lg:text-sm ${
                      jobCategoryFilter === "job"
                        ? "bg-violet-50 text-accent"
                        : "text-text/60 hover:bg-background hover:text-text"
                    }`}
                  >
                    İş
                  </button>
                  <button
                    onClick={() =>
                      setJobCategoryFilter("roommate")
                    }
                    className={`flex-1 px-3 lg:px-3 py-2.5 rounded-md transition-colors text-sm lg:text-sm ${
                      jobCategoryFilter === "roommate"
                        ? "bg-violet-50 text-accent"
                        : "text-text/60 hover:bg-background hover:text-text"
                    }`}
                  >
                    <span className="hidden sm:inline">
                      Ev Arkadaşı
                    </span>
                    <span className="sm:hidden">Ev</span>
                  </button>
                  <button
                    onClick={() => setJobCategoryFilter("sale")}
                    className={`flex-1 px-3 lg:px-3 py-2.5 rounded-md transition-colors text-sm lg:text-sm ${
                      jobCategoryFilter === "sale"
                        ? "bg-violet-50 text-accent"
                        : "text-text/60 hover:bg-background hover:text-text"
                    }`}
                  >
                    Satış
                  </button>
                </div>

                {/* Filter Button - Mobile Only */}
                <button
                  onClick={() => setShowFilterDrawer(true)}
                  className="lg:hidden px-3 py-2.5 rounded-md border border-border bg-white hover:bg-secondary transition-colors shrink-0"
                >
                  <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              <div>
                {transformedJobs
                  .filter(
                    (job: any) =>
                      jobCategoryFilter === "all" ||
                      job.category === jobCategoryFilter ||
                      (jobCategoryFilter === "job" &&
                        (job.category === "internship" ||
                          job.category === "parttime" ||
                          job.category === "freelance" ||
                          job.category === "tutor" ||
                          job.category === "job")),
                  )
                  .map((job: any) => (
                    <div
                      key={job.id}
                      onClick={() => {
                        setSelectedPost(job);
                        setCurrentPage("job-detail");
                      }}
                      className="cursor-pointer"
                    >
                      <JobCard {...job} />
                    </div>
                  ))}
              </div>
            </div>
          ) : currentPage === "academic" ? (
            <div className="flex-1 min-w-0">
              <PostCreator
                onOpenModal={() => setShowCreateModal(true)}
              />

              {/* Academic Filter Tabs and Filter Button */}
              <div className="flex items-center gap-2 mb-5">
                <div className="bg-white border border-border rounded-lg p-1 flex gap-1 flex-1">
                  <button
                    onClick={() => setActiveFilter("newest")}
                    className={`flex-1 px-3 lg:px-3 py-2.5 rounded-md transition-colors text-sm lg:text-sm ${
                      activeFilter === "newest"
                        ? "bg-violet-50 text-accent"
                        : "text-text/60 hover:bg-background hover:text-text"
                    }`}
                  >
                    <span className="hidden sm:inline">
                      En Yeniler
                    </span>
                    <span className="sm:hidden">Yeni</span>
                  </button>
                  <button
                    onClick={() => setActiveFilter("trends")}
                    className={`flex-1 px-3 lg:px-3 py-2.5 rounded-md transition-colors text-sm lg:text-sm ${
                      activeFilter === "trends"
                        ? "bg-violet-50 text-accent"
                        : "text-text/60 hover:bg-background hover:text-text"
                    }`}
                  >
                    <span className="hidden sm:inline">
                      Trendler
                    </span>
                    <span className="sm:hidden">Trend</span>
                  </button>
                  <button
                    onClick={() =>
                      setActiveFilter("followings")
                    }
                    className={`flex-1 px-3 lg:px-3 py-2.5 rounded-md transition-colors text-sm lg:text-sm ${
                      activeFilter === "followings"
                        ? "bg-violet-50 text-accent"
                        : "text-text/60 hover:bg-background hover:text-text"
                    }`}
                  >
                    <span className="hidden sm:inline">
                      Takip Edilenler
                    </span>
                    <span className="sm:hidden">Takip</span>
                  </button>
                </div>

                {/* Filter Button - Mobile Only */}
                <button
                  onClick={() => setShowFilterDrawer(true)}
                  className="lg:hidden px-3 py-2.5 rounded-md border border-border bg-white hover:bg-secondary transition-colors shrink-0"
                >
                  <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              <div>
                {transformAcademicMaterials()
                  .map((post: any) => (
                    <div
                      key={post.id}
                      onClick={() => {
                        setSelectedPost(post);
                        setCurrentPage("academic-detail");
                      }}
                      className="cursor-pointer"
                    >
                      <AcademicCard {...post} />
                    </div>
                  ))}
              </div>
            </div>
          ) : currentPage === "cultural" ? (
            <div className="flex-1 min-w-0">
              <CulturalDiscovery />
            </div>
          ) : currentPage === "live-events" ? (
            <LiveEvents
              onBack={() => setCurrentPage("cultural")}
            />
          ) : currentPage === "leaderboard" ? (
            <Leaderboard />
          ) : currentPage === "topic-list" ? (
            <TopicList
              onTopicClick={(topicId) => {
                setSelectedTopicId(topicId);
                setCurrentPage("topic-detail");
              }}
              onFilterClick={() => setShowFilterDrawer(true)}
            />
          ) : currentPage === "topic-detail" ? (
            <TopicDetail
              topicId={selectedTopicId || 1}
              onBack={() => setCurrentPage("topic-list")}
            />
          ) : currentPage === "venue-list" ? (
            <VenueList
              onVenueClick={(venueId) => {
                setSelectedVenueId(venueId);
                setCurrentPage("venue-detail");
                setIsNavCollapsed(true);
              }}
              sortBy={venueSortBy}
              onSortChange={setVenueSortBy}
              onFilterClick={() => setShowFilterDrawer(true)}
            />
          ) : (
            <VenueDetail
              onBackClick={() => {
                setCurrentPage("venue-list");
                setIsNavCollapsed(false);
              }}
            />
          )}

          {/* Sidebar - Different for each page */}
          {currentPage !== "post-detail" &&
            currentPage !== "wiki-detail" &&
            currentPage !== "job-detail" &&
            currentPage !== "academic-detail" && (
              <div className="w-80 shrink-0 sticky top-[20px] self-start hidden lg:block">
                {currentPage === "jobs" ? (
                  <JobFilters category={jobCategoryFilter} />
                ) : currentPage === "academic" ? (
                  <AcademicFilters
                    typeFilter={academicTypeFilter}
                    onTypeChange={setAcademicTypeFilter}
                  />
                ) : currentPage === "cultural" ? (
                  <CulturalSidebar
                    onNavigateToLiveEvents={() =>
                      setCurrentPage("live-events")
                    }
                  />
                ) : currentPage === "live-events" ? (
                  <CulturalSidebar
                    onNavigateToLiveEvents={() =>
                      setCurrentPage("live-events")
                    }
                  />
                ) : currentPage === "topic-list" ||
                  currentPage === "topic-detail" ? (
                  <TopicFilterSidebar />
                ) : currentPage === "venue-list" ? (
                  <VenueFilters
                    sortBy={venueSortBy}
                    onSortChange={setVenueSortBy}
                  />
                ) : currentPage === "venue-detail" ? (
                  <VenueSidebar />
                ) : (
                  <Sidebar
                    onWalletClick={() =>
                      setCurrentPage("wallet")
                    }
                    onLeaderboardClick={() =>
                      setCurrentPage("leaderboard")
                    }
                  />
                )}
              </div>
            )}
        </main>
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />

      {/* Bottom Navigation Bar - Mobile Only */}
      <BottomBar
        currentPage={currentPage}
        onNavigate={(page) => {
          setCurrentPage(page);
          if (
            page === "jobs" ||
            page === "academic" ||
            page === "cultural"
          ) {
            setActiveFilter("newest");
          }
        }}
        onCreatePost={() => setShowCreateModal(true)}
        isCreateModalOpen={showCreateModal}
      />

      {/* Filter Drawer - Mobile Only */}
      <FilterDrawer
        isOpen={showFilterDrawer}
        onClose={() => setShowFilterDrawer(false)}
        title={
          currentPage === "jobs"
            ? "İlan Filtreleri"
            : currentPage === "academic"
              ? "Akademik Filtreler"
              : currentPage === "topic-list" ||
                  currentPage === "topic-detail"
                ? "Başlık Filtreleri"
                : currentPage === "venue-list"
                  ? "Mekan Filtreleri"
                  : "Filtrele"
        }
      >
        {currentPage === "jobs" ? (
          <JobFilters category={jobCategoryFilter} />
        ) : currentPage === "academic" ? (
          <AcademicFilters
            typeFilter={academicTypeFilter}
            onTypeChange={setAcademicTypeFilter}
          />
        ) : currentPage === "topic-list" ||
          currentPage === "topic-detail" ? (
          <TopicFilterSidebar />
        ) : currentPage === "venue-list" ? (
          <VenueFilters
            sortBy={venueSortBy}
            onSortChange={setVenueSortBy}
          />
        ) : null}
      </FilterDrawer>
    </div>
  );
}