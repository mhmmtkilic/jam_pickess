import { Coins } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function VenueSidebar() {
  return (
    <aside className="space-y-4 sticky top-20 max-w-[320px] w-full">
      {/* Coin Earn Opportunity Box */}
      <div className="bg-gradient-to-br from-violet-50 to-violet-100 border-2 border-dashed border-violet-300 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <Coins className="w-5 h-5 text-violet-600" />
          <h3 className="text-violet-900">Coin Kazan!</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3 group cursor-pointer">
            <div className="w-5 h-5 rounded border-2 border-gray-300 flex-shrink-0 mt-0.5 group-hover:border-violet-500 transition-colors"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-700">Menü fotoğrafı yükle</p>
            </div>
            <div className="flex items-center gap-1 text-violet-600">
              <Coins className="w-4 h-4 fill-violet-400" />
              <span className="text-sm">+5</span>
            </div>
          </div>
          
          <div className="flex items-start gap-3 group cursor-pointer">
            <div className="w-5 h-5 rounded border-2 border-gray-300 flex-shrink-0 mt-0.5 group-hover:border-violet-500 transition-colors"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-700">Detaylı yorum yaz</p>
            </div>
            <div className="flex items-center gap-1 text-violet-600">
              <Coins className="w-4 h-4 fill-violet-400" />
              <span className="text-sm">+10</span>
            </div>
          </div>
          
          <div className="flex items-start gap-3 group cursor-pointer">
            <div className="w-5 h-5 rounded border-2 border-gray-300 flex-shrink-0 mt-0.5 group-hover:border-violet-500 transition-colors"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-700">Çalışma saatlerini güncelle</p>
            </div>
            <div className="flex items-center gap-1 text-violet-600">
              <Coins className="w-4 h-4 fill-violet-400" />
              <span className="text-sm">+3</span>
            </div>
          </div>
          
          <div className="flex items-start gap-3 group cursor-pointer">
            <div className="w-5 h-5 rounded border-2 border-gray-300 flex-shrink-0 mt-0.5 group-hover:border-violet-500 transition-colors"></div>
            <div className="flex-1">
              <p className="text-sm text-gray-700">Mekan fotoğrafı ekle</p>
            </div>
            <div className="flex items-center gap-1 text-violet-600">
              <Coins className="w-4 h-4 fill-violet-400" />
              <span className="text-sm">+7</span>
            </div>
          </div>
        </div>
      </div>

      {/* Nearby Alternatives */}
      <div className="bg-white border border-border rounded-lg p-4">
        <h3 className="mb-4">Yakındaki Alternatifler</h3>
        
        <div className="space-y-3">
          <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors group text-left">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1759050475187-674550fa911e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwZXh0ZXJpb3IlMjBzdHJlZXR8ZW58MXx8fHwxNzY0MjQ2OTMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Cafe Nero"
              className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="group-hover:text-accent transition-colors truncate">Cafe Nero</h4>
              <p className="text-sm text-muted-foreground">200 metre ileride</p>
            </div>
          </button>
          
          <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors group text-left">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1523368749929-6b2bf370dbf8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzY0MTg0MjEyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Kahve Deryası"
              className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="group-hover:text-accent transition-colors truncate">Kahve Deryası</h4>
              <p className="text-sm text-muted-foreground">Arka sokakta</p>
            </div>
          </button>
          
          <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors group text-left">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1759668868206-2316b4d83875?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwYnVpbGRpbmd8ZW58MXx8fHwxNzY0MjQ2OTMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Study Lounge"
              className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="group-hover:text-accent transition-colors truncate">Study Lounge</h4>
              <p className="text-sm text-muted-foreground">350 metre uzakta</p>
            </div>
          </button>
          
          <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors group text-left">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1759050475187-674550fa911e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwZXh0ZXJpb3IlMjBzdHJlZXR8ZW58MXx8fHwxNzY0MjQ2OTMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Kitap Kafe"
              className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="group-hover:text-accent transition-colors truncate">Kitap Kafe</h4>
              <p className="text-sm text-muted-foreground">Yan cadde üzerinde</p>
            </div>
          </button>
        </div>
      </div>
    </aside>
  );
}
