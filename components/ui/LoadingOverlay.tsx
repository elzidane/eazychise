"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

interface LoadingOverlayProps {
  isOpen: boolean;
  message?: string;
}

export default function LoadingOverlay({ isOpen, message = "Memproses..." }: LoadingOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-neutral-950/45 backdrop-blur-md"
        >
          {/* Subtle slow floating background accents */}
          <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-[#FF5C1A]/10 rounded-full blur-[90px] pointer-events-none" />
          <div className="absolute bottom-1/3 right-1/3 w-[300px] h-[300px] bg-[#FFCF40]/8 rounded-full blur-[90px] pointer-events-none" />

          {/* Premium Glassmorphic Loading Card */}
          <motion.div
            initial={{ scale: 0.9, y: 15, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 15, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 260 }}
            className="relative bg-white/80 backdrop-blur-xl border border-white/40 rounded-[32px] p-10 max-w-[340px] w-full mx-4 shadow-[0_24px_50px_rgba(0,0,0,0.12)] flex flex-col items-center text-center overflow-hidden"
          >
            {/* Ambient inner glow */}
            <div className="absolute -top-10 -left-10 w-24 h-24 bg-[#FF5C1A]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-[#FFCF40]/10 rounded-full blur-2xl pointer-events-none" />

            {/* Custom Glowing Gradient Spinner */}
            <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
              {/* Pulsing Outer Ring */}
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FF5C1A] to-[#FFCF40] blur-[10px]"
              />

              {/* Rotating outer dash ring */}
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full animate-[spin_3s_linear_infinite]">
                <circle cx="50" cy="50" r="42" stroke="url(#spinner-gradient)" strokeWidth="3" strokeDasharray="30 40" strokeLinecap="round" />
                <defs>
                  <linearGradient id="spinner-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF5C1A" />
                    <stop offset="100%" stopColor="#FFCF40" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Rotating inner dash ring (counter-clockwise) */}
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-2 w-[80%] h-[80%] animate-[spin_2s_linear_infinite_reverse]">
                <circle cx="50" cy="50" r="40" stroke="rgba(255, 92, 26, 0.15)" strokeWidth="2.5" strokeDasharray="15 30" strokeLinecap="round" />
              </svg>

              {/* Central Loader Icon */}
              <Loader2 className="w-7 h-7 text-[#FF5C1A] animate-spin" style={{ animationDuration: '1.2s' }} />
            </div>

            {/* Brand Title */}
            <span className="font-syne font-black text-xs tracking-[4px] text-neutral-400 uppercase mb-3">
              EazyChise
            </span>

            {/* Message */}
            <motion.p
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="text-[#111] font-bold text-[0.92rem] leading-relaxed max-w-[200px]"
            >
              {message}
            </motion.p>
            
            {/* Sub-text decoration */}
            <span className="text-[0.68rem] text-neutral-400 font-medium mt-4 font-mono tracking-wider">
              Harap Tunggu...
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
