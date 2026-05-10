"use client";
import { motion } from 'framer-motion';

export default function HeroProfile() {
 return (
  <motion.div
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="relative h-[300px] overflow-hidden rounded-3xl bg-[#111] shadow-2xl">
  {/* Background decoration */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#FF5C1A] rounded-full blur-[120px] opacity-20" />
    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#FFCF40] rounded-full blur-[120px] opacity-10" />
  </div>

  <div className="absolute inset-0 z-10 flex flex-col justify-end p-10">
  <div className="flex items-end gap-6">
    {/* Avatar */}
    <div className="relative h-28 w-28 overflow-hidden rounded-2xl border-4 border-white/10 shadow-2xl bg-gradient-to-br from-[#FF5C1A] to-[#FF8C42] flex items-center justify-center text-white text-4xl font-bold">
      {/* Fallback to initial if image fails */}
      <span className="font-syne">U</span>
    </div>

    <div className="flex-1 pb-2">
      {/* Username */}
      <h1 className="text-4xl font-extrabold text-white font-syne tracking-tight">Username</h1>
      {/* Bio */}
      <p className="mt-2 text-white/60 font-medium max-w-lg">Franchise Enthusiast | Membantu UMKM naik kelas lewat ekosistem EazyChise.</p>
    </div>

    {/* Edit Button */}
    <button className="mb-2 px-6 py-2.5 rounded-xl bg-white text-[#111] font-bold hover:bg-[#FF5C1A] hover:text-white transition-all duration-300 shadow-lg">
      Edit Profil
    </button>
  </div>
  </div>
  </motion.div>
 );
}
