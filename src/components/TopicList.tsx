import { TopicCard } from './TopicCard';
import { Search, SlidersHorizontal, Plus, TrendingUp, Clock, MessageCircle } from 'lucide-react';
import { useState, useMemo } from 'react';
import { topics, entries, getUserById, getTopicEntries } from '../data/mock';

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
  if (diffHours < 24) return `${diffHours} saat önce`;
  if (diffDays === 1) return "Dün";
  if (diffDays < 7) return `${diffDays} gün önce`;
  return `${Math.floor(diffDays / 7)} hafta önce`;
};

// Transform topics from JSON to component format
const transformTopics = () => {
  return topics.map((topic) => {
    const author = getUserById(topic.createdBy);
    const topicEntries = getTopicEntries(topic.id);
    const lastEntry = topicEntries.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )[0];

    // Map category
    let category = topic.category;
    if (topic.category === 'akademik') category = 'Eğitim';
    else if (topic.category === 'sosyal_yasam') category = 'Yaşam';
    else if (topic.category === 'teknoloji') category = 'Teknoloji';
    else if (topic.category === 'is_kariyer') category = 'İş & Kariyer';
    else if (topic.category === 'tasarim') category = 'Tasarım';

    return {
      id: parseInt(topic.id.replace('tpc_', '')) || 0,
      title: topic.title,
      description: topic.wikiContent?.content?.substring(0, 100) + '...' || '',
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
      category,
      timestamp: formatTimestamp(topic.createdAt),
      postCount: topic.entryCount,
      upvotes: topic.wikiContent?.usefulVotes || 0,
      views: topic.viewCount,
      lastActivity: lastEntry ? formatTimestamp(lastEntry.createdAt) : formatTimestamp(topic.updatedAt),
    };
  });
};


interface TopicListProps {
  onTopicClick: (topicId: number) => void;
  onFilterClick?: () => void;
}

export function TopicList({ onTopicClick, onFilterClick }: TopicListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'hot' | 'new' | 'top'>('hot');

  const transformedTopics = useMemo(() => transformTopics(), []);

  const sortedTopics = useMemo(() => {
    const topicsCopy = [...transformedTopics];
    
    switch (sortBy) {
      case 'hot':
        return topicsCopy.sort((a, b) => b.upvotes - a.upvotes);
      case 'new':
        return topicsCopy.sort((a, b) => {
          const topicA = topics.find(t => t.id === `tpc_${a.id.toString().padStart(3, '0')}`);
          const topicB = topics.find(t => t.id === `tpc_${b.id.toString().padStart(3, '0')}`);
          const dateA = topicA ? new Date(topicA.createdAt).getTime() : 0;
          const dateB = topicB ? new Date(topicB.createdAt).getTime() : 0;
          return dateB - dateA;
        });
      case 'top':
        return topicsCopy.sort((a, b) => b.postCount - a.postCount);
      default:
        return topicsCopy;
    }
  }, [sortBy, transformedTopics]);

  return (
    <div className="flex-1 min-w-0">
      {/* Filter Tabs and Filter Button */}
      <div className="flex items-center gap-2 mb-5">
        <div className="bg-white border border-border rounded-lg p-1 flex gap-1 flex-1">
          <button
            onClick={() => setSortBy('hot')}
            className={`flex-1 px-3 lg:px-3 py-2.5 rounded-md transition-colors text-sm lg:text-sm ${
              sortBy === 'hot'
                ? 'bg-violet-50 text-accent'
                : 'text-text/60 hover:bg-background hover:text-text'
            }`}
          >
            <span className="hidden sm:inline">Popüler</span>
            <span className="sm:hidden">Pop</span>
          </button>
          <button
            onClick={() => setSortBy('new')}
            className={`flex-1 px-3 lg:px-3 py-2.5 rounded-md transition-colors text-sm lg:text-sm ${
              sortBy === 'new'
                ? 'bg-violet-50 text-accent'
                : 'text-text/60 hover:bg-background hover:text-text'
            }`}
          >
            <span className="hidden sm:inline">En Yeniler</span>
            <span className="sm:hidden">Yeni</span>
          </button>
          <button
            onClick={() => setSortBy('top')}
            className={`flex-1 px-3 lg:px-3 py-2.5 rounded-md transition-colors text-sm lg:text-sm ${
              sortBy === 'top'
                ? 'bg-violet-50 text-accent'
                : 'text-text/60 hover:bg-background hover:text-text'
            }`}
          >
            <span className="hidden sm:inline">En Çok Yanıtlanan</span>
            <span className="sm:hidden">Top</span>
          </button>
        </div>
        
        {/* Filter Button - Mobile Only */}
        {onFilterClick && (
          <button
            onClick={onFilterClick}
            className="lg:hidden px-3 py-2.5 rounded-md border border-border bg-white hover:bg-secondary transition-colors shrink-0"
          >
            <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Topics List */}
      <div>
        {sortedTopics.map((topic) => (
          <TopicCard
            key={topic.id}
            {...topic}
            onClick={() => onTopicClick(topic.id)}
          />
        ))}
      </div>
    </div>
  );
}