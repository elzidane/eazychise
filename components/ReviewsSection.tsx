"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MessageSquare, Send, CheckCircle2, MapPin, Coffee } from "lucide-react";
import { MdSearch } from "react-icons/md";
import SpotlightCard from "./SpotlightCard";
import { ReviewCard, ReviewForm } from "./ReviewsSectionComponents";

import { Review } from "@/types";

const INITIAL_REVIEWS: Review[] = [
  {
    id: 1,
    name: "Budi Santoso",
    rating: 5,
    comment: "Awalnya ragu karena modal saya terbatas, tapi dengan Rp 2,8 juta ternyata bisa buka outlet di depan kampus. Bulan ke-4 sudah balik modal! Tim support EazyChise responsif banget.",
    date: "2 minggu yang lalu",
    city: "Surabaya",
    franchise: "Kopi Studio 24",
    category: "minuman",
    avatar: "https://i.pravatar.cc/80?u=Budi",
  },
  {
    id: 2,
    name: "Siti Rahayu",
    rating: 5,
    comment: "Proses verifikasi franchise-nya bikin saya percaya. Semua data ROI yang disajikan akurat sesuai kenyataan. Sekarang omzet saya Rp 18 juta/bulan.",
    date: "1 bulan yang lalu",
    city: "Bandung",
    franchise: "XIBOBA",
    category: "minuman",
    avatar: "https://i.pravatar.cc/80?u=Siti",
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
    avatar: "https://i.pravatar.cc/80?u=Dedi",
  },
  {
    id: 4,
    name: "Sari Devi",
    rating: 5,
    comment: "Sangat terbantu dengan fitur perbandingan franchise. Akhirnya pilih Ayam Geprek Pak Gembus dan hasilnya memuaskan. Support dari franchisor juga oke.",
    date: "2 minggu yang lalu",
    city: "Jakarta Pusat",
    franchise: "Ayam Geprek Pak Gembus",
    category: "kuliner",
    avatar: "https://i.pravatar.cc/80?u=Sari",
  },
  {
    id: 5,
    name: "Eko Prasetyo",
    rating: 5,
    comment: "Modal 10 juta sudah bisa jalan bisnis Janji Jiwa. EazyChise bener-bener platform yang memudahkan buat nyari side income yang pasti.",
    date: "3 minggu yang lalu",
    city: "Medan",
    franchise: "Janji Jiwa",
    category: "minuman",
    avatar: "https://i.pravatar.cc/80?u=Eko",
  },
  {
    id: 6,
    name: "Dina Maria",
    rating: 5,
    comment: "Buka Mixue di depan ruko, omzetnya luar biasa. ROI ternyata lebih cepat dari estimasi awal. Terima kasih EazyChise sudah kasih rekomendasi lokasi!",
    date: "2 bulan yang lalu",
    city: "Semarang",
    franchise: "Mixue Ice Cream & Tea",
    category: "minuman",
    avatar: "https://i.pravatar.cc/80?u=Dina",
  },
  {
    id: 7,
    name: "Rizky Fauzi",
    rating: 4,
    comment: "Prosesnya simpel, dari daftar sampai disetujui franchisor cuma butuh 1 minggu. Sekarang lagi persiapan grand opening outlet Kebab Turki Baba Rafi.",
    date: "1 minggu yang lalu",
    city: "Bekasi",
    franchise: "Kebab Turki Baba Rafi",
    category: "kuliner",
    avatar: "https://i.pravatar.cc/80?u=Rizky",
  },
  {
    id: 8,
    name: "Indah Permata",
    rating: 5,
    comment: "Snack Sweet Street emang lagi hits. Jualannya gampang banget, apalagi lokasinya deket sekolah. Rekomendasi buat ibu rumah tangga yang mau bisnis.",
    date: "5 hari yang lalu",
    city: "Yogyakarta",
    franchise: "Sweet Street Dessert Co.",
    category: "dessert",
    avatar: "https://i.pravatar.cc/80?u=Indah",
  },
  {
    id: 9,
    name: "Agus Setiawan",
    rating: 5,
    comment: "Bakso Benhil Jakarta emang rasa ga bohong. Dari dulu pengen buka tapi baru kesampaian sekarang lewat EazyChise. Sistemnya rapi banget.",
    date: "3 minggu yang lalu",
    city: "Tangerang",
    franchise: "Bakso Benhil Jakarta",
    category: "kuliner",
    avatar: "https://i.pravatar.cc/80?u=Agus",
  },
  {
    id: 10,
    name: "Lani Wijaya",
    rating: 4,
    comment: "Es Teh Indonesia modalnya pas di kantong. Balik modal bulan ke-5. CS EazyChise juga ramah banget pas ditanya-tanya soal perizinan.",
    date: "2 minggu yang lalu",
    city: "Palembang",
    franchise: "Es Teh Indonesia",
    category: "minuman",
    avatar: "https://i.pravatar.cc/80?u=Lani",
  },
  {
    id: 11,
    name: "Hendra Putra",
    rating: 5,
    comment: "Wizzmie lagi viral di Malang, antrinya panjang terus. Ga nyesel ambil franchise ini. Data traffic dari EazyChise emang valid.",
    date: "1 bulan yang lalu",
    city: "Malang",
    franchise: "Wizzmie",
    category: "kuliner",
    avatar: "https://i.pravatar.cc/80?u=Hendra",
  },
  {
    id: 12,
    name: "Maya Sari",
    rating: 5,
    comment: "Buka Pisang Goreng Madu Bu Nanik di teras rumah. Ternyata peminatnya banyak banget. Bisnis receh tapi hasilnya ga recehan.",
    date: "4 hari yang lalu",
    city: "Depok",
    franchise: "Pisang Goreng Madu Bu Nanik",
    category: "snack",
    avatar: "https://i.pravatar.cc/80?u=Maya",
  },
];


const CATEGORIES = [
  { key: "all", label: "Semua Ulasan" },
  { key: "star-5", label: "Bintang 5" },
  { key: "star-4", label: "Bintang 4" },
  { key: "minuman", label: "Minuman" },
  { key: "kuliner", label: "Kuliner" },
  { key: "dessert", label: "Dessert" },
  { key: "snack", label: "Snack" },
];

export default function ReviewsSection({ hideHeader = false }: { hideHeader?: boolean }) {
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

  const filteredReviews = reviews.filter(r => {
    if (activeCategory === "all") return true;
    if (activeCategory === "star-5") return r.rating === 5;
    if (activeCategory === "star-4") return r.rating === 4;
    return r.category === activeCategory;
  });

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
      date: formattedDate,
      city: "Jakarta", // Default
      franchise: "Partner Baru",
      category: "umum",
      avatar: `https://i.pravatar.cc/80?u=${newReview.name}`,
    };
    
    setReviews([review, ...reviews]);
    setSubmitted(true);
    
    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
      setNewReview({ name: "", rating: 5, comment: "" });
    }, 3000);
  };

  if (!mounted) return null;

  return (
    <section className={`${hideHeader ? "" : "py-20 lg:py-24"} bg-transparent overflow-hidden relative scroll-mt-24`}>
      <div className="relative z-10">
        
        {/* Header (Optional) */}
        {!hideHeader && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-12"
          >
            <div className="max-w-2xl">
              <p className="text-[#FF5C1A] text-[0.75rem] font-bold uppercase tracking-[4px] mb-4 flex items-center gap-3">
                <span className="w-8 h-px bg-[#FF5C1A]" /> Testimoni Mitra
              </p>
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
        )}

        {/* Filters & Write Button (if hideHeader) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className="px-5 py-2.5 rounded-full text-[0.8rem] font-bold transition-all duration-200 cursor-pointer whitespace-nowrap"
                style={
                  activeCategory === cat.key
                    ? { background: "#FF5C1A", color: "#fff", boxShadow: "0 8px 20px rgba(255,92,26,0.3)" }
                    : { background: "white", color: "#555", border: "1.5px solid rgba(0,0,0,0.05)" }
                }
              >
                {cat.label}
              </button>
            ))}
          </div>
          
          {hideHeader && (
            <button 
              onClick={toggleForm}
              className="flex items-center gap-2 text-[#FF5C1A] font-black text-sm uppercase tracking-widest hover:underline"
            >
              <MessageSquare className="w-5 h-5" />
              {showForm ? "Batal Menulis" : "Tulis Ulasan"}
            </button>
          )}
        </div>

        {/* Review Form Area */}
        <AnimatePresence>
          {showForm && (
            <div className="mb-16 max-w-2xl mx-auto" ref={formRef}>
              <ReviewForm 
                submitted={submitted}
                newReview={newReview}
                setNewReview={setNewReview}
                onSubmit={handleSubmit}
              />
            </div>
          )}
        </AnimatePresence>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredReviews.map((review, i) => (
              <ReviewCard key={review.id} review={review} index={i} />
            ))}
          </AnimatePresence>
        </div>

        {filteredReviews.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white/50 rounded-[48px] border-2 border-dashed border-black/[0.03]"
          >
            <MdSearch className="w-12 h-12 text-gray-200 mx-auto mb-4" />
            <p className="text-[#999] font-bold text-lg">Belum ada ulasan untuk kategori ini</p>
            <button onClick={() => setActiveCategory("all")} className="text-[#FF5C1A] font-bold mt-2 hover:underline">Lihat semua ulasan</button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

