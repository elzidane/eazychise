"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Github } from "lucide-react";

export default function LoginPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Selamat datang kembali!");
  };

  return (
    <main className="min-h-screen bg-[#FFF9F0] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-[#FF5C1A]/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-[#FFCF40]/10 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10">
          <Link href="/" className="font-syne font-extrabold text-3xl text-[#111] tracking-tighter mb-4 inline-block">
            Eazy<span className="text-[#FF5C1A]">Chise</span>
          </Link>
          <h1 className="font-syne font-extrabold text-4xl text-[#111] mb-2 tracking-tight">Selamat Datang</h1>
          <p className="text-gray-500">Masuk untuk mengelola franchise impianmu.</p>
        </div>

        <div className="bg-white p-8 sm:p-10 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-black/5">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-[#111] mb-2">Alamat Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="email" 
                  placeholder="nama@email.com"
                  className="w-full bg-[#F8F8F6] border border-black/5 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#FF5C1A]/20 focus:border-[#FF5C1A] transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-bold text-[#111]">Password</label>
                <Link href="#" className="text-xs font-bold text-[#FF5C1A] hover:underline">Lupa Password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-[#F8F8F6] border border-black/5 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#FF5C1A]/20 focus:border-[#FF5C1A] transition-all"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#111111] text-white py-4 rounded-2xl font-bold text-lg shadow-[0_8px_24px_rgba(0,0,0,0.1)] hover:bg-[#FF5C1A] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              Masuk Sekarang
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-8 relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-black/5"></div>
            </div>
            <span className="relative px-4 bg-white text-xs font-bold text-gray-400 uppercase tracking-widest">Atau masuk dengan</span>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 bg-white border border-black/10 py-3 rounded-2xl hover:bg-gray-50 transition-colors">
              <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
              <span className="text-sm font-bold">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 bg-[#111] text-white py-3 rounded-2xl hover:bg-gray-800 transition-colors">
              <Github className="w-4 h-4" />
              <span className="text-sm font-bold">Github</span>
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Belum punya akun?{" "}
            <Link href="/daftar" className="text-[#FF5C1A] font-bold hover:underline">
              Daftar Gratis
            </Link>
          </p>
        </div>
      </motion.div>
    </main>
  );
}
