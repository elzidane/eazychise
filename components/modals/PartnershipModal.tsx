"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, X, CheckCircle2, Loader2, Send } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useToast } from "@/components/ui/Toast";

type PartnershipModalProps = {
  isOpen: boolean;
  onClose: () => void;
  franchiseName: string;
  franchiseId?: string;
};

export default function PartnershipModal({ isOpen, onClose, franchiseName, franchiseId }: PartnershipModalProps) {
  const { showToast } = useToast();
  const [step, setStep] = useState<"form" | "submitting" | "success">("form");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Name: Minimal 3 characters, alphabets and spaces only
    if (!/^[a-zA-Z\s]{3,}$/.test(formData.name)) {
      newErrors.name = "Nama minimal 3 karakter & hanya huruf.";
    }

    // Email: Standard email regex
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format email tidak valid.";
    }

    // Phone: 10-14 digits, starts with 08
    if (!/^08[0-9]{8,12}$/.test(formData.phone)) {
      newErrors.phone = "No. HP harus diawali 08 & minimal 10 digit.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!franchiseId) return;
    
    setStep("submitting");
    
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    
    const { error } = await supabase.from('partnership_requests').insert({
      franchise_id: franchiseId,
      user_id: session?.user?.id || null,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      message: formData.message,
      status: 'Baru'
    });

    if (error) {
      console.error(error);
      showToast("Terjadi kesalahan saat mengirim pengajuan.", "error");
      setStep("form");
      return;
    }
    
    setStep("success");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2.5rem)] md:w-full max-w-lg bg-white rounded-[24px] sm:rounded-[32px] shadow-2xl z-[101] overflow-y-auto max-h-[85vh] md:max-h-[min(800px,90vh)]"
          >
            <div className="p-5 sm:p-8 relative">
              {/* Close Button (Responsive for both Mobile & Desktop) */}
              <button 
                onClick={onClose}
                aria-label="Tutup modal"
                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors z-10 cursor-pointer"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {step === "form" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="pt-2 sm:pt-0"
                >
                  <h2 className="font-syne font-extrabold text-2xl sm:text-3xl text-[#111] mb-2 pr-8">
                    Ajukan Kemitraan
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 mb-6 sm:mb-8 font-medium leading-relaxed">
                    Lengkapi formulir di bawah untuk bergabung dengan <span className="text-[#FF5C1A] font-bold">{franchiseName}</span>.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5">Nama Lengkap</label>
                      <input
                        required
                        type="text"
                        placeholder="Contoh: Budi Santoso"
                        className={`w-full bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded-xl px-3.5 py-3 sm:px-4 sm:py-3.5 text-sm sm:text-base focus:outline-none focus:border-[#FF5C1A] focus:ring-2 focus:ring-[#FF5C1A]/10 transition-all`}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                      {errors.name && <p className="text-red-500 text-[0.7rem] font-bold mt-1.5 ml-1">{errors.name}</p>}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5">Email</label>
                        <input
                          required
                          type="email"
                          placeholder="budi@email.com"
                          className={`w-full bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl px-3.5 py-3 sm:px-4 sm:py-3.5 text-sm sm:text-base focus:outline-none focus:border-[#FF5C1A] focus:ring-2 focus:ring-[#FF5C1A]/10 transition-all`}
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        {errors.email && <p className="text-red-500 text-[0.7rem] font-bold mt-1.5 ml-1">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5">WhatsApp</label>
                        <input
                          required
                          type="tel"
                          placeholder="0812xxxx"
                          className={`w-full bg-gray-50 border ${errors.phone ? 'border-red-500' : 'border-gray-200'} rounded-xl px-3.5 py-3 sm:px-4 sm:py-3.5 text-sm sm:text-base focus:outline-none focus:border-[#FF5C1A] focus:ring-2 focus:ring-[#FF5C1A]/10 transition-all`}
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                        {errors.phone && <p className="text-red-500 text-[0.7rem] font-bold mt-1.5 ml-1">{errors.phone}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5">Rencana Lokasi Bisnis</label>
                      <input
                        required
                        type="text"
                        placeholder="Contoh: Jakarta Selatan / Bandung"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-3 sm:px-4 sm:py-3.5 text-sm sm:text-base focus:outline-none focus:border-[#FF5C1A] focus:ring-2 focus:ring-[#FF5C1A]/10 transition-all"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5">Pesan Tambahan (Opsional)</label>
                      <textarea
                        rows={3}
                        placeholder="Beritahu kami lebih lanjut tentang minat Anda..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-3 sm:px-4 sm:py-3.5 text-sm sm:text-base focus:outline-none focus:border-[#FF5C1A] focus:ring-2 focus:ring-[#FF5C1A]/10 transition-all resize-none"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#111] text-white py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-bold hover:bg-[#FF5C1A] transition-all flex items-center justify-center gap-2 sm:gap-3 shadow-lg hover:shadow-[#FF5C1A]/20 mt-4 group cursor-pointer"
                    >
                      Kirim Pengajuan
                      <Send className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </form>
                </motion.div>
              )}

              {step === "submitting" && (
                <div className="py-16 sm:py-20 flex flex-col items-center justify-center text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader2 className="w-12 h-12 sm:w-16 sm:h-16 text-[#FF5C1A]" />
                  </motion.div>
                  <p className="mt-4 sm:mt-6 text-base sm:text-xl font-bold text-gray-700">Mengirimkan Pengajuan...</p>
                </div>
              )}

              {step === "success" && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="py-8 sm:py-12 flex flex-col items-center text-center"
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-100 rounded-full flex items-center justify-center mb-4 sm:mb-6">
                    <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-green-500" />
                  </div>
                  <h2 className="font-syne font-extrabold text-2xl sm:text-3xl text-[#111] mb-2">
                    Berhasil Dikirim!
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 mb-8 sm:mb-10 max-w-sm leading-relaxed">
                    Terima kasih telah mengajukan kemitraan. Tim <span className="font-bold text-[#111]">{franchiseName}</span> akan menghubungi Anda segera melalui WhatsApp atau Email.
                  </p>
                  <button
                    onClick={onClose}
                    className="bg-[#111] text-white px-8 py-3 rounded-xl text-sm sm:text-base font-bold hover:bg-black transition-colors cursor-pointer"
                  >
                    Tutup
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
