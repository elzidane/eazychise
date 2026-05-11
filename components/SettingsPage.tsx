"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, User, Bell, Shield, Eye, Smartphone, Globe, LogOut,
  ChevronRight, ShieldCheck, Loader2, Check, Trash2, Key, HelpCircle
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { useToast } from '@/components/ui/Toast';

function SettingsPage() {
  const router = useRouter();
  const supabase = createClient();
  const { showToast } = useToast();

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [notifFranchise, setNotifFranchise] = useState(true);
  const [notifPromo, setNotifPromo] = useState(true);
  const [notifEmail, setNotifEmail] = useState(false);
  const [showLangModal, setShowLangModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [language, setLanguage] = useState<'id' | 'en'>('id');
  const [userEmail, setUserEmail] = useState('');
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setUserEmail(user.email || '');
      setLoadingUser(false);
    });
  }, [supabase]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await supabase.auth.signOut();
      showToast('Berhasil keluar dari akun', 'success');
      router.push('/');
      router.refresh();
    } catch {
      showToast('Gagal keluar', 'error');
    } finally {
      setIsLoggingOut(false);
    }
  };

  const ToggleSwitch = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <button
      type="button"
      onClick={onChange}
      className={`w-11 h-6 rounded-full relative transition-colors duration-300 flex-shrink-0 ${checked ? 'bg-[#FF5C1A]' : 'bg-gray-200'}`}
    >
      <motion.div
        animate={{ x: checked ? 22 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="absolute top-1 left-0 w-4 h-4 bg-white rounded-full shadow"
      />
    </button>
  );

  const SectionHeader = ({ title }: { title: string }) => (
    <p className="text-[0.6rem] font-black text-gray-400 uppercase tracking-[0.25em] px-1 mb-3">{title}</p>
  );

  const SettingRow = ({
    icon: Icon, label, desc, href, onClick, right, topBorder = false
  }: {
    icon: React.ElementType; label: string; desc?: string; href?: string;
    onClick?: () => void; right?: React.ReactNode; topBorder?: boolean;
  }) => {
    const inner = (
      <div className={`flex items-center gap-4 px-5 py-4 ${topBorder ? 'border-t border-gray-100' : ''} hover:bg-gray-50/70 transition-colors group cursor-pointer`}>
        <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#FF5C1A]/8 group-hover:text-[#FF5C1A] transition-colors flex-shrink-0">
          <Icon className="w-4.5 h-4.5" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-[#111]">{label}</p>
          {desc && <p className="text-[0.65rem] text-gray-400 font-medium mt-0.5 truncate">{desc}</p>}
        </div>
        {right !== undefined ? right : <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-[#FF5C1A] group-hover:translate-x-0.5 transition-all flex-shrink-0" />}
      </div>
    );

    if (href) return <Link href={href}>{inner}</Link>;
    if (onClick) return <button className="w-full text-left" onClick={onClick}>{inner}</button>;
    return inner;
  };

  if (loadingUser) {
    return (
      <div className="min-h-screen bg-[#FFF9F0] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#FF5C1A] animate-spin mb-3" />
        <p className="text-sm font-bold text-gray-400">Memuat pengaturan...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9F0] font-jakarta pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/profile"
              className="w-11 h-11 rounded-2xl bg-white border border-black/5 shadow-sm flex items-center justify-center text-gray-500 hover:text-[#FF5C1A] hover:border-[#FF5C1A]/30 transition-all flex-shrink-0">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-black text-[#111] font-syne tracking-tight">Pengaturan</h1>
              <p className="text-xs text-gray-400 font-medium mt-0.5">Kelola akun & preferensi Anda</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-2xl text-[0.65rem] font-bold uppercase tracking-wider border border-emerald-100">
            <ShieldCheck className="w-3.5 h-3.5" />
            Aman
          </div>
        </div>

        {/* Account Info Strip */}
        <div className="bg-[#111] rounded-[2rem] p-5 sm:p-6 flex items-center gap-4 mb-6 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FF5C1A]/15 rounded-full blur-3xl" />
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0 text-white font-black font-syne text-lg">
            {userEmail.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0 relative">
            <p className="text-[0.6rem] text-white/40 font-bold uppercase tracking-wider">Akun Aktif</p>
            <p className="text-white font-bold text-sm truncate">{userEmail}</p>
          </div>
          <div className="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
        </div>

        <div className="space-y-6">
          {/* Akun */}
          <div>
            <SectionHeader title="Akun" />
            <div className="bg-white rounded-[2rem] border border-black/5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] overflow-hidden">
              <SettingRow icon={User} label="Informasi Pribadi" desc="Nama, bio, foto, dan detail profil" href="/profile/edit" />
              <SettingRow icon={Key} label="Ubah Password" desc="Perbarui kata sandi akun Anda" onClick={() => showToast('Fitur segera hadir!', 'info')} topBorder />
              <SettingRow icon={Smartphone} label="Nomor Telepon"
                desc="Tambah atau verifikasi nomor HP"
                onClick={() => showToast('Fitur segera hadir!', 'info')}
                right={<span className="text-[0.6rem] font-black bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-lg uppercase tracking-wider flex-shrink-0">Tambah</span>}
                topBorder
              />
            </div>
          </div>

          {/* Notifikasi */}
          <div>
            <SectionHeader title="Notifikasi" />
            <div className="bg-white rounded-[2rem] border border-black/5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] overflow-hidden">
              <div className="flex items-center gap-4 px-5 py-4">
                <div className="w-10 h-10 rounded-2xl bg-orange-50 flex items-center justify-center text-[#FF5C1A] flex-shrink-0">
                  <Bell className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#111]">Notifikasi Franchise</p>
                  <p className="text-[0.65rem] text-gray-400 font-medium mt-0.5">Update lead & pengajuan kemitraan</p>
                </div>
                <ToggleSwitch checked={notifFranchise} onChange={() => setNotifFranchise(v => !v)} />
              </div>
              <div className="flex items-center gap-4 px-5 py-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 flex-shrink-0">
                  <Bell className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#111]">Promo & Penawaran</p>
                  <p className="text-[0.65rem] text-gray-400 font-medium mt-0.5">Diskon eksklusif dan franchise baru</p>
                </div>
                <ToggleSwitch checked={notifPromo} onChange={() => setNotifPromo(v => !v)} />
              </div>
              <div className="flex items-center gap-4 px-5 py-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 flex-shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#111]">Notifikasi Email</p>
                  <p className="text-[0.65rem] text-gray-400 font-medium mt-0.5">Terima ringkasan mingguan via email</p>
                </div>
                <ToggleSwitch checked={notifEmail} onChange={() => setNotifEmail(v => !v)} />
              </div>
            </div>
          </div>

          {/* Privasi & Keamanan */}
          <div>
            <SectionHeader title="Privasi & Keamanan" />
            <div className="bg-white rounded-[2rem] border border-black/5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] overflow-hidden">
              <SettingRow icon={Shield} label="Keamanan Akun" desc="Autentikasi dua faktor (2FA)" onClick={() => showToast('Fitur segera hadir!', 'info')} />
              <SettingRow icon={Eye} label="Privasi Data" desc="Kontrol data yang Anda bagikan" onClick={() => showToast('Fitur segera hadir!', 'info')} topBorder />
            </div>
          </div>

          {/* Preferensi */}
          <div>
            <SectionHeader title="Preferensi" />
            <div className="bg-white rounded-[2rem] border border-black/5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] overflow-hidden">
              <SettingRow
                icon={Globe}
                label="Bahasa"
                desc={language === 'id' ? '🇮🇩 Bahasa Indonesia' : '🇺🇸 English (US)'}
                onClick={() => setShowLangModal(true)}
                right={<span className="text-xs font-bold text-[#FF5C1A]">Ubah</span>}
              />
              <SettingRow icon={HelpCircle} label="Pusat Bantuan" desc="FAQ, kontak, dan laporan masalah" onClick={() => showToast('Fitur segera hadir!', 'info')} topBorder />
            </div>
          </div>

          {/* Danger Zone */}
          <div>
            <SectionHeader title="Zona Berbahaya" />
            <div className="space-y-3">
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full bg-white border border-red-100 hover:bg-red-50 text-red-500 py-4 px-6 rounded-[1.75rem] font-bold text-sm transition-all flex items-center justify-center gap-3 group disabled:opacity-50 shadow-[0_4px_12px_rgba(239,68,68,0.08)]"
              >
                {isLoggingOut
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> Mengeluarkan akun...</>
                  : <><LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Keluar dari Akun</>}
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="w-full bg-white border border-black/5 hover:border-red-200 hover:bg-red-50/50 text-gray-400 hover:text-red-400 py-4 px-6 rounded-[1.75rem] font-bold text-sm transition-all flex items-center justify-center gap-3 group"
              >
                <Trash2 className="w-4 h-4" /> Hapus Akun
              </button>
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-[0.6rem] text-gray-300 font-bold uppercase tracking-[0.2em]">
          EazyChise Platform v1.3.0 • © 2026
        </p>
      </motion.div>

      {/* Language Modal */}
      <AnimatePresence>
        {showLangModal && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowLangModal(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, y: 60, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 60 }}
              className="relative w-full max-w-sm bg-white rounded-[2.5rem] p-8 shadow-2xl">
              <h3 className="text-xl font-black text-[#111] font-syne mb-6 text-center">Pilih Bahasa</h3>
              <div className="space-y-3">
                {[{ id: 'id', label: 'Bahasa Indonesia', flag: '🇮🇩' }, { id: 'en', label: 'English (US)', flag: '🇺🇸' }].map((lang) => (
                  <button key={lang.id}
                    onClick={() => { setLanguage(lang.id as 'id' | 'en'); setShowLangModal(false); showToast('Bahasa diperbarui', 'success'); }}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all font-bold text-sm ${language === lang.id ? 'border-[#FF5C1A] bg-[#FF5C1A]/5 text-[#FF5C1A]' : 'border-black/5 text-gray-500 hover:border-gray-200'}`}>
                    <span className="flex items-center gap-3"><span className="text-xl">{lang.flag}</span>{lang.label}</span>
                    {language === lang.id && <Check className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Account Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowDeleteModal(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-sm bg-white rounded-[2.5rem] p-8 shadow-2xl text-center">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
                <Trash2 className="w-7 h-7 text-red-400" />
              </div>
              <h3 className="text-xl font-black text-[#111] font-syne mb-2">Hapus Akun?</h3>
              <p className="text-sm text-gray-500 font-medium mb-6">Tindakan ini tidak dapat dibatalkan. Semua data Anda akan dihapus permanen.</p>
              <div className="space-y-3">
                <button onClick={() => showToast('Fitur ini memerlukan verifikasi admin.', 'info')}
                  className="w-full bg-red-500 text-white py-3.5 rounded-2xl font-bold text-sm hover:bg-red-600 transition-colors">
                  Ya, Hapus Akun Saya
                </button>
                <button onClick={() => setShowDeleteModal(false)}
                  className="w-full bg-gray-100 text-gray-500 py-3.5 rounded-2xl font-bold text-sm hover:bg-gray-200 transition-colors">
                  Batal
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SettingsPage;
