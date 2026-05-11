"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, ShieldCheck } from "lucide-react";
import Image from "next/image";

interface GoogleLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (user: { name: string; email: string; image: string }) => void;
}

const MOCK_ACCOUNTS = [
  {
    name: "Ahmad Fauzi",
    email: "ahmad.fauzi@gmail.com",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad",
  },
  {
    name: "Siti Aminah",
    email: "siti.aminah@gmail.com",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Siti",
  },
];

export default function GoogleLoginModal({ isOpen, onClose, onSelect }: GoogleLoginModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-[400px] bg-white rounded-[32px] shadow-[0_32px_80px_rgba(0,0,0,0.3)] overflow-hidden"
          >
            {/* Header */}
            <div className="p-8 pb-4 text-center">
              <div className="flex justify-center mb-6">
                <svg width="40" height="40" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
              <h2 className="text-xl font-bold text-[#111] mb-1">Pilih akun</h2>
              <p className="text-sm text-gray-500">untuk melanjutkan ke <span className="font-bold text-[#FF5C1A]">EazyChise</span></p>
            </div>

            {/* Account List */}
            <div className="px-4 py-4 space-y-1">
              {MOCK_ACCOUNTS.map((acc) => (
                <button
                  key={acc.email}
                  onClick={() => onSelect(acc)}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all group"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden relative border border-black/5">
                    <Image src={acc.image} alt={acc.name} fill className="object-cover" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-sm font-bold text-[#111] group-hover:text-[#FF5C1A] transition-colors">{acc.name}</p>
                    <p className="text-xs text-gray-400">{acc.email}</p>
                  </div>
                </button>
              ))}
              
              <button className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all border-t border-black/5 mt-2">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                  <User className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-[#111]">Gunakan akun lain</p>
                </div>
              </button>
            </div>

            {/* Footer */}
            <div className="p-6 pt-2 text-[0.7rem] text-gray-400 leading-relaxed">
              <p>
                Untuk melanjutkan, Google akan membagikan nama, alamat email, preferensi bahasa, dan foto profil Anda dengan EazyChise. Sebelum menggunakan EazyChise, Anda dapat meninjau <span className="text-blue-500 cursor-pointer">Kebijakan Privasi</span> dan <span className="text-blue-500 cursor-pointer">Persyaratan Layanan</span>.
              </p>
              <div className="flex items-center gap-1.5 mt-4 justify-center text-[#1B8C5A] font-bold uppercase tracking-widest text-[0.6rem]">
                <ShieldCheck className="w-3 h-3" />
                Verified by Google Secure
              </div>
            </div>

            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
