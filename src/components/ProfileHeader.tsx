import { Settings, GraduationCap, CheckCircle2, MapPin, Calendar, Link as LinkIcon, Award, TrendingUp } from 'lucide-react';

export function ProfileHeader() {
  return (
    <div className="bg-white rounded-lg border border-border hover:border-muted transition-colors">
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Profile Section */}
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 relative">
          {/* Role Badge - Top Right */}
          <div className="absolute top-0 right-0 sm:static sm:order-3 sm:ml-auto">
            <div className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 bg-violet-50 border border-violet-200 rounded-lg">
              <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" />
              <span className="text-xs sm:text-sm text-accent whitespace-nowrap">Gezgin • Lv. 12</span>
            </div>
          </div>

          {/* Left: Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-violet-400 via-purple-500 to-purple-600 flex items-center justify-center text-white text-2xl sm:text-3xl ring-4 ring-violet-100 shadow-lg">
              OK
            </div>
            {/* Verified Badge */}
            <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1.5 ring-4 ring-white">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
            </div>
          </div>

          {/* Right: User Info */}
          <div className="flex-1 min-w-0 w-full sm:w-auto sm:pt-1">
            {/* Name */}
            <h1 className="text-xl sm:text-2xl mb-1 sm:mb-2">Osman Kağan</h1>

            {/* Username */}
            <p className="text-muted-foreground mb-3 sm:mb-4 text-sm sm:text-base">@osmankagankurnaz</p>
            
            {/* Bio */}
            <p className="text-gray-700 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">
              UI/UX Designer & Frontend Developer. Startup projeleri ve kullanıcı deneyimi üzerine çalışıyorum. 🚀
            </p>

            {/* Meta Info */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-x-5 sm:gap-y-2.5 text-xs sm:text-sm text-gray-600">
              <div className="flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span className="truncate">Selçuk Üniversitesi - Bilgisayar Müh.</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span>Konya, Türkiye</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span>Eylül 2023'ten beri</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}