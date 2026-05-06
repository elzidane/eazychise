"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Send, CheckCircle2 } from "lucide-react";
import { Review } from "../types";

export function ReviewCard({ review, index }: { review: Review; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white p-6 md:p-8 rounded-[24px] border border-black/[0.04] shadow-sm hover:shadow-md transition-all duration-300 group relative"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#FF5C1A] to-[#FF8C1A] flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-[#FF5C1A]/10">
            {review.name[0]}
          </div>
          <div>
            <h4 className="font-bold text-[0.95rem] text-[#111] leading-none mb-1.5">{review.name}</h4>
            <div className="flex items-center gap-2">
              <div className="flex text-[#FFCF40] gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3 h-3 ${i < review.rating ? "fill-current" : "text-gray-200"}`} />
                ))}
              </div>
              <span className="w-1 h-1 rounded-full bg-gray-200" />
              <p className="text-[0.68rem] text-gray-400 font-medium uppercase tracking-wider">{review.date}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative">
        <p className="text-[#444] leading-relaxed text-[0.92rem] font-medium italic">
          "{review.comment}"
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-white border border-black/[0.04] rounded-[24px] p-6 md:p-8 shadow-sm relative z-20"
    >
      {!submitted ? (
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-syne font-bold text-xl text-[#111]">Tulis Ulasan</h3>
            <div className="w-10 h-1 bg-[#FF5C1A] rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 gap-5">
            <div className="space-y-2">
              <label className="text-[0.7rem] font-bold text-gray-400 uppercase tracking-widest ml-1">Nama Lengkap</label>
              <input
                required
                type="text"
                placeholder="Budi Santoso"
                className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF5C1A] focus:bg-white transition-all font-medium text-[#111] text-sm"
                value={newReview.name}
                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[0.7rem] font-bold text-gray-400 uppercase tracking-widest ml-1">Rating</label>
              <div className="flex gap-2 bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    className="focus:outline-none transition-transform active:scale-90"
                  >
                    <Star 
                      className={`w-5 h-5 transition-colors ${star <= newReview.rating ? "text-[#FFCF40] fill-current" : "text-gray-200"}`} 
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[0.7rem] font-bold text-gray-400 uppercase tracking-widest ml-1">Isi Ulasan</label>
            <textarea
              required
              rows={3}
              placeholder="Ceritakan pengalaman Anda..."
              className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:border-[#FF5C1A] focus:bg-white transition-all resize-none font-medium text-[#111] text-sm"
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#111] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#FF5C1A] transition-all active:scale-[0.98] text-[0.9rem]"
          >
            Kirim Ulasan <Send className="w-4 h-4" />
          </button>
        </form>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-10 text-center"
        >
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="text-xl font-black text-[#111] mb-2">Terima Kasih!</h3>
          <p className="text-gray-500 text-sm font-medium">Ulasan Anda sangat berarti bagi komunitas.</p>
        </motion.div>
      )}
    </motion.div>
  );
}
