import { X, Sparkles, Send, Calendar, MapPin, User, MessageSquare, TrendingUp } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

interface AISearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  id: string;
  type: 'event' | 'post' | 'place' | 'user';
  title: string;
  description: string;
  metadata?: string;
  image?: string;
}

export function AISearchModal({ isOpen, onClose }: AISearchModalProps) {
  const [input, setInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const resultsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      // Focus input after animation
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Auto scroll to bottom when new results arrive
  useEffect(() => {
    resultsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [results, isLoading]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setSearchQuery(input.trim());
      setInput('');
      setIsLoading(true);
      setResults([]);

      // Simulate AI searching and generating results
      setTimeout(() => {
        const mockResults: SearchResult[] = [
          {
            id: '1',
            type: 'event',
            title: 'Indie Müzik Festivali',
            description: 'Kadıköy\'de gerçekleşecek 3 günlük müzik festivali. Yerli ve yabancı sanatçılar sahne alacak.',
            metadata: '15 Aralık 2025 • Kadıköy',
          },
          {
            id: '2',
            type: 'post',
            title: 'En İyi Kahve Mekanları',
            description: 'İstanbul\'un en iyi kahve mekanlarını denedim ve sizin için listeledim. İşte favorilerim...',
            metadata: '245 beğeni • 32 yorum',
          },
          {
            id: '3',
            type: 'place',
            title: 'Müze Gazhane',
            description: 'Sanat, bilim ve teknoloji odaklı etkileşimli sergilerin bulunduğu modern bir müze.',
            metadata: 'Kağıthane • Açık',
          },
          {
            id: '4',
            type: 'user',
            title: 'Ayşe Yılmaz',
            description: 'Fotoğraf ve seyahat tutkunu. İstanbul\'un gizli köşelerini keşfediyorum.',
            metadata: 'Level 12 • 1.2K takipçi',
          },
        ];
        setResults(mockResults);
        setIsLoading(false);
      }, 2000);
    }
  };

  const getResultIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'event':
        return <Calendar className="w-4 h-4" />;
      case 'post':
        return <MessageSquare className="w-4 h-4" />;
      case 'place':
        return <MapPin className="w-4 h-4" />;
      case 'user':
        return <User className="w-4 h-4" />;
    }
  };

  const getResultLabel = (type: SearchResult['type']) => {
    switch (type) {
      case 'event':
        return 'Etkinlik';
      case 'post':
        return 'Gönderi';
      case 'place':
        return 'Mekan';
      case 'user':
        return 'Kullanıcı';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh]">
      {/* Backdrop with blur and light gray */}
      <div
        className="absolute inset-0 backdrop-blur-md bg-gray-900/20"
        onClick={onClose}
      >
        {/* Animated Stars Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Stars - Twinkling effect */}
          {[...Array(200)].map((_, i) => {
            const size = Math.random() * 1.5 + 0.5; // Smaller: 0.5-2px
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const delay = Math.random() * 3;
            const duration = Math.random() * 3 + 2;
            const opacity = Math.random() * 0.5 + 0.3; // 0.3-0.8

            return (
              <div
                key={i}
                className="absolute rounded-full bg-purple-400 animate-pulse"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${left}%`,
                  top: `${top}%`,
                  animationDelay: `${delay}s`,
                  animationDuration: `${duration}s`,
                  opacity: opacity,
                  boxShadow: `0 0 ${size * 2}px rgba(168, 85, 247, ${opacity * 0.5})`,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Modal Content */}
      <div
        className="relative w-full max-w-3xl mx-4 animate-in fade-in slide-in-from-top-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input Area - Direct with gradient border */}
        <form onSubmit={handleSubmit} className="p-[2px] bg-gradient-to-r from-purple-600 via-violet-600 to-purple-600 rounded-xl">
          <div className="relative bg-white rounded-xl">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Bir soru sor veya aramak istediğin konuyu yaz..."
              className="w-full min-h-[120px] max-h-[300px] p-4 pr-12 bg-white rounded-xl resize-none focus:outline-none focus:ring-0 border-0 text-sm placeholder:text-gray-500"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="absolute bottom-4 right-4 w-10 h-10 rounded-lg bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all shadow-sm hover:shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Results Area */}
        {(searchQuery || isLoading || results.length > 0) && (
          <div className="mt-4 bg-white rounded-xl border border-gray-200 shadow-sm">
            {/* Search Query Display */}
            {searchQuery && (
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span className="text-sm text-muted-foreground">Arama:</span>
                  <span className="text-sm">{searchQuery}</span>
                </div>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="p-6 animate-in fade-in duration-500">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-purple-100">
                    <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground mb-2">AI sonuçları getiriyor...</p>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"
                        style={{ animationDelay: '0.1s' }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"
                        style={{ animationDelay: '0.2s' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Search Results */}
            {results.length > 0 && (
              <div className="divide-y divide-gray-100">
                {results.map((result, index) => (
                  <button
                    key={result.id}
                    className="w-full p-4 text-left hover:bg-gray-50 transition-colors group animate-in fade-in slide-in-from-bottom-2 duration-500"
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                    onClick={() => {
                      // Handle result click
                      console.log('Clicked result:', result);
                    }}
                  >
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                        {getResultIcon(result.type)}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        {/* Type Label */}
                        <span className="text-xs text-purple-600 mb-1 inline-block">
                          {getResultLabel(result.type)}
                        </span>
                        
                        {/* Title */}
                        <h3 className="text-sm mb-1 group-hover:text-purple-600 transition-colors">
                          {result.title}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                          {result.description}
                        </p>
                        
                        {/* Metadata */}
                        {result.metadata && (
                          <p className="text-xs text-muted-foreground">
                            {result.metadata}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            <div ref={resultsEndRef} />
          </div>
        )}
      </div>
    </div>
  );
}