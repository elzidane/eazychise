import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, FileText, Settings, Edit3, ArrowRight, MapPin, Calendar } from 'lucide-react';
import Link from 'next/link';

function ProfilePage() {
  // Data dummy (biasanya diambil dari session/API)
  const userData = {
    name: 'John Doe',
    username: 'johndoe',
    email: 'johndoe@example.com',
    bio: 'Wirausahawan muda yang tertarik pada ekosistem franchise F&B di Indonesia.',
    location: 'Jakarta, Indonesia',
    joinedDate: 'Mei 2024'
  };

  return (
    <div className="min-h-screen bg-[#FFF9F0] py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        {/* Profile Header Card */}
        <div className="bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-black/5 overflow-hidden mb-8">
          <div className="h-32 bg-gradient-to-r from-[#FF5C1A] to-[#FF8C42]" />
          <div className="px-8 pb-8">
            <div className="relative flex justify-between items-end -mt-12 mb-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-3xl bg-white p-1.5 shadow-xl">
                  <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#FF5C1A] to-[#FF8C42] flex items-center justify-center text-white text-4xl font-bold">
                    {userData.name.charAt(0)}
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full" />
              </div>
              <Link 
                href="/profile/edit" 
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#FF5C1A]/10 text-[#FF5C1A] font-bold text-sm hover:bg-[#FF5C1A] hover:text-white transition-all group"
              >
                <Edit3 className="w-4 h-4" />
                Edit Profil
                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </Link>
            </div>

            <div className="space-y-1">
              <h1 className="text-3xl font-extrabold text-gray-900 font-syne">{userData.name}</h1>
              <p className="text-[#FF5C1A] font-semibold flex items-center gap-1">
                @{userData.username}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-500 font-medium">
              <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-xl border border-black/5">
                <MapPin className="w-4 h-4 text-[#FF5C1A]" />
                {userData.location}
              </div>
              <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-xl border border-black/5">
                <Calendar className="w-4 h-4 text-[#FF5C1A]" />
                Bergabung {userData.joinedDate}
              </div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white rounded-[2rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-black/5">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#FF5C1A]" />
                Tentang Saya
              </h2>
              <p className="text-gray-600 leading-relaxed font-medium">
                {userData.bio}
              </p>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-[2rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-black/5">
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#FF5C1A]" />
                Informasi Kontak
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-transparent hover:border-[#FF5C1A]/20 transition-all">
                  <span className="text-sm text-gray-500 font-medium">Email Utama</span>
                  <span className="text-sm font-bold text-gray-900">{userData.email}</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-transparent hover:border-[#FF5C1A]/20 transition-all">
                  <span className="text-sm text-gray-500 font-medium">Status Akun</span>
                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-[10px] font-bold uppercase tracking-wider">Terverifikasi</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* Stats / Quick Info */}
            <div className="bg-[#111] rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF5C1A] opacity-10 blur-3xl -mr-16 -mt-16 group-hover:opacity-20 transition-opacity" />
              <h3 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-6">Aktivitas</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-3xl font-black font-syne text-[#FF5C1A]">12</p>
                  <p className="text-xs font-medium text-white/40">Franchise Disimpan</p>
                </div>
                <div>
                  <p className="text-3xl font-black font-syne text-[#FF5C1A]">4</p>
                  <p className="text-xs font-medium text-white/40">Analisis BEP Selesai</p>
                </div>
              </div>
            </div>

            {/* Quick Settings Link */}
            <div className="bg-white rounded-[2rem] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-black/5">
              <button className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-all text-gray-700 font-bold text-sm">
                <span className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-gray-400" />
                  Pengaturan
                </span>
                <ArrowRight className="w-4 h-4 text-gray-300" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ProfilePage;
