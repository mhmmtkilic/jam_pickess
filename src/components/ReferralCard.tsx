import { Gift, Users, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export function ReferralCard() {
  const [copied, setCopied] = useState(false);
  const referralCode = 'OSMAN2024';

  const handleCopy = async () => {
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(referralCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        // Fallback for older browsers or restricted contexts
        const textArea = document.createElement('textarea');
        textArea.value = referralCode;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          console.warn('Copy failed:', err);
        }
        document.body.removeChild(textArea);
      }
    } catch (err) {
      console.warn('Clipboard API failed:', err);
      // Silently fail - user can still manually copy the code
    }
  };

  return (
    <div className="bg-white rounded-lg border border-border hover:border-muted transition-colors">
      <div className="p-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-violet-100 rounded-lg">
            <Gift className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h3>Arkadaşını Davet Et</h3>
            <p className="text-xs text-muted-foreground">Her davet için +100 Coin kazan</p>
          </div>
        </div>

        <div className="bg-violet-50 rounded-lg p-4 mb-4 border border-violet-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Referans Kodun</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs hover:bg-violet-100 px-2 py-1 rounded-md transition-colors text-accent"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Kopyalandı!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Kopyala</span>
                </>
              )}
            </button>
          </div>
          <p className="text-xl tracking-wider text-accent">{referralCode}</p>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
          <Users className="w-3.5 h-3.5" />
          <span>3 arkadaşın katıldı</span>
        </div>

        <button className="w-full bg-accent hover:bg-accent/90 text-white py-2.5 rounded-lg transition-colors text-sm">
          Davet Linki Paylaş
        </button>
      </div>
    </div>
  );
}
