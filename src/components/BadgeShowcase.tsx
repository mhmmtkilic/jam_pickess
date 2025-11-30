import { Trophy, Lock } from 'lucide-react';
import ChefBadge from '../imports/ChefBadge';
import DocumentBadge from '../imports/DocumentBadge';
import PenBadge from '../imports/PenBadge';

const EARNED_BADGES = [
  {
    id: 1,
    name: 'Mekan Müdavimi',
    description: '10+ mekan incelemesi',
    component: ChefBadge,
    earned: true,
  },
  {
    id: 2,
    name: 'Vize Kurtarıcısı',
    description: '50+ ders notu paylaşımı',
    component: DocumentBadge,
    earned: true,
  },
  {
    id: 3,
    name: 'Tasarım Dehası',
    description: '25+ kreatif içerik',
    component: PenBadge,
    earned: true,
  },
  {
    id: 4,
    name: 'Sosyal Kelebek',
    description: '100+ yorum yapma',
    component: ChefBadge,
    earned: false,
  },
  {
    id: 5,
    name: 'İlan Ustası',
    description: '20+ ilan paylaşımı',
    component: DocumentBadge,
    earned: false,
  },
  {
    id: 6,
    name: 'Topluluk Lideri',
    description: '1000+ toplam katkı',
    component: PenBadge,
    earned: false,
  },
];

export function BadgeShowcase() {
  return (
    <div className="bg-white rounded-lg border border-border hover:border-muted transition-colors">
      <div className="p-5">
        <div className="flex items-center gap-2 mb-5">
          <Trophy className="w-4 h-4 text-accent" />
          <h2 className="text-lg">Rozetlerim</h2>
          <span className="ml-auto text-xs text-muted-foreground">
            {EARNED_BADGES.filter(b => b.earned).length} / {EARNED_BADGES.length}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {EARNED_BADGES.map((badge) => {
            const BadgeComponent = badge.component;
            return (
              <div
                key={badge.id}
                className="relative transition-all hover:scale-105 cursor-pointer group"
              >
                <div className={`w-full aspect-square max-w-[80px] mx-auto ${badge.earned ? 'opacity-100' : 'opacity-40 grayscale'}`}>
                  {badge.earned ? (
                    <BadgeComponent />
                  ) : (
                    <div className="relative w-full h-full">
                      <BadgeComponent />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Lock className="w-5 h-5 text-gray-600" />
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Badge Info on Hover */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-1.5 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-[10px] text-white text-center mb-0.5">{badge.name}</p>
                  <p className="text-[9px] text-white/70 text-center leading-tight">{badge.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
