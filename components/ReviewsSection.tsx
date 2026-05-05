"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MessageSquare, Send, CheckCircle2 } from "lucide-react";

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
    <section className="py-32 bg-[#FFF9F0] px-[5%] overflow-hidden min-h-screen relative">
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
            onClick={() => setShowForm(!showForm)}
            className="bg-[#111] text-white px-10 py-5 rounded-2xl font-bold hover:bg-[#FF5C1A] transition-all shadow-[0_20px_40px_rgba(0,0,0,0.1)] active:scale-95 flex items-center gap-3"
          >
            {showForm ? "Batal Menulis" : "Bagikan Cerita Anda"}
            <MessageSquare className="w-5 h-5" />
          </motion.button>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-20">
          
          {/* Summary & Form Side */}
          <div className="space-y-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="bg-white p-12 rounded-[40px] border border-black/5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden group"
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
            </motion.div>

            <AnimatePresence>
              {showForm && (
                <motion.div
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 40, scale: 0.9 }}
                  className="bg-white border border-black/5 rounded-[40px] p-10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] relative z-20"
                >
                  {!submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-syne font-bold text-2xl text-[#111]">Tulis Ulasan</h3>
                        <div className="w-10 h-1 bg-[#FF5C1A] rounded-full" />
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <label className="text-sm font-bold text-gray-500 uppercase tracking-wider ml-1">Nama Lengkap</label>
                          <input
                            required
                            type="text"
                            placeholder="Contoh: Budi Santoso"
                            className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-5 py-4 focus:outline-none focus:border-[#FF5C1A] focus:bg-white transition-all font-medium text-[#111] shadow-sm"
                            value={newReview.name}
                            onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                          />
                        </div>

                        <div className="space-y-3">
                          <label className="text-sm font-bold text-gray-500 uppercase tracking-wider ml-1">Rating Anda</label>
                          <div className="flex gap-2 bg-gray-50 p-3.5 rounded-2xl justify-center border-2 border-transparent shadow-sm">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <motion.button
                                key={star}
                                type="button"
                                whileHover={{ scale: 1.2, rotate: 10 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setNewReview({ ...newReview, rating: star })}
                                className="focus:outline-none"
                              >
                                <Star 
                                  className={`w-7 h-7 transition-colors ${star <= newReview.rating ? "text-[#FFCF40] fill-current" : "text-gray-200"}`} 
                                />
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-sm font-bold text-gray-500 uppercase tracking-wider ml-1">Isi Ulasan</label>
                        <textarea
                          required
                          rows={4}
                          placeholder="Ceritakan pengalaman Anda menggunakan platform kami..."
                          className="w-full bg-gray-50 border-2 border-transparent rounded-2xl px-5 py-4 focus:outline-none focus:border-[#FF5C1A] focus:bg-white transition-all resize-none font-medium text-[#111] shadow-sm"
                          value={newReview.comment}
                          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-[#FF5C1A] text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-[#FF5C1A]/20 hover:shadow-[#FF5C1A]/40 transition-all active:scale-[0.98] text-lg"
                      >
                        Kirim Ulasan Sekarang <Send className="w-5 h-5" />
                      </button>
                    </form>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-16 text-center"
                    >
                      <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 className="w-12 h-12 text-green-500" />
                      </div>
                      <h3 className="text-3xl font-black text-[#111] mb-3">Terima Kasih!</h3>
                      <p className="text-gray-500 font-medium leading-relaxed">Ulasan Anda sangat berarti bagi komunitas EazyChise.</p>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Review List Side */}
          <div className="space-y-8">
            <AnimatePresence mode="popLayout">
              {reviews.map((review, i) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, type: "spring", stiffness: 100 }}
                  whileHover={{ y: -8, boxShadow: "0 30px 60px -15px rgba(0,0,0,0.1)" }}
                  className="bg-white p-10 rounded-[40px] border border-black/5 transition-all duration-300 group relative"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-[#FF5C1A] to-[#FF8C1A] rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-[#FF5C1A]/20">
                        {review.name[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-xl text-[#111] tracking-tight group-hover:text-[#FF5C1A] transition-colors">{review.name}</h4>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex text-[#FFCF40] gap-1 bg-gray-50 px-3 py-1.5 rounded-full border border-black/[0.03]">
                      {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                    </div>
                  </div>
                  <div className="relative">
                    <span className="absolute -top-4 -left-2 text-6xl text-gray-100 font-serif pointer-events-none opacity-50 group-hover:text-[#FF5C1A]/10 transition-colors">“</span>
                    <p className="text-gray-600 leading-relaxed font-medium text-lg relative z-10 italic">
                      {review.comment}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="pt-10 text-center"
            >
              <button className="bg-white border border-black/5 px-8 py-4 rounded-2xl text-gray-500 font-bold hover:text-[#FF5C1A] hover:border-[#FF5C1A]/20 transition-all flex items-center gap-3 mx-auto shadow-sm hover:shadow-md">
                <MessageSquare className="w-5 h-5" />
                Lihat 2,497 Ulasan Lainnya
              </button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
