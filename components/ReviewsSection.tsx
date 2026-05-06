"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MessageSquare, Send, CheckCircle2 } from "lucide-react";
import SpotlightCard from "./SpotlightCard";
import { ReviewCard, ReviewForm } from "./ReviewsSectionComponents";

type Review = {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
};

const INITIAL_REVIEWS: Review[] = [
  {
    id: 1,
    name: "Andi Saputra",
    rating: 5,
    comment: "Platform yang sangat membantu untuk cari franchise. Akhirnya saya buka outlet kopi pertama saya!",
    date: "2 hari yang lalu"
  },
  {
    id: 2,
    name: "Siti Aminah",
    rating: 4,
    comment: "UI nya bagus banget, gampang nyarinya. Saran saya tambahin lebih banyak kategori snack.",
    date: "1 minggu yang lalu"
  },
  {
    id: 3,
    name: "Budi Hermawan",
    rating: 5,
    comment: "Fitur AI Advisor nya jenius! Rekomendasinya pas banget sama budget saya.",
    date: "3 hari yang lalu"
  },
  {
    id: 4,
    name: "Rina Kartika",
    rating: 5,
    comment: "Proses pengajuan kemitraannya sangat transparan. Senang bisa dibimbing sampai grand opening.",
    date: "4 hari yang lalu"
  },
  {
    id: 5,
    name: "Dedi Kurniawan",
    rating: 4,
    comment: "Sangat direkomendasikan untuk pemula yang ingin mulai bisnis kuliner tapi bingung mau mulai dari mana.",
    date: "2 minggu yang lalu"
  }
];

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [newReview, setNewReview] = useState({
    name: "",
    rating: 5,
    comment: ""
  });
  const formRef = useRef<HTMLDivElement>(null);

  const toggleForm = () => {
    const nextState = !showForm;
    setShowForm(nextState);
    if (nextState) {
      // Small delay to allow AnimatePresence to start rendering
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Get current date in a nice format
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
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20"
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

        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-20">
          
          {/* Summary & Form Side */}
          <div className="space-y-10">
            <SpotlightCard
              className="bg-white p-8 md:p-10 rounded-[32px] border border-black/[0.04] shadow-sm relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF5C1A]/5 rounded-bl-[100px] transition-transform group-hover:scale-110" />
              
              <div className="flex items-center gap-6 mb-10">
                <div className="text-6xl font-black text-[#111] tracking-tighter">4.9</div>
                <div>
                  <div className="flex text-[#FFCF40] mb-1.5 gap-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-current" />)}
                  </div>
                  <p className="text-gray-400 font-bold text-sm tracking-wide">TOTAL 2.5K+ ULASAN</p>
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
                        whileInView={{ width: star === 5 ? "88%" : star === 4 ? "10%" : "2%" }}
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
              {reviews.map((review, i) => (
                <ReviewCard key={review.id} review={review} index={i} />
              ))}
            </AnimatePresence>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="pt-6 text-center"
            >
              <button className="bg-white border border-black/[0.04] px-7 py-3.5 rounded-xl text-gray-500 font-bold hover:text-[#FF5C1A] hover:border-[#FF5C1A]/20 transition-all flex items-center gap-2 mx-auto shadow-sm hover:shadow-md text-sm">
                <MessageSquare className="w-4 h-4" />
                Lihat 2,497 Ulasan Lainnya
              </button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
