"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  User, 
  Bell, 
  Shield, 
  Eye, 
  Smartphone, 
  Globe, 
  LogOut, 
  ChevronRight,
  Moon,
  Sun,
  ShieldCheck
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { useToast } from '@/components/ui/Toast';

function SettingsPage() {
  const router = useRouter();
  const supabase = createClient();
  const { showToast } = useToast();
  
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await supabase.auth.signOut();
      showToast('Berhasil keluar dari akun', 'success');
      router.push('/');
      router.refresh();
    } catch (error) {
      showToast('Gagal keluar dari akun', 'error');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const sections = [
    {
      title: 'Akun',
      items: [
        { id: 'profile', icon: <User className="w-5 h-5" />, label: 'Informasi Pribadi', desc: 'Kelola nama, bio, dan detail profil Anda', link: '/profile/edit' },
        { id: 'phone', icon: <Smartphone className="w-5 h-5" />, label: 'Nomor Telepon', desc: 'Verifikasi nomor HP Anda', status: 'Terverifikasi' },
      ]
    },
    {
      title: 'Privasi & Keamanan',
      items: [
        { id: 'security', icon: <Shield className="w-5 h-5" />, label: 'Keamanan Akun', desc: 'Ganti password dan autentikasi dua faktor' },
        { id: 'privacy', icon: <Eye className="w-5 h-5" />, label: 'Privasi Data', desc: 'Kontrol data yang Anda bagikan' },
      ]
    },
    {
      title: 'Preferensi',
      items: [
        { id: 'lang', icon: <Globe className="w-5 h-5" />, label: 'Bahasa', desc: 'Bahasa Indonesia', action: 'Ubah' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFF9F0] py-12 px-4 sm:px-6 lg:px-8 font-jakarta">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/profile" 
              className="w-10 h-10 rounded-2xl bg-white border border-black/5 flex items-center justify-center text-gray-500 hover:text-[#FF5C1A] hover:border-[#FF5C1A]/20 transition-all shadow-sm"
            >
              <ChevronLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-black text-[#111] font-syne tracking-tight">Pengaturan</h1>
              <p className="text-xs text-gray-500 font-medium">Kelola pengalaman EazyChise Anda</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-2xl text-[0.7rem] font-bold uppercase tracking-wider border border-green-100">
            <ShieldCheck className="w-3.5 h-3.5" />
            Sistem Aktif
          </div>
        </div>

        {/* Quick Settings Toggles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-6 rounded-[2rem] border border-black/5 shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex items-center justify-between group hover:border-[#FF5C1A]/20 transition-all">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${notifications ? 'bg-[#FF5C1A]/10 text-[#FF5C1A]' : 'bg-gray-100 text-gray-400'}`}>
                <Bell className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#111]">Notifikasi</p>
                <p className="text-[0.65rem] text-gray-400 font-medium">{notifications ? 'Aktif' : 'Nonaktif'}</p>
              </div>
            </div>
            <button 
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${notifications ? 'bg-[#FF5C1A]' : 'bg-gray-200'}`}
            >
              <motion.div 
                animate={{ x: notifications ? 26 : 2 }}
                className="absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow-sm"
              />
            </button>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-black/5 shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex items-center justify-between group hover:border-[#FF5C1A]/20 transition-all">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${isDarkMode ? 'bg-[#111] text-white' : 'bg-gray-100 text-gray-400'}`}>
                {isDarkMode ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
              </div>
              <div>
                <p className="text-sm font-bold text-[#111]">Tema Gelap</p>
                <p className="text-[0.65rem] text-gray-400 font-medium">Segera Hadir</p>
              </div>
            </div>
            <button 
              onClick={() => showToast('Fitur tema gelap akan segera hadir!', 'info')}
              className={`w-12 h-6 rounded-full relative transition-colors duration-300 bg-gray-200 opacity-50 cursor-not-allowed`}
            >
              <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm" />
            </button>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="space-y-8">
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h3 className="text-[0.7rem] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">{section.title}</h3>
              <div className="bg-white rounded-[2.5rem] border border-black/5 shadow-[0_10px_40px_rgba(0,0,0,0.03)] overflow-hidden">
                {section.items.map((item, itemIdx) => (
                  <div key={itemIdx}>
                    {item.link ? (
                      <Link 
                        href={item.link}
                        className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-all group"
                      >
                        <div className="flex items-center gap-5">
                          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#FF5C1A]/10 group-hover:text-[#FF5C1A] transition-all">
                            {item.icon}
                          </div>
                          <div>
                            <p className="text-[0.9rem] font-bold text-[#111]">{item.label}</p>
                            <p className="text-[0.7rem] text-gray-400 font-medium">{item.desc}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#FF5C1A] group-hover:translate-x-1 transition-all" />
                      </Link>
                    ) : (
                      <button 
                        className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-all group"
                        onClick={() => showToast(`Menu ${item.label} akan segera hadir!`, 'info')}
                      >
                        <div className="flex items-center gap-5">
                          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#FF5C1A]/10 group-hover:text-[#FF5C1A] transition-all">
                            {item.icon}
                          </div>
                          <div>
                            <p className="text-[0.9rem] font-bold text-[#111]">{item.label}</p>
                            <p className="text-[0.7rem] text-gray-400 font-medium">{item.desc}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {item.status && <span className="text-[0.6rem] font-black bg-green-50 text-green-600 px-2.5 py-1 rounded-lg uppercase tracking-wider">{item.status}</span>}
                          {item.action && <span className="text-xs font-bold text-[#FF5C1A]">{item.action}</span>}
                          <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#FF5C1A] group-hover:translate-x-1 transition-all" />
                        </div>
                      </button>
                    )}
                    {itemIdx < section.items.length - 1 && <div className="h-[1px] bg-gray-100 mx-6" />}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Danger Zone */}
        <div className="mt-12 pt-8 border-t border-black/5">
          <button 
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full bg-red-50 hover:bg-red-500 hover:text-white text-red-500 py-5 rounded-[2rem] font-bold text-sm transition-all flex items-center justify-center gap-3 group disabled:opacity-50"
          >
            {isLoggingOut ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-red-500/30 border-t-red-500 rounded-full animate-spin" />
                Mengeluarkan akun...
              </span>
            ) : (
              <>
                <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Keluar dari Akun
              </>
            )}
          </button>
          <p className="mt-6 text-center text-[0.65rem] text-gray-400 font-medium uppercase tracking-[0.2em]">
            EazyChise v1.2.0 • Build 2026
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default SettingsPage;
