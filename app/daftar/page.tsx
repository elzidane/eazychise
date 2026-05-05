"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, Mail, Lock, ArrowRight, CheckCircle2, ArrowLeft, ShieldCheck, Sparkles } from "lucide-react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate registration
    alert("Terima kasih! Akun Anda sedang diproses.");
  };

  return (
    <main className="min-h-screen bg-[#FFF9F0] flex flex-col lg:flex-row relative">
      {/* Back Button */}
      <Link 
        href="/" 
        className="fixed top-8 left-8 z-50 flex items-center gap-2 text-[#777] hover:text-[#111] font-bold text-sm transition-all group lg:text-white/50 lg:hover:text-white"
      >
        <div className="w-8 h-8 rounded-full border border-black/5 lg:border-white/10 flex items-center justify-center bg-white lg:bg-white/5 shadow-sm group-hover:border-[#FF5C1A] group-hover:text-[#FF5C1A] transition-all">
          <ArrowLeft className="w-4 h-4" />
        </div>
        Kembali ke Beranda
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
            Limited Offer: Free Consultation
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
              "Akses ke 320+ brand franchise terpercaya",
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
          © 2026 EazyChise Indonesia • Trusted by 9.000+ Entrepreneurs
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
          className="w-full max-w-[440px] relative z-10"
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
              Easy Registration
            </div>
            <h1 className="font-syne font-extrabold text-[2.5rem] text-[#111] mb-3 tracking-tighter leading-none">
              Daftar <span className="text-[#FF5C1A]">Akun</span>
            </h1>
            <p className="text-gray-500 text-[0.9rem] font-medium lg:ml-1">Gabung dengan 9.000+ calon pengusaha sukses lainnya.</p>
          </div>

          {/* Form Card */}
          <div className="bg-white p-8 sm:p-10 rounded-[40px] shadow-[0_32px_64px_rgba(0,0,0,0.06)] border border-black/5">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-[0.8rem] font-black text-[#111] uppercase tracking-wider mb-2 ml-1">Nama Lengkap</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full bg-[#F8F8F6] border border-black/5 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-[#FF5C1A]/10 focus:border-[#FF5C1A] transition-all font-medium"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[0.8rem] font-black text-[#111] uppercase tracking-wider mb-2 ml-1">Alamat Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="email" 
                    placeholder="nama@email.com"
                    className="w-full bg-[#F8F8F6] border border-black/5 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-[#FF5C1A]/10 focus:border-[#FF5C1A] transition-all font-medium"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[0.8rem] font-black text-[#111] uppercase tracking-wider mb-2 ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full bg-[#F8F8F6] border border-black/5 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-[#FF5C1A]/10 focus:border-[#FF5C1A] transition-all font-medium"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-[#FF5C1A] text-white py-4.5 rounded-2xl font-bold text-[1rem] shadow-[0_12px_24px_rgba(255,92,26,0.25)] hover:bg-[#e04710] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 mt-4 group"
              >
                Daftar Sekarang
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="mt-10 relative flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-black/5"></div>
              </div>
              <span className="relative px-4 bg-white text-[0.65rem] font-black text-gray-400 uppercase tracking-widest">Atau daftar dengan</span>
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
    </main>
  );
}
