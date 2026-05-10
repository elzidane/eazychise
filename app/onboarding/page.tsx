"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, Phone, ArrowRight, ShieldCheck, Sparkles, LogOut } from "lucide-react";
import { MdPerson, MdStore } from "react-icons/md";
import { createClient } from "@/utils/supabase/client";

export default function OnboardingPage() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    role: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.replace("/masuk");
        return;
      }

      const user = session.user;
      
      // Jika sudah punya role, lempar ke dashboard
      if (user.user_metadata?.role) {
        router.replace("/dashboard");
        return;
      }

      setFormData({
        name: user.user_metadata?.full_name || "",
        phone: user.user_metadata?.phone || "",
        role: "",
      });
      
      setLoading(false);
    };

    fetchUser();
  }, [router, supabase.auth]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!/^[a-zA-Z\s]{3,}$/.test(formData.name)) {
      setError("Nama minimal 3 karakter dan hanya huruf.");
      return;
    }
    if (!/^08[0-9]{8,12}$/.test(formData.phone)) {
      setError("Nomor HP harus diawali 08 dan minimal 10 digit.");
      return;
    }
    if (!formData.role) {
      setError("Anda harus memilih salah satu peran (Role).");
      return;
    }

    setSubmitting(true);

    const { error: updateError } = await supabase.auth.updateUser({
      data: {
        full_name: formData.name,
        phone: formData.phone,
        role: formData.role,
      }
    });

    if (updateError) {
      setError(updateError.message);
      setSubmitting(false);
    } else {
      // Supabase secara otomatis memperbarui sesi lokal.
      // Langsung arahkan ke dashboard
      router.push("/dashboard");
      router.refresh();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/masuk");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF9F0] flex items-center justify-center">
        <span className="w-8 h-8 border-4 border-[#FF5C1A]/30 border-t-[#FF5C1A] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFF9F0] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Logout Button (Jika user ingin batal dan ganti akun) */}
      <button 
        onClick={handleLogout}
        className="fixed top-6 left-6 lg:top-8 lg:left-8 z-50 flex items-center gap-2 text-[#777] hover:text-red-500 font-bold text-sm transition-all group"
      >
        <div className="w-9 h-9 lg:w-8 lg:h-8 rounded-full border border-black/5 flex items-center justify-center bg-white shadow-[0_4px_12px_rgba(0,0,0,0.05)] lg:shadow-sm group-hover:border-red-500 group-hover:text-red-500 transition-all">
          <LogOut className="w-4 h-4 pl-0.5" />
        </div>
        <span className="hidden lg:inline">Batal & Keluar</span>
      </button>

      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[10%] left-[20%] w-[30%] h-[30%] bg-[#FF5C1A]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[40%] h-[40%] bg-[#FFCF40]/10 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[500px] relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[#FF5C1A]/10 text-[#FF5C1A] px-4 py-1.5 rounded-full text-[0.7rem] font-black uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Langkah Terakhir
          </div>
          <h1 className="font-syne font-extrabold text-3xl md:text-4xl text-[#111] mb-3 tracking-tighter leading-tight">
            Lengkapi <span className="text-[#FF5C1A]">Profilmu</span>
          </h1>
          <p className="text-gray-500 text-sm">Pilih role agar kami bisa menyesuaikan pengalamanmu.</p>
        </div>

        {/* Card */}
        <div className="bg-white p-8 sm:p-10 rounded-[40px] shadow-[0_32px_64px_rgba(0,0,0,0.06)] border border-black/5">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 text-red-600 text-sm font-medium px-4 py-3 rounded-2xl"
              >
                {error}
              </motion.div>
            )}

            {/* Name */}
            <div>
              <label className="block text-[0.75rem] font-black text-[#111] uppercase tracking-wider mb-2 ml-1">Nama Lengkap</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Masukkan nama lengkap"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-[#F8F8F6] border border-black/5 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-[#FF5C1A]/10 focus:border-[#FF5C1A] transition-all font-medium text-sm"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-[0.75rem] font-black text-[#111] uppercase tracking-wider mb-2 ml-1">Nomor HP</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  type="tel" 
                  placeholder="Contoh: 081234567890"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-[#F8F8F6] border border-black/5 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-[#FF5C1A]/10 focus:border-[#FF5C1A] transition-all font-medium text-sm"
                  required
                />
              </div>
            </div>

            {/* Role selector */}
            <div>
              <label className="block text-[0.75rem] font-black text-[#111] uppercase tracking-wider mb-2 ml-1">Tujuan Saya Adalah</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, role: "franchisee"})}
                  className={`py-4 px-4 rounded-2xl text-left transition-all border-2 flex flex-col gap-1 ${
                    formData.role === "franchisee"
                      ? "bg-[#FF5C1A]/5 border-[#FF5C1A]"
                      : "bg-[#F8F8F6] border-transparent hover:border-black/10"
                  }`}
                >
                  <span className={`flex items-center gap-2 font-bold text-sm ${formData.role === "franchisee" ? "text-[#FF5C1A]" : "text-[#333]"}`}>
                    <MdPerson className="w-5 h-5" /> Calon Franchisee
                  </span>
                  <span className="text-[0.65rem] text-[#888] font-medium leading-relaxed">Saya ingin mencari & membeli franchise.</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, role: "franchisor"})}
                  className={`py-4 px-4 rounded-2xl text-left transition-all border-2 flex flex-col gap-1 ${
                    formData.role === "franchisor"
                      ? "bg-[#FF5C1A]/5 border-[#FF5C1A]"
                      : "bg-[#F8F8F6] border-transparent hover:border-black/10"
                  }`}
                >
                  <span className={`flex items-center gap-2 font-bold text-sm ${formData.role === "franchisor" ? "text-[#FF5C1A]" : "text-[#333]"}`}>
                    <MdStore className="w-5 h-5" /> Pemilik Brand
                  </span>
                  <span className="text-[0.65rem] text-[#888] font-medium leading-relaxed">Saya ingin memasarkan brand franchise saya.</span>
                </button>
              </div>
            </div>

            <button 
              type="submit"
              disabled={submitting}
              className="w-full bg-[#111111] text-white py-4 rounded-2xl font-bold text-[1rem] shadow-[0_12px_24px_rgba(0,0,0,0.12)] hover:bg-[#FF5C1A] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 mt-4 group disabled:opacity-60 disabled:hover:bg-[#111111] disabled:hover:translate-y-0"
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Menyimpan...
                </span>
              ) : (
                <>
                  Lanjut ke Dashboard
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </main>
  );
}
