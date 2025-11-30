import { useState } from 'react';
import { Building2, BookOpen, GraduationCap, FileText, ChevronDown } from 'lucide-react';

type TypeFilter = 'all' | 'notes' | 'book' | 'article' | 'video' | 'presentation' | 'project';

// Akademik veri yapısı
const academicData = {
  'selcuk': {
    label: 'Selçuk Üniversitesi',
    shortLabel: 'Selçuk',
    faculties: {
      'muhendislik': {
        label: 'Mühendislik Fakültesi',
        shortLabel: 'Mühendislik',
        departments: {
          'bilgisayar': {
            label: 'Bilgisayar Mühendisliği',
            shortLabel: 'Bilgisayar Müh.',
            courses: ['Veri Yapıları', 'Algoritma Analizi', 'Veritabanı Sistemleri', 'Yapay Zeka', 'Web Programlama']
          },
          'elektrik': {
            label: 'Elektrik-Elektronik Mühendisliği',
            shortLabel: 'Elektrik-Elektronik',
            courses: ['Devre Analizi', 'Elektromanyetik', 'Sinyal İşleme', 'Güç Sistemleri', 'Kontrol Sistemleri']
          },
          'makine': {
            label: 'Makine Mühendisliği',
            shortLabel: 'Makine Müh.',
            courses: ['Termodinamik', 'Malzeme Bilimi', 'Akışkanlar Mekaniği', 'Mukavemet', 'CAD/CAM']
          }
        }
      },
      'fen': {
        label: 'Fen Fakültesi',
        shortLabel: 'Fen',
        departments: {
          'matematik': {
            label: 'Matematik',
            shortLabel: 'Matematik',
            courses: ['Analiz', 'Lineer Cebir', 'Diferansiyel Denklemler', 'Soyut Matematik', 'Sayılar Teorisi']
          },
          'fizik': {
            label: 'Fizik',
            shortLabel: 'Fizik',
            courses: ['Klasik Mekanik', 'Kuantum Fiziği', 'Elektromanyetik Teori', 'Optik', 'Termodinamik']
          },
          'kimya': {
            label: 'Kimya',
            shortLabel: 'Kimya',
            courses: ['Organik Kimya', 'Anorganik Kimya', 'Fizikokimya', 'Analitik Kimya', 'Biyokimya']
          }
        }
      },
      'edebiyat': {
        label: 'Edebiyat Fakültesi',
        shortLabel: 'Edebiyat',
        departments: {
          'turk-dili': {
            label: 'Türk Dili ve Edebiyatı',
            shortLabel: 'Türk Dili',
            courses: ['Eski Türk Edebiyatı', 'Yeni Türk Edebiyatı', 'Dil Bilimi', 'Halk Edebiyatı', 'Yazma Sanatı']
          },
          'tarih': {
            label: 'Tarih',
            shortLabel: 'Tarih',
            courses: ['Osmanlı Tarihi', 'Türkiye Cumhuriyeti Tarihi', 'Dünya Tarihi', 'Sanat Tarihi', 'Arkeoloji']
          }
        }
      }
    }
  },
  'erbakan': {
    label: 'Necmettin Erbakan Üniversitesi',
    shortLabel: 'Erbakan',
    faculties: {
      'muhendislik': {
        label: 'Mühendislik ve Mimarlık Fakültesi',
        shortLabel: 'Mühendislik',
        departments: {
          'bilgisayar': {
            label: 'Bilgisayar Mühendisliği',
            shortLabel: 'Bilgisayar Müh.',
            courses: ['Nesne Yönelimli Programlama', 'Mobil Programlama', 'Yazılım Mühendisliği', 'Bilgisayar Ağları', 'Siber Güvenlik']
          },
          'insaat': {
            label: 'İnşaat Mühendisliği',
            shortLabel: 'İnşaat Müh.',
            courses: ['Yapı Statiği', 'Zemin Mekaniği', 'Betonarme', 'Hidrolik', 'Ulaştırma Mühendisliği']
          }
        }
      },
      'tip': {
        label: 'Tıp Fakültesi',
        shortLabel: 'Tıp',
        departments: {
          'klinik': {
            label: 'Klinik Bilimler',
            shortLabel: 'Klinik Bilimler',
            courses: ['Anatomi', 'Fizyoloji', 'İç Hastalıkları', 'Cerrahi', 'Pediatri']
          }
        }
      }
    }
  },
  'karatay': {
    label: 'KTO Karatay Üniversitesi',
    shortLabel: 'Karatay',
    faculties: {
      'iktisadi': {
        label: 'İktisadi ve İdari Bilimler Fakültesi',
        shortLabel: 'İktisadi İdari',
        departments: {
          'isletme': {
            label: 'İşletme',
            shortLabel: 'İşletme',
            courses: ['Pazarlama Yönetimi', 'Finans', 'İnsan Kaynakları', 'Üretim Yönetimi', 'Stratejik Yönetim']
          },
          'iktisat': {
            label: 'İktisat',
            shortLabel: 'İktisat',
            courses: ['Mikroekonomi', 'Makroekonomi', 'Para Teorisi', 'Kalkınma Ekonomisi', 'Ekonometri']
          }
        }
      },
      'hukuk': {
        label: 'Hukuk Fakültesi',
        shortLabel: 'Hukuk',
        departments: {
          'kamu': {
            label: 'Kamu Hukuku',
            shortLabel: 'Kamu Hukuku',
            courses: ['Anayasa Hukuku', 'İdare Hukuku', 'Ceza Hukuku', 'Vergi Hukuku', 'İnsan Hakları']
          },
          'ozel': {
            label: 'Özel Hukuk',
            shortLabel: 'Özel Hukuk',
            courses: ['Medeni Hukuk', 'Borçlar Hukuku', 'Ticaret Hukuku', 'Miras Hukuku', 'Aile Hukuku']
          }
        }
      }
    }
  }
};

export function AcademicFilters({ 
  typeFilter,
  onTypeChange
}: { 
  typeFilter: TypeFilter;
  onTypeChange?: (filter: TypeFilter) => void;
}) {
  const [selectedUniversity, setSelectedUniversity] = useState<string>('');
  const [selectedFaculty, setSelectedFaculty] = useState<string>('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  
  const [typeExpanded, setTypeExpanded] = useState(true);

  // Seçimleri sıfırlama
  const handleClearAll = () => {
    setSelectedUniversity('');
    setSelectedFaculty('');
    setSelectedDepartment('');
    setSelectedCourse('');
    onTypeChange?.('all');
  };

  // Üniversite seçimi değiştiğinde alt seçimleri sıfırla
  const handleUniversityChange = (uni: string) => {
    setSelectedUniversity(uni);
    setSelectedFaculty('');
    setSelectedDepartment('');
    setSelectedCourse('');
  };

  // Fakülte seçimi değiştiğinde alt seçimleri sıfırla
  const handleFacultyChange = (fac: string) => {
    setSelectedFaculty(fac);
    setSelectedDepartment('');
    setSelectedCourse('');
  };

  // Bölüm seçimi değiştiğinde ders seçimini sıfırla
  const handleDepartmentChange = (dept: string) => {
    setSelectedDepartment(dept);
    setSelectedCourse('');
  };

  // Mevcut fakülteleri al
  const availableFaculties = selectedUniversity && academicData[selectedUniversity as keyof typeof academicData]
    ? Object.entries(academicData[selectedUniversity as keyof typeof academicData].faculties)
    : [];

  // Mevcut bölümleri al
  const availableDepartments = selectedUniversity && selectedFaculty
    ? Object.entries(
        academicData[selectedUniversity as keyof typeof academicData].faculties[selectedFaculty]?.departments || {}
      )
    : [];

  // Mevcut dersleri al
  const availableCourses = selectedUniversity && selectedFaculty && selectedDepartment
    ? academicData[selectedUniversity as keyof typeof academicData].faculties[selectedFaculty]?.departments[selectedDepartment]?.courses || []
    : [];

  return (
    <aside className="space-y-4 sticky top-20 max-w-[320px] w-full">
      {/* Akademik Filtreleme - Adım Adım */}
      <div className="bg-white border border-border rounded-lg p-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h3>Akademik Filtre</h3>
          <button 
            onClick={handleClearAll}
            className="text-xs px-2.5 py-1 rounded-md text-muted-foreground hover:text-accent hover:bg-violet-50 transition-all"
          >
            Temizle
          </button>
        </div>

        {/* Üniversite Seçimi - Badges */}
        <div className="mb-5">
          <label className="block text-sm text-muted-foreground mb-3 flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Üniversite
          </label>
          <div className="flex flex-wrap gap-2">
            {Object.entries(academicData).map(([key, uni]) => (
              <button
                key={key}
                onClick={() => handleUniversityChange(key)}
                className={`px-3 py-1.5 rounded-md text-xs transition-all ${
                  selectedUniversity === key
                    ? 'bg-accent text-white'
                    : 'bg-gray-100 text-foreground hover:bg-violet-50 hover:text-accent border border-transparent hover:border-accent/20'
                }`}
              >
                {uni.shortLabel}
              </button>
            ))}
          </div>
        </div>

        {/* Fakülte Seçimi - Badges */}
        {selectedUniversity && availableFaculties.length > 0 && (
          <div className="mb-5 pt-5 border-t border-border">
            <label className="block text-sm text-muted-foreground mb-3 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Fakülte
            </label>
            <div className="flex flex-wrap gap-2">
              {availableFaculties.map(([key, fac]) => (
                <button
                  key={key}
                  onClick={() => handleFacultyChange(key)}
                  className={`px-3 py-1.5 rounded-md text-xs transition-all ${
                    selectedFaculty === key
                      ? 'bg-accent text-white'
                      : 'bg-gray-100 text-foreground hover:bg-violet-50 hover:text-accent border border-transparent hover:border-accent/20'
                  }`}
                >
                  {fac.shortLabel}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Bölüm Seçimi - Badges */}
        {selectedFaculty && availableDepartments.length > 0 && (
          <div className="mb-5 pt-5 border-t border-border">
            <label className="block text-sm text-muted-foreground mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Bölüm
            </label>
            <div className="flex flex-wrap gap-2">
              {availableDepartments.map(([key, dept]) => (
                <button
                  key={key}
                  onClick={() => handleDepartmentChange(key)}
                  className={`px-3 py-1.5 rounded-md text-xs transition-all ${
                    selectedDepartment === key
                      ? 'bg-accent text-white'
                      : 'bg-gray-100 text-foreground hover:bg-violet-50 hover:text-accent border border-transparent hover:border-accent/20'
                  }`}
                >
                  {dept.shortLabel}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Ders Seçimi - Badges */}
        {selectedDepartment && availableCourses.length > 0 && (
          <div className="pt-5 border-t border-border">
            <label className="block text-sm text-muted-foreground mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Ders <span className="text-xs text-muted-foreground/60">(Opsiyonel)</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {availableCourses.map((course) => (
                <button
                  key={course}
                  onClick={() => setSelectedCourse(course)}
                  className={`px-3 py-1.5 rounded-md text-xs transition-all ${
                    selectedCourse === course
                      ? 'bg-accent text-white'
                      : 'bg-gray-100 text-foreground hover:bg-violet-50 hover:text-accent border border-transparent hover:border-accent/20'
                  }`}
                >
                  {course}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Kaynak Türü Filtresi - Ayrı Kart */}
      <div className="bg-white border border-border rounded-lg p-5">
        <button
          onClick={() => setTypeExpanded(!typeExpanded)}
          className="w-full flex items-center justify-between mb-3 group"
        >
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
            <h4 className="text-sm text-muted-foreground uppercase tracking-wide group-hover:text-accent transition-colors">
              Kaynak Türü
            </h4>
          </div>
          <ChevronDown 
            className={`w-4 h-4 text-muted-foreground group-hover:text-accent transition-all ${
              typeExpanded ? 'rotate-180' : ''
            }`}
          />
        </button>
        {typeExpanded && (
          <div className="space-y-2.5">
            {[
              { value: 'all' as TypeFilter, label: 'Tümü' },
              { value: 'notes' as TypeFilter, label: 'Ders Notu' },
              { value: 'book' as TypeFilter, label: 'Kitap Önerisi' },
              { value: 'article' as TypeFilter, label: 'Makale' },
              { value: 'video' as TypeFilter, label: 'Video' },
              { value: 'presentation' as TypeFilter, label: 'Sunum' },
              { value: 'project' as TypeFilter, label: 'Proje' }
            ].map((option) => (
              <label key={option.value} className="flex items-center gap-2.5 cursor-pointer group py-0.5">
                <input
                  type="radio"
                  name="type"
                  checked={typeFilter === option.value}
                  onChange={() => onTypeChange?.(option.value)}
                  className="w-4 h-4 rounded-full border-2 border-gray-300 bg-transparent appearance-none cursor-pointer transition-all checked:border-[#7c3aed] checked:bg-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20 focus:ring-offset-0 checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI4IiBjeT0iOCIgcj0iMyIgZmlsbD0id2hpdGUiLz48L3N2Zz4=')] checked:bg-center checked:bg-no-repeat"
                />
                <span className="text-sm group-hover:text-accent transition-colors select-none">{option.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
