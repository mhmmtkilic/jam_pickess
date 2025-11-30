import { ArrowLeft, MessageCircle, ArrowUp, Eye, Clock, Share2, Bookmark, Plus } from 'lucide-react';
import { PostCard } from './PostCard';
import { WikiCard } from './WikiCard';

const mockTopicData = {
  id: 1,
  title: 'Yapay Zeka ile Öğrenme Teknikleri',
  description: 'Modern eğitim yöntemleri ve yapay zeka araçlarının öğrenmede kullanımı hakkında tartışma başlığı. Bu başlıkta ChatGPT, Gemini gibi araçların öğrenme sürecinde nasıl kullanılabileceği, avantajları ve dikkat edilmesi gereken noktalar tartışılıyor.',
  author: {
    name: 'Ayşe Demir',
    username: 'ayse_tech',
    avatar: 'https://images.unsplash.com/photo-1612361844688-c6c9c44f3966?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlcnNvbnxlbnwxfHx8fDE3NjQwNzA2OTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    badge: {
      text: 'Konya Bilgesi',
      color: 'purple',
    },
  },
  category: 'Teknoloji',
  createdAt: '15 Kasım 2024',
  stats: {
    posts: 342,
    upvotes: 1240,
    views: 5680,
    followers: 89,
  },
};

const mockTopicPosts = [
  {
    id: 1001,
    type: 'post',
    author: {
      name: 'Mehmet Kaya',
      username: 'mkaya',
      avatar: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjQxMjI4MzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    title: 'ChatGPT ile Kodlama Öğrenme Deneyimim',
    content: 'ChatGPT\'yi kullanarak Python öğrenmeye başladım ve gerçekten çok etkili olduğunu fark ettim. Özellikle hata ayıklama ve kod optimizasyonu konularında çok yardımcı oluyor. Herkese tavsiye ederim! 🚀',
    timestamp: '2s',
    upvotes: 42,
    helpfulCount: 35,
    categories: ['Yapay Zeka', 'Programlama', 'Eğitim'],
  },
  {
    id: 1002,
    type: 'wiki',
    author: {
      name: 'Zeynep Yıldız',
      username: 'zeynep_ai',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc2NDE3NzQ5NHww&ixlib=rb-4.1.0&q=80&w=1080',
      badge: {
        text: 'Seyyah',
        color: 'blue',
      },
    },
    content: 'AI araçlarını kullanırken en önemli nokta, onları bir öğretmen değil yardımcı olarak görmek. Kendi düşünce sürecinizi geliştirmeye devam etmek çok önemli. Ben ChatGPT\'yi daha çok konsept anlamak için kullanıyorum, ezber bilgi için değil.',
    timestamp: '15dk',
    topicLink: {
      icon: 'topic',
      text: 'Yapay Zeka ile Öğrenme Teknikleri',
    },
    upvotes: 128,
    downvotes: 5,
    comments: 23,
    tags: ['AI', 'Eğitim', 'Verimlilik'],
  },
  {
    id: 1003,
    type: 'post',
    author: {
      name: 'Can Özkan',
      username: 'canozkan',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxwb3J0cmFpdCUyMG1hbnxlbnwxfHx8fDE3NjQxNzc0OTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
      badge: {
        text: 'Gezgin',
        color: 'green',
      },
    },
    title: 'AI Destekli Not Alma Teknikleri',
    content: 'Notion AI ve ChatGPT kombinasyonuyla not alırken çok verimli olduğumu fark ettim. Derslerde aldığım notları sonradan AI ile düzenleyip özetletiyorum. Özellikle sınav dönemlerinde çok işe yarıyor! 📚',
    timestamp: '1s',
    upvotes: 67,
    helpfulCount: 54,
    categories: ['Not Alma', 'Verimlilik', 'AI'],
  },
  {
    id: 1004,
    type: 'post',
    author: {
      name: 'Selin Demir',
      username: 'selin_edu',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc2NDE3NzQ5NHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    title: 'Gemini vs ChatGPT: Hangisi Daha İyi?',
    content: 'İki aracı da uzun süredir kullanıyorum. ChatGPT kod yazmada daha iyi, Gemini ise araştırma ve kaynak bulma konusunda güçlü. İkisini de farklı amaçlar için kullanıyorum.',
    timestamp: '3s',
    upvotes: 89,
    helpfulCount: 72,
    categories: ['ChatGPT', 'Gemini', 'Karşılaştırma'],
  },
];

interface TopicDetailProps {
  topicId: number;
  onBack: () => void;
}

export function TopicDetail({ topicId, onBack }: TopicDetailProps) {
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

  return (
    <div className="flex-1 min-w-0">
      {/* Back Button */}


      {/* Topic Header */}
      <div className="bg-white border border-border rounded-lg overflow-hidden mb-5">
        {/* Header Section */}
        <div className="p-4 lg:p-6 border-b border-border">
          {/* Category Tag */}
          <div className="mb-4">
            <span className="inline-flex px-3 py-1.5 bg-violet-50 text-accent text-sm rounded-md border border-violet-100">
              {mockTopicData.category}
            </span>
          </div>

          {/* Title & Description */}
          <h1 className="text-2xl mb-3">{mockTopicData.title}</h1>
          <p className="text-muted-foreground leading-relaxed">{mockTopicData.description}</p>
        </div>

        {/* Meta Section */}
        <div className="px-6 py-4 bg-secondary/30">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Author Info */}
            <div className="flex items-center gap-3">
              <img
                src={mockTopicData.author.avatar}
                alt={mockTopicData.author.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-medium text-sm">{mockTopicData.author.name}</span>
                  {mockTopicData.author.badge && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded border ${getBadgeColorClass(
                        mockTopicData.author.badge.color
                      )}`}
                    >
                      {mockTopicData.author.badge.text}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{mockTopicData.createdAt} tarihinde oluşturdu</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-1.5">
                <MessageCircle className="w-4 h-4 text-accent" />
                <span className="font-medium">{mockTopicData.stats.posts}</span>
                <span className="text-muted-foreground hidden sm:inline">gönderi</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ArrowUp className="w-4 h-4 text-accent" />
                <span className="font-medium">{mockTopicData.stats.upvotes}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">{mockTopicData.stats.views}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Section */}
        <div className="px-6 py-4 bg-white">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="font-medium text-foreground">{mockTopicData.stats.followers}</span> takipçi
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button className="p-2.5 rounded-lg hover:bg-secondary transition-colors" title="Kaydet">
                <Bookmark className="w-5 h-5 text-muted-foreground hover:text-accent transition-colors" />
              </button>
              <button className="p-2.5 rounded-lg hover:bg-secondary transition-colors" title="Paylaş">
                <Share2 className="w-5 h-5 text-muted-foreground hover:text-accent transition-colors" />
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-lg hover:bg-accent/90 transition-all shadow-sm hover:shadow">
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">Gönderi Ekle</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sort Filter */}
      <div className="bg-white border border-border rounded-lg p-1 mb-5 flex gap-1">
        <button className="flex-1 px-3 py-1.5 rounded-md bg-violet-50 text-accent transition-colors text-sm">
          En Yeniler
        </button>
        <button className="flex-1 px-3 py-1.5 rounded-md text-text/60 hover:bg-background hover:text-text transition-colors text-sm">
          Popüler
        </button>
        <button className="flex-1 px-3 py-1.5 rounded-md text-text/60 hover:bg-background hover:text-text transition-colors text-sm">
          En Çok Tartışılan
        </button>
      </div>

      {/* Posts */}
      <div>
        {mockTopicPosts.map((post: any) => {
          if (post.type === 'wiki') {
            return <WikiCard key={post.id} {...post} />;
          } else {
            return <PostCard key={post.id} {...post} />;
          }
        })}
      </div>
    </div>
  );
}
