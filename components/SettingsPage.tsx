"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

interface SettingsItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  desc: string;
  link?: string;
  status?: string;
  action?: string;
}

interface SettingsSection {
  title: string;
  items: SettingsItem[];
}

function SettingsPage() {
  const router = useRouter();
  const supabase = createClient();
  const { showToast } = useToast();
  
  const [language, setLanguage] = useState<'id' | 'en'>('id');
  const [notifications, setNotifications] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showLangModal, setShowLangModal] = useState(false);

  // Translation Object
  const t = {
    id: {
      title: 'Pengaturan',
      subtitle: 'Kelola pengalaman EazyChise Anda',
      systemActive: 'Sistem Aktif',
      notifTitle: 'Notifikasi Push',
      notifActive: 'Aktif',
      notifInactive: 'Nonaktif',
      sections: {
        account: 'Akun',
        privacy: 'Privasi & Keamanan',
        prefs: 'Preferensi'
      },
      items: {
        profile: 'Informasi Pribadi',
        profileDesc: 'Kelola nama, bio, dan detail profil Anda',
        phone: 'Nomor Telepon',
        phoneDesc: 'Verifikasi nomor HP Anda',
        phoneStatus: 'Terverifikasi',
        security: 'Keamanan Akun',
        securityDesc: 'Ganti password dan autentikasi dua faktor',
        privacy: 'Privasi Data',
        privacyDesc: 'Kontrol data yang Anda bagikan',
        lang: 'Bahasa',
        langDesc: 'Bahasa Indonesia',
        langAction: 'Ubah'
      },
      logout: 'Keluar dari Akun',
      loggingOut: 'Mengeluarkan akun...',
      langSelect: 'Pilih Bahasa'
    },
    en: {
      title: 'Settings',
      subtitle: 'Manage your EazyChise experience',
      systemActive: 'System Active',
      notifTitle: 'Push Notifications',
      notifActive: 'Active',
      notifInactive: 'Inactive',
      sections: {
        account: 'Account',
        privacy: 'Privacy & Security',
        prefs: 'Preferences'
      },
      items: {
        profile: 'Personal Information',
        profileDesc: 'Manage your name, bio, and profile details',
        phone: 'Phone Number',
        phoneDesc: 'Verify your phone number',
        phoneStatus: 'Verified',
        security: 'Account Security',
        securityDesc: 'Change password and 2FA',
        privacy: 'Data Privacy',
        privacyDesc: 'Control the data you share',
        lang: 'Language',
        langDesc: 'English (US)',
        langAction: 'Change'
      },
      logout: 'Sign Out',
      loggingOut: 'Signing out...',
      langSelect: 'Select Language'
    }
  }[language];

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await supabase.auth.signOut();
      showToast(language === 'id' ? 'Berhasil keluar' : 'Successfully signed out', 'success');
      router.push('/');
      router.refresh();
    } catch (error) {
      showToast('Error', 'error');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const sections: SettingsSection[] = [
    {
      title: t.sections.account,
      items: [
        { id: 'profile', icon: <User className="w-5 h-5" />, label: t.items.profile, desc: t.items.profileDesc, link: '/profile/edit' },
        { id: 'phone', icon: <Smartphone className="w-5 h-5" />, label: t.items.phone, desc: t.items.phoneDesc, status: t.items.phoneStatus },
      ]
    },
    {
      title: t.sections.privacy,
      items: [
        { id: 'security', icon: <Shield className="w-5 h-5" />, label: t.items.security, desc: t.items.securityDesc },
        { id: 'privacy', icon: <Eye className="w-5 h-5" />, label: t.items.privacy, desc: t.items.privacyDesc },
      ]
    },
    {
      title: t.sections.prefs,
      items: [
        { id: 'lang', icon: <Globe className="w-5 h-5" />, label: t.items.lang, desc: t.items.langDesc, action: t.items.langAction },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFF9F0] pt-28 pb-12 sm:pt-32 px-4 sm:px-6 lg:px-8 font-jakarta">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8 sm:mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link 
              href="/profile" 
              className="w-10 h-10 rounded-2xl bg-white border border-black/5 flex items-center justify-center text-gray-500 hover:text-[#FF5C1A] hover:border-[#FF5C1A]/20 transition-all shadow-sm flex-shrink-0"
            >
              <ChevronLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-[#111] font-syne tracking-tight">{t.title}</h1>
              <p className="text-[0.65rem] sm:text-xs text-gray-500 font-medium">{t.subtitle}</p>
            </div>
          </div>
          <div className="w-fit flex items-center gap-2 bg-green-50 text-green-600 px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl text-[0.65rem] sm:text-[0.7rem] font-bold uppercase tracking-wider border border-green-100">
            <ShieldCheck className="w-3.5 h-3.5" />
            {t.systemActive}
          </div>
        </div>

        {/* Quick Settings Toggles */}
        <div className="mb-8">
          <div className="bg-white p-5 sm:p-6 rounded-[1.5rem] sm:rounded-[2rem] border border-black/5 shadow-[0_10px_30px_rgba(0,0,0,0.03)] flex items-center justify-between group hover:border-[#FF5C1A]/20 transition-all">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center transition-colors ${notifications ? 'bg-[#FF5C1A]/10 text-[#FF5C1A]' : 'bg-gray-100 text-gray-400'}`}>
                <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-[#111]">{t.notifTitle}</p>
                <p className="text-[0.6rem] sm:text-[0.65rem] text-gray-400 font-medium">{notifications ? t.notifActive : t.notifInactive}</p>
              </div>
            </div>
            <button 
              onClick={() => setNotifications(!notifications)}
              className={`w-10 h-5 sm:w-12 sm:h-6 rounded-full relative transition-colors duration-300 ${notifications ? 'bg-[#FF5C1A]' : 'bg-gray-200'}`}
            >
              <motion.div 
                animate={{ x: notifications ? (typeof window !== 'undefined' && window.innerWidth < 640 ? 18 : 26) : 2 }}
                className="absolute top-0.5 sm:top-1 left-0 w-4 h-4 bg-white rounded-full shadow-sm"
              />
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
                          <div className="text-left">
                            <p className="text-[0.9rem] font-bold text-[#111]">{item.label}</p>
                            <p className="text-[0.7rem] text-gray-400 font-medium">{item.desc}</p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#FF5C1A] group-hover:translate-x-1 transition-all" />
                      </Link>
                    ) : (
                      <button 
                        className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-all group"
                        onClick={() => {
                          if (item.id === 'lang') setShowLangModal(true);
                          else showToast(language === 'id' ? `Menu ${item.label} segera hadir!` : `${item.label} coming soon!`, 'info');
                        }}
                      >
                        <div className="flex items-center gap-5">
                          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#FF5C1A]/10 group-hover:text-[#FF5C1A] transition-all">
                            {item.icon}
                          </div>
                          <div className="text-left">
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
                {t.loggingOut}
              </span>
            ) : (
              <>
                <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                {t.logout}
              </>
            )}
          </button>
          <p className="mt-6 text-center text-[0.65rem] text-gray-400 font-medium uppercase tracking-[0.2em]">
            EazyChise v1.2.0 • Build 2026
          </p>
        </div>
      </motion.div>

      {/* Language Modal */}
      <AnimatePresence>
        {showLangModal && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLangModal(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              className="relative w-full max-w-sm bg-white rounded-[2.5rem] p-8 shadow-2xl"
            >
              <h3 className="text-xl font-black text-[#111] font-syne mb-6 text-center">{t.langSelect}</h3>
              <div className="space-y-3">
                {[
                  { id: 'id', label: 'Bahasa Indonesia', flag: '🇮🇩' },
                  { id: 'en', label: 'English (US)', flag: '🇺🇸' }
                ].map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => {
                      setLanguage(lang.id as 'id' | 'en');
                      setShowLangModal(false);
                      showToast(lang.id === 'id' ? 'Bahasa diubah' : 'Language changed', 'success');
                    }}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all font-bold ${
                      language === lang.id 
                        ? 'border-[#FF5C1A] bg-[#FF5C1A]/5 text-[#FF5C1A]' 
                        : 'border-black/5 hover:border-gray-200 text-gray-500'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-xl">{lang.flag}</span>
                      {lang.label}
                    </span>
                    {language === lang.id && <div className="w-2 h-2 rounded-full bg-[#FF5C1A]" />}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SettingsPage;
