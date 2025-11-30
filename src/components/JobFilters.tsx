import { Briefcase, MapPin, Clock, DollarSign, Home, Users, Package, Tag, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface JobFiltersProps {
  category: 'all' | 'job' | 'roommate' | 'sale';
}

export function JobFilters({ category }: JobFiltersProps) {
  const [selectedJobType, setSelectedJobType] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedPayment, setSelectedPayment] = useState<string>('all');
  const [selectedTime, setSelectedTime] = useState<string>('all');
  const [selectedRoomCount, setSelectedRoomCount] = useState<string>('all');
  const [selectedGender, setSelectedGender] = useState<string>('all');
  const [selectedProductType, setSelectedProductType] = useState<string>('all');
  const [selectedCondition, setSelectedCondition] = useState<string>('all');
  const [selectedWorkType, setSelectedWorkType] = useState<string>('all');

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    jobType: false,
    workType: false,
    location: false,
    payment: false,
    time: false,
    roomCount: false,
    rent: false,
    gender: false,
    productType: false,
    condition: false,
    price: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const jobTypes = [
    { value: 'all', label: 'Tüm İş İlanları' },
    { value: 'tutor', label: 'Özel Ders' },
    { value: 'internship', label: 'Staj' },
    { value: 'parttime', label: 'Part-time İş' },
    { value: 'freelance', label: 'Freelance' },
  ];

  const locations = [
    { value: 'all', label: 'Tüm Lokasyonlar' },
    { value: 'meram', label: 'Meram' },
    { value: 'selcuklu', label: 'Selçuklu' },
    { value: 'karatay', label: 'Karatay' },
    { value: 'remote', label: 'Uzaktan' },
  ];

  const paymentRanges = [
    { value: 'all', label: 'Tüm Ücretler' },
    { value: '0-500', label: '0₺ - 500₺' },
    { value: '500-1000', label: '500₺ - 1,000₺' },
    { value: '1000-2000', label: '1,000₺ - 2,000₺' },
    { value: '2000-5000', label: '2,000₺ - 5,000₺' },
    { value: '5000+', label: '5,000₺+' },
  ];

  const timeOptions = [
    { value: 'all', label: 'Tüm Zamanlar' },
    { value: 'flexible', label: 'Esnek' },
    { value: 'weekday', label: 'Hafta İçi' },
    { value: 'weekend', label: 'Hafta Sonu' },
    { value: 'fulltime', label: 'Tam Zamanlı' },
  ];

  const workTypes = [
    { value: 'all', label: 'Tümü' },
    { value: 'remote', label: 'Uzaktan' },
    { value: 'hybrid', label: 'Hibrit' },
    { value: 'office', label: 'Ofis' },
  ];

  const roomCounts = [
    { value: 'all', label: 'Tüm Daireler' },
    { value: '1+1', label: '1+1' },
    { value: '2+1', label: '2+1' },
    { value: '3+1', label: '3+1' },
    { value: '4+1', label: '4+1' },
  ];

  const rentRanges = [
    { value: 'all', label: 'Tüm Kiralar' },
    { value: '0-3000', label: '0₺ - 3,000₺' },
    { value: '3000-5000', label: '3,000₺ - 5,000₺' },
    { value: '5000-7000', label: '5,000₺ - 7,000₺' },
    { value: '7000+', label: '7,000₺+' },
  ];

  const genderPreferences = [
    { value: 'all', label: 'Fark Etmez' },
    { value: 'female', label: 'Kız Öğrenci' },
    { value: 'male', label: 'Erkek Öğrenci' },
  ];

  const productTypes = [
    { value: 'all', label: 'Tüm Ürünler' },
    { value: 'electronics', label: 'Elektronik' },
    { value: 'books', label: 'Kitap & Kırtasiye' },
    { value: 'furniture', label: 'Mobilya' },
    { value: 'clothing', label: 'Giyim & Aksesuar' },
    { value: 'other', label: 'Diğer' },
  ];

  const productConditions = [
    { value: 'all', label: 'Tümü' },
    { value: 'new', label: 'Sıfır' },
    { value: 'likenew', label: 'Sıfır Gibi' },
    { value: 'used', label: 'İkinci El' },
  ];

  const priceRanges = [
    { value: 'all', label: 'Tüm Fiyatlar' },
    { value: '0-100', label: '0₺ - 100₺' },
    { value: '100-500', label: '100₺ - 500₺' },
    { value: '500-1000', label: '500₺ - 1,000₺' },
    { value: '1000-5000', label: '1,000₺ - 5,000₺' },
    { value: '5000+', label: '5,000₺+' },
  ];

  const renderAllFilters = () => (
    <>
      {/* Job Type Filter - Accordion */}
      <div className="mb-5 pt-5 border-t border-border first:pt-0 first:border-t-0">
        <button
          onClick={() => toggleSection('jobType')}
          className="w-full flex items-center justify-between mb-3 group"
        >
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
            <h4 className="text-sm text-muted-foreground uppercase tracking-wide group-hover:text-accent transition-colors">
              İlan Kategorisi
            </h4>
          </div>
          <ChevronDown 
            className={`w-4 h-4 text-muted-foreground group-hover:text-accent transition-all ${
              openSections.jobType ? 'rotate-180' : ''
            }`}
          />
        </button>
        {openSections.jobType && (
          <div className="space-y-2.5">
            {jobTypes.map((type) => (
              <label
                key={type.value}
                className="flex items-center gap-2.5 cursor-pointer group py-0.5"
              >
                <input
                  type="radio"
                  name="jobType"
                  value={type.value}
                  checked={selectedJobType === type.value}
                  onChange={(e) => setSelectedJobType(e.target.value)}
                  className="w-4 h-4 rounded-full border-2 border-gray-300 bg-transparent appearance-none cursor-pointer transition-all checked:border-[#7c3aed] checked:bg-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20 focus:ring-offset-0 checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI4IiBjeT0iOCIgcj0iMyIgZmlsbD0id2hpdGUiLz48L3N2Zz4=')] checked:bg-center checked:bg-no-repeat"
                />
                <span className="text-sm group-hover:text-accent transition-colors select-none">{type.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Location Filter - Accordion */}
      <div className="mb-5 pt-5 border-t border-border">
        <button
          onClick={() => toggleSection('location')}
          className="w-full flex items-center justify-between mb-3 group"
        >
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
            <h4 className="text-sm text-muted-foreground uppercase tracking-wide group-hover:text-accent transition-colors">
              Konum
            </h4>
          </div>
          <ChevronDown 
            className={`w-4 h-4 text-muted-foreground group-hover:text-accent transition-all ${
              openSections.location ? 'rotate-180' : ''
            }`}
          />
        </button>
        {openSections.location && (
          <div className="space-y-2.5">
            {locations.map((location) => (
              <label
                key={location.value}
                className="flex items-center gap-2.5 cursor-pointer group py-0.5"
              >
                <input
                  type="radio"
                  name="location"
                  value={location.value}
                  checked={selectedLocation === location.value}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-4 h-4 rounded-full border-2 border-gray-300 bg-transparent appearance-none cursor-pointer transition-all checked:border-[#7c3aed] checked:bg-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20 focus:ring-offset-0 checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI4IiBjeT0iOCIgcj0iMyIgZmlsbD0id2hpdGUiLz48L3N2Zz4=')] checked:bg-center checked:bg-no-repeat"
                />
                <span className="text-sm group-hover:text-accent transition-colors select-none">{location.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Payment Filter - Accordion */}
      <div className="mb-5 pt-5 border-t border-border">
        <button
          onClick={() => toggleSection('payment')}
          className="w-full flex items-center justify-between mb-3 group"
        >
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
            <h4 className="text-sm text-muted-foreground uppercase tracking-wide group-hover:text-accent transition-colors">
              Ücret/Fiyat Aralığı
            </h4>
          </div>
          <ChevronDown 
            className={`w-4 h-4 text-muted-foreground group-hover:text-accent transition-all ${
              openSections.payment ? 'rotate-180' : ''
            }`}
          />
        </button>
        {openSections.payment && (
          <div className="space-y-2.5">
            {paymentRanges.map((range) => (
              <label
                key={range.value}
                className="flex items-center gap-2.5 cursor-pointer group py-0.5"
              >
                <input
                  type="radio"
                  name="payment"
                  value={range.value}
                  checked={selectedPayment === range.value}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                  className="w-4 h-4 rounded-full border-2 border-gray-300 bg-transparent appearance-none cursor-pointer transition-all checked:border-[#7c3aed] checked:bg-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20 focus:ring-offset-0 checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI4IiBjeT0iOCIgcj0iMyIgZmlsbD0id2hpdGUiLz48L3N2Zz4=')] checked:bg-center checked:bg-no-repeat"
                />
                <span className="text-sm group-hover:text-accent transition-colors select-none">{range.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Time Filter - Accordion */}
      <div className="pt-5 border-t border-border">
        <button
          onClick={() => toggleSection('time')}
          className="w-full flex items-center justify-between mb-3 group"
        >
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
            <h4 className="text-sm text-muted-foreground uppercase tracking-wide group-hover:text-accent transition-colors">
              Çalışma Zamanı
            </h4>
          </div>
          <ChevronDown 
            className={`w-4 h-4 text-muted-foreground group-hover:text-accent transition-all ${
              openSections.time ? 'rotate-180' : ''
            }`}
          />
        </button>
        {openSections.time && (
          <div className="space-y-2.5">
            {timeOptions.map((time) => (
              <label
                key={time.value}
                className="flex items-center gap-2.5 cursor-pointer group py-0.5"
              >
                <input
                  type="radio"
                  name="time"
                  value={time.value}
                  checked={selectedTime === time.value}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-4 h-4 rounded-full border-2 border-gray-300 bg-transparent appearance-none cursor-pointer transition-all checked:border-[#7c3aed] checked:bg-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20 focus:ring-offset-0 checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI4IiBjeT0iOCIgcj0iMyIgZmlsbD0id2hpdGUiLz48L3N2Zz4=')] checked:bg-center checked:bg-no-repeat"
                />
                <span className="text-sm group-hover:text-accent transition-colors select-none">{time.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </>
  );

  const renderJobFilters = () => (
    <>
      {/* Job Type Filter - Accordion */}
      <div className="mb-5 pt-5 border-t border-border first:pt-0 first:border-t-0">
        <button
          onClick={() => toggleSection('jobType')}
          className="w-full flex items-center justify-between mb-3 group"
        >
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
            <h4 className="text-sm text-muted-foreground uppercase tracking-wide group-hover:text-accent transition-colors">
              İş Türü
            </h4>
          </div>
          <ChevronDown 
            className={`w-4 h-4 text-muted-foreground group-hover:text-accent transition-all ${
              openSections.jobType ? 'rotate-180' : ''
            }`}
          />
        </button>
        {openSections.jobType && (
          <div className="space-y-2.5">
            {jobTypes.map((type) => (
              <label
                key={type.value}
                className="flex items-center gap-2.5 cursor-pointer group py-0.5"
              >
                <input
                  type="radio"
                  name="jobType"
                  value={type.value}
                  checked={selectedJobType === type.value}
                  onChange={(e) => setSelectedJobType(e.target.value)}
                  className="w-4 h-4 rounded-full border-2 border-gray-300 bg-transparent appearance-none cursor-pointer transition-all checked:border-[#7c3aed] checked:bg-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20 focus:ring-offset-0 checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI4IiBjeT0iOCIgcj0iMyIgZmlsbD0id2hpdGUiLz48L3N2Zz4=')] checked:bg-center checked:bg-no-repeat"
                />
                <span className="text-sm group-hover:text-accent transition-colors select-none">{type.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Work Type Filter - Accordion */}
      <div className="mb-5 pt-5 border-t border-border">
        <button
          onClick={() => toggleSection('workType')}
          className="w-full flex items-center justify-between mb-3 group"
        >
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
            <h4 className="text-sm text-muted-foreground uppercase tracking-wide group-hover:text-accent transition-colors">
              Çalışma Şekli
            </h4>
          </div>
          <ChevronDown 
            className={`w-4 h-4 text-muted-foreground group-hover:text-accent transition-all ${
              openSections.workType ? 'rotate-180' : ''
            }`}
          />
        </button>
        {openSections.workType && (
          <div className="space-y-2.5">
            {workTypes.map((type) => (
              <label
                key={type.value}
                className="flex items-center gap-2.5 cursor-pointer group py-0.5"
              >
                <input
                  type="radio"
                  name="workType"
                  value={type.value}
                  checked={selectedWorkType === type.value}
                  onChange={(e) => setSelectedWorkType(e.target.value)}
                  className="w-4 h-4 rounded-full border-2 border-gray-300 bg-transparent appearance-none cursor-pointer transition-all checked:border-[#7c3aed] checked:bg-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20 focus:ring-offset-0 checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI4IiBjeT0iOCIgcj0iMyIgZmlsbD0id2hpdGUiLz48L3N2Zz4=')] checked:bg-center checked:bg-no-repeat"
                />
                <span className="text-sm group-hover:text-accent transition-colors select-none">{type.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Location Filter - Accordion */}
      <div className="mb-5 pt-5 border-t border-border">
        <button
          onClick={() => toggleSection('location')}
          className="w-full flex items-center justify-between mb-3 group"
        >
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
            <h4 className="text-sm text-muted-foreground uppercase tracking-wide group-hover:text-accent transition-colors">
              Konum
            </h4>
          </div>
          <ChevronDown 
            className={`w-4 h-4 text-muted-foreground group-hover:text-accent transition-all ${
              openSections.location ? 'rotate-180' : ''
            }`}
          />
        </button>
        {openSections.location && (
          <div className="space-y-2.5">
            {locations.map((location) => (
              <label
                key={location.value}
                className="flex items-center gap-2.5 cursor-pointer group py-0.5"
              >
                <input
                  type="radio"
                  name="location"
                  value={location.value}
                  checked={selectedLocation === location.value}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-4 h-4 rounded-full border-2 border-gray-300 bg-transparent appearance-none cursor-pointer transition-all checked:border-[#7c3aed] checked:bg-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20 focus:ring-offset-0 checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI4IiBjeT0iOCIgcj0iMyIgZmlsbD0id2hpdGUiLz48L3N2Zz4=')] checked:bg-center checked:bg-no-repeat"
                />
                <span className="text-sm group-hover:text-accent transition-colors select-none">{location.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Payment Filter - Accordion */}
      <div className="pt-5 border-t border-border">
        <button
          onClick={() => toggleSection('payment')}
          className="w-full flex items-center justify-between mb-3 group"
        >
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
            <h4 className="text-sm text-muted-foreground uppercase tracking-wide group-hover:text-accent transition-colors">
              Ücret Aralığı
            </h4>
          </div>
          <ChevronDown 
            className={`w-4 h-4 text-muted-foreground group-hover:text-accent transition-all ${
              openSections.payment ? 'rotate-180' : ''
            }`}
          />
        </button>
        {openSections.payment && (
          <div className="space-y-2.5">
            {paymentRanges.map((range) => (
              <label
                key={range.value}
                className="flex items-center gap-2.5 cursor-pointer group py-0.5"
              >
                <input
                  type="radio"
                  name="payment"
                  value={range.value}
                  checked={selectedPayment === range.value}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                  className="w-4 h-4 rounded-full border-2 border-gray-300 bg-transparent appearance-none cursor-pointer transition-all checked:border-[#7c3aed] checked:bg-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20 focus:ring-offset-0 checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI4IiBjeT0iOCIgcj0iMyIgZmlsbD0id2hpdGUiLz48L3N2Zz4=')] checked:bg-center checked:bg-no-repeat"
                />
                <span className="text-sm group-hover:text-accent transition-colors select-none">{range.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </>
  );

  const renderRoommateFilters = () => (
    <>
      {/* Room Count Filter - Accordion */}
      <div className="mb-5 pt-5 border-t border-border first:pt-0 first:border-t-0">
        <button
          onClick={() => toggleSection('roomCount')}
          className="w-full flex items-center justify-between mb-3 group"
        >
          <div className="flex items-center gap-2">
            <Home className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
            <h4 className="text-sm text-muted-foreground uppercase tracking-wide group-hover:text-accent transition-colors">
              Oda Sayısı
            </h4>
          </div>
          <ChevronDown 
            className={`w-4 h-4 text-muted-foreground group-hover:text-accent transition-all ${
              openSections.roomCount ? 'rotate-180' : ''
            }`}
          />
        </button>
        {openSections.roomCount && (
          <div className="space-y-2.5">
            {roomCounts.map((room) => (
              <label
                key={room.value}
                className="flex items-center gap-2.5 cursor-pointer group py-0.5"
              >
                <input
                  type="radio"
                  name="roomCount"
                  value={room.value}
                  checked={selectedRoomCount === room.value}
                  onChange={(e) => setSelectedRoomCount(e.target.value)}
                  className="w-4 h-4 rounded-full border-2 border-gray-300 bg-transparent appearance-none cursor-pointer transition-all checked:border-[#7c3aed] checked:bg-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20 focus:ring-offset-0 checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI4IiBjeT0iOCIgcj0iMyIgZmlsbD0id2hpdGUiLz48L3N2Zz4=')] checked:bg-center checked:bg-no-repeat"
                />
                <span className="text-sm group-hover:text-accent transition-colors select-none">{room.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Location Filter - Accordion */}
      <div className="mb-5 pt-5 border-t border-border">
        <button
          onClick={() => toggleSection('location')}
          className="w-full flex items-center justify-between mb-3 group"
        >
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
            <h4 className="text-sm text-muted-foreground uppercase tracking-wide group-hover:text-accent transition-colors">
              Konum
            </h4>
          </div>
          <ChevronDown 
            className={`w-4 h-4 text-muted-foreground group-hover:text-accent transition-all ${
              openSections.location ? 'rotate-180' : ''
            }`}
          />
        </button>
        {openSections.location && (
          <div className="space-y-2.5">
            {locations.map((location) => (
              <label
                key={location.value}
                className="flex items-center gap-2.5 cursor-pointer group py-0.5"
              >
                <input
                  type="radio"
                  name="location"
                  value={location.value}
                  checked={selectedLocation === location.value}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-4 h-4 rounded-full border-2 border-gray-300 bg-transparent appearance-none cursor-pointer transition-all checked:border-[#7c3aed] checked:bg-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20 focus:ring-offset-0 checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI4IiBjeT0iOCIgcj0iMyIgZmlsbD0id2hpdGUiLz48L3N2Zz4=')] checked:bg-center checked:bg-no-repeat"
                />
                <span className="text-sm group-hover:text-accent transition-colors select-none">{location.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Rent Range Filter - Accordion */}
      <div className="mb-5 pt-5 border-t border-border">
        <button
          onClick={() => toggleSection('rent')}
          className="w-full flex items-center justify-between mb-3 group"
        >
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
            <h4 className="text-sm text-muted-foreground uppercase tracking-wide group-hover:text-accent transition-colors">
              Kira Aralığı
            </h4>
          </div>
          <ChevronDown 
            className={`w-4 h-4 text-muted-foreground group-hover:text-accent transition-all ${
              openSections.rent ? 'rotate-180' : ''
            }`}
          />
        </button>
        {openSections.rent && (
          <div className="space-y-2.5">
            {rentRanges.map((range) => (
              <label
                key={range.value}
                className="flex items-center gap-2.5 cursor-pointer group py-0.5"
              >
                <input
                  type="radio"
                  name="rent"
                  value={range.value}
                  checked={selectedPayment === range.value}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                  className="w-4 h-4 rounded-full border-2 border-gray-300 bg-transparent appearance-none cursor-pointer transition-all checked:border-[#7c3aed] checked:bg-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20 focus:ring-offset-0 checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI4IiBjeT0iOCIgcj0iMyIgZmlsbD0id2hpdGUiLz48L3N2Zz4=')] checked:bg-center checked:bg-no-repeat"
                />
                <span className="text-sm group-hover:text-accent transition-colors select-none">{range.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Gender Preference Filter - Accordion */}
      <div className="pt-5 border-t border-border">
        <button
          onClick={() => toggleSection('gender')}
          className="w-full flex items-center justify-between mb-3 group"
        >
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
            <h4 className="text-sm text-muted-foreground uppercase tracking-wide group-hover:text-accent transition-colors">
              Tercihiniz
            </h4>
          </div>
          <ChevronDown 
            className={`w-4 h-4 text-muted-foreground group-hover:text-accent transition-all ${
              openSections.gender ? 'rotate-180' : ''
            }`}
          />
        </button>
        {openSections.gender && (
          <div className="space-y-2.5">
            {genderPreferences.map((pref) => (
              <label
                key={pref.value}
                className="flex items-center gap-2.5 cursor-pointer group py-0.5"
              >
                <input
                  type="radio"
                  name="gender"
                  value={pref.value}
                  checked={selectedGender === pref.value}
                  onChange={(e) => setSelectedGender(e.target.value)}
                  className="w-4 h-4 rounded-full border-2 border-gray-300 bg-transparent appearance-none cursor-pointer transition-all checked:border-[#7c3aed] checked:bg-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20 focus:ring-offset-0 checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI4IiBjeT0iOCIgcj0iMyIgZmlsbD0id2hpdGUiLz48L3N2Zz4=')] checked:bg-center checked:bg-no-repeat"
                />
                <span className="text-sm group-hover:text-accent transition-colors select-none">{pref.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </>
  );

  const renderSaleFilters = () => (
    <>
      {/* Product Type Filter - Accordion */}
      <div className="mb-5 pt-5 border-t border-border first:pt-0 first:border-t-0">
        <button
          onClick={() => toggleSection('productType')}
          className="w-full flex items-center justify-between mb-3 group"
        >
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
            <h4 className="text-sm text-muted-foreground uppercase tracking-wide group-hover:text-accent transition-colors">
              Ürün Kategorisi
            </h4>
          </div>
          <ChevronDown 
            className={`w-4 h-4 text-muted-foreground group-hover:text-accent transition-all ${
              openSections.productType ? 'rotate-180' : ''
            }`}
          />
        </button>
        {openSections.productType && (
          <div className="space-y-2.5">
            {productTypes.map((type) => (
              <label
                key={type.value}
                className="flex items-center gap-2.5 cursor-pointer group py-0.5"
              >
                <input
                  type="radio"
                  name="productType"
                  value={type.value}
                  checked={selectedProductType === type.value}
                  onChange={(e) => setSelectedProductType(e.target.value)}
                  className="w-4 h-4 rounded-full border-2 border-gray-300 bg-transparent appearance-none cursor-pointer transition-all checked:border-[#7c3aed] checked:bg-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20 focus:ring-offset-0 checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI4IiBjeT0iOCIgcj0iMyIgZmlsbD0id2hpdGUiLz48L3N2Zz4=')] checked:bg-center checked:bg-no-repeat"
                />
                <span className="text-sm group-hover:text-accent transition-colors select-none">{type.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Product Condition Filter - Accordion */}
      <div className="mb-5 pt-5 border-t border-border">
        <button
          onClick={() => toggleSection('condition')}
          className="w-full flex items-center justify-between mb-3 group"
        >
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
            <h4 className="text-sm text-muted-foreground uppercase tracking-wide group-hover:text-accent transition-colors">
              Ürün Durumu
            </h4>
          </div>
          <ChevronDown 
            className={`w-4 h-4 text-muted-foreground group-hover:text-accent transition-all ${
              openSections.condition ? 'rotate-180' : ''
            }`}
          />
        </button>
        {openSections.condition && (
          <div className="space-y-2.5">
            {productConditions.map((condition) => (
              <label
                key={condition.value}
                className="flex items-center gap-2.5 cursor-pointer group py-0.5"
              >
                <input
                  type="radio"
                  name="condition"
                  value={condition.value}
                  checked={selectedCondition === condition.value}
                  onChange={(e) => setSelectedCondition(e.target.value)}
                  className="w-4 h-4 rounded-full border-2 border-gray-300 bg-transparent appearance-none cursor-pointer transition-all checked:border-[#7c3aed] checked:bg-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20 focus:ring-offset-0 checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI4IiBjeT0iOCIgcj0iMyIgZmlsbD0id2hpdGUiLz48L3N2Zz4=')] checked:bg-center checked:bg-no-repeat"
                />
                <span className="text-sm group-hover:text-accent transition-colors select-none">{condition.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Filter - Accordion */}
      <div className="mb-5 pt-5 border-t border-border">
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between mb-3 group"
        >
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
            <h4 className="text-sm text-muted-foreground uppercase tracking-wide group-hover:text-accent transition-colors">
              Fiyat Aralığı
            </h4>
          </div>
          <ChevronDown 
            className={`w-4 h-4 text-muted-foreground group-hover:text-accent transition-all ${
              openSections.price ? 'rotate-180' : ''
            }`}
          />
        </button>
        {openSections.price && (
          <div className="space-y-2.5">
            {priceRanges.map((range) => (
              <label
                key={range.value}
                className="flex items-center gap-2.5 cursor-pointer group py-0.5"
              >
                <input
                  type="radio"
                  name="price"
                  value={range.value}
                  checked={selectedPayment === range.value}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                  className="w-4 h-4 rounded-full border-2 border-gray-300 bg-transparent appearance-none cursor-pointer transition-all checked:border-[#7c3aed] checked:bg-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20 focus:ring-offset-0 checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI4IiBjeT0iOCIgcj0iMyIgZmlsbD0id2hpdGUiLz48L3N2Zz4=')] checked:bg-center checked:bg-no-repeat"
                />
                <span className="text-sm group-hover:text-accent transition-colors select-none">{range.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Location Filter - Accordion */}
      <div className="pt-5 border-t border-border">
        <button
          onClick={() => toggleSection('location')}
          className="w-full flex items-center justify-between mb-3 group"
        >
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
            <h4 className="text-sm text-muted-foreground uppercase tracking-wide group-hover:text-accent transition-colors">
              Konum
            </h4>
          </div>
          <ChevronDown 
            className={`w-4 h-4 text-muted-foreground group-hover:text-accent transition-all ${
              openSections.location ? 'rotate-180' : ''
            }`}
          />
        </button>
        {openSections.location && (
          <div className="space-y-2.5">
            {locations.map((location) => (
              <label
                key={location.value}
                className="flex items-center gap-2.5 cursor-pointer group py-0.5"
              >
                <input
                  type="radio"
                  name="location"
                  value={location.value}
                  checked={selectedLocation === location.value}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-4 h-4 rounded-full border-2 border-gray-300 bg-transparent appearance-none cursor-pointer transition-all checked:border-[#7c3aed] checked:bg-[#7c3aed] focus:ring-2 focus:ring-[#7c3aed]/20 focus:ring-offset-0 checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI4IiBjeT0iOCIgcj0iMyIgZmlsbD0id2hpdGUiLz48L3N2Zz4=')] checked:bg-center checked:bg-no-repeat"
                />
                <span className="text-sm group-hover:text-accent transition-colors select-none">{location.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </>
  );

  return (
    <div className="bg-white border border-border rounded-lg p-5 p-[20px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3>Filtrele</h3>
        <button className="text-xs px-2.5 py-1 rounded-md text-muted-foreground hover:text-accent hover:bg-violet-50 transition-all">
          Temizle
        </button>
      </div>

      {/* Dynamic Filters based on category */}
      {category === 'all' && renderAllFilters()}
      {category === 'job' && renderJobFilters()}
      {category === 'roommate' && renderRoommateFilters()}
      {category === 'sale' && renderSaleFilters()}

      {/* Reset Filters Button */}

    </div>
  );
}
