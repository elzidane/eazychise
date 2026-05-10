"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User as UserIcon, Search, Heart, Clock, LogOut, ArrowRight, 
  Bookmark, TrendingUp, Coffee, ChevronRight, Star, Settings, Eye, X, Download, Edit, Plus, Image as ImageIcon,
  Zap, BarChart3, MessageCircle
} from "lucide-react";
import { getUser, logout, User, removeSavedFranchise } from "@/lib/auth";
import { FRANCHISE_DATA } from "@/lib/franchise-data";
import { generateBrandReportPDF } from "@/lib/pdf-generator";
import { formatRupiah, formatJuta, formatAngkaSingkat } from "@/lib/utils/formatRupiah";
import { createClient } from "@/utils/supabase/client";
import DashboardSkeleton from "@/components/DashboardSkeleton";
import LocalBusinessTracker from "@/components/LocalBusinessTracker";

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showBrandDetails, setShowBrandDetails] = useState(false);
  const [showBrandForm, setShowBrandForm] = useState(false);
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [selectedBrandIndex, setSelectedBrandIndex] = useState<number | null>(null);
  
  const [savedFranchises, setSavedFranchises] = useState<any[]>([]);
  const [franchisorBrands, setFranchisorBrands] = useState<any[]>([]);
  const [franchisorLeads, setFranchisorLeads] = useState<any[]>([]);


  const [brandFormData, setBrandFormData] = useState({
    name: "",
    cat: "Minuman / Coffee Shop",
    img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop",
    invest: "",
    location: "",
    desc: ""
  });

  const handleBrandSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (formMode === 'add') {
      // Create new brand in Supabase
      const newBrand = {
        name: brandFormData.name,
        cat: brandFormData.cat,
        cat_key: brandFormData.cat.toLowerCase().replace(/\s+/g, '-'),
        img: brandFormData.img,
        invest_text: brandFormData.invest,
        city: brandFormData.location,
        owner_id: user.id,
        // Default values for missing schema fields
        rating: 0.0,
        invest_num: 0,
        roi: "12 Bulan",
        omzet: "Belum ada data",
        mitra_count: 0
      };

      const { data, error } = await supabase
        .from('franchises')
        .insert(newBrand)
        .select();

      if (error) {
        alert("Gagal menambahkan brand. " + error.message);
        console.error(error);
        return;
      }

      if (data) {
        // Map the city back to location for the UI
        const addedBrand = { ...data[0], location: data[0].city };
        setFranchisorBrands([...franchisorBrands, addedBrand]);
      }
    } else if (selectedBrandIndex !== null) {
      // Update existing brand
      const brandToUpdate = franchisorBrands[selectedBrandIndex];
      const updatedBrand = {
        name: brandFormData.name,
        cat: brandFormData.cat,
        img: brandFormData.img,
        invest_text: brandFormData.invest,
        city: brandFormData.location,
      };

      const { error } = await supabase
        .from('franchises')
        .update(updatedBrand)
        .eq('id', brandToUpdate.id);

      if (error) {
        alert("Gagal mengupdate brand. " + error.message);
        console.error(error);
        return;
      }

      const updated = [...franchisorBrands];
      updated[selectedBrandIndex] = { ...brandToUpdate, ...updatedBrand, location: brandFormData.location };
      setFranchisorBrands(updated);
    }
    setShowBrandForm(false);
    // Reset form
    setBrandFormData({
      name: "",
      cat: "Minuman / Coffee Shop",
      img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop",
      invest: "",
      location: "",
      desc: ""
    });
  };

  const openEditForm = (index: number) => {
    setSelectedBrandIndex(index);
    setBrandFormData(franchisorBrands[index]);
    setFormMode('edit');
    setShowBrandForm(true);
  };

  const openAddForm = () => {
    setBrandFormData({
      name: "",
      cat: "Minuman / Coffee Shop",
      img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop",
      invest: "",
      location: "",
      desc: ""
    });
    setFormMode('add');
    setShowBrandForm(true);
  };

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
    const checkUserAndFetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace("/masuk");
        return;
      }
      
      const role = session.user.user_metadata.role || 'franchisee';
      setUser({
        id: session.user.id,
        name: session.user.user_metadata.full_name || session.user.email,
        email: session.user.email,
        role: role,
        savedFranchises: [],
        searchHistory: []
      } as any);

      if (role === 'franchisee') {
        const { data: saved } = await supabase
          .from('saved_franchises')
          .select('id, franchises(*)');
        if (saved) {
          setSavedFranchises(saved.map((s: any) => ({ ...s.franchises, saved_id: s.id })));
        }
      } else {
        // Get brands owned by this user
        const { data: brands } = await supabase
          .from('franchises')
          .select('*')
          .eq('owner_id', session.user.id);
        if (brands) {
          setFranchisorBrands(brands);
          
          // Fetch leads only for franchises this user owns
          if (brands.length > 0) {
            const brandIds = brands.map((b: any) => b.id);
            const { data: leads } = await supabase
              .from('partnership_requests')
              .select('*, franchises(name)')
              .in('franchise_id', brandIds)
              .order('created_at', { ascending: false });
            if (leads) {
              setFranchisorLeads(leads);
            }
          }
        }
      }

      setLoading(false);
    };

    checkUserAndFetchData();
  }, [router, supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    logout();
    router.push("/");
  };

  const handleRemoveSaved = async (savedId: string) => {
    await supabase.from('saved_franchises').delete().eq('id', savedId);
    setSavedFranchises(prev => prev.filter(f => f.saved_id !== savedId));
  };

  if (loading || !user) {
    return <DashboardSkeleton />;
  }

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

        {/* ── Stats Cards (Franchisee Only) ── */}
        {user.role === "franchisee" && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
          >
            {[
              { icon: Bookmark, label: "Franchise Disimpan", value: savedFranchises.length.toString(), color: "#FF5C1A" },
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
            ))}
          </motion.div>
        )}

        {user.role === "franchisee" ? (
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
            {/* ── Left Column ── */}
            <div className="space-y-8">
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
                            onClick={() => handleRemoveSaved(f.saved_id)}
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

              {/* ── Recommended For You ── */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-3xl p-7 border border-black/5"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-syne font-extrabold text-lg text-[#111] flex items-center gap-2">
                    <Star className="w-5 h-5 text-[#FFCF40] fill-[#FFCF40]" />
                    Rekomendasi Untukmu
                  </h2>
                  <Link href="/franchise" className="text-[0.7rem] font-black uppercase tracking-widest text-[#FF5C1A] hover:opacity-70 transition-all">
                    Lihat Semua
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {recommendedFranchises.map((f) => (
                    <Link
                      key={f.name}
                      href={`/franchise/${f.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="flex flex-col gap-3 p-4 rounded-2xl bg-[#F8F8F6] hover:bg-[#FFF3E5] border border-transparent hover:border-[#FF5C1A]/10 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 relative shadow-sm">
                          <img src={f.img} alt={f.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm text-[#111] truncate">{f.name}</p>
                          <p className="text-[0.6rem] text-[#999] font-bold uppercase tracking-tight">{f.cat}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-black/[0.03]">
                        <span className="text-[0.7rem] font-bold text-[#1B8C5A]">{f.roi} ROI</span>
                        <span className="text-[0.7rem] font-black text-[#111]">{f.invest}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ── Right Column ── */}
            <div className="space-y-6">
              <LocalBusinessTracker />
              
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
            </div>
          </div>
        ) : (
          <>
          {/* ── Franchisor Dashboard ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Left Column: Stats + Leads */}
            <div className="lg:col-span-7 space-y-6">

              {/* Stats Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4"
              >
                {[
                  { label: "Dilihat", value: formatAngkaSingkat(1240 * (franchisorBrands.length || 1)), icon: Eye, color: "#7C3AED" },
                  { label: "Leads Masuk", value: franchisorLeads.length.toString(), icon: UserIcon, color: "#FF5C1A" },
                  { label: "Konversi", value: "3.6%", icon: TrendingUp, color: "#1B8C5A" },
                  { label: "Rating", value: "4.8", icon: Star, color: "#FFCF40" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white rounded-2xl p-5 border border-black/5 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                      <span className="text-[0.6rem] text-[#999] font-bold uppercase tracking-wider">{stat.label}</span>
                    </div>
                    <p className="text-2xl font-bold text-[#111]">{stat.value}</p>
                  </div>
                ))}
              </motion.div>

              {/* Leads Inbox */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden"
              >
                <div className="px-7 py-5 flex items-center justify-between border-b border-black/5">
                  <h2 className="font-syne font-extrabold text-lg text-[#111] flex items-center gap-2">
                    <UserIcon className="w-5 h-5 text-[#FF5C1A]" />
                    Kotak Masuk Leads
                    {franchisorLeads.length > 0 && (
                      <span className="ml-1 text-[0.6rem] font-black bg-[#FF5C1A] text-white px-2 py-0.5 rounded-full">
                        {franchisorLeads.length}
                      </span>
                    )}
                  </h2>
                </div>
                <div className="divide-y divide-black/5">
                  {franchisorLeads.length === 0 ? (
                    <div className="py-12 text-center">
                      <div className="w-14 h-14 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-3">
                        <UserIcon className="w-6 h-6 text-gray-300" />
                      </div>
                      <p className="text-sm font-bold text-[#999]">Belum ada leads yang masuk</p>
                      <p className="text-xs text-[#bbb] mt-1">Leads akan muncul di sini saat calon mitra mengajukan kemitraan</p>
                    </div>
                  ) : (
                    franchisorLeads.slice(0, 8).map((lead: any, i: number) => (
                      <div key={i} className="flex items-center justify-between px-7 py-4 hover:bg-[#FFF9F6] transition-colors group">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF5C1A]/20 to-[#FF8C42]/20 flex items-center justify-center text-[#FF5C1A] font-bold text-sm flex-shrink-0">
                            {lead.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-sm text-[#222]">{lead.name}</p>
                            <p className="text-[0.65rem] text-[#aaa] mt-0.5">
                              {lead.email} · {lead.phone} · {new Date(lead.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </p>
                            {lead.franchises?.name && (
                              <p className="text-[0.6rem] text-[#FF5C1A] font-bold mt-0.5">📌 {lead.franchises.name}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          {lead.location && (
                            <span className="hidden sm:block text-[0.6rem] text-[#999] font-medium bg-gray-50 px-2 py-1 rounded-lg">{lead.location}</span>
                          )}
                          <span className={`text-[0.55rem] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-lg ${
                            lead.status === "Baru" ? "bg-green-100 text-green-700" : 
                            lead.status === "Dihubungi" ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"
                          }`}>
                            {lead.status}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            </div>

            {/* Right Column: Brand List + AI Sidebar */}
            <div className="lg:col-span-5 space-y-6">

              {/* Brand List */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden"
              >
                <div className="px-6 py-5 flex items-center justify-between border-b border-black/5">
                  <h2 className="font-syne font-extrabold text-base text-[#111] flex items-center gap-2">
                    <Coffee className="w-5 h-5 text-[#FF5C1A]" />
                    Brand Saya
                  </h2>
                  <div className="flex items-center gap-2">
                    <button onClick={openAddForm} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FF5C1A] text-white font-bold text-xs hover:bg-[#e04710] transition-all">
                      <Plus className="w-3.5 h-3.5" /> Tambah
                    </button>
                    <button onClick={handleDownloadReport} className="p-2 rounded-xl bg-gray-100 text-[#555] hover:bg-[#111] hover:text-white transition-all" title="Unduh Laporan">
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="divide-y divide-black/5 max-h-72 overflow-y-auto">
                  {franchisorBrands.length === 0 ? (
                    <div className="py-10 text-center">
                      <p className="text-sm font-bold text-[#999]">Belum ada brand</p>
                      <p className="text-xs text-[#bbb] mt-1">Tambahkan brand franchise Anda</p>
                    </div>
                  ) : (
                    franchisorBrands.map((brand: any, index: number) => (
                      <div key={index} className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors">
                        <div className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0">
                          <img src={brand.img} alt={brand.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm text-[#111] truncate">{brand.name}</p>
                          <p className="text-[0.65rem] text-[#999] truncate">{brand.cat}</p>
                        </div>
                        <div className="flex gap-1.5 flex-shrink-0">
                          <button onClick={() => openEditForm(index)} className="p-1.5 rounded-lg bg-gray-100 text-[#777] hover:bg-[#111] hover:text-white transition-all"><Edit className="w-3.5 h-3.5" /></button>
                          <button onClick={() => { setSelectedBrandIndex(index); setShowBrandDetails(true); }} className="p-1.5 rounded-lg bg-gray-100 text-[#777] hover:bg-[#111] hover:text-white transition-all"><ChevronRight className="w-3.5 h-3.5" /></button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>

              {/* AI Insights */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-[#111] rounded-3xl p-7 text-white relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF5C1A] opacity-10 blur-[80px] -mr-20 -mt-20"></div>
                <h2 className="font-syne font-extrabold text-lg mb-5 flex items-center gap-2 relative z-10">
                  <Zap className="w-5 h-5 text-[#FF5C1A]" />
                  Insight AI
                </h2>
                <div className="relative z-10 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <p className="text-[0.6rem] text-white/40 font-bold uppercase mb-1">Sentimen</p>
                      <p className="text-lg font-bold">Positif</p>
                      <p className="text-[0.6rem] text-[#FF5C1A] font-bold">88%</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <p className="text-[0.6rem] text-white/40 font-bold uppercase mb-1">Prediksi</p>
                      <p className="text-lg font-bold">+15.4%</p>
                      <p className="text-[0.6rem] text-green-400 font-bold">Leads bulan depan</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[0.6rem] text-[#FF5C1A] font-bold uppercase tracking-widest mb-3">Rekomendasi</p>
                    <ul className="space-y-2">
                      {["Optimasi foto profil brand.", "Targetkan wilayah Jawa Barat.", "Luncurkan paket 'Light Edition'."].map((rec, i) => (
                        <li key={i} className="flex gap-2 text-[0.7rem] text-white/60">
                          <span className="w-4 h-4 rounded-md bg-[#FF5C1A]/20 flex items-center justify-center text-[#FF5C1A] text-[8px] font-bold flex-shrink-0">{i+1}</span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          </>
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
                    <img src={selectedBrandIndex !== null ? franchisorBrands[selectedBrandIndex].img : ""} alt="Brand Ku" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-syne font-bold text-xl text-[#111] leading-none mb-1">
                      {selectedBrandIndex !== null ? franchisorBrands[selectedBrandIndex].name : ""}
                    </h3>
                    <span className="inline-block px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[0.65rem] font-bold uppercase tracking-wider">
                      {selectedBrandIndex !== null ? franchisorBrands[selectedBrandIndex].status : ""}
                    </span>
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
                    <p className="text-2xl font-bold text-[#111]">{formatAngkaSingkat(1240)}</p>
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

                <div className="mb-8 p-4 rounded-2xl bg-gray-50 border border-black/5">
                  <h5 className="text-xs font-bold text-[#111] uppercase mb-2">Tentang Brand</h5>
                  <p className="text-sm text-[#666] leading-relaxed">
                    {selectedBrandIndex !== null ? franchisorBrands[selectedBrandIndex].desc : ""}
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-black/5">
                    <div>
                      <p className="text-[10px] text-[#999] font-bold uppercase">Investasi</p>
                      <p className="text-sm font-bold text-[#111]">Rp {selectedBrandIndex !== null ? franchisorBrands[selectedBrandIndex].invest : ""}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#999] font-bold uppercase">Lokasi</p>
                      <p className="text-sm font-bold text-[#111]">{selectedBrandIndex !== null ? franchisorBrands[selectedBrandIndex].location : ""}</p>
                    </div>
                  </div>
                </div>

                <h4 className="font-syne font-bold text-lg mb-4">Sumber Traffic</h4>
                <div className="mb-8">
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


                <h4 className="font-syne font-bold text-lg mb-4">Analisis AI Lanjutan</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-white to-[#F8F8F6] border border-black/5 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                        <MessageCircle className="w-4 h-4 text-[#FF5C1A]" />
                      </div>
                      <span className="text-xs font-bold text-[#111] uppercase tracking-wider">Sentimen Pasar</span>
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xl font-bold text-[#111]">Positif (88%)</p>
                        <p className="text-[10px] text-[#999] mt-1">Berdasarkan 120 ulasan terakhir</p>
                      </div>
                      <div className="flex -space-x-2">
                        {[1,2,3].map(i => (
                          <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-200"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-white to-[#F8F8F6] border border-black/5 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                        <BarChart3 className="w-4 h-4 text-[#7C3AED]" />
                      </div>
                      <span className="text-xs font-bold text-[#111] uppercase tracking-wider">Prediksi Pertumbuhan</span>
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xl font-bold text-[#111]">+15%</p>
                        <p className="text-[10px] text-[#999] mt-1">Estimasi bulan depan (AI Model)</p>
                      </div>
                      <Zap className="w-5 h-5 text-yellow-500 animate-pulse" />
                    </div>
                  </div>
                </div>

                <div className="bg-[#111] rounded-2xl p-6 text-white overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF5C1A] opacity-10 blur-3xl -mr-10 -mt-10"></div>
                  <h5 className="font-syne font-bold mb-4 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#FF5C1A]" />
                    Rekomendasi Strategis AI
                  </h5>
                  <ul className="space-y-3">
                    {[
                      "Optimasi galeri foto untuk meningkatkan konversi hingga 2.5x.",
                      "Fokus ekspansi ke wilayah Jawa Barat berdasarkan tren pencarian.",
                      "Gunakan promo 'Bundling Hemat' untuk meningkatkan average order value."
                    ].map((tip, i) => (
                      <li key={i} className="flex gap-3 text-xs text-white/70 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C1A] mt-1.5 flex-shrink-0"></span>
                        {tip}
                      </li>
                    ))}
                  </ul>
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
                <form className="space-y-6" onSubmit={handleBrandSubmit}>
                  {/* Image Upload Mockup */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#999] uppercase tracking-wider">Foto Brand</label>
                    <div className="flex items-center gap-4">
                      <label htmlFor="brand-image-upload" className="w-20 h-20 rounded-2xl bg-[#F8F8F6] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-[#bbb] group hover:border-[#FF5C1A] hover:text-[#FF5C1A] transition-all cursor-pointer overflow-hidden relative">
                        {brandFormData.img && brandFormData.img.startsWith('data:') ? (
                          <img src={brandFormData.img} alt="Preview" className="w-full h-full object-cover" />
                        ) : brandFormData.img && brandFormData.img.startsWith('http') ? (
                          <img src={brandFormData.img} alt="Preview" className="w-full h-full object-cover opacity-50" />
                        ) : (
                          <>
                            <ImageIcon className="w-6 h-6 mb-1" />
                            <span className="text-[10px] font-bold">Upload</span>
                          </>
                        )}
                        <input 
                          type="file" 
                          id="brand-image-upload" 
                          accept="image/png, image/jpeg, image/jpg" 
                          className="hidden" 
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              if (file.size > 2 * 1024 * 1024) {
                                alert("Ukuran file terlalu besar! Maksimal 2MB.");
                                return;
                              }
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                setBrandFormData({...brandFormData, img: reader.result as string});
                              };
                              reader.readAsDataURL(file);
                            }
                          }} 
                        />
                      </label>
                      <p className="text-xs text-[#999] max-w-[200px]">Format: JPG, PNG. Maksimal 2MB. Gunakan foto berkualitas tinggi.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#999] uppercase tracking-wider">Nama Brand</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Contoh: Kopi Nusantara" 
                        value={brandFormData.name}
                        onChange={(e) => setBrandFormData({...brandFormData, name: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-[#F8F8F6] border border-transparent focus:border-[#FF5C1A] focus:bg-white outline-none transition-all text-sm font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#999] uppercase tracking-wider">Kategori</label>
                      <select 
                        className="w-full px-4 py-3 rounded-xl bg-[#F8F8F6] border border-transparent focus:border-[#FF5C1A] focus:bg-white outline-none transition-all text-sm font-medium appearance-none"
                        value={brandFormData.cat}
                        onChange={(e) => setBrandFormData({...brandFormData, cat: e.target.value})}
                      >
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
                        required
                        placeholder="Contoh: 50.000.000" 
                        value={brandFormData.invest}
                        onChange={(e) => setBrandFormData({...brandFormData, invest: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-[#F8F8F6] border border-transparent focus:border-[#FF5C1A] focus:bg-white outline-none transition-all text-sm font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#999] uppercase tracking-wider">Lokasi Pusat</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Contoh: Jakarta" 
                        value={brandFormData.location}
                        onChange={(e) => setBrandFormData({...brandFormData, location: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-[#F8F8F6] border border-transparent focus:border-[#FF5C1A] focus:bg-white outline-none transition-all text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#999] uppercase tracking-wider">Deskripsi Brand</label>
                    <textarea 
                      rows={3}
                      required
                      placeholder="Jelaskan keunggulan brand Anda..." 
                      value={brandFormData.desc}
                      onChange={(e) => setBrandFormData({...brandFormData, desc: e.target.value})}
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
