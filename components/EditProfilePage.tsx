import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, User, Mail, FileText, ChevronLeft, Save } from 'lucide-react';
import Link from 'next/link';

function EditProfilePage() {
  const [nama, setNama] = useState('John Doe');
  const [username, setUsername] = useState('johndoe');
  const [bio, setBio] = useState('ini adalah bio');
  const [email, setEmail] = useState('johndoe@example.com');
  const [foto, setFoto] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simpan data ke database atau API
    console.log({ nama, username, bio, email, foto });
    alert('Profil berhasil diperbarui!');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFoto(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F0] py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <div className="mb-8 flex items-center justify-between">
          <Link href="/profile" className="flex items-center gap-2 text-gray-500 hover:text-[#FF5C1A] transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium text-sm">Kembali ke Profil</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 font-syne">Edit Profil</h1>
        </div>

        <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-black/5 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Profile Picture Upload */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative group">
                <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-[#FF5C1A] to-[#FF8C42] flex items-center justify-center text-white text-4xl font-bold shadow-xl overflow-hidden relative border-4 border-white">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    nama.charAt(0).toUpperCase()
                  )}
                </div>
                <label className="absolute bottom-[-10px] right-[-10px] bg-white p-2.5 rounded-2xl shadow-lg border border-black/5 cursor-pointer hover:bg-[#FF5C1A] hover:text-white transition-all group-hover:scale-110">
                  <Camera className="w-5 h-5" />
                  <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                </label>
              </div>
              <p className="text-sm text-gray-500 font-medium">Ubah Foto Profil</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nama */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 ml-1">
                  <User className="w-4 h-4 text-[#FF5C1A]" />
                  Nama Lengkap
                </label>
                <input 
                  type="text" 
                  value={nama} 
                  onChange={(e) => setNama(e.target.value)} 
                  className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-[#FF5C1A] focus:ring-4 focus:ring-[#FF5C1A]/10 outline-none transition-all text-sm font-medium"
                  placeholder="John Doe"
                  required
                />
              </div>

              {/* Username */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 ml-1">
                  <span className="text-[#FF5C1A] font-bold">@</span>
                  Username
                </label>
                <input 
                  type="text" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-[#FF5C1A] focus:ring-4 focus:ring-[#FF5C1A]/10 outline-none transition-all text-sm font-medium"
                  placeholder="johndoe"
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 ml-1">
                  <Mail className="w-4 h-4 text-[#FF5C1A]" />
                  Alamat Email
                </label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-[#FF5C1A] focus:ring-4 focus:ring-[#FF5C1A]/10 outline-none transition-all text-sm font-medium"
                  placeholder="johndoe@example.com"
                  required
                />
                <p className="text-[10px] text-gray-400 ml-1 italic">* Pastikan email Anda aktif untuk menerima notifikasi</p>
              </div>

              {/* Bio */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2 ml-1">
                  <FileText className="w-4 h-4 text-[#FF5C1A]" />
                  Bio
                </label>
                <textarea 
                  value={bio} 
                  onChange={(e) => setBio(e.target.value)} 
                  rows={4}
                  className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-[#FF5C1A] focus:ring-4 focus:ring-[#FF5C1A]/10 outline-none transition-all text-sm font-medium resize-none"
                  placeholder="Ceritakan sedikit tentang Anda..."
                />
              </div>
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                className="w-full bg-[#FF5C1A] text-white py-4 rounded-2xl font-bold shadow-[0_10px_25px_rgba(255,92,26,0.3)] hover:bg-[#e04710] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default EditProfilePage;
