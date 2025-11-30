import { useState } from 'react';
import { FileEdit, Bookmark, History, Coins, Clock, MessageSquare, FileText, MapPin } from 'lucide-react';

const CONTRIBUTIONS = [
  {
    id: 1,
    type: 'edit',
    icon: MapPin,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    title: 'Edited opening hours for Urban Bistro',
    reward: 10,
    time: '2 hours ago',
  },
  {
    id: 2,
    type: 'upload',
    icon: FileText,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    title: 'Uploaded lecture notes for MAT101',
    reward: 20,
    time: 'Yesterday',
  },
  {
    id: 3,
    type: 'comment',
    icon: MessageSquare,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    title: 'Commented on Bosna Hersek Housing topic',
    reward: 2,
    time: '2 days ago',
  },
  {
    id: 4,
    type: 'review',
    icon: MapPin,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    title: 'Reviewed Konya Bilim Kütüphanesi',
    reward: 15,
    time: '3 days ago',
  },
  {
    id: 5,
    type: 'upload',
    icon: FileText,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    title: 'Shared exam questions for FIZ102',
    reward: 18,
    time: '5 days ago',
  },
];

const BOOKMARKS = [
  {
    id: 1,
    title: 'Best study cafes in Selçuklu',
    type: 'Venue Guide',
    time: '1 week ago',
  },
  {
    id: 2,
    title: 'Computer Networks Final Notes',
    type: 'Academic',
    time: '2 weeks ago',
  },
  {
    id: 3,
    title: 'Part-time job at Tech Startup',
    type: 'Job Listing',
    time: '3 weeks ago',
  },
];

const WIKI_EDITS = [
  {
    id: 1,
    title: 'Updated transportation info for Selçuk University Campus',
    status: 'Approved',
    time: '1 day ago',
  },
  {
    id: 2,
    title: 'Added parking details to Alaaddin Mall',
    status: 'Approved',
    time: '4 days ago',
  },
  {
    id: 3,
    title: 'Fixed typo in Computer Engineering curriculum',
    status: 'Pending',
    time: '1 week ago',
  },
];

export function ActivityTabs() {
  const [activeTab, setActiveTab] = useState<'contributions' | 'bookmarks' | 'edits'>('contributions');

  return (
    <div className="bg-white rounded-lg border border-border">
      {/* Tabs Navigation */}
      <div className="flex items-center gap-1 p-1 border-b border-border">
        <button
          onClick={() => setActiveTab('contributions')}
          className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md transition-colors text-sm ${
            activeTab === 'contributions'
              ? 'bg-violet-50 text-accent'
              : 'text-muted-foreground hover:bg-secondary'
          }`}
        >
          <FileEdit className="w-4 h-4" />
          <span>Katkılarım</span>
        </button>
        
        <button
          onClick={() => setActiveTab('bookmarks')}
          className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md transition-colors text-sm ${
            activeTab === 'bookmarks'
              ? 'bg-violet-50 text-accent'
              : 'text-muted-foreground hover:bg-secondary'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Favoriler</span>
        </button>
        
        <button
          onClick={() => setActiveTab('edits')}
          className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md transition-colors text-sm ${
            activeTab === 'edits'
              ? 'bg-violet-50 text-accent'
              : 'text-muted-foreground hover:bg-secondary'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Wiki Düzenlemeleri</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-5">
        {activeTab === 'contributions' && (
          <div className="space-y-3">
            {CONTRIBUTIONS.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="flex items-start gap-4 p-4 rounded-md border border-border hover:border-muted transition-colors bg-white">
                  <div className={`${item.iconBg} ${item.iconColor} p-2.5 rounded-md`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="text-sm mb-1">{item.title}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{item.time}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-amber-700 rounded-md text-xs">
                    <Coins className="w-3.5 h-3.5" />
                    <span>+{item.reward}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'bookmarks' && (
          <div className="space-y-3">
            {BOOKMARKS.map((item) => (
              <div key={item.id} className="p-4 rounded-md border border-border hover:border-muted transition-colors bg-white">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm flex-1">{item.title}</p>
                  <Bookmark className="w-4 h-4 text-accent fill-accent ml-2" />
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="px-2 py-1 bg-violet-50 text-accent rounded-md">{item.type}</span>
                  <span>{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'edits' && (
          <div className="space-y-3">
            {WIKI_EDITS.map((item) => (
              <div key={item.id} className="p-4 rounded-md border border-border hover:border-muted transition-colors bg-white">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm flex-1">{item.title}</p>
                  <span className={`px-2 py-1 rounded-md text-xs ml-2 ${
                    item.status === 'Approved' 
                      ? 'bg-green-50 text-green-700'
                      : 'bg-yellow-50 text-yellow-700'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{item.time}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
