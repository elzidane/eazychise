"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, ArrowLeft, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { login, loginWithGoogle } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      const result = login(email, password);
      if (result.success) {
        router.push("/dashboard");
      } else {
        setError(result.error || "Gagal masuk");
        setLoading(false);
      }
    }, 800);
  };

  const handleGoogleLogin = () => {
    setError("");
    setLoading(true);
    setTimeout(() => {
      const result = loginWithGoogle("franchisee");
      if (result.success) {
        router.push("/dashboard");
      }
    }, 600);
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
                  className="w-full bg-[#F8F8F6] border border-black/5 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-[#FF5C1A]/10 focus:border-[#FF5C1A] transition-all font-medium"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="block text-[0.8rem] font-black text-[#111] uppercase tracking-wider">Password</label>
                <span className="text-xs font-bold text-[#FF5C1A] cursor-pointer hover:underline">Lupa?</span>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#F8F8F6] border border-black/5 rounded-2xl py-4 pl-12 pr-12 focus:outline-none focus:ring-4 focus:ring-[#FF5C1A]/10 focus:border-[#FF5C1A] transition-all font-medium"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#111111] text-white py-4.5 rounded-2xl font-bold text-[0.95rem] shadow-[0_12px_24px_rgba(0,0,0,0.12)] hover:bg-[#FF5C1A] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 mt-2 group disabled:opacity-60 disabled:hover:bg-[#111111] disabled:hover:translate-y-0"
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

            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink-0 mx-4 text-gray-400 text-sm font-medium">Atau</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

              <button 
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full bg-white border border-gray-200 text-[#333] py-4 rounded-2xl font-bold text-[0.95rem] hover:bg-gray-50 hover:shadow-sm transition-all flex items-center justify-center gap-3 disabled:opacity-60"
            >
              {/* Google icon inline */}
              <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" fill="#FFC107"/>
                <path d="M6.306,14.691l6.571,4.819C14.655,15.108,19.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" fill="#FF3D00"/>
                <path d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" fill="#4CAF50"/>
                <path d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" fill="#1976D2"/>
              </svg>
              Lanjutkan dengan Google
            </button>
          </form>

          <div className="mt-8 relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-black/5"></div>
            </div>
            <span className="relative px-4 bg-white text-[0.65rem] font-black text-gray-400 uppercase tracking-widest">Atau masuk dengan</span>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2.5 bg-white border border-black/5 py-3.5 rounded-2xl hover:bg-gray-50 transition-all hover:shadow-sm">
              <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
              <span className="text-sm font-bold text-[#333]">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2.5 bg-white border border-black/5 py-3.5 rounded-2xl hover:bg-gray-50 transition-all hover:shadow-sm">
              <img src="https://www.facebook.com/favicon.ico" className="w-4 h-4" alt="Facebook" />
              <span className="text-sm font-bold text-[#333]">Facebook</span>
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
    </main>
  );
}
