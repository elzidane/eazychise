"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User as UserIcon, Search, Heart, Clock, LogOut, ArrowRight, 
  Bookmark, TrendingUp, Coffee, ChevronRight, Star, Settings, Eye, X, Download, Edit, Plus, Image as ImageIcon
} from "lucide-react";
import { getUser, logout, User, removeSavedFranchise } from "@/lib/auth";
import { FRANCHISE_DATA } from "@/lib/franchise-data";
import { generateBrandReportPDF } from "@/lib/pdf-generator";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBrandDetails, setShowBrandDetails] = useState(false);
  const [showBrandForm, setShowBrandForm] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');

  const handleDownloadReport = () => {
    const stats = {
      views: "1,240",
      leads: "45",
      conversion: "3.6",
      rating: "4.8",
      category: "Minuman / Coffee Shop",
      traffic: { organic: 65, ai: 35 },
      recentLeads: [
        { name: "Budi Santoso", date: "Hari ini, 10:45", status: "Dihubungi" },
        { name: "Rina Kartika", date: "Kemarin, 14:20", status: "Baru" },
        { name: "Andi Wijaya", date: "4 Mei 2026", status: "Follow Up" }
      ]
    };
    generateBrandReportPDF("Kopi Nusantara", stats);
  };

  useEffect(() => {
    const currentUser = getUser();
    if (!currentUser) {
      router.replace("/masuk");
      return;
    }
    setUser(currentUser);
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleRemoveSaved = (name: string) => {
    removeSavedFranchise(name);
    setUser(getUser());
  };

  if (loading || !user) {
    return (
      <main className="min-h-screen bg-[#FFF9F0] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 border-[#FF5C1A]/20 border-t-[#FF5C1A] rounded-full animate-spin" />
          <p className="text-sm text-[#888] font-medium">Memuat dashboard...</p>
        </div>
      </main>
    );
  }

  const savedFranchises = FRANCHISE_DATA.filter(f => 
    user.savedFranchises.includes(f.name)
  );

  const recommendedFranchises = FRANCHISE_DATA.slice(0, 4);

  return (
    <main className="min-h-screen bg-[#FFF9F0] pt-28 pb-16 px-[5%]">
      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12"
        >
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF5C1A] to-[#FF8C42] flex items-center justify-center text-white text-2xl font-bold shadow-[0_8px_24px_rgba(255,92,26,0.3)]">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="font-syne font-extrabold text-2xl text-[#111] tracking-tight">
                Halo, {user.name.split(" ")[0]}!
              </h1>
              <p className="text-[#888] text-sm font-medium mt-0.5">
                {user.role === "franchisee" ? "Calon Franchisee" : "Pemilik Brand"} • {user.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user.role === "franchisee" ? (
              <Link
                href="/franchise"
                className="flex items-center gap-2 bg-[#FF5C1A] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-[0_6px_20px_rgba(255,92,26,0.3)] hover:bg-[#e04710] hover:-translate-y-0.5 transition-all"
              >
                <Search className="w-4 h-4" />
                Cari Franchise
              </Link>
            ) : null}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 border border-black/10 text-[#777] px-5 py-3 rounded-xl font-semibold text-sm hover:border-red-300 hover:text-red-500 hover:bg-red-50 transition-all"
            >
              <LogOut className="w-4 h-4" />
              Keluar
            </button>
          </div>
        </motion.div>

        {/* ── Stats Cards ── */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
        >
          {user.role === "franchisee" ? [
            { icon: Bookmark, label: "Franchise Disimpan", value: user.savedFranchises.length.toString(), color: "#FF5C1A" },
            { icon: Clock, label: "Riwayat Pencarian", value: user.searchHistory.length.toString(), color: "#7C3AED" },
            { icon: TrendingUp, label: "Franchise Dilihat", value: "12", color: "#1B8C5A" },
            { icon: Coffee, label: "Franchise Tersedia", value: FRANCHISE_DATA.length.toString(), color: "#FFCF40" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl p-5 border border-black/5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all"
            >
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ background: `${stat.color}15` }}
              >
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <p className="font-syne font-extrabold text-2xl text-[#111]">{stat.value}</p>
              <p className="text-[0.72rem] text-[#999] font-semibold uppercase tracking-wider mt-1">{stat.label}</p>
            </div>
          )) : [
            { icon: Eye, label: "Brand Dilihat", value: "1,240", color: "#7C3AED" },
            { icon: UserIcon, label: "Total Leads", value: "48", color: "#FF5C1A" },
            { icon: TrendingUp, label: "Tingkat Konversi", value: "3.8%", color: "#1B8C5A" },
            { icon: Star, label: "Rating Rata-rata", value: "4.8", color: "#FFCF40" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl p-5 border border-black/5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all"
            >
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ background: `${stat.color}15` }}
              >
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <p className="font-syne font-extrabold text-2xl text-[#111]">{stat.value}</p>
              <p className="text-[0.72rem] text-[#999] font-semibold uppercase tracking-wider mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {user.role === "franchisee" ? (
          <div className="grid lg:grid-cols-[1fr_0.8fr] gap-8">
            {/* ── Saved Franchises ── */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl p-7 border border-black/5"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-syne font-extrabold text-lg text-[#111] flex items-center gap-2">
                  <Heart className="w-5 h-5 text-[#FF5C1A]" />
                  Franchise Disimpan
                </h2>
                <Link href="/franchise" className="text-sm text-[#FF5C1A] font-bold hover:underline flex items-center gap-1">
                  Lihat semua <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {savedFranchises.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <Bookmark className="w-8 h-8 text-gray-300" />
                  </div>
                  <p className="text-[#999] font-medium text-sm">Belum ada franchise yang disimpan</p>
                  <Link
                    href="/franchise"
                    className="inline-flex items-center gap-2 mt-4 text-[#FF5C1A] text-sm font-bold hover:underline"
                  >
                    Mulai jelajahi franchise <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {savedFranchises.map((f) => (
                    <div key={f.name} className="flex items-center gap-4 p-3 rounded-2xl bg-[#F8F8F6] group hover:bg-[#FFF3E5] transition-colors">
                      <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 relative">
                        <img src={f.img} alt={f.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm text-[#111] truncate">{f.name}</p>
                        <p className="text-xs text-[#999]">{f.invest} • {f.cat}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-xs">
                          <Star className="w-3 h-3 fill-[#FFCF40] text-[#FFCF40]" />
                          <span className="font-bold text-[#111]">{f.rating}</span>
                        </div>
                        <button
                          onClick={() => handleRemoveSaved(f.name)}
                          className="text-[#ccc] hover:text-red-400 transition-colors p-1"
                          title="Hapus"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* ── Right Column ── */}
            <div className="space-y-6">
              {/* Search History */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-3xl p-7 border border-black/5"
              >
                <h2 className="font-syne font-extrabold text-lg text-[#111] flex items-center gap-2 mb-6">
                  <Clock className="w-5 h-5 text-[#7C3AED]" />
                  Riwayat Pencarian
                </h2>

                {user.searchHistory.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-14 h-14 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-4">
                      <Search className="w-6 h-6 text-gray-300" />
                    </div>
                    <p className="text-[#999] font-medium text-sm">Belum ada riwayat pencarian</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {user.searchHistory.slice(0, 5).map((query, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[#F8F8F6] text-sm">
                        <Search className="w-4 h-4 text-[#bbb] flex-shrink-0" />
                        <span className="text-[#555] truncate">{query}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Recommended */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-[#111] to-[#1a1a1a] rounded-3xl p-7 text-white"
              >
                <h2 className="font-syne font-extrabold text-lg flex items-center gap-2 mb-5">
                  <Star className="w-5 h-5 text-[#FFCF40]" />
                  Rekomendasi Untukmu
                </h2>
                <div className="space-y-3">
                  {recommendedFranchises.map((f) => (
                    <Link
                      key={f.name}
                      href={`/franchise/${f.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={f.img} alt={f.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm truncate">{f.name}</p>
                        <p className="text-white/40 text-xs">{f.invest} • {f.roi}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_0.8fr] gap-8">
            {/* ── Brand Management ── */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl p-7 border border-black/5"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-syne font-extrabold text-lg text-[#111] flex items-center gap-2">
                  <Coffee className="w-5 h-5 text-[#FF5C1A]" />
                  Manajemen Brand Saya
                </h2>
                <button 
                  onClick={() => { setFormMode('add'); setShowBrandForm(true); }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FF5C1A]/10 text-[#FF5C1A] font-bold text-xs hover:bg-[#FF5C1A] hover:text-white transition-all"
                >
                  <Plus className="w-3.5 h-3.5" /> Tambah Brand
                </button>
              </div>

              <div className="space-y-3">
                {/* Dummy owned franchise */}
                <div className="flex items-center gap-4 p-4 rounded-2xl border border-black/5 hover:border-[#FF5C1A]/30 transition-colors">
                  <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 relative">
                    <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80" alt="Brand Ku" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-[#111] truncate">Kopi Nusantara (Mockup)</p>
                    <p className="text-xs text-[#999]">Aktif • Dilihat 1,240 kali</p>
                  </div>
                  <button 
                    onClick={() => setShowBrandDetails(true)}
                    className="flex items-center justify-center p-2 rounded-xl bg-[#F8F8F6] text-[#555] hover:bg-[#111] hover:text-white transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* ── Leads Analytics ── */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl p-7 border border-black/5"
            >
              <h2 className="font-syne font-extrabold text-lg text-[#111] flex items-center gap-2 mb-6">
                <UserIcon className="w-5 h-5 text-[#1B8C5A]" />
                Leads Terbaru
              </h2>

              <div className="space-y-3">
                {[
                  { name: "Budi Santoso", date: "Hari ini, 10:45", status: "Dihubungi" },
                  { name: "Rina Kartika", date: "Kemarin, 14:20", status: "Baru" },
                  { name: "Andi Wijaya", date: "4 Mei 2026", status: "Follow Up" },
                ].map((lead, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[#F8F8F6] text-sm">
                    <div>
                      <p className="font-bold text-[#333]">{lead.name}</p>
                      <p className="text-xs text-[#999]">{lead.date}</p>
                    </div>
                    <span className={`text-[0.65rem] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${
                      lead.status === "Baru" ? "bg-green-100 text-green-700" : 
                      lead.status === "Dihubungi" ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"
                    }`}>
                      {lead.status}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* ── Brand Details Modal ── */}
      <AnimatePresence>
        {showBrandDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBrandDetails(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-black/5 flex items-center justify-between bg-white relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                    <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80" alt="Brand Ku" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-syne font-bold text-xl text-[#111] leading-none mb-1">Kopi Nusantara</h3>
                    <span className="inline-block px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[0.65rem] font-bold uppercase tracking-wider">Aktif</span>
                  </div>
                </div>
                <button 
                  onClick={() => setShowBrandDetails(false)}
                  className="p-2 text-[#999] hover:text-[#111] hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 max-h-[80vh] overflow-y-auto">
                <h4 className="font-syne font-bold text-lg mb-4">Statistik Performa (Bulan Ini)</h4>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                  <div className="bg-[#F8F8F6] p-4 rounded-2xl border border-black/5">
                    <p className="text-xs text-[#777] font-semibold uppercase mb-1">Dilihat</p>
                    <p className="text-2xl font-bold text-[#111]">1,240</p>
                    <p className="text-xs text-green-600 font-bold flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3" /> +12%
                    </p>
                  </div>
                  <div className="bg-[#F8F8F6] p-4 rounded-2xl border border-black/5">
                    <p className="text-xs text-[#777] font-semibold uppercase mb-1">Total Leads</p>
                    <p className="text-2xl font-bold text-[#111]">45</p>
                    <p className="text-xs text-green-600 font-bold flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3" /> +5%
                    </p>
                  </div>
                  <div className="bg-[#F8F8F6] p-4 rounded-2xl border border-black/5">
                    <p className="text-xs text-[#777] font-semibold uppercase mb-1">Konversi</p>
                    <p className="text-2xl font-bold text-[#111]">3.6%</p>
                    <p className="text-xs text-[#999] font-medium mt-1">Rata-rata</p>
                  </div>
                  <div className="bg-[#F8F8F6] p-4 rounded-2xl border border-black/5">
                    <p className="text-xs text-[#777] font-semibold uppercase mb-1">Rating</p>
                    <p className="text-2xl font-bold text-[#111] flex items-baseline gap-1">
                      4.8 <Star className="w-4 h-4 fill-[#FFCF40] text-[#FFCF40]" />
                    </p>
                    <p className="text-xs text-[#999] font-medium mt-1">Dari 120 ulasan</p>
                  </div>
                </div>

                <h4 className="font-syne font-bold text-lg mb-4">Sumber Traffic</h4>
                <div className="mb-6">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="font-semibold text-[#555]">Pencarian Organik</span>
                    <span className="font-bold">65%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                    <div className="bg-[#FF5C1A] h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="font-semibold text-[#555]">Rekomendasi AI</span>
                    <span className="font-bold">35%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-[#7C3AED] h-2 rounded-full" style={{ width: '35%' }}></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  <button 
                    onClick={() => { setFormMode('edit'); setShowBrandForm(true); setShowBrandDetails(false); }}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-black/5 hover:border-black/10 font-bold text-sm text-[#333] transition-colors"
                  >
                    <Edit className="w-4 h-4" /> Edit Profil Brand
                  </button>
                  <button 
                    onClick={handleDownloadReport}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#111] hover:bg-[#333] font-bold text-sm text-white transition-colors shadow-lg"
                  >
                    <Download className="w-4 h-4" /> Unduh Laporan
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Brand Form Modal (Add/Edit) ── */}
      <AnimatePresence>
        {showBrandForm && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBrandForm(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="p-6 border-b border-black/5 flex items-center justify-between bg-white relative z-10">
                <h3 className="font-syne font-bold text-xl text-[#111]">
                  {formMode === 'add' ? 'Tambah Brand Baru' : 'Edit Profil Brand'}
                </h3>
                <button 
                  onClick={() => setShowBrandForm(false)}
                  className="p-2 text-[#999] hover:text-[#111] hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-8 max-h-[80vh] overflow-y-auto">
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setShowBrandForm(false); }}>
                  {/* Image Upload Mockup */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#999] uppercase tracking-wider">Foto Brand</label>
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-2xl bg-[#F8F8F6] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-[#bbb] group hover:border-[#FF5C1A] hover:text-[#FF5C1A] transition-all cursor-pointer">
                        <ImageIcon className="w-6 h-6 mb-1" />
                        <span className="text-[10px] font-bold">Upload</span>
                      </div>
                      <p className="text-xs text-[#999] max-w-[200px]">Format: JPG, PNG. Maksimal 2MB. Gunakan foto berkualitas tinggi.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#999] uppercase tracking-wider">Nama Brand</label>
                      <input 
                        type="text" 
                        placeholder="Contoh: Kopi Nusantara" 
                        defaultValue={formMode === 'edit' ? 'Kopi Nusantara' : ''}
                        className="w-full px-4 py-3 rounded-xl bg-[#F8F8F6] border border-transparent focus:border-[#FF5C1A] focus:bg-white outline-none transition-all text-sm font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#999] uppercase tracking-wider">Kategori</label>
                      <select className="w-full px-4 py-3 rounded-xl bg-[#F8F8F6] border border-transparent focus:border-[#FF5C1A] focus:bg-white outline-none transition-all text-sm font-medium appearance-none">
                        <option>Minuman / Coffee Shop</option>
                        <option>Makanan Berat</option>
                        <option>Camilan / Snack</option>
                        <option>Jasa / Service</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#999] uppercase tracking-wider">Modal Investasi (Rp)</label>
                      <input 
                        type="text" 
                        placeholder="Contoh: 50 Juta - 100 Juta" 
                        defaultValue={formMode === 'edit' ? '50 Juta - 100 Juta' : ''}
                        className="w-full px-4 py-3 rounded-xl bg-[#F8F8F6] border border-transparent focus:border-[#FF5C1A] focus:bg-white outline-none transition-all text-sm font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#999] uppercase tracking-wider">Lokasi Pusat</label>
                      <input 
                        type="text" 
                        placeholder="Contoh: Jakarta" 
                        defaultValue={formMode === 'edit' ? 'Jakarta' : ''}
                        className="w-full px-4 py-3 rounded-xl bg-[#F8F8F6] border border-transparent focus:border-[#FF5C1A] focus:bg-white outline-none transition-all text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#999] uppercase tracking-wider">Deskripsi Brand</label>
                    <textarea 
                      rows={3}
                      placeholder="Jelaskan keunggulan brand Anda..." 
                      className="w-full px-4 py-3 rounded-xl bg-[#F8F8F6] border border-transparent focus:border-[#FF5C1A] focus:bg-white outline-none transition-all text-sm font-medium resize-none"
                    ></textarea>
                  </div>

                  <div className="pt-4 flex items-center gap-3">
                    <button 
                      type="button"
                      onClick={() => setShowBrandForm(false)}
                      className="flex-1 py-3.5 rounded-xl border-2 border-black/5 hover:border-black/10 font-bold text-sm text-[#333] transition-colors"
                    >
                      Batal
                    </button>
                    <button 
                      type="submit"
                      className="flex-[2] py-3.5 rounded-xl bg-[#FF5C1A] hover:bg-[#E04710] text-white font-bold text-sm shadow-[0_8px_20px_rgba(255,92,26,0.25)] transition-all"
                    >
                      {formMode === 'add' ? 'Publikasikan Brand' : 'Simpan Perubahan'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
