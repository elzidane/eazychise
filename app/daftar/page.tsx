"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, Mail, Lock, ArrowRight, CheckCircle2 } from "lucide-react";

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
    <main className="min-h-screen bg-[#FFF9F0] flex flex-col lg:flex-row">
      {/* ── Left Side: Branding/Visual (Hidden on Mobile) ── */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#111111] p-12 flex-col justify-between relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-[#FF5C1A]/10 rounded-full blur-[100px]" />
        
        <div className="relative z-10">
          <Link href="/" className="font-syne font-extrabold text-2xl text-white tracking-tighter">
            Eazy<span className="text-[#FF5C1A]">Chise</span>
          </Link>
        </div>

        <div className="relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-fraunces font-black text-5xl text-white leading-tight mb-6"
          >
            Mulai Perjalanan <br />
            Bisnis <span className="text-[#FF5C1A] italic">Cuan-mu</span> Hari Ini
          </motion.h2>
          <div className="space-y-4">
            {[
              "Akses ke 320+ brand franchise terpercaya",
              "Analisis AI untuk kecocokan bisnis",
              "Konsultasi gratis dengan pakar franchise",
            ].map((item, i) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                key={i} 
                className="flex items-center gap-3 text-white/70"
              >
                <CheckCircle2 className="w-5 h-5 text-[#FF5C1A]" />
                <span className="text-sm font-medium">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-white/30 text-xs">
          © 2026 EazyChise Indonesia. All rights reserved.
        </div>
      </div>

      {/* ── Right Side: Form ── */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          {/* Logo Mobile */}
          <div className="lg:hidden mb-8 text-center">
            <Link href="/" className="font-syne font-extrabold text-3xl text-[#111] tracking-tighter">
              Eazy<span className="text-[#FF5C1A]">Chise</span>
            </Link>
          </div>

          <div className="mb-10">
            <h1 className="font-syne font-extrabold text-3xl text-[#111] mb-2">Daftar Akun</h1>
            <p className="text-gray-500">Gabung dengan 9.000+ calon pengusaha sukses lainnya.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-bold text-[#111] mb-2">Nama Lengkap</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="w-full bg-white border border-black/10 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#FF5C1A]/20 focus:border-[#FF5C1A] transition-all"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-[#111] mb-2">Alamat Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="email" 
                  placeholder="nama@email.com"
                  className="w-full bg-white border border-black/10 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#FF5C1A]/20 focus:border-[#FF5C1A] transition-all"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold text-[#111] mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-white border border-black/10 rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#FF5C1A]/20 focus:border-[#FF5C1A] transition-all"
                  required
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#FF5C1A] text-white py-4 rounded-xl font-bold text-lg shadow-[0_8px_24px_rgba(255,92,26,0.2)] hover:bg-[#e04710] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              Daftar Sekarang
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              Sudah punya akun?{" "}
              <Link href="/masuk" className="text-[#FF5C1A] font-bold hover:underline">
                Masuk di sini
              </Link>
            </p>
          </div>

          {/* Social Auth Placeholder */}
          <div className="mt-10">
            <div className="relative flex items-center justify-center mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-black/5"></div>
              </div>
              <span className="relative px-4 bg-[#FFF9F0] text-xs font-bold text-gray-400 uppercase tracking-widest">Atau daftar dengan</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 bg-white border border-black/10 py-3 rounded-xl hover:bg-gray-50 transition-colors">
                <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
                <span className="text-sm font-bold">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 bg-white border border-black/10 py-3 rounded-xl hover:bg-gray-50 transition-colors">
                <img src="https://www.facebook.com/favicon.ico" className="w-4 h-4" alt="Facebook" />
                <span className="text-sm font-bold">Facebook</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
