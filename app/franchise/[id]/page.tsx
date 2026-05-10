"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, TrendingUp, Users, MapPin, Star, Download, Brain, Sparkles, Zap, Heart } from "lucide-react";
import { generateProposalPDF } from "@/lib/pdf-generator";
import { createClient } from "@/utils/supabase/client";
import PartnershipModal from "@/components/PartnershipModal";
import LocationRecommender from "@/components/LocationRecommender";
import SpotlightCard from "@/components/SpotlightCard";
import Typewriter from "@/components/Typewriter";
import { motion } from "framer-motion";
import { ScrollReveal, StaggerReveal, fadeRight, fadeLeft, fadeUp, slideUp } from "@/components/ScrollMotion";
import { DbFranchise, DbReview, Franchise } from "@/types";

export default function FranchiseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: slug } = React.use(params);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [analysis, setAnalysis] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [franchise, setFranchise] = useState<Franchise | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [reviews, setReviews] = useState<DbReview[]>([]);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      const currentUserId = session?.user?.id || null;
      setUserId(currentUserId);

      const { data } = await supabase.from('franchises').select('*');
      if (data) {
        const decodedSlug = decodeURIComponent(slug);
        const f = (data as DbFranchise[]).find(item => {
          const brandSlug = item.name.toLowerCase().replace(/\s+/g, '-');
          return brandSlug === decodedSlug || brandSlug === slug;
        });

        if (f) {
          setFranchise({
            id: f.id,
            name: f.name,
            cat: f.cat,
            catKey: f.cat_key,
            city: f.city,
            rating: f.rating,
            invest: f.invest_text,
            investNum: f.invest_num,
            roi: f.roi,
            omzet: f.omzet,
            mitra: f.mitra_count,
            badge: f.badge,
            badgeColor: f.badge_color,
            img: f.img
          });

          // Check if saved
          if (currentUserId) {
            const { data: savedData } = await supabase
              .from('saved_franchises')
              .select('id')
              .eq('user_id', currentUserId)
              .eq('franchise_id', f.id)
              .single();
            if (savedData) setIsSaved(true);
          }

          // Record page view (Analytics)
          try {
            let source = 'Organic';
            if (typeof window !== 'undefined') {
               const urlParams = new URLSearchParams(window.location.search);
               if (urlParams.get('source') === 'ai') source = 'AI';
            }
            await supabase.from('page_views').insert({
              franchise_id: f.id,
              viewer_id: currentUserId,
              source: source
            });
          } catch (e) {
            console.error("Failed to record view", e);
          }

          // Fetch reviews
          const { data: reviewsData } = await supabase
            .from('reviews')
            .select('*')
            .eq('franchise_id', f.id)
            .order('created_at', { ascending: false });
          if (reviewsData) {
            setReviews(reviewsData);
          }
        }
      }
      setLoadingData(false);
    };
    fetchData();
  }, [slug]);

  const handleSave = async () => {
    if (!userId || !franchise) {
      alert("Silakan login terlebih dahulu untuk menyimpan franchise.");
      return;
    }
    setSaving(true);
    const supabase = createClient();
    
    if (isSaved) {
      // Remove
      await supabase.from('saved_franchises').delete()
        .eq('user_id', userId)
        .eq('franchise_id', franchise.id);
      setIsSaved(false);
    } else {
      // Add
      await supabase.from('saved_franchises').insert({
        user_id: userId,
        franchise_id: franchise.id
      });
      setIsSaved(true);
    }
    setSaving(false);
  };

  const generateAnalysis = async () => {
    if (isAnalyzing || !franchise) return;
    setIsAnalyzing(true);
    setAnalysis("");

    const prompt = `Berikan analisis strategis mendalam untuk franchise ${franchise.name} dengan data: Investasi ${franchise.invest}, ROI ${franchise.roi}, Omzet ${franchise.omzet}. Berikan analisis SWOT singkat dan rekomendasi keberhasilan. Gaya bahasa: Senior Business Analyst.`;

    try {
      const res = await fetch("/api/advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: prompt }] }),
      });
      const data = await res.json();
      if (data.reply) {
        setAnalysis(data.reply);
      } else {
        setAnalysis("Maaf, terjadi masalah saat memuat analisis.");
      }
    } catch (err) {
      setAnalysis("Maaf, koneksi bermasalah.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !franchise) {
      alert("Silakan login untuk memberikan ulasan.");
      return;
    }
    if (!reviewForm.comment.trim()) {
      alert("Komentar tidak boleh kosong.");
      return;
    }

    setIsSubmittingReview(true);
    const supabase = createClient();
    const { data, error } = await supabase.from('reviews').insert({
      franchise_id: franchise.id,
      user_id: userId,
      rating: reviewForm.rating,
      comment: reviewForm.comment
    }).select();

    if (!error && data) {
      setReviews([data[0], ...reviews]);
      setReviewForm({ rating: 5, comment: "" });
    } else {
      console.error(error);
      alert("Gagal mengirim ulasan.");
    }
    setIsSubmittingReview(false);
  };


  
  if (loadingData) {
    return (
      <main className="pt-32 pb-20 min-h-screen bg-[#FFF9F0] flex flex-col items-center justify-center">
        <span className="w-8 h-8 border-4 border-[#FF5C1A]/30 border-t-[#FF5C1A] rounded-full animate-spin" />
      </main>
    );
  }

  if (!franchise) {
    return (
      <main className="pt-32 pb-20 min-h-screen bg-[#FFF9F0] flex flex-col items-center justify-center text-center px-5">
        <h1 className="text-4xl font-extrabold mb-4 font-syne text-[#111]">Franchise Tidak Ditemukan</h1>
        <p className="text-gray-500 mb-8">Maaf, kami tidak dapat menemukan data untuk franchise yang Anda cari.</p>
        <Link href="/franchise" className="bg-[#111] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#FF5C1A] transition-colors">
          Kembali ke Daftar
        </Link>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-20 min-h-screen bg-[#FFF9F0]">
      <div className="max-w-5xl mx-auto px-5">
        
        {/* Back Button */}
        <Link 
          href="/franchise" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#FF5C1A] mb-8 transition-colors font-medium text-sm group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Kembali ke Daftar Franchise
        </Link>

        {/* ── Main Content Layout ── */}
        <div className="grid lg:grid-cols-[1fr_380px] gap-10 items-start">
          
          {/* Left Column: Details */}
          <div className="space-y-10 order-2 lg:order-1">
            {/* Header Info (Visible on Desktop) */}
            <ScrollReveal variants={fadeRight}>
            <div className="hidden lg:block">
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="bg-[#FF5C1A]/10 text-[#FF5C1A] font-bold text-xs px-3 py-1.5 rounded-full">
                  Franchise Terverifikasi
                </div>
                <div className="bg-gray-100 text-gray-600 font-bold text-xs px-3 py-1.5 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  {franchise.rating}
                </div>
                <div className="bg-gray-100 text-gray-600 font-bold text-xs px-3 py-1.5 rounded-full flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {franchise.city}
                </div>
              </div>
              
              <h1 className="font-syne font-extrabold text-5xl text-[#111] leading-[1.1] mb-6">
                {franchise.name}
              </h1>
              <p className="text-gray-500 text-lg mb-8 leading-relaxed max-w-2xl">
                Bergabunglah dengan jaringan kemitraan {franchise.name} yang telah sukses di {franchise.city}. Kami menawarkan sistem yang teruji, bahan baku berkualitas, dan dukungan pemasaran berkelanjutan untuk memastikan kesuksesan bisnis Anda.
              </p>
            </div>

            {/* Mobile Header Info (Visible only on Mobile) */}
            <div className="lg:hidden">
              <h1 className="font-syne font-extrabold text-4xl text-[#111] leading-tight mb-4">
                {franchise.name}
              </h1>
              <p className="text-gray-500 mb-6">
                Bergabunglah dengan jaringan kemitraan {franchise.name} sukses.
              </p>
            </div>
            </ScrollReveal>

            {/* Quick Stats Grid */}
            <StaggerReveal className="grid grid-cols-2 sm:grid-cols-3 gap-4" fast>
              {[
                { label: "Modal Investasi", value: franchise.invest, color: "text-[#111]" },
                { label: "Estimasi ROI", value: franchise.roi, color: "text-[#1B8C5A]" },
                { label: "Jumlah Mitra", value: franchise.mitra, color: "text-[#111]" },
              ].map((s) => (
                <motion.div key={s.label} variants={slideUp} className="bg-white p-5 rounded-2xl border border-black/5 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <p className="text-gray-400 text-[0.65rem] font-bold uppercase tracking-wider mb-1">{s.label}</p>
                  <p className={`text-lg font-black ${s.color}`}>{s.value}</p>
                </motion.div>
              ))}
            </StaggerReveal>

            {/* Info Tabs / Sections */}
            <div className="space-y-8">
              <ScrollReveal variants={fadeRight} delay={0.1}>
                <div className="bg-white rounded-[32px] p-8 border border-black/5 shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <h3 className="font-syne font-bold text-2xl mb-6 flex items-center gap-3">
                    <TrendingUp className="w-6 h-6 text-[#FF5C1A]" />
                    Potensi Bisnis
                  </h3>
                  <ul className="space-y-4">
                    {[
                      { label: "Estimasi Omzet / Bulan", value: franchise.omzet },
                      { label: "HPP (Harga Pokok Penjualan)", value: "± 40-50%" },
                      { label: "Estimasi Laba Bersih", value: "25% - 35%" },
                      { label: "Bimbingan Operasional", value: "Tersedia" }
                    ].map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                      >
                        <span className="text-gray-600 font-medium">{item.label}</span>
                        <span className="font-bold text-[#111]">{item.value}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal variants={fadeRight} delay={0.2}>
                <div className="bg-white rounded-[32px] p-8 border border-black/5 shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <h3 className="font-syne font-bold text-2xl mb-6 flex items-center gap-3">
                    <Users className="w-6 h-6 text-[#FF5C1A]" />
                    Paket Kemitraan
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      "Lisensi Brand Selamanya",
                      "Booth / Gerobak Design Premium",
                      "Starter Kit & Peralatan Lengkap",
                      "Bahan Baku Awal 100 Porsi",
                      "Pelatihan Karyawan (Offline/Online)",
                      "Support Promosi Digital & Materi Ads"
                    ].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.06 }}
                        className="flex items-start gap-3 p-3 rounded-xl bg-gray-50/50 hover:bg-[#FFF3E5] transition-colors"
                      >
                        <div className="bg-green-100 rounded-full p-0.5 mt-0.5 flex-shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#1B8C5A]" />
                        </div>
                        <span className="text-gray-700 font-bold text-xs">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* Right Column: Sticky Sidebar */}
          <ScrollReveal variants={fadeLeft} className="lg:sticky lg:top-28 order-1 lg:order-2 space-y-6">
          <aside className="space-y-6">
            <div className="bg-white rounded-[32px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-black/5 relative overflow-hidden group">
              {/* Image Container */}
              <div className="aspect-[4/3] relative rounded-2xl overflow-hidden mb-6 shadow-inner bg-gray-100">
                <Image 
                  src={franchise.img || ""}
                  alt={franchise.alt || franchise.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="400px"
                />
              </div>

              {/* CTAs */}
              <div className="space-y-3">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-[#FF5C1A] text-white py-4 rounded-2xl font-bold text-[1rem] shadow-[0_12px_24px_rgba(255,92,26,0.3)] hover:bg-[#e04710] hover:-translate-y-0.5 transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  Ajukan Kemitraan
                </button>
                <button 
                  onClick={() => generateProposalPDF(franchise)}
                  className="w-full bg-white border-2 border-black/5 text-[#111] py-4 rounded-2xl font-bold text-[0.9rem] hover:border-[#FF5C1A] hover:text-[#FF5C1A] transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <Download className="w-5 h-5" />
                  Unduh Proposal PDF
                </button>
                <button 
                  onClick={handleSave}
                  disabled={saving}
                  className={`w-full border-2 py-4 rounded-2xl font-bold text-[0.9rem] transition-all flex items-center justify-center gap-2 active:scale-95 ${
                    isSaved 
                      ? "bg-red-50 border-red-200 text-red-500 hover:bg-red-100" 
                      : "bg-white border-black/5 text-[#111] hover:border-red-400 hover:text-red-500"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isSaved ? "fill-red-500 text-red-500" : ""}`} />
                  {isSaved ? "Tersimpan di Bookmark" : "Simpan ke Bookmark"}
                </button>
              </div>

              {/* Trust Badge */}
              <div className="mt-6 pt-6 border-t border-black/5 flex items-center justify-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-gray-100 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?u=${i + 10}`} alt="user" />
                    </div>
                  ))}
                </div>
                <p className="text-[0.65rem] text-[#999] font-bold">80+ Mitra Tertarik</p>
              </div>
            </div>

            {/* Quick Action Box */}
            <div className="bg-[#111] rounded-[24px] p-6 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF5C1A] opacity-10 blur-2xl -mr-16 -mt-16" />
              <p className="text-[0.65rem] text-[#FF5C1A] font-black uppercase tracking-[0.2em] mb-2">Punya Pertanyaan?</p>
              <h4 className="font-syne font-bold text-lg mb-4">Konsultasi Gratis</h4>
              <Link 
                href={`https://wa.me/6281234567890?text=Halo%20EazyChise,%20saya%20tertarik%20dengan%20franchise%20${franchise.name}`}
                target="_blank"
                className="block w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl text-center text-sm font-bold transition-all"
              >
                Hubungi via WhatsApp
              </Link>
            </div>
          </aside>
          </ScrollReveal>

        </div>

        {/* Location Recommender Integration */}
        {/* Location Recommender Integration */}
        <LocationRecommender category={franchise.cat || ""} />

        {/* AI Strategic Analysis Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          {!analysis && !isAnalyzing ? (
            <button
              onClick={generateAnalysis}
              className="w-full bg-[#111] text-white py-5 rounded-[2rem] font-bold hover:bg-[#FF5C1A] transition-all flex items-center justify-center gap-3 shadow-lg active:scale-95 group border-4 border-white"
            >
              <Brain className="w-6 h-6 text-[#FFCF40] group-hover:scale-110 transition-transform" />
              Dapatkan Analisis Strategis AI untuk {franchise.name}
            </button>
          ) : (
            <SpotlightCard className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-[#FF5C1A]/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5C1A]/5 rounded-full blur-[80px] -mr-32 -mt-32" />
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF5C1A] to-[#FF8C1A] flex items-center justify-center shadow-lg shadow-[#FF5C1A]/20">
                    <Sparkles className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="font-syne font-black text-2xl text-[#111] leading-none mb-2">Strategic Analysis</h4>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[0.75rem] font-black text-[#999] uppercase tracking-[0.2em]">EazyChise Advisor v2.0</span>
                    </div>
                  </div>
                </div>
                {!isAnalyzing && (
                  <button
                    onClick={generateAnalysis}
                    className="flex items-center gap-2 text-xs font-bold text-[#FF5C1A] bg-[#FF5C1A]/5 px-4 py-2 rounded-full hover:bg-[#FF5C1A]/10 transition-all"
                  >
                    <Zap className="w-3 h-3" /> Regenerate Analysis
                  </button>
                )}
              </div>

              <div className="prose prose-orange max-w-none">
                {isAnalyzing ? (
                  <div className="space-y-4">
                    <div className="h-4 w-full bg-gray-100 rounded-full animate-pulse" />
                    <div className="h-4 w-5/6 bg-gray-100 rounded-full animate-pulse" />
                    <div className="h-4 w-4/6 bg-gray-100 rounded-full animate-pulse" />
                    <div className="h-4 w-full bg-gray-100 rounded-full animate-pulse" />
                    <p className="text-xs text-gray-400 font-bold italic mt-4">AI sedang merumuskan strategi bisnis untuk Anda...</p>
                  </div>
                ) : (
                  <div className="text-[#333] text-[1.05rem] leading-[1.8] whitespace-pre-wrap font-medium max-h-[480px] overflow-y-auto pr-4 custom-scrollbar">
                    <Typewriter text={analysis} speed={5} />
                  </div>
                )}
              </div>

              <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                  width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                  background: rgba(0,0,0,0.03);
                  border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                  background: rgba(255, 92, 26, 0.2);
                  border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                  background: rgba(255, 92, 26, 0.4);
                }
              `}</style>
              
              <div className="mt-10 p-5 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-[0.7rem] text-gray-400 font-bold leading-relaxed">
                  *Analisis ini dihasilkan secara otomatis oleh EazyChise AI Advisor berdasarkan data pasar dan performa brand. Gunakan sebagai referensi tambahan dalam pengambilan keputusan investasi Anda.
                </p>
              </div>
            </SpotlightCard>
          )}
        </motion.div>

        {/* Reviews Section */}
        <ScrollReveal variants={fadeUp} className="mt-16 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-black/5">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-syne font-extrabold text-2xl text-[#111]">Ulasan Mitra</h3>
            <div className="flex items-center gap-2 bg-[#F8F8F6] px-4 py-2 rounded-full">
              <Star className="w-5 h-5 text-[#FFCF40] fill-[#FFCF40]" />
              <span className="font-bold text-[#111]">{franchise.rating}</span>
              <span className="text-sm text-[#999]">({reviews.length} ulasan)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              {reviews.length > 0 ? (
                <div className="space-y-6 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="bg-gray-50 p-5 rounded-2xl border border-black/5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center font-bold text-gray-600 text-xs">
                            A
                          </div>
                          <p className="font-bold text-sm">Mitra Anonim</p>
                        </div>
                        <div className="flex text-[#FFCF40]">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < rev.rating ? "fill-[#FFCF40]" : "text-gray-300"}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{rev.comment}</p>
                      <p className="text-[0.6rem] text-gray-400 mt-3 font-medium uppercase">
                        {new Date(rev.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-gray-50 rounded-2xl border border-black/5">
                  <Star className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <p className="font-bold text-gray-500">Belum ada ulasan</p>
                  <p className="text-xs text-gray-400 mt-1">Jadilah yang pertama memberikan ulasan!</p>
                </div>
              )}
            </div>

            <div>
              <form onSubmit={handleSubmitReview} className="bg-[#F8F8F6] p-6 rounded-3xl border border-black/5">
                <h4 className="font-syne font-bold text-lg mb-4">Tulis Ulasan Anda</h4>
                
                <div className="mb-4">
                  <label className="text-xs font-bold text-[#999] uppercase tracking-wider block mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star className={`w-8 h-8 ${reviewForm.rating >= star ? "fill-[#FFCF40] text-[#FFCF40]" : "text-gray-300 fill-transparent"}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="text-xs font-bold text-[#999] uppercase tracking-wider block mb-2">Komentar</label>
                  <textarea
                    rows={4}
                    required
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                    placeholder="Bagaimana pengalaman atau pendapat Anda tentang franchise ini?"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-black/10 focus:border-[#FF5C1A] outline-none transition-all text-sm resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingReview || !userId}
                  className="w-full bg-[#111] hover:bg-[#FF5C1A] text-white py-3.5 rounded-xl font-bold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmittingReview ? "Mengirim..." : !userId ? "Login untuk Ulasan" : "Kirim Ulasan"}
                </button>
              </form>
            </div>
          </div>
        </ScrollReveal>

          <ScrollReveal variants={fadeUp} delay={0.1} className="mt-16">
            <div className="bg-[#111] rounded-[32px] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10 text-center md:text-left">
                <h2 className="font-syne font-extrabold text-3xl mb-2 text-white">Siap Mulai Bisnis {franchise.name}?</h2>
                <p className="text-white/60 font-medium">Jadilah bagian dari jaringan sukses kami sekarang.</p>
              </div>
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#111" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsModalOpen(true)}
                className="relative z-10 bg-[#FF5C1A] text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl"
              >
                Daftar Sekarang
              </motion.button>
            </div>
          </ScrollReveal>
      </div>

      <PartnershipModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        franchiseName={franchise.name} 
        franchiseId={franchise.id}
      />
    </main>
  );
}
