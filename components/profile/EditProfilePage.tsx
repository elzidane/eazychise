"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, FileText, ChevronLeft, Loader2, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';

function EditProfilePage() {
  const supabase = createClient();
  
  const [loading, setLoading] = useState(true);
  const [nama, setNama] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setNama(user.user_metadata?.full_name || '');
          setUsername(user.user_metadata?.username || user.email?.split('@')[0] || '');
          setBio(user.user_metadata?.bio || '');
          setEmail(user.email || '');
          setPreviewUrl(user.user_metadata?.avatar_url || null);
        }
      } catch (err) {
        console.error('Gagal memuat data profil', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { error } = await supabase.auth.updateUser({
        data: { 
          full_name: nama,
          username: username,
          bio: bio
        }
      });

      if (error) throw error;

      alert('Profil berhasil diperbarui!');
      router.push('/profile');
      router.refresh();
    } catch (error: any) {
      alert('Gagal memperbarui profil: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFoto(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF9F0] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#FF5C1A] animate-spin mb-4" />
        <p className="text-sm font-bold text-gray-400">Memuat Informasi...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9F0] pt-28 pb-12 sm:pt-32 px-4 sm:px-6 lg:px-8 font-jakarta">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        {/* Header */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link 
              href="/profile" 
              className="w-10 h-10 rounded-2xl bg-white border border-black/5 flex items-center justify-center text-gray-500 hover:text-[#FF5C1A] hover:border-[#FF5C1A]/20 transition-all shadow-sm flex-shrink-0"
            >
              <ChevronLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-black text-[#111] font-syne tracking-tight">Informasi Pribadi</h1>
              <p className="text-xs text-gray-500 font-medium tracking-wide">Detail data akun yang terdaftar di sistem</p>
            </div>
          </div>
          <div className="w-fit flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-2xl text-[0.7rem] font-bold uppercase tracking-wider border border-blue-100">
            <ShieldCheck className="w-3.5 h-3.5" />
            Data Terlindungi
          </div>
        </div>

        <div className="space-y-6">
          {/* Profile Card */}
          <div className="bg-white p-8 rounded-[3rem] border border-black/5 shadow-[0_20px_50px_rgba(0,0,0,0.03)] flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-[#FF5C1A] to-[#FF8C42] flex items-center justify-center text-white text-4xl font-black shadow-[0_20px_50px_rgba(255,92,26,0.2)] overflow-hidden border-4 border-white">
              {previewUrl ? (
                <img src={previewUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                nama.charAt(0).toUpperCase()
              )}
            </div>
            <h2 className="mt-6 text-2xl font-black text-[#111] font-syne">{nama || 'User'}</h2>
            <p className="text-sm text-[#FF5C1A] font-bold tracking-widest mt-1">@{username}</p>
          </div>

          {/* Details Grid */}
          <div className="bg-white p-8 rounded-[3rem] border border-black/5 shadow-[0_20px_50px_rgba(0,0,0,0.03)] space-y-8">
            {/* Full Name */}
            <div className="flex items-start gap-6 group">
              <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#FF5C1A]/5 group-hover:text-[#FF5C1A] transition-colors flex-shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div className="border-b border-gray-50 pb-4 flex-1">
                <p className="text-[0.65rem] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Nama Lengkap</p>
                <p className="text-base font-bold text-[#111]">{nama || '-'}</p>
              </div>
            </div>

            {/* Username */}
            <div className="flex items-start gap-6 group">
              <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#FF5C1A]/5 group-hover:text-[#FF5C1A] transition-colors flex-shrink-0">
                <div className="font-black text-lg">@</div>
              </div>
              <div className="border-b border-gray-50 pb-4 flex-1">
                <p className="text-[0.65rem] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Username</p>
                <p className="text-base font-bold text-[#111]">{username || '-'}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-6 group">
              <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#FF5C1A]/5 group-hover:text-[#FF5C1A] transition-colors flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="border-b border-gray-50 pb-4 flex-1">
                <p className="text-[0.65rem] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Email Kemitraan</p>
                <p className="text-base font-bold text-[#111]">{email}</p>
              </div>
            </div>

            {/* Bio */}
            <div className="flex items-start gap-6 group">
              <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#FF5C1A]/5 group-hover:text-[#FF5C1A] transition-colors flex-shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-[0.65rem] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Bio / Deskripsi</p>
                <p className="text-sm font-medium text-gray-600 leading-relaxed italic">
                  {bio || 'Pengguna belum menambahkan biografi.'}
                </p>
              </div>
            </div>
          </div>

          {/* Notice */}
          <div className="bg-[#111] p-6 rounded-[2.5rem] text-center">
            <p className="text-[0.65rem] text-white/50 font-medium leading-relaxed">
              Informasi ini bersifat rahasia dan hanya dapat diakses oleh pemilik akun. Hubungi pusat bantuan jika Anda menemukan kesalahan data.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default EditProfilePage;
