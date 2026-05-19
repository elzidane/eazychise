"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FFF9F0]">
      {/* Dynamic Glowing Top Loading Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-neutral-100 overflow-hidden">
        <motion.div
          initial={{ left: "-100%" }}
          animate={{ left: "100%" }}
          transition={{
            repeat: Infinity,
            duration: 1.6,
            ease: "easeInOut",
          }}
          className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-[#FF5C1A] via-[#FFCF40] to-[#FF5C1A] shadow-[0_0_8px_#FF5C1A]"
        />
      </div>

      {/* Decorative background blobs */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-[#FF5C1A]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-[#FFCF40]/6 rounded-full blur-[100px] pointer-events-none" />

      {/* Animated Brand and Loader */}
      <div className="flex flex-col items-center text-center max-w-[280px]">
        {/* Spinner Logo Container */}
        <div className="relative w-16 h-16 mb-6 flex items-center justify-center">
          {/* Rotating outer ring */}
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full animate-[spin_2s_linear_infinite]">
            <circle cx="50" cy="50" r="44" stroke="url(#root-loader-gradient)" strokeWidth="3" strokeDasharray="30 40" strokeLinecap="round" />
            <defs>
              <linearGradient id="root-loader-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF5C1A" />
                <stop offset="100%" stopColor="#FFCF40" />
              </linearGradient>
            </defs>
          </svg>

          {/* Core spinning icon */}
          <Loader2 className="w-6 h-6 text-[#FF5C1A] animate-spin" style={{ animationDuration: '1.2s' }} />
        </div>

        {/* EazyChise Brand Name with transition slide-up */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-syne font-black text-2xl text-[#111] mb-2 tracking-tighter"
        >
          Eazy<span className="text-[#FF5C1A]">Chise</span>
        </motion.div>

        {/* Subtle status messages */}
        <motion.p
          animate={{ opacity: [0.5, 0.9, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="text-neutral-400 font-mono text-[0.62rem] uppercase tracking-[3px] mt-1"
        >
          Memuat Halaman
        </motion.p>
      </div>
    </div>
  );
}
