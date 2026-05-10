"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, Mail, Lock, Phone, ArrowRight, CheckCircle2, ArrowLeft, ShieldCheck, Sparkles, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { MdPerson, MdStore } from "react-icons/md";
import GoogleLoginModal from "@/components/GoogleLoginModal";
import { createClient } from "@/utils/supabase/client";

export default function RegisterPage() {
  const router = useRouter();
  const supabase = createClient();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "franchisee",
    agreeTerms: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showGoogleMock, setShowGoogleMock] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push("/dashboard");
      }
    };
    checkSession();
  }, [router, supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!/^[a-zA-Z\s]{3,}$/.test(formData.name)) {
      setError("Nama minimal 3 karakter dan hanya huruf.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Format email tidak valid.");
      return;
    }
    if (!/^08[0-9]{8,12}$/.test(formData.phone)) {
      setError("Nomor HP harus diawali 08 dan minimal 10 digit.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password minimal 6 karakter.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }
    if (!formData.agreeTerms) {
      setError("Kamu harus menyetujui syarat & ketentuan.");
      return;
    }

    setLoading(true);
    
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.name,
          phone: formData.phone,
          role: formData.role,
        }
      }
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/masuk?registered=1");
    }
  };

  const handleGoogleRegister = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?source=register`,
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
    setTimeout(() => {
      router.push("/dashboard");
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-[#FFF9F0] flex flex-col lg:flex-row relative">
      {/* Back Button */}
      <Link 
        href="/" 
        className="fixed top-6 left-6 lg:top-8 lg:left-8 z-50 flex items-center gap-2 text-[#777] hover:text-[#111] font-bold text-sm transition-all group lg:text-white/50 lg:hover:text-white"
      >
        <div className="w-9 h-9 lg:w-8 lg:h-8 rounded-full border border-black/5 lg:border-white/10 flex items-center justify-center bg-white lg:bg-white/5 shadow-[0_4px_12px_rgba(0,0,0,0.05)] lg:shadow-sm group-hover:border-[#FF5C1A] group-hover:text-[#FF5C1A] transition-all">
          <ArrowLeft className="w-4 h-4" />
        </div>
        <span className="hidden lg:inline">Kembali ke Beranda</span>
      </Link>

      {/* ── Left Side: Branding/Visual (Hidden on Mobile) ── */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#111111] p-16 flex-col justify-between relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-[-100px] right-[-100px] w-[600px] h-[600px] bg-[#FF5C1A]/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-100px] left-[-100px] w-[400px] h-[400px] bg-[#FFCF40]/10 rounded-full blur-[100px]" />
        
        <div className="relative z-10 pt-10">
          <Link href="/" className="font-syne font-extrabold text-[1.8rem] text-white tracking-tighter">
            Eazy<span className="text-[#FF5C1A]">Chise</span>
          </Link>
        </div>

        <div className="relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-[#FF5C1A] text-white px-4 py-1.5 rounded-full text-[0.65rem] font-black uppercase tracking-[0.2em] mb-8"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Gratis Konsultasi Franchise
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-fraunces font-black text-[clamp(2.5rem,4vw,4.5rem)] text-white leading-[1.05] mb-8"
          >
            Mulai Perjalanan <br />
            Bisnis <span className="text-[#FF5C1A] italic">Cuan-mu</span> Hari Ini
          </motion.h2>
          
          <div className="space-y-5">
            {[
              "Akses ke 20+ brand franchise terkurasi",
              "Analisis AI untuk kecocokan bisnis",
              "Konsultasi gratis dengan pakar franchise",
              "BEP Simulation Tool eksklusif",
            ].map((item, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                key={i} 
                className="flex items-center gap-4 text-white/80"
              >
                <div className="w-6 h-6 rounded-full bg-[#FF5C1A]/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-[#FF5C1A]" />
                </div>
                <span className="text-[0.95rem] font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-white/20 text-[0.7rem] font-bold uppercase tracking-widest">
          © 2025 EazyChise Indonesia • Platform Franchise F&B Terpercaya
        </div>
      </div>

      {/* ── Right Side: Form ── */}
      <div className="flex-1 flex items-center justify-center p-8 sm:p-16 relative">
        {/* Mobile BG Decor */}
        <div className="lg:hidden absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
          <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-[#FF5C1A]/5 rounded-full blur-[120px]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-[480px] relative z-10"
        >
          {/* Header */}
          <div className="mb-10 text-center lg:text-left">
            <div className="lg:hidden mb-10 flex justify-center">
              <Link href="/" className="font-syne font-extrabold text-[2rem] text-[#111] tracking-tighter leading-none">
                Eazy<span className="text-[#FF5C1A]">Chise</span>
              </Link>
            </div>
            <div className="inline-flex items-center gap-2 bg-[#FF5C1A]/10 text-[#FF5C1A] px-4 py-1.5 rounded-full text-[0.7rem] font-black uppercase tracking-widest mb-6 lg:ml-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Registrasi Aman
            </div>
            <h1 className="font-syne font-extrabold text-[2.5rem] text-[#111] mb-3 tracking-tighter leading-none">
              Daftar <span className="text-[#FF5C1A]">Akun</span>
            </h1>
            <p className="text-gray-500 text-[0.9rem] font-medium lg:ml-1">Gabung dan mulai perjalanan bisnis F&B-mu.</p>
          </div>

          {/* Form Card */}
          <div className="bg-white p-8 sm:p-10 rounded-[40px] shadow-[0_32px_64px_rgba(0,0,0,0.06)] border border-black/5">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Error */}
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 text-red-600 text-sm font-medium px-4 py-3 rounded-2xl"
                >
                  {error}
                </motion.div>
              )}

              {/* Name */}
              <div>
                <label className="block text-[0.75rem] font-black text-[#111] uppercase tracking-wider mb-2 ml-1">Nama Lengkap</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Masukkan nama lengkap"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-[#F8F8F6] border border-black/5 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-[#FF5C1A]/10 focus:border-[#FF5C1A] transition-all font-medium text-sm"
                    required
                    suppressHydrationWarning={true}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[0.75rem] font-black text-[#111] uppercase tracking-wider mb-2 ml-1">Alamat Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="email" 
                    placeholder="nama@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-[#F8F8F6] border border-black/5 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-[#FF5C1A]/10 focus:border-[#FF5C1A] transition-all font-medium text-sm"
                    required
                    suppressHydrationWarning={true}
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-[0.75rem] font-black text-[#111] uppercase tracking-wider mb-2 ml-1">Nomor HP</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="tel" 
                    placeholder="08xxxxxxxxxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-[#F8F8F6] border border-black/5 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-[#FF5C1A]/10 focus:border-[#FF5C1A] transition-all font-medium text-sm"
                    required
                    suppressHydrationWarning={true}
                  />
                </div>
              </div>

              {/* Role selector */}
              <div>
                <label className="block text-[0.75rem] font-black text-[#111] uppercase tracking-wider mb-2 ml-1">Saya Adalah</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, role: "franchisee"})}
                    className={`py-3.5 rounded-2xl text-sm font-bold transition-all border-2 ${
                      formData.role === "franchisee"
                        ? "bg-[#FF5C1A]/10 border-[#FF5C1A] text-[#FF5C1A]"
                        : "bg-[#F8F8F6] border-transparent text-[#777] hover:border-black/10"
                    }`}
                    suppressHydrationWarning={true}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <MdPerson className="w-5 h-5" /> Calon Franchisee
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, role: "franchisor"})}
                    className={`py-3.5 rounded-2xl text-sm font-bold transition-all border-2 ${
                      formData.role === "franchisor"
                        ? "bg-[#FF5C1A]/10 border-[#FF5C1A] text-[#FF5C1A]"
                        : "bg-[#F8F8F6] border-transparent text-[#777] hover:border-black/10"
                    }`}
                    suppressHydrationWarning={true}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <MdStore className="w-5 h-5" /> Pemilik Brand
                    </span>
                  </button>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[0.75rem] font-black text-[#111] uppercase tracking-wider mb-2 ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type={showPass ? "text" : "password"}
                    placeholder="Minimal 6 karakter"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full bg-[#F8F8F6] border border-black/5 rounded-2xl py-3.5 pl-12 pr-12 focus:outline-none focus:ring-4 focus:ring-[#FF5C1A]/10 focus:border-[#FF5C1A] transition-all font-medium text-sm"
                    required
                    minLength={6}
                    suppressHydrationWarning={true}
                  />
                  <button 
                    type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    suppressHydrationWarning={true}
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-[0.75rem] font-black text-[#111] uppercase tracking-wider mb-2 ml-1">Konfirmasi Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type={showPass ? "text" : "password"}
                    placeholder="Ulangi password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="w-full bg-[#F8F8F6] border border-black/5 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-[#FF5C1A]/10 focus:border-[#FF5C1A] transition-all font-medium text-sm"
                    required
                    minLength={6}
                    suppressHydrationWarning={true}
                  />
                </div>
              </div>

              {/* Terms checkbox */}
              <label className="flex items-start gap-3 cursor-pointer py-2">
                <input
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={(e) => setFormData({...formData, agreeTerms: e.target.checked})}
                  className="mt-0.5 w-5 h-5 rounded-lg border-2 border-black/10 accent-[#FF5C1A] cursor-pointer"
                  suppressHydrationWarning={true}
                />
                <span className="text-[0.78rem] text-[#666] leading-snug">
                  Saya menyetujui <span className="text-[#FF5C1A] font-bold">Syarat & Ketentuan</span> serta <span className="text-[#FF5C1A] font-bold">Kebijakan Privasi</span> EazyChise.
                </span>
              </label>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-[#FF5C1A] text-white py-4 rounded-2xl font-bold text-[1rem] shadow-[0_12px_24px_rgba(255,92,26,0.25)] hover:bg-[#e04710] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 mt-2 group disabled:opacity-60 disabled:hover:bg-[#FF5C1A] disabled:hover:translate-y-0"
                suppressHydrationWarning={true}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Mendaftarkan...
                  </span>
                ) : (
                  <>
                    Daftar Sekarang
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <div className="relative flex items-center py-4">
                <div className="flex-grow border-t border-black/5"></div>
                <span className="relative bg-white px-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Atau daftar dengan</span>
                <div className="flex-grow border-t border-black/5"></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button 
                  type="button"
                  onClick={handleGoogleRegister}
                  className="flex items-center justify-center gap-3 py-3.5 border border-black/5 rounded-2xl font-bold text-sm text-[#333] hover:bg-gray-50 transition-all active:scale-95"
                  suppressHydrationWarning={true}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                  Google
                </button>
                <button 
                  type="button"
                  onClick={() => alert("🚀 Fitur Facebook Login segera hadir!")}
                  className="flex items-center justify-center gap-3 py-3.5 border border-black/5 rounded-2xl font-bold text-sm text-[#333] hover:bg-gray-50 transition-all active:scale-95"
                  suppressHydrationWarning={true}
                >
                  <svg width="18" height="18" fill="#1877F2" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  Facebook
                </button>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center lg:text-left lg:ml-1">
            <p className="text-gray-500 text-sm font-medium">
              Sudah punya akun?{" "}
              <Link href="/masuk" className="text-[#FF5C1A] font-bold hover:underline decoration-2 underline-offset-4">
                Masuk di sini
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      <GoogleLoginModal 
        isOpen={showGoogleMock} 
        onClose={() => setShowGoogleMock(false)}
        onSelect={handleMockSelect}
      />
    </main>
  );
}
