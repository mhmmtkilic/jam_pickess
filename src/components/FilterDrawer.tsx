import { X } from 'lucide-react';
import { useEffect } from 'react';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export function FilterDrawer({ isOpen, onClose, children, title = 'Filtrele' }: FilterDrawerProps) {
  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-white z-50 shadow-2xl overflow-y-auto lg:hidden">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-border p-4 flex items-center justify-between z-10">
          <h3>{title}</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-secondary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {children}
        </div>

        {/* Footer - Apply Button */}
        <div className="sticky bottom-0 bg-white border-t border-border p-4">
          <button
            onClick={onClose}
            className="w-full py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors"
          >
            Filtreleri Uygula
          </button>
        </div>
      </div>
    </>
  );
}
