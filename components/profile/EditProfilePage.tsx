"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, User, Mail, FileText, ChevronLeft, Save, Loader2, Phone, MapPin, Globe, Check } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { syncSessionWithLocal } from '@/lib/auth';

function EditProfilePage() {
  const supabase = createClient();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [nama, setNama] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');
  const [foto, setFoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setEmail(user.email || '');
          const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
          if (profile) {
            setNama(profile.full_name || '');
            setUsername(profile.username || '');
            setBio(profile.bio || '');
            setPhone(profile.phone || '');
            setLocation(profile.location || '');
            setWebsite(profile.website || '');
            if (profile.avatar_url) setPreviewUrl(profile.avatar_url);
          } else {
            setNama(user.user_metadata?.full_name || '');
            setUsername(user.user_metadata?.username || user.email?.split('@')[0] || '');
            setBio(user.user_metadata?.bio || '');
          }
        }
      } catch (err) {
        console.error('Gagal memuat profil', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [supabase]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFoto(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Tidak ada sesi pengguna');

      let avatarUrl = previewUrl;

      // 1. Upload photo if new file selected
      if (foto) {
        const fileExt = foto.name.split('.').pop();
        const filePath = `${user.id}/${user.id}-${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, foto, { upsert: true });
        if (uploadError) throw uploadError;
        const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(filePath);
        avatarUrl = publicUrl;
      }

      // 2. Upsert profiles table
      const { error: profileError } = await supabase.from('profiles').upsert({
        id: user.id,
        full_name: nama,
        username: username,
        bio: bio,
        phone: phone,
        location: location,
        website: website,
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
      });
      if (profileError) throw profileError;

      // 3. Sync auth metadata
      const { data: { user: updatedUser }, error: updateError } = await supabase.auth.updateUser({ 
        data: { full_name: nama, username, bio, avatar_url: avatarUrl } 
      });
      
      if (updateError) throw updateError;

      // 4. Sync with local storage for other components
      if (updatedUser) {
        syncSessionWithLocal({
          name: nama,
          email: user.email,
          image: avatarUrl
        });
      }

      setSaved(true);
      setTimeout(() => {
        router.refresh();
        router.push('/profile');
      }, 1200);
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF9F0] flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-[#FF5C1A] animate-spin mb-3" />
        <p className="text-sm font-bold text-gray-400">Memuat data profil...</p>
      </div>
    );
  }

  const initials = nama.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || '?';

  const fields = [
    {
      label: 'Nama Lengkap', icon: User, value: nama, setter: setNama,
      type: 'text', placeholder: 'Nama lengkap Anda', required: true
    },
    {
      label: 'Username', icon: () => <span className="font-black text-base leading-none">@</span>,
      value: username, setter: setUsername, type: 'text', placeholder: 'username_anda', required: true
    },
    {
      label: 'Nomor Telepon', icon: Phone, value: phone, setter: setPhone,
      type: 'tel', placeholder: '08xx-xxxx-xxxx', required: false
    },
    {
      label: 'Lokasi', icon: MapPin, value: location, setter: setLocation,
      type: 'text', placeholder: 'Jakarta, Indonesia', required: false
    },
    {
      label: 'Website / LinkedIn', icon: Globe, value: website, setter: setWebsite,
      type: 'url', placeholder: 'https://', required: false
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFF9F0] font-jakarta pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/profile"
            className="w-11 h-11 rounded-2xl bg-white border border-black/5 shadow-sm flex items-center justify-center text-gray-500 hover:text-[#FF5C1A] hover:border-[#FF5C1A]/30 transition-all flex-shrink-0">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-[#111] font-syne tracking-tight">Edit Profil</h1>
            <p className="text-xs text-gray-400 font-medium mt-0.5">Perbarui informasi publik Anda</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Avatar Uploader */}
          <div className="bg-white rounded-[2.5rem] border border-black/5 shadow-[0_8px_32px_rgba(0,0,0,0.05)] p-8 flex flex-col items-center gap-4">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative cursor-pointer group"
            >
              <div className="w-28 h-28 rounded-[1.75rem] bg-gradient-to-br from-[#FF5C1A] to-[#FFAB48] overflow-hidden flex items-center justify-center text-white text-3xl font-black font-syne shadow-[0_12px_30px_rgba(255,92,26,0.3)] border-4 border-white transition-transform group-hover:scale-105">
                {previewUrl
                  ? <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                  : initials}
              </div>
              <div className="absolute -bottom-2 -right-2 w-9 h-9 bg-[#FF5C1A] rounded-2xl shadow-lg border-2 border-white flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                <Camera className="w-4 h-4" />
              </div>
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            <div className="text-center">
              <p className="text-sm font-bold text-[#111]">{nama || 'Nama Anda'}</p>
              <p className="text-xs text-gray-400 mt-0.5">Klik foto untuk mengubah • JPG, PNG, max 5MB</p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="bg-white rounded-[2.5rem] border border-black/5 shadow-[0_8px_32px_rgba(0,0,0,0.05)] p-6 sm:p-8 space-y-6">
            <p className="text-[0.65rem] font-black text-gray-400 uppercase tracking-[0.2em]">Informasi Pribadi</p>

            {fields.map((field, i) => {
              const IconComp = field.icon;
              return (
                <div key={i} className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 flex items-center gap-1.5 ml-1">
                    {field.label}
                    {field.required && <span className="text-[#FF5C1A]">*</span>}
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-400">
                      <IconComp />
                    </div>
                    <input
                      type={field.type}
                      value={field.value}
                      onChange={e => field.setter(e.target.value)}
                      placeholder={field.placeholder}
                      required={field.required}
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 border border-transparent text-sm font-medium text-[#111] placeholder:text-gray-300 focus:outline-none focus:bg-white focus:border-[#FF5C1A] focus:ring-4 focus:ring-[#FF5C1A]/10 transition-all"
                    />
                  </div>
                </div>
              );
            })}

            {/* Email (read-only) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 flex items-center gap-1.5 ml-1">
                <span>Email</span>
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Mail className="w-4 h-4 text-gray-300" />
                </div>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-100 border border-transparent text-sm font-medium text-gray-400 cursor-not-allowed"
                />
              </div>
              <p className="text-[10px] text-gray-400 ml-1">Email tidak dapat diubah</p>
            </div>

            {/* Bio */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-500 flex items-center gap-1.5 ml-1">
                <span>Bio</span>
              </label>
              <div className="relative">
                <FileText className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
                <textarea
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  rows={4}
                  placeholder="Ceritakan sedikit tentang diri Anda, minat bisnis, atau pengalaman di dunia franchise..."
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 border border-transparent text-sm font-medium text-[#111] placeholder:text-gray-300 focus:outline-none focus:bg-white focus:border-[#FF5C1A] focus:ring-4 focus:ring-[#FF5C1A]/10 transition-all resize-none"
                />
              </div>
              <p className="text-[10px] text-gray-400 text-right mr-1">{bio.length}/300 karakter</p>
            </div>
          </div>

          {/* Error */}
          {error && (
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 text-red-600 text-sm font-medium px-5 py-3.5 rounded-2xl">
              ⚠️ {error}
            </motion.div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={saving || saved}
            className={`w-full py-4 rounded-[1.5rem] font-bold text-base flex items-center justify-center gap-2.5 transition-all shadow-[0_12px_32px_rgba(255,92,26,0.25)] ${
              saved
                ? 'bg-emerald-500 text-white'
                : 'bg-[#FF5C1A] text-white hover:bg-[#e04710] hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0'
            }`}
          >
            {saved ? (
              <><Check className="w-5 h-5" /> Tersimpan! Mengalihkan...</>
            ) : saving ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Menyimpan...</>
            ) : (
              <><Save className="w-5 h-5" /> Simpan Perubahan</>
            )}
          </button>

          <p className="text-center text-[10px] text-gray-400 font-medium">
            Perubahan akan langsung terlihat di halaman profil Anda
          </p>
        </form>
      </motion.div>
    </div>
  );
}

export default EditProfilePage;
