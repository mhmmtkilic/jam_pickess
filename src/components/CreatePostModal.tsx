import { X, Image, Link2, Tag, ChevronDown, Upload, MapPin, Clock, Calendar, Users, DollarSign, Home, BookOpen, Building2, Coffee, UtensilsCrossed, Library, Briefcase, Theater, Laptop, Palette, Heart, GraduationCap, Tv, Rocket, FileText, ClipboardList, FolderGit, Presentation, Video, MessageSquare, Search, Lock } from 'lucide-react';
import { useState } from 'react';

// Ana İçerik Tipleri
const CONTENT_TYPES = [
  { id: 'feed', label: 'Post', emoji: '💬', description: 'Bir başlığa gönderi yap' },
  { id: 'topic', label: 'Başlık', emoji: '📋', description: 'Yeni başlık oluştur' },
  { id: 'venue', label: 'Mekan', emoji: '📍', description: 'Mekan incelemesi yap' },
  { id: 'job', label: 'İlan', emoji: '📢', description: 'İş veya ilan paylaş' },
  { id: 'academic', label: 'Akademik', emoji: '📚', description: 'Ders notu paylaş' },
];

// Mevcut Başlıklar (Mock Data)
const EXISTING_TOPICS = [
  { id: 1, title: 'Yapay Zeka ile Öğrenme Teknikleri', category: 'Teknoloji', posts: 42 },
  { id: 2, title: 'İlk İş Görüşmesinde Nelere Dikkat Edilmeli?', category: 'İş & Kariyer', posts: 89 },
  { id: 3, title: 'Üniversitede Zaman Yönetimi İpuçları', category: 'Eğitim', posts: 67 },
  { id: 4, title: 'Remote Çalışma Deneyimlerim', category: 'İş & Kariyer', posts: 43 },
  { id: 5, title: 'Freelance İşe Nasıl Başladım?', category: 'İş & Kariyer', posts: 38 },
  { id: 6, title: 'UI/UX Tasarım Kaynakları', category: 'Tasarım', posts: 56 },
  { id: 7, title: 'Konya\'da Çalışılacak En İyi Kafeler', category: 'Yaşam', posts: 78 },
  { id: 8, title: 'Python ile Veri Bilimi', category: 'Teknoloji', posts: 92 },
  { id: 9, title: 'Sağlıklı Beslenme Alışkanlıkları', category: 'Yaşam', posts: 34 },
  { id: 10, title: 'Staj Başvurusu Nasıl Yapılır?', category: 'İş & Kariyer', posts: 61 },
];

// Başlık Kategorileri
const TOPIC_CATEGORIES = [
  { id: 'tech', label: 'Teknoloji', icon: Laptop },
  { id: 'design', label: 'Tasarım', icon: Palette },
  { id: 'lifestyle', label: 'Yaşam', icon: Heart },
  { id: 'education', label: 'Eğitim', icon: GraduationCap },
  { id: 'entertainment', label: 'Eğlence', icon: Tv },
  { id: 'business', label: 'İş & Kariyer', icon: Rocket },
];

// Mekan Kategorileri
const VENUE_CATEGORIES = [
  { id: 'cafe', label: 'Kafe', icon: Coffee, subcategories: ['Çalışma Kafesi', 'Sosyal Kafe', 'Specialty Coffee'] },
  { id: 'restaurant', label: 'Restoran', icon: UtensilsCrossed, subcategories: ['Türk Mutfağı', 'Dünya Mutfağı', 'Fast Food', 'Vejeteryan'] },
  { id: 'library', label: 'Kütüphane', icon: Library, subcategories: ['Üniversite Kütüphanesi', 'Halk Kütüphanesi', 'Özel Kütüphane'] },
  { id: 'coworking', label: 'Co-working', icon: Briefcase, subcategories: ['Paylaşımlı Ofis', 'Özel Oda', 'Cafe-Ofis'] },
  { id: 'cultural', label: 'Kültürel Mekan', icon: Theater, subcategories: ['Müze', 'Galeri', 'Tiyatro', 'Sinema'] },
];

// Mekan Özellikleri
const VENUE_FEATURES = [
  'Ücretsiz WiFi', 'Priz Var', 'Sessiz Ortam', 'Müzik Var', 
  'Öğrenci İndirimi', 'Dış Mekan', 'Otopark', 'Evcil Hayvan Dostu'
];

// İlan Kategorileri
const JOB_CATEGORIES = [
  { id: 'tutor', label: 'Özel Ders', icon: BookOpen },
  { id: 'roommate', label: 'Ev Arkadaşı', icon: Home },
  { id: 'internship', label: 'Staj', icon: Building2 },
  { id: 'parttime', label: 'Part-time', icon: Clock },
  { id: 'freelance', label: 'Freelance', icon: Users },
  { id: 'sale', label: 'Satılık', icon: Tag },
];

// Akademik İçerik Tipleri
const ACADEMIC_TYPES = [
  { id: 'notes', label: 'Ders Notları', icon: FileText },
  { id: 'exam', label: 'Çıkmış Sorular', icon: ClipboardList },
  { id: 'book', label: 'Kitap/Kaynak', icon: BookOpen },
  { id: 'project', label: 'Proje', icon: FolderGit },
  { id: 'presentation', label: 'Sunum', icon: Presentation },
  { id: 'video', label: 'Video Ders', icon: Video },
];

const AVAILABLE_TAGS = [
  'Teknoloji', 'Yazılım', 'Tasarım', 'Oyun', 'Müzik', 'Spor',
  'Sanat', 'Bilim', 'Eğitim', 'Sağlık', 'Girişimcilik', 'Kariyer',
  'Kafe', 'Restoran', 'Çalışma', 'Sosyalleşme', 'Etkinlik', 'Konya'
];

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreatePostModal({ isOpen, onClose }: CreatePostModalProps) {
  // Mock User Data - Test için (Gerçek uygulamada context/props'tan gelecek)
  const userLevel = 'Acemi'; // Acemi, Gezgin, Bilge, Konya Bilgesi gibi roller
  const requiredLevel = 'Gezgin';
  const canCreateTopic = userLevel === 'Gezgin' || userLevel === 'Bilge' || userLevel === 'Konya Bilgesi';
  
  // Ana State
  const [contentType, setContentType] = useState('feed');
  
  // Feed States
  const [selectedTopic, setSelectedTopic] = useState('');
  const [searchTopic, setSearchTopic] = useState('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showTagArea, setShowTagArea] = useState(false);
  
  // Topic States
  const [topicTitle, setTopicTitle] = useState('');
  const [topicDescription, setTopicDescription] = useState('');
  const [topicCategory, setTopicCategory] = useState('');
  
  // Venue States
  const [venueName, setVenueName] = useState('');
  const [venueCategory, setVenueCategory] = useState('');
  const [venueSubcategory, setVenueSubcategory] = useState('');
  const [venueRating, setVenueRating] = useState(5);
  const [venueFeatures, setVenueFeatures] = useState<string[]>([]);
  const [venueAddress, setVenueAddress] = useState('');
  
  // Job States
  const [jobCategory, setJobCategory] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [jobPayment, setJobPayment] = useState('');
  const [jobTime, setJobTime] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  
  // Academic States
  const [academicType, setAcademicType] = useState('notes');
  const [university, setUniversity] = useState('');
  const [faculty, setFaculty] = useState('');
  const [department, setDepartment] = useState('');
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');

  const currentVenueCategory = VENUE_CATEGORIES.find(c => c.id === venueCategory);

  const filteredTopics = EXISTING_TOPICS.filter(topic => 
    topic.title.toLowerCase().includes(searchTopic.toLowerCase()) ||
    topic.category.toLowerCase().includes(searchTopic.toLowerCase())
  );

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      if (selectedTags.length < 5) {
        setSelectedTags([...selectedTags, tag]);
      }
    }
  };

  const toggleVenueFeature = (feature: string) => {
    if (venueFeatures.includes(feature)) {
      setVenueFeatures(venueFeatures.filter(f => f !== feature));
    } else {
      setVenueFeatures([...venueFeatures, feature]);
    }
  };

  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  const handleSubmit = () => {
    console.log({
      contentType,
      content,
      selectedTags,
      // Diğer alanlar...
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-xl">Yeni İçerik Oluştur</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Content Type Selection */}
          <div>
            <label className="block text-sm mb-3">İçerik Tipi</label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {CONTENT_TYPES.map((type) => (
                <button
                  key={type.id}
                  onClick={() => {
                    if (type.id === 'topic' && !canCreateTopic) return;
                    setContentType(type.id);
                  }}
                  disabled={type.id === 'topic' && !canCreateTopic}
                  className={`p-3 rounded-lg border-2 transition-all text-left relative overflow-hidden group ${
                    type.id === 'topic' && !canCreateTopic
                      ? 'border-gray-200 bg-gray-50 opacity-75 cursor-not-allowed'
                      : contentType === type.id
                      ? 'border-accent bg-violet-50'
                      : 'border-border hover:border-violet-200'
                  }`}
                >
                  {type.id === 'topic' && !canCreateTopic && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-100/90 to-gray-200/90 backdrop-blur-[1px] flex items-center justify-center z-10">
                        <div className="text-center">
                          <div className="inline-flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg mb-1.5 group-hover:scale-110 transition-transform">
                            <Lock className="w-5 h-5 text-gray-500" />
                          </div>
                          <p className="text-[10px] font-medium text-gray-700 px-2">
                            {requiredLevel} seviyesi gerekli
                          </p>
                        </div>
                      </div>
                      <div className="absolute top-1 right-1 z-20">
                        <div className="bg-accent text-white text-[9px] px-1.5 py-0.5 rounded-md font-medium">
                          Lv. 2+
                        </div>
                      </div>
                    </>
                  )}
                  <div className="text-2xl mb-1">{type.emoji}</div>
                  <div className="text-sm">{type.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{type.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* FEED POST FORM */}
          {contentType === 'feed' && (
            <>
              {/* Topic Selection */}
              <div>
                <label className="block text-sm mb-2">Başlık Seç</label>
                <div className="relative mb-2">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchTopic}
                    onChange={(e) => setSearchTopic(e.target.value)}
                    placeholder="Başlık ara..."
                    className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                  />
                </div>
                
                <div className="max-h-48 overflow-y-auto border border-border rounded-lg">
                  {filteredTopics.map((topic) => (
                    <button
                      key={topic.id}
                      onClick={() => setSelectedTopic(topic.id.toString())}
                      className={`w-full text-left px-4 py-3 border-b border-border last:border-b-0 hover:bg-secondary transition-colors ${
                        selectedTopic === topic.id.toString() ? 'bg-violet-50' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="text-sm">{topic.title}</h4>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {topic.category} • {topic.posts} gönderi
                          </p>
                        </div>
                        {selectedTopic === topic.id.toString() && (
                          <div className="w-4 h-4 bg-accent rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full" />
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm mb-2">İçerik</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Aklından ne geçiyor?"
                  rows={6}
                  className="w-full px-4 py-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                />
              </div>
            </>
          )}

          {/* TOPIC CREATION FORM */}
          {contentType === 'topic' && (
            <>
              {/* Topic Title */}
              <div>
                <label className="block text-sm mb-2">Başlık Adı</label>
                <input
                  type="text"
                  value={topicTitle}
                  onChange={(e) => setTopicTitle(e.target.value)}
                  placeholder="Başlık adını yazın..."
                  className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                />
              </div>

              {/* Topic Category */}
              <div>
                <label className="block text-sm mb-3">Kategori</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {TOPIC_CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setTopicCategory(cat.id)}
                        className={`p-3 rounded-lg border-2 transition-all flex items-center gap-2 ${
                          topicCategory === cat.id
                            ? 'border-accent bg-violet-50'
                            : 'border-border hover:border-violet-200'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-sm">{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Topic Description */}
              <div>
                <label className="block text-sm mb-2">Açıklama</label>
                <textarea
                  value={topicDescription}
                  onChange={(e) => setTopicDescription(e.target.value)}
                  placeholder="Bu başlık neyi kapsıyor? Kısa bir açıklama yaz..."
                  rows={4}
                  className="w-full px-4 py-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                />
              </div>
            </>
          )}

          {/* VENUE FORM */}
          {contentType === 'venue' && (
            <>
              {/* Venue Name */}
              <div>
                <label className="block text-sm mb-2">Mekan Adı</label>
                <input
                  type="text"
                  value={venueName}
                  onChange={(e) => setVenueName(e.target.value)}
                  placeholder="Örn: Urban Bistro, Mevlana Kütüphanesi..."
                  className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                />
              </div>

              {/* Venue Category */}
              <div>
                <label className="block text-sm mb-3">Mekan Kategorisi</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {VENUE_CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setVenueCategory(cat.id);
                          setVenueSubcategory('');
                        }}
                        className={`p-3 rounded-lg border-2 transition-all flex items-center gap-2 ${
                          venueCategory === cat.id
                            ? 'border-accent bg-violet-50'
                            : 'border-border hover:border-violet-200'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-sm">{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Venue Subcategory */}
              {venueCategory && currentVenueCategory && (
                <div>
                  <label className="block text-sm mb-3">Alt Kategori</label>
                  <div className="flex flex-wrap gap-2">
                    {currentVenueCategory.subcategories.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => setVenueSubcategory(sub)}
                        className={`px-3 py-2 rounded-lg border-2 transition-all text-sm ${
                          venueSubcategory === sub
                            ? 'border-accent bg-violet-50 text-accent'
                            : 'border-border hover:border-violet-200'
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Address */}
              <div>
                <label className="block text-sm mb-2">Adres</label>
                <input
                  type="text"
                  value={venueAddress}
                  onChange={(e) => setVenueAddress(e.target.value)}
                  placeholder="Meram, Konya"
                  className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                />
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm mb-2">Değerlendirme: {venueRating}/5</label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="0.5"
                  value={venueRating}
                  onChange={(e) => setVenueRating(parseFloat(e.target.value))}
                  className="w-full accent-accent"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Kötü</span>
                  <span>Orta</span>
                  <span>Mükemmel</span>
                </div>
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm mb-2">Özellikler</label>
                <div className="flex flex-wrap gap-2">
                  {VENUE_FEATURES.map((feature) => (
                    <button
                      key={feature}
                      onClick={() => toggleVenueFeature(feature)}
                      className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                        venueFeatures.includes(feature)
                          ? 'bg-violet-50 text-accent border border-violet-200'
                          : 'bg-white border border-border hover:border-violet-200'
                      }`}
                    >
                      {feature}
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Content */}
              <div>
                <label className="block text-sm mb-2">İnceleme</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Mekan hakkındaki deneyimini paylaş..."
                  rows={6}
                  className="w-full px-4 py-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                />
              </div>
            </>
          )}

          {/* JOB/AD FORM */}
          {contentType === 'job' && (
            <>
              {/* Job Category */}
              <div>
                <label className="block text-sm mb-3">İlan Tipi</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {JOB_CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setJobCategory(cat.id)}
                        className={`p-3 rounded-lg border-2 transition-all flex items-center gap-2 ${
                          jobCategory === cat.id
                            ? 'border-accent bg-violet-50'
                            : 'border-border hover:border-violet-200'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-sm">{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm mb-2">İlan Başlığı</label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="Örn: Frontend Developer Stajyeri Aranıyor"
                  className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                />
              </div>

              {/* Job Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm mb-2">Konum</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={jobLocation}
                      onChange={(e) => setJobLocation(e.target.value)}
                      placeholder="Meram, Konya"
                      className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2">Ücret/Fiyat</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={jobPayment}
                      onChange={(e) => setJobPayment(e.target.value)}
                      placeholder="8,000₺ / Ay"
                      className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2">Zaman</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={jobTime}
                      onChange={(e) => setJobTime(e.target.value)}
                      placeholder="Tam Zamanlı"
                      className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm mb-2">Açıklama</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="İlan detaylarını yazın..."
                  rows={6}
                  className="w-full px-4 py-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                />
              </div>
            </>
          )}

          {/* ACADEMIC FORM */}
          {contentType === 'academic' && (
            <>
              {/* Academic Type */}
              <div>
                <label className="block text-sm mb-3">İçerik Tipi</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {ACADEMIC_TYPES.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.id}
                        onClick={() => setAcademicType(type.id)}
                        className={`p-3 rounded-lg border-2 transition-all flex items-center gap-2 ${
                          academicType === type.id
                            ? 'border-accent bg-violet-50'
                            : 'border-border hover:border-violet-200'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-sm">{type.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* University Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Üniversite</label>
                  <input
                    type="text"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    placeholder="Örn: Selçuk Üniversitesi"
                    className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">Fakülte</label>
                  <input
                    type="text"
                    value={faculty}
                    onChange={(e) => setFaculty(e.target.value)}
                    placeholder="Örn: Mühendislik Fakültesi"
                    className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2">Bölüm</label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="Örn: Bilgisayar Mühendisliği"
                    className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-2">Ders Kodu</label>
                  <input
                    type="text"
                    value={courseCode}
                    onChange={(e) => setCourseCode(e.target.value)}
                    placeholder="Örn: BİL201"
                    className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                  />
                </div>
              </div>

              {/* Course Name */}
              <div>
                <label className="block text-sm mb-2">Ders Adı</label>
                <input
                  type="text"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  placeholder="Örn: Veri Yapıları ve Algoritmalar"
                  className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm mb-2">Dosya Yükle</label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-accent transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Dosyayı sürükle-bırak veya <span className="text-accent">seç</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PDF, DOCX, ZIP, MP4 - Max 50MB
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm mb-2">Açıklama</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="İçerik hakkında bilgi ver..."
                  rows={4}
                  className="w-full px-4 py-3 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent"
                />
              </div>
            </>
          )}



          {/* Tags - All Content Types */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm">Etiketler</label>
              <span className="text-xs text-muted-foreground">
                {selectedTags.length}/5
              </span>
            </div>

            {/* Selected Tags */}
            {selectedTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-violet-50 text-accent rounded-md border border-violet-100"
                  >
                    <span className="text-sm">{tag}</span>
                    <button
                      onClick={() => removeTag(tag)}
                      className="hover:bg-violet-100 rounded-sm transition-colors p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Tag Selection Button */}
            <button
              onClick={() => setShowTagArea(!showTagArea)}
              className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:border-accent transition-colors text-sm"
            >
              <Tag className="w-4 h-4" />
              <span>Etiket Ekle</span>
            </button>

            {/* Tag Selection Area */}
            {showTagArea && (
              <div className="mt-3 p-4 bg-secondary rounded-lg border border-border">
                <p className="text-xs text-muted-foreground mb-3">
                  En fazla 5 etiket seçebilirsin
                </p>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_TAGS.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      disabled={!selectedTags.includes(tag) && selectedTags.length >= 5}
                      className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                        selectedTags.includes(tag)
                          ? 'bg-violet-50 text-accent border border-violet-200'
                          : 'bg-white border border-border hover:border-violet-200 disabled:opacity-50 disabled:cursor-not-allowed'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Media Buttons - For Feed and Venue */}
          {(contentType === 'feed' || contentType === 'venue') && (
            <div>
              <label className="block text-sm mb-2">Medya</label>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:border-accent transition-colors text-sm">
                  <Image className="w-4 h-4" />
                  <span>Fotoğraf</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:border-accent transition-colors text-sm">
                  <Link2 className="w-4 h-4" />
                  <span>Link</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-secondary/30">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg hover:bg-secondary transition-colors"
          >
            İptal
          </button>
          <button
            onClick={handleSubmit}
            disabled={
              !content || 
              (contentType === 'feed' && !selectedTopic) ||
              (contentType === 'topic' && (!topicTitle || !topicCategory)) ||
              (contentType === 'venue' && (!venueName || !venueCategory)) ||
              (contentType === 'job' && (!jobTitle || !jobCategory)) ||
              (contentType === 'academic' && (!courseName || !university))
            }
            className="px-6 py-2.5 bg-accent text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Paylaş
          </button>
        </div>
      </div>
    </div>
  );
}
