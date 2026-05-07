"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  User as UserIcon, Search, Heart, Clock, LogOut, ArrowRight, 
  Bookmark, TrendingUp, Coffee, ChevronRight, Star, Settings 
} from "lucide-react";
import { getUser, logout, User, removeSavedFranchise } from "@/lib/auth";
import { FRANCHISE_DATA } from "@/lib/franchise-data";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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
                Halo, {user.name.split(" ")[0]}! 👋
              </h1>
              <p className="text-[#888] text-sm font-medium mt-0.5">
                {user.role === "franchisee" ? "Calon Franchisee" : "Pemilik Brand"} • {user.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/franchise"
              className="flex items-center gap-2 bg-[#FF5C1A] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-[0_6px_20px_rgba(255,92,26,0.3)] hover:bg-[#e04710] hover:-translate-y-0.5 transition-all"
            >
              <Search className="w-4 h-4" />
              Cari Franchise
            </Link>
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
          {[
            { icon: Bookmark, label: "Franchise Disimpan", value: user.savedFranchises.length.toString(), color: "#FF5C1A" },
            { icon: Clock, label: "Riwayat Pencarian", value: user.searchHistory.length.toString(), color: "#7C3AED" },
            { icon: TrendingUp, label: "Franchise Dilihat", value: "0", color: "#1B8C5A" },
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
                <p className="text-4xl mb-3">📋</p>
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
                  <p className="text-3xl mb-3">🔍</p>
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
      </div>
    </main>
  );
}
