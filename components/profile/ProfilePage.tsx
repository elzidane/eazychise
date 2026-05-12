"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Edit3, MapPin, Calendar, Loader2, Phone, Globe, FileText, Mail, Settings, BookOpen, BarChart2, Star } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';

interface UserData {
  name: string;
  username: string;
  email: string;
  bio: string;
  location: string;
  phone: string;
  website: string;
  joinedDate: string;
  avatarUrl: string | null;
}

function ProfilePage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserData>({
    name: 'User', username: 'user', email: '', bio: '',
    location: 'Indonesia', phone: '', website: '', joinedDate: '...', avatarUrl: null
  });

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        const joined = new Date(user.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
        if (profile) {
          setUserData({
            name: profile.full_name || 'User',
            username: profile.username || user.email?.split('@')[0] || 'user',
            email: user.email || '',
            bio: profile.bio || '',
            location: profile.location || 'Indonesia',
            phone: profile.phone || '',
            website: profile.website || '',
            joinedDate: joined,
            avatarUrl: profile.avatar_url || null,
          });
        } else {
          setUserData({
            name: user.user_metadata?.full_name || 'User',
            username: user.user_metadata?.username || user.email?.split('@')[0] || 'user',
            email: user.email || '',
            bio: user.user_metadata?.bio || '',
            location: 'Indonesia',
            phone: '',
            website: '',
            joinedDate: joined,
            avatarUrl: user.user_metadata?.avatar_url || null,
          });
        }
      }
      setLoading(false);
    };
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        // Re-fetch everything to be sure
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
        const joined = new Date(session.user.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
        
        if (profile) {
          setUserData({
            name: profile.full_name || 'User',
            username: profile.username || session.user.email?.split('@')[0] || 'user',
            email: session.user.email || '',
            bio: profile.bio || '',
            location: profile.location || 'Indonesia',
            phone: profile.phone || '',
            website: profile.website || '',
            joinedDate: joined,
            avatarUrl: profile.avatar_url || null,
          });
        }
      }
    });

    fetchUser();

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF9F0] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#FF5C1A] animate-spin mb-3" />
        <p className="text-sm font-bold text-gray-400">Memuat profil...</p>
      </div>
    );
  }

  const initials = userData.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  const infoItems = [
    { icon: Mail, label: 'Email', value: userData.email },
    { icon: Phone, label: 'Telepon', value: userData.phone || '—' },
    { icon: MapPin, label: 'Lokasi', value: userData.location || '—' },
    { icon: Globe, label: 'Website', value: userData.website || '—' },
    { icon: Calendar, label: 'Bergabung', value: userData.joinedDate },
  ];

  const stats = [
    { icon: BookOpen, label: 'Franchise Disimpan', value: '—' },
    { icon: BarChart2, label: 'Analisis BEP', value: '—' },
    { icon: Star, label: 'Ulasan Ditulis', value: '—' },
  ];

  return (
    <div className="min-h-screen bg-[#FFF9F0] font-jakarta">
      {/* Hero Banner */}
      <div className="relative h-56 sm:h-72 bg-[#111] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#111] to-[#0a0a0a]" />
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#FF5C1A]/20 rounded-full blur-[100px]" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-orange-400/10 rounded-full blur-[80px]" />
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 pb-20 relative z-10">
        {/* Profile Card */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="bg-white rounded-[2.5rem] shadow-[0_32px_80px_rgba(0,0,0,0.08)] border border-black/5 overflow-hidden">
            {/* Top section with avatar */}
            <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-end gap-6 border-b border-gray-100/80">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-[1.75rem] bg-gradient-to-br from-[#FF5C1A] to-[#FFAB48] shadow-[0_16px_40px_rgba(255,92,26,0.35)] border-4 border-white overflow-hidden flex items-center justify-center text-white text-3xl font-black font-syne">
                  {userData.avatarUrl
                    ? <img src={userData.avatarUrl} alt={userData.name} className="w-full h-full object-cover" />
                    : initials}
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 border-2 border-white rounded-full shadow" />
              </div>

              {/* Name & Actions */}
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-[#111] font-syne tracking-tight">{userData.name}</h1>
                  <p className="text-[#FF5C1A] font-bold text-sm mt-0.5">@{userData.username}</p>
                  {(userData.location) && (
                    <div className="flex items-center gap-1.5 mt-3 text-gray-400 text-xs font-medium">
                      <MapPin className="w-3.5 h-3.5" />
                      {userData.location}
                    </div>
                  )}
                </div>
                <div className="flex gap-3">
                  <Link href="/profile/edit"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#FF5C1A] text-white font-bold text-sm shadow-[0_8px_20px_rgba(255,92,26,0.3)] hover:bg-[#e04710] hover:-translate-y-0.5 transition-all">
                    <Edit3 className="w-4 h-4" />
                    Edit Profil
                  </Link>
                  <Link href="/profile/pengaturan"
                    className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-[#111] transition-all">
                    <Settings className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Bio */}
            {userData.bio && (
              <div className="px-6 sm:px-8 py-5 border-b border-gray-100/80 flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-[#FF5C1A]" />
                </div>
                <p className="text-gray-600 text-sm leading-relaxed font-medium pt-1">{userData.bio}</p>
              </div>
            )}

            {/* Stats Row */}
            <div className="grid grid-cols-3 divide-x divide-gray-100/80">
              {stats.map((s, i) => (
                <div key={i} className="p-5 sm:p-6 text-center group hover:bg-orange-50/30 transition-colors">
                  <s.icon className="w-5 h-5 mx-auto mb-2 text-gray-300 group-hover:text-[#FF5C1A] transition-colors" />
                  <p className="text-xl sm:text-2xl font-black text-[#111] font-syne">{s.value}</p>
                  <p className="text-[0.6rem] sm:text-[0.65rem] text-gray-400 font-bold uppercase tracking-wider mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Info Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }}
          className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {infoItems.map((item, i) => (
            <div key={i} className="bg-white rounded-[1.75rem] p-5 border border-black/5 shadow-[0_8px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.07)] transition-all hover:-translate-y-0.5 group">
              <div className="w-10 h-10 rounded-2xl bg-gray-50 group-hover:bg-[#FF5C1A]/8 flex items-center justify-center mb-3 transition-colors">
                <item.icon className="w-4 h-4 text-gray-400 group-hover:text-[#FF5C1A] transition-colors" />
              </div>
              <p className="text-[0.6rem] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">{item.label}</p>
              <p className="text-sm font-bold text-[#111] truncate">{item.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Dark CTA Strip */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="mt-6 bg-[#111] rounded-[2rem] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#FF5C1A]/10 rounded-full blur-3xl" />
          <div className="relative text-center sm:text-left">
            <p className="text-white font-black text-lg sm:text-xl font-syne">Lengkapi Profil Anda</p>
            <p className="text-white/40 text-sm mt-1 font-medium">Tambahkan nomor telepon, website, dan bio untuk mendapatkan akses penuh.</p>
          </div>
          <Link href="/profile/edit"
            className="relative flex-shrink-0 bg-[#FF5C1A] text-white font-bold px-6 py-3 rounded-2xl text-sm shadow-[0_8px_24px_rgba(255,92,26,0.3)] hover:bg-[#e04710] hover:-translate-y-0.5 transition-all">
            Perbarui Sekarang →
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default ProfilePage;
