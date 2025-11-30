import { X, Award, ChevronRight, CheckCircle, Circle, Trophy, MessageCircle, Heart, Upload, Users, Target, Zap } from 'lucide-react';

interface LevelDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const roles = [
  { level: 1, name: 'Acemi', minXP: 0, maxXP: 100, color: 'gray' },
  { level: 5, name: 'Gezgin', minXP: 500, maxXP: 1000, color: 'green' },
  { level: 10, name: 'Seyyah', minXP: 2500, maxXP: 5000, color: 'blue' },
  { level: 15, name: 'Kaşif', minXP: 7500, maxXP: 10000, color: 'purple' },
  { level: 20, name: 'Usta', minXP: 15000, maxXP: 20000, color: 'orange' },
  { level: 25, name: 'Bilge', minXP: 25000, maxXP: 35000, color: 'red' },
  { level: 30, name: 'Efsane', minXP: 50000, maxXP: 100000, color: 'violet' },
];

const quests = [
  {
    id: 1,
    title: 'İlk Gönderi',
    description: 'İlk gönderini paylaş',
    xp: 50,
    icon: 'upload',
    completed: true,
  },
  {
    id: 2,
    title: 'Sosyal Kelebek',
    description: '5 farklı kişiyi takip et',
    xp: 100,
    icon: 'users',
    completed: true,
    progress: { current: 5, total: 5 },
  },
  {
    id: 3,
    title: 'Popüler Gönderi',
    description: 'Bir gönderine 50 upvote al',
    xp: 200,
    icon: 'trophy',
    completed: false,
    progress: { current: 24, total: 50 },
  },
  {
    id: 4,
    title: 'Yorum Ustası',
    description: '25 yorum yap',
    xp: 150,
    icon: 'message',
    completed: false,
    progress: { current: 12, total: 25 },
  },
  {
    id: 5,
    title: 'Beğeni Koleksiyonu',
    description: 'Gönderilerine toplam 100 beğeni al',
    xp: 250,
    icon: 'heart',
    completed: false,
    progress: { current: 67, total: 100 },
  },
  {
    id: 6,
    title: 'Aktif Üye',
    description: '7 gün üst üste platform kullan',
    xp: 300,
    icon: 'zap',
    completed: false,
    progress: { current: 3, total: 7 },
  },
];

const currentLevel = 12;
const currentXP = 3125;
const currentRole = roles.find(r => r.level <= currentLevel && currentLevel < (roles[roles.indexOf(r) + 1]?.level || 999)) || roles[2];
const nextRole = roles[roles.indexOf(currentRole) + 1];
const previousRole = roles[roles.indexOf(currentRole) - 1];

export function LevelDrawer({ isOpen, onClose }: LevelDrawerProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'upload':
        return <Upload className="w-5 h-5" />;
      case 'users':
        return <Users className="w-5 h-5" />;
      case 'trophy':
        return <Trophy className="w-5 h-5" />;
      case 'message':
        return <MessageCircle className="w-5 h-5" />;
      case 'heart':
        return <Heart className="w-5 h-5" />;
      case 'zap':
        return <Zap className="w-5 h-5" />;
      default:
        return <Target className="w-5 h-5" />;
    }
  };

  const getRoleColor = (color: string) => {
    const colors: Record<string, string> = {
      gray: 'bg-gray-100 text-gray-700 border-gray-300',
      green: 'bg-green-100 text-green-700 border-green-300',
      blue: 'bg-blue-100 text-blue-700 border-blue-300',
      purple: 'bg-purple-100 text-purple-700 border-purple-300',
      orange: 'bg-orange-100 text-orange-700 border-orange-300',
      red: 'bg-red-100 text-red-700 border-red-300',
      violet: 'bg-violet-100 text-violet-700 border-violet-300',
    };
    return colors[color] || colors.gray;
  };

  const progressToNextLevel = ((currentXP - currentRole.minXP) / (currentRole.maxXP - currentRole.minXP)) * 100;

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
          <h2 className="text-lg">Seviye & Görevler</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto h-[calc(100vh-73px)] p-4 space-y-6">
          {/* Current Level */}
          <div className="relative bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl p-5 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-8 -mt-8"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full -ml-12 -mb-12"></div>
            
            {/* Header */}
            <div className="relative flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm text-white/90">Seviye & Rol</span>
              </div>
              <div className="text-right">
                <span className="text-3xl text-white">
                  {currentLevel}
                </span>
              </div>
            </div>

            {/* Role Name */}
            <div className="relative mb-5">
              <span className="text-2xl text-white">
                {currentRole.name}
              </span>
              <p className="text-xs text-white/70 mt-1">{currentXP} / {currentRole.maxXP} XP</p>
            </div>

            {/* Progress */}
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-white/80">Sonraki seviyeye</span>
                <span className="text-xs text-white">{Math.round(progressToNextLevel)}%</span>
              </div>
              <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white rounded-full transition-all duration-300 shadow-sm"
                  style={{ width: `${progressToNextLevel}%` }}
                />
              </div>
            </div>
          </div>

          {/* Role Progression */}
          <div>
            <h3 className="text-sm mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-accent" />
              Rol İlerlemesi
            </h3>
            <div className="space-y-2">
              {/* Previous Role */}
              {previousRole && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{previousRole.name}</p>
                    <p className="text-xs text-muted-foreground">Seviye {previousRole.level} • Tamamlandı</p>
                  </div>
                </div>
              )}

              {/* Current Role */}
              <div className="flex items-center gap-3 p-4 bg-violet-50 border-2 border-accent rounded-lg">
                <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-accent">✨ {currentRole.name}</p>
                  <p className="text-xs text-accent/70">Şu anki rolün • Seviye {currentLevel}</p>
                </div>
              </div>

              {/* Next Role */}
              {nextRole && (
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border-2 border-dashed border-gray-300">
                  <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{nextRole.name}</p>
                    <p className="text-xs text-muted-foreground">Seviye {nextRole.level} • {nextRole.minXP} XP gerekli</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quests */}
          <div>
            <h3 className="text-sm mb-3 flex items-center gap-2">
              <Target className="w-4 h-4 text-accent" />
              Görevler
            </h3>
            <div className="space-y-2.5">
              {quests.map((quest) => (
                <div
                  key={quest.id}
                  className={`p-3.5 rounded-lg border transition-all ${
                    quest.completed
                      ? 'bg-gray-50 border-gray-200'
                      : 'bg-white border-border hover:border-accent/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      quest.completed ? 'bg-gray-200 text-gray-500' : 'bg-violet-50 text-accent'
                    }`}>
                      {quest.completed ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <div className="scale-75">{getIcon(quest.icon)}</div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className={`text-sm ${quest.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                          {quest.title}
                        </h4>
                        <span className={`text-xs px-2 py-0.5 rounded border shrink-0 ${
                          quest.completed 
                            ? 'bg-gray-100 text-gray-600 border-gray-200' 
                            : 'bg-white text-accent border-accent/20'
                        }`}>
                          +{quest.xp} XP
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{quest.description}</p>
                      
                      {/* Progress Bar */}
                      {quest.progress && !quest.completed && (
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>{quest.progress.current} / {quest.progress.total}</span>
                            <span>{Math.round((quest.progress.current / quest.progress.total) * 100)}%</span>
                          </div>
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-accent rounded-full transition-all"
                              style={{ width: `${(quest.progress.current / quest.progress.total) * 100}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}