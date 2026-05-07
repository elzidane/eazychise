"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MessageSquare, Send, CheckCircle2, MapPin, Coffee } from "lucide-react";
import SpotlightCard from "./SpotlightCard";
import { ReviewCard, ReviewForm } from "./ReviewsSectionComponents";

type Review = {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  city?: string;
  franchise?: string;
  category?: string;
};

const INITIAL_REVIEWS: Review[] = [
  {
    id: 1,
    name: "Budi Santoso",
    rating: 5,
    comment: "Saya buka gerai Kopi Studio 24 di Malang modal Rp 2,8 juta. Dalam 4 bulan sudah balik modal. EazyChise bantu dari awal sampai grand opening, termasuk SOP dan pelatihan barista.",
    date: "2 minggu yang lalu",
    city: "Malang",
    franchise: "Kopi Studio 24",
    category: "minuman",
  },
  {
    id: 2,
    name: "Rina Kartika",
    rating: 5,
    comment: "Awalnya ragu investasi franchise minuman. Tapi setelah pakai AI Advisor di EazyChise, saya jadi yakin pilih XIBOBA. Sekarang omzet stabil Rp 15 juta/bulan di Surabaya.",
    date: "1 minggu yang lalu",
    city: "Surabaya",
    franchise: "XIBOBA",
    category: "minuman",
  },
  {
    id: 3,
    name: "Dedi Kurniawan",
    rating: 4,
    comment: "BEP Calculator di EazyChise sangat akurat. Saya bisa hitung balik modal sebelum mulai. Sekarang punya 2 outlet Burger Bangor di Bandung. Fiturnya sangat direkomendasikan untuk pemula.",
    date: "3 hari yang lalu",
    city: "Bandung",
    franchise: "Burger Bangor",
    category: "kuliner",
  },
  {
    id: 4,
    name: "Siti Aminah",
    rating: 5,
    comment: "Saya ibu rumah tangga yang cari penghasilan tambahan. Modal Rp 4 juta buka Pisang Goreng Madu Bu Nanik di depan rumah. Alhamdulillah, 3 bulan sudah balik modal!",
    date: "5 hari yang lalu",
    city: "Semarang",
    franchise: "Pisang Goreng Madu Bu Nanik",
    category: "snack",
  },
  {
    id: 5,
    name: "Andi Prasetyo",
    rating: 5,
    comment: "Platform paling lengkap untuk compare franchise. Saya bandingkan 3 brand dessert, akhirnya pilih Sweet Street di Yogyakarta. Proses daftarnya mudah banget lewat EazyChise.",
    date: "1 minggu yang lalu",
    city: "Yogyakarta",
    franchise: "Sweet Street Dessert Co.",
    category: "dessert",
  },
  {
    id: 6,
    name: "Fitri Handayani",
    rating: 4,
    comment: "Baru mulai bisnis Es Teh Indonesia di Bekasi. EazyChise bantu cari lokasi strategis dan estimasi omzet yang cukup akurat. Sejauh ini hasilnya sesuai ekspektasi.",
    date: "4 hari yang lalu",
    city: "Bekasi",
    franchise: "Es Teh Indonesia",
    category: "minuman",
  },
  {
    id: 7,
    name: "Wahyu Hidayat",
    rating: 5,
    comment: "Sebagai fresh graduate, saya bingung mau mulai bisnis apa. AI Advisor EazyChise rekomendasiin Wizzmie sesuai budget Rp 8,5 juta. Sekarang sudah punya karyawan 3 orang!",
    date: "2 minggu yang lalu",
    city: "Jakarta Selatan",
    franchise: "Wizzmie",
    category: "kuliner",
  },
];

const CATEGORIES = [
  { key: "all", label: "Semua" },
  { key: "minuman", label: "Minuman" },
  { key: "kuliner", label: "Kuliner" },
  { key: "dessert", label: "Dessert" },
  { key: "snack", label: "Snack" },
];

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    comment: ""
  });
  const formRef = useRef<HTMLDivElement>(null);

  // Mark as mounted after first render to trigger animations
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  const filteredReviews = activeCategory === "all" 
    ? reviews 
    : reviews.filter(r => r.category === activeCategory);

  const toggleForm = () => {
    const nextState = !showForm;
    setShowForm(nextState);
    if (nextState) {
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const now = new Date();
    const formattedDate = now.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    }) + " (Baru saja)";

    const review: Review = {
      id: Date.now(),
      name: newReview.name,
      rating: newReview.rating,
      comment: newReview.comment,
      date: formattedDate
    };
    
    setReviews([review, ...reviews]);
    setSubmitted(true);
    
    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
      setNewReview({ name: "", rating: 5, comment: "" });
    }, 3000);
  };

  return (
    <section className="py-20 lg:py-24 bg-[#FFF9F0] px-[5%] overflow-hidden min-h-screen relative scroll-mt-24">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF5C1A]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FF5C1A]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Skeleton shown before mount */}
        {!mounted ? (
          <div className="animate-pulse space-y-8">
            {/* Header skeleton */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
              <div className="max-w-2xl space-y-4">
                <div className="h-3 w-32 bg-gray-200 rounded-full" />
                <div className="h-12 w-80 bg-gray-200 rounded-xl" />
                <div className="h-8 w-60 bg-gray-100 rounded-xl" />
              </div>
              <div className="h-14 w-48 bg-gray-200 rounded-2xl" />
            </div>
            {/* Cards skeleton */}
            <div className="grid lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-20">
              <div className="space-y-5">
                <div className="h-52 bg-gray-200 rounded-[32px]" />
              </div>
              <div className="space-y-6">
                {[1,2,3].map(i => (
                  <div key={i} className="bg-white rounded-[24px] p-6 border border-black/[0.04] space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-gray-200" />
                      <div className="space-y-2">
                        <div className="h-3 w-28 bg-gray-200 rounded-full" />
                        <div className="h-2 w-20 bg-gray-100 rounded-full" />
                      </div>
                    </div>
                    <div className="h-3 w-full bg-gray-100 rounded-full" />
                    <div className="h-3 w-4/5 bg-gray-100 rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
        <>
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-12"
        >
          <div className="max-w-2xl">
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[#FF5C1A] text-[0.75rem] font-bold uppercase tracking-[4px] mb-4 flex items-center gap-3"
            >
              <span className="w-8 h-px bg-[#FF5C1A]" /> Testimoni Mitra
            </motion.p>
            <h2 className="font-syne font-extrabold text-[clamp(2.5rem,5vw,4rem)] text-[#111] leading-[1.05] tracking-tight">
              Cerita Sukses Bersama <span className="text-[#FF5C1A] italic">EazyChise.</span>
            </h2>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleForm}
            className="bg-[#111] text-white px-10 py-5 rounded-2xl font-bold hover:bg-[#FF5C1A] transition-all shadow-[0_20px_40px_rgba(0,0,0,0.1)] active:scale-95 flex items-center gap-3"
          >
            {showForm ? "Batal Menulis" : "Bagikan Cerita Anda"}
            <MessageSquare className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className="px-4 py-2 rounded-full text-[0.82rem] font-semibold transition-all duration-200 cursor-pointer"
              style={
                activeCategory === cat.key
                  ? { background: "#FF5C1A", color: "#fff", boxShadow: "0 4px 14px rgba(255,92,26,0.3)" }
                  : { background: "white", color: "#555", border: "1.5px solid rgba(0,0,0,0.08)" }
              }
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-20">
          
          {/* Summary & Form Side */}
          <div className="space-y-10">
            <SpotlightCard
              className="bg-white p-8 md:p-10 rounded-[32px] border border-black/[0.04] shadow-sm relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF5C1A]/5 rounded-bl-[100px] transition-transform group-hover:scale-110" />
              
              <div className="flex items-center gap-6 mb-10">
                <div className="text-6xl font-black text-[#111] tracking-tighter">4.8</div>
                <div>
                  <div className="flex text-[#FFCF40] mb-1.5 gap-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-current" />)}
                  </div>
                  <p className="text-gray-400 font-bold text-sm tracking-wide">DARI {filteredReviews.length} ULASAN</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {[5, 4, 3, 2, 1].map((star, idx) => (
                  <div key={star} className="flex items-center gap-4">
                    <span className="text-sm font-bold text-gray-400 w-4">{star}</span>
                    <Star className="w-4 h-4 text-[#FFCF40] fill-current" />
                    <div className="flex-1 h-2.5 bg-gray-50 rounded-full overflow-hidden border border-black/[0.03]">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: star === 5 ? "75%" : star === 4 ? "20%" : "5%" }}
                        transition={{ duration: 1, delay: 0.5 + (idx * 0.1) }}
                        className="h-full bg-gradient-to-r from-[#FF5C1A] to-[#FF8C1A]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </SpotlightCard>

            <div ref={formRef}>
              <AnimatePresence>
                {showForm && (
                  <ReviewForm 
                    submitted={submitted}
                    newReview={newReview}
                    setNewReview={setNewReview}
                    onSubmit={handleSubmit}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Review List Side */}
          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {filteredReviews.map((review, i) => (
                <motion.div
                  key={review.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="bg-white p-6 rounded-2xl border border-black/[0.04] shadow-sm hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] transition-all group">
                    <div className="flex items-start gap-4 mb-3">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#FF5C1A] to-[#FF8C42] flex items-center justify-center text-white text-sm font-bold shadow-sm flex-shrink-0">
                        {review.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-bold text-[#111] text-[0.92rem]">{review.name}</h4>
                          <span className="text-[0.68rem] text-[#bbb] font-medium flex-shrink-0">{review.date}</span>
                        </div>
                        {(review.city || review.franchise) && (
                          <div className="flex items-center gap-3 mt-1 flex-wrap">
                            {review.city && (
                              <span className="text-xs text-[#999] flex items-center gap-1">
                                <MapPin className="w-3 h-3" /> {review.city}
                              </span>
                            )}
                            {review.franchise && (
                              <span className="text-xs text-[#FF5C1A] font-semibold flex items-center gap-1">
                                <Coffee className="w-3 h-3" /> {review.franchise}
                              </span>
                            )}
                          </div>
                        )}
                        <div className="flex gap-0.5 mt-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3.5 h-3.5 ${i < review.rating ? "fill-[#FFCF40] text-[#FFCF40]" : "text-gray-200"}`} 
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-[#555] text-[0.85rem] leading-[1.75] ml-15 pl-15">{review.comment}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {filteredReviews.length === 0 && (
              <div className="text-center py-16">
                <p className="text-3xl mb-3">🔍</p>
                <p className="text-[#999] font-medium">Belum ada ulasan untuk kategori ini</p>
              </div>
            )}
          </div>

        </div>
        </>
        )}
      </div>
    </section>
  );
}
