"use client";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, ArrowLeft, ShieldCheck, Eye, EyeOff } from "lucide-react";
import GoogleLoginModal from "@/components/modals/GoogleLoginModal";
import { createClient } from "@/utils/supabase/client";
import { useToast } from "@/components/ui/Toast";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showGoogleMock, setShowGoogleMock] = useState(false);

  useEffect(() => {
    if (searchParams.get('error') === 'not_registered') {
      setError("Akun Anda belum terdaftar. Silakan daftar terlebih dahulu.");
    } else if (searchParams.get('registered') === '1') {
      setError("Pendaftaran berhasil! Silakan masuk.");
    }
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push("/dashboard");
      }
    };
    checkSession();
  }, [router, searchParams, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Format email tidak valid.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?source=login`,
      },
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleMockSelect = (mockUser: { name: string; email: string; image: string }) => {
    setLoading(true);
    setShowGoogleMock(false);
    
    // Simulate network delay
    setTimeout(() => {
      // Mock logic can be kept for UI demo
      router.push("/dashboard");
    }, 1200);
  };



  return (
    <main className="min-h-screen bg-[#FFF9F0] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Back Button */}
      <Link 
        href="/" 
        className="fixed top-6 left-6 lg:top-8 lg:left-8 z-50 flex items-center gap-2 text-[#777] hover:text-[#111] font-bold text-sm transition-all group"
      >
        <div className="w-9 h-9 lg:w-8 lg:h-8 rounded-full border border-black/5 flex items-center justify-center bg-white shadow-[0_4px_12px_rgba(0,0,0,0.05)] lg:shadow-sm group-hover:border-[#FF5C1A] group-hover:text-[#FF5C1A] transition-all">
          <ArrowLeft className="w-4 h-4" />
        </div>
        <span className="hidden lg:inline">Kembali ke Beranda</span>
      </Link>

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-[#FF5C1A]/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-[#FFCF40]/10 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[440px] relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[#FF5C1A]/10 text-[#FF5C1A] px-4 py-1.5 rounded-full text-[0.7rem] font-black uppercase tracking-widest mb-6">
            <ShieldCheck className="w-3.5 h-3.5" />
            Secure Login
          </div>
          <h1 className="font-syne font-extrabold text-4xl text-[#111] mb-3 tracking-tighter leading-none">
            Selamat <span className="text-[#FF5C1A]">Datang</span>
          </h1>
          <p className="text-gray-500 text-sm">Masuk untuk mengelola franchise impianmu.</p>
        </div>

        {/* Card */}
        <div className="bg-white p-8 sm:p-10 rounded-[40px] shadow-[0_32px_64px_rgba(0,0,0,0.06)] border border-black/5">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error message */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-600 text-sm font-medium px-4 py-3 rounded-2xl"
              >
                {error}
              </motion.div>
            )}

            <div>
              <label className="block text-[0.8rem] font-black text-[#111] uppercase tracking-wider mb-2 ml-1">Alamat Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="email" 
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#F8F8F6] border border-black/5 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-[#FF5C1A]/10 focus:border-[#FF5C1A] transition-all font-medium text-[#333]"
                  required
                  suppressHydrationWarning={true}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="block text-[0.8rem] font-black text-[#111] uppercase tracking-wider">Password</label>
                <Link href="https://wa.me/6287792735999?text=Halo%20EazyChise%2C%20saya%20lupa%20password%20akun%20saya" target="_blank" className="text-xs font-bold text-[#FF5C1A] hover:underline">Lupa?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#F8F8F6] border border-black/5 rounded-2xl py-4 pl-12 pr-12 focus:outline-none focus:ring-4 focus:ring-[#FF5C1A]/10 focus:border-[#FF5C1A] transition-all font-medium text-[#333]"
                  required
                  suppressHydrationWarning={true}
                />
                <button 
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  suppressHydrationWarning={true}
                >
                  {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#111111] text-white py-4.5 rounded-2xl font-bold text-[0.95rem] shadow-[0_12px_24px_rgba(0,0,0,0.12)] hover:bg-[#FF5C1A] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 mt-2 group disabled:opacity-60 disabled:hover:bg-[#111111] disabled:hover:translate-y-0"
              suppressHydrationWarning={true}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Memproses...
                </span>
              ) : (
                <>
                  Masuk Sekarang
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Social Login Separator */}
          <div className="relative my-8 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-black/5"></div></div>
            <span className="relative bg-white px-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Atau masuk dengan</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-3 py-3.5 border border-black/5 rounded-2xl font-bold text-sm text-[#333] hover:bg-gray-50 transition-all active:scale-95"
              suppressHydrationWarning={true}
            >
              <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Google
            </button>
            <button 
              onClick={() => showToast("🚀 Fitur Facebook Login segera hadir!", "info")}
              className="flex items-center justify-center gap-3 py-3.5 border border-black/5 rounded-2xl font-bold text-sm text-[#333] hover:bg-gray-50 transition-all active:scale-95"
              suppressHydrationWarning={true}
            >
              <svg width="18" height="18" fill="#1877F2" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Facebook
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm font-medium">
            Belum punya akun?{" "}
            <Link href="/daftar" className="text-[#FF5C1A] font-bold hover:underline decoration-2 underline-offset-4">
              Daftar Gratis
            </Link>
          </p>
        </div>
      </motion.div>

      <GoogleLoginModal 
        isOpen={showGoogleMock} 
        onClose={() => setShowGoogleMock(false)}
        onSelect={handleMockSelect}
      />
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FFF9F0] flex items-center justify-center">
        <span className="w-8 h-8 border-4 border-[#FF5C1A]/30 border-t-[#FF5C1A] rounded-full animate-spin" />
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
