import { X, Heart, MessageCircle, Trophy, ArrowUp, UserPlus, Award, CheckCircle } from 'lucide-react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const notifications = [
  {
    id: 1,
    type: 'like',
    user: {
      name: 'Ayşe Yılmaz',
      avatar: 'https://images.unsplash.com/photo-1612361844688-c6c9c44f3966?w=80&h=80&fit=crop',
    },
    content: 'gönderini beğendi',
    postTitle: 'Startup Projesinde Kullanıcı Deneyimi Başarısı',
    time: '5dk önce',
    unread: true,
  },
  {
    id: 2,
    type: 'comment',
    user: {
      name: 'Mehmet Kaya',
      avatar: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=80&h=80&fit=crop',
    },
    content: 'gönderine yorum yaptı',
    postTitle: 'ChatGPT\'nin Yeni Özellikleri',
    time: '15dk önce',
    unread: true,
  },
  {
    id: 3,
    type: 'upvote',
    user: {
      name: 'Zeynep Demir',
      avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=80&h=80&fit=crop',
    },
    content: 'gönderine upvote verdi',
    postTitle: 'Remote Çalışma Deneyimlerim',
    time: '1s önce',
    unread: true,
  },
  {
    id: 4,
    type: 'follow',
    user: {
      name: 'Can Özkan',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
    },
    content: 'seni takip etmeye başladı',
    time: '2s önce',
    unread: false,
  },
  {
    id: 5,
    type: 'achievement',
    icon: 'trophy',
    content: 'Yeni rozet kazandın: "İlk 100 Upvote"',
    time: '3s önce',
    unread: false,
  },
  {
    id: 6,
    type: 'level',
    icon: 'award',
    content: 'Tebrikler! Seviye 13\'e ulaştın 🎉',
    time: '1g önce',
    unread: false,
  },
  {
    id: 7,
    type: 'comment',
    user: {
      name: 'Elif Yıldız',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop',
    },
    content: 'yorumuna yanıt verdi',
    postTitle: 'Freelance İşe Nasıl Başladım?',
    time: '2g önce',
    unread: false,
  },
  {
    id: 8,
    type: 'like',
    user: {
      name: 'Burak Aslan',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop',
    },
    content: 'yorumunu beğendi',
    postTitle: 'Üniversitede Zaman Yönetimi İpuçları',
    time: '1g önce',
    unread: false,
  },
];

export function NotificationDrawer({ isOpen, onClose }: NotificationDrawerProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Heart className="w-4 h-4 text-red-500" />;
      case 'comment':
        return <MessageCircle className="w-4 h-4 text-blue-500" />;
      case 'upvote':
        return <ArrowUp className="w-4 h-4 text-accent" />;
      case 'follow':
        return <UserPlus className="w-4 h-4 text-green-500" />;
      case 'achievement':
        return <Trophy className="w-4 h-4 text-yellow-500" />;
      case 'level':
        return <Award className="w-4 h-4 text-accent" />;
      default:
        return <CheckCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[360px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-border px-4 py-4 flex items-center justify-between z-10">
          <h2 className="text-lg">Bildirimler</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="overflow-y-auto h-[calc(100vh-73px)]">
          <div className="divide-y divide-border">
            {notifications.map((notification) => (
              <button
                key={notification.id}
                className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                  notification.unread ? 'bg-violet-50/30' : ''
                }`}
              >
                <div className="flex gap-3">
                  {/* Avatar or Icon */}
                  <div className="relative flex-shrink-0">
                    {notification.user ? (
                      <img
                        src={notification.user.avatar}
                        alt={notification.user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        {getIcon(notification.type)}
                      </div>
                    )}
                    {/* Type Icon Badge */}
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
                      {getIcon(notification.type)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm mb-1">
                      {notification.user && (
                        <span className="font-medium">{notification.user.name} </span>
                      )}
                      <span className="text-gray-600">{notification.content}</span>
                    </p>
                    {notification.postTitle && (
                      <p className="text-sm text-gray-500 mb-1 line-clamp-1">
                        "{notification.postTitle}"
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>

                  {/* Unread Indicator */}
                  {notification.unread && (
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 bg-accent rounded-full" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}