import { Mail, Lock, CreditCard, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [password, setPassword] = useState('');
  const [gencKartId, setGencKartId] = useState('');
  const [eduEmail, setEduEmail] = useState('');
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [verificationMethod, setVerificationMethod] = useState<'genc-kart' | 'edu-email'>('genc-kart');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignUp) {
      // Kayıt kontrolü
      if (verificationMethod === 'genc-kart') {
        if (!gencKartId) {
          alert('Lütfen Genç Kültür Kart ID\'nizi girin');
          return;
        }
      } else {
        if (!eduEmail || !eduEmail.endsWith('.edu.tr')) {
          alert('Lütfen geçerli bir .edu.tr uzantılı mail adresi girin');
          return;
        }
      }
    } else {
      // Giriş kontrolü
      if (!loginIdentifier) {
        alert('Lütfen giriş bilgilerinizi girin');
        return;
      }
    }
    
    // Mock login
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 flex items-center justify-center py-4">
      <div className="w-md max-w-md">
        {/* Logo & Welcome */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" className="w-16 h-16">
              <g transform="translate(0, 0) rotate(0)">
                <path fill="#7c3aed" d="M0 20C0 12.5231 0 8.78461 1.60769 6C2.66091 4.17577 4.17577 2.66091 6 1.60769C8.78461 0 12.5231 0 20 0C27.4769 0 31.2154 0 34 1.60769C35.8242 2.66091 37.3391 4.17577 38.3923 6C40 8.78461 40 12.5231 40 20C40 27.4769 40 31.2154 38.3923 34C37.3391 35.8242 35.8242 37.3391 34 38.3923C31.2154 40 27.4769 40 20 40C12.5231 40 8.78461 40 6 38.3923C4.17577 37.3391 2.66091 35.8242 1.60769 34C0 31.2154 0 27.4769 0 20Z"></path>
                <path fill="#ffffff" d="M28.0441 7.60927C28.8868 6.80331 30.2152 6.79965 31.0622 7.58229L31.1425 7.66005L31.4164 7.94729C34.1911 10.9318 35.2251 14.4098 34.9599 17.8065C34.6908 21.2511 33.1012 24.4994 30.8836 27.0664C28.6673 29.6316 25.7084 31.6519 22.51 32.5287C19.2714 33.4164 15.7294 33.1334 12.6547 30.9629C10.0469 29.1218 9.05406 26.1465 8.98661 23.2561C7.52323 22.5384 5.98346 21.6463 4.36789 20.5615L3.941 20.2716L3.85006 20.206C2.93285 19.5053 2.72313 18.2084 3.39161 17.2564C4.06029 16.3043 5.36233 16.046 6.34665 16.6512L6.44134 16.7126L6.83024 16.9771C7.79805 17.6269 8.72153 18.1903 9.59966 18.6767C10.1661 16.6889 11.1047 14.7802 12.3413 13.207C14.1938 10.8501 16.9713 8.96525 20.374 9.24647C23.439 9.49995 25.7036 11.081 26.8725 13.3122C28.0044 15.4728 28.0211 18.0719 27.0319 20.307C26.0234 22.5857 23.976 24.484 21.0309 25.2662C18.9114 25.8291 16.4284 25.7905 13.6267 25.0367V25.0377C12.5115 24.7375 11.3427 24.323 10.1212 23.7846C9.8472 23.6638 9.60873 23.8483 10.1212 24.1686C11.5636 25.1924 13.5956 26.0505 14.1836 26.3385C14.4615 26.788 14.8061 27.1568 15.2011 27.4356C17.0188 28.7188 19.1451 28.9539 21.3396 28.3523C23.5743 27.7397 25.8141 26.2625 27.5514 24.2516C29.2873 22.2423 30.4065 19.8348 30.5909 17.4727C30.765 15.2439 30.1218 12.9543 28.1842 10.8736L27.9927 10.6731L27.9162 10.5906C27.1538 9.72748 27.2018 8.41516 28.0441 7.60927ZM20.0092 13.5651C18.6033 13.4489 17.1196 14.189 15.8013 15.8662C14.7973 17.1436 14.0376 18.8033 13.6503 20.5112C16.4093 21.4544 18.4655 21.4608 19.8942 21.0814C21.5481 20.6422 22.5399 19.6477 23.0172 18.5693C23.5137 17.4472 23.4628 16.2245 22.9813 15.3055C22.5369 14.4571 21.6422 13.7002 20.0092 13.5651Z" clipRule="evenodd" fillRule="evenodd"></path>
              </g>
            </svg>
          </div>
          <h1 className="text-3xl mb-2">
            {isSignUp ? (
              <>
                <span className="text-accent">i</span>
                <span className="text-black">Konia</span>
                <span className="text-black">'ya Hoş Geldin!</span>
              </>
            ) : (
              'Tekrar Hoş Geldin!'
            )}
          </h1>
          <p className="text-muted-foreground">
            {isSignUp 
              ? 'Topluluğa katıl, keşfet ve paylaş' 
              : 'Devam etmek için giriş yap'}
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl border border-border p-8">
          {!isSignUp ? (
            // LOGIN FORM
            <>
              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="login-identifier" className="block text-sm mb-2">
                    Üniversite E-posta ya da GKK ID
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      id="login-identifier"
                      type="text"
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      placeholder="ornek@universite.edu.tr veya 123456789"
                      className="w-full h-11 pl-10 pr-4 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="login-password" className="block text-sm mb-2">
                    Şifre
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      id="login-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-11 pl-10 pr-4 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button 
                    type="button"
                    className="text-xs text-accent hover:text-accent/80 transition-colors"
                  >
                    Şifremi unuttum
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full h-11 bg-accent text-white rounded-lg hover:opacity-90 transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                >
                  <span>Giriş Yap</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </>
          ) : (
            // SIGNUP FORM
            <>
              {/* Verification Method Selection */}
              <div className="mb-6">
                <label className="block text-sm mb-3">
                  Doğrulama Yöntemi Seçin
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setVerificationMethod('genc-kart')}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      verificationMethod === 'genc-kart'
                        ? 'border-accent bg-accent/5'
                        : 'border-border hover:border-accent/50'
                    }`}
                  >
                    <CreditCard className={`w-6 h-6 mx-auto mb-2 ${
                      verificationMethod === 'genc-kart' ? 'text-accent' : 'text-muted-foreground'
                    }`} />
                    <div className="text-xs text-center">Genç Kültür Kart</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setVerificationMethod('edu-email')}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      verificationMethod === 'edu-email'
                        ? 'border-accent bg-accent/5'
                        : 'border-border hover:border-accent/50'
                    }`}
                  >
                    <Mail className={`w-6 h-6 mx-auto mb-2 ${
                      verificationMethod === 'edu-email' ? 'text-accent' : 'text-muted-foreground'
                    }`} />
                    <div className="text-xs text-center">Üniversite Maili</div>
                  </button>
                </div>
              </div>

              {/* Signup Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {verificationMethod === 'genc-kart' ? (
                  // Genç Kültür Kart ID
                  <div>
                    <label htmlFor="signup-genc-kart" className="block text-sm mb-2">
                      Genç Kültür Kart ID
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        id="signup-genc-kart"
                        type="text"
                        value={gencKartId}
                        onChange={(e) => setGencKartId(e.target.value)}
                        placeholder="123456789"
                        className="w-full h-11 pl-10 pr-4 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                        required
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Genç Kültür Kart numaranızı kartınızın üzerinde bulabilirsiniz
                    </p>
                  </div>
                ) : (
                  // Üniversite .edu.tr Email
                  <div>
                    <label htmlFor="signup-edu-email" className="block text-sm mb-2">
                      Üniversite E-posta Adresi
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        id="signup-edu-email"
                        type="email"
                        value={eduEmail}
                        onChange={(e) => setEduEmail(e.target.value)}
                        placeholder="ornek@universite.edu.tr"
                        className="w-full h-11 pl-10 pr-4 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                        required
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Sadece .edu.tr uzantılı üniversite e-posta adresleri kabul edilir
                    </p>
                  </div>
                )}

                {/* Password Field */}
                <div>
                  <label htmlFor="signup-password" className="block text-sm mb-2">
                    Şifre
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      id="signup-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-11 pl-10 pr-4 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                      required
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    En az 8 karakter, bir büyük harf ve bir rakam içermelidir
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full h-11 bg-accent text-white rounded-lg hover:opacity-90 transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                >
                  <span>Hesap Oluştur</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </>
          )}

          {/* Toggle Sign Up / Login */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {isSignUp ? 'Zaten hesabın var mı?' : 'Hesabın yok mu?'}
              {' '}
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setPassword('');
                  setGencKartId('');
                  setEduEmail('');
                  setLoginIdentifier('');
                }}
                className="text-accent hover:text-accent/80 transition-colors"
              >
                {isSignUp ? 'Giriş Yap' : 'Kayıt Ol'}
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-xs text-muted-foreground">
          <p>Kaydolarak <a href="#" className="text-accent hover:underline">Kullanım Koşulları</a>'nı ve <a href="#" className="text-accent hover:underline">Gizlilik Politikası</a>'nı kabul etmiş olursunuz.</p>
        </div>
      </div>
    </div>
  );
}

