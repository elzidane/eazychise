"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Send, CheckCircle2 } from "lucide-react";
import { Review } from "../types";

export function ReviewCard({ review, index }: { review: Review; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
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
  );
}

export function ReviewForm({ 
  submitted, 
  newReview, 
  setNewReview, 
  onSubmit 
}: { 
  submitted: boolean; 
  newReview: any; 
  setNewReview: (r: any) => void; 
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 40, scale: 0.9 }}
      className="bg-white border border-black/5 rounded-[40px] p-10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] relative z-20"
    >
      {!submitted ? (
        <form onSubmit={onSubmit} className="space-y-6">
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
  );
}
