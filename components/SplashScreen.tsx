"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";

    // Animate progress bar
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1.4;
      });
    }, 25);

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        document.body.style.overflow = "auto";
      }, 1200);
    }, 2400);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          suppressHydrationWarning
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#0a0a0a",
            overflow: "hidden",
          }}
        >
          {/* Ambient radial gradient background */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: `
              radial-gradient(ellipse 80% 60% at 20% 50%, rgba(255,92,26,0.07) 0%, transparent 60%),
              radial-gradient(ellipse 60% 80% at 80% 50%, rgba(255,207,64,0.05) 0%, transparent 60%)
            `,
            pointerEvents: "none",
          }} />

          {/* Noise texture overlay */}
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
            opacity: 0.5,
            pointerEvents: "none",
          }} />

          {/* Grid lines decoration */}
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
            pointerEvents: "none",
          }} />

          {/* Center Content */}
          <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center" }}>

            {/* Glowing orb behind logo */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{
                position: "absolute",
                width: 200,
                height: 200,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(255,92,26,0.15) 0%, transparent 70%)",
                filter: "blur(40px)",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />

            {/* Logo Icon */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ marginBottom: 24, position: "relative" }}
            >
              {/* Outer rotating ring */}
              <motion.svg
                width={72}
                height={72}
                viewBox="0 0 72 72"
                style={{ position: "absolute", top: 0, left: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, ease: "linear", repeat: Infinity }}
              >
                <circle
                  cx={36} cy={36} r={33}
                  fill="none"
                  stroke="url(#ring-gradient)"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeDasharray="50 160"
                />
                <defs>
                  <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF5C1A" />
                    <stop offset="100%" stopColor="#FFCF40" />
                  </linearGradient>
                </defs>
              </motion.svg>

              {/* Inner static ring */}
              <svg width={72} height={72} viewBox="0 0 72 72">
                <circle cx={36} cy={36} r={33} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
              </svg>

              {/* Center icon */}
              <div style={{
                position: "absolute",
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                width: 38, height: 38,
                background: "linear-gradient(135deg, rgba(255,92,26,0.15), rgba(255,207,64,0.08))",
                border: "1px solid rgba(255,92,26,0.3)",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="#FF5C1A" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 22V12h6v10" stroke="#FFCF40" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </motion.div>

            {/* Logo Text */}
            <motion.div
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ textAlign: "center", marginBottom: 8 }}
            >
              <div style={{
                fontFamily: "var(--font-syne, sans-serif)",
                fontWeight: 800,
                fontSize: "2.4rem",
                letterSpacing: "-0.03em",
                color: "#fff",
                lineHeight: 1,
              }}>
                Eazy<span style={{ color: "#FF5C1A" }}>Chise</span>
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-jakarta, sans-serif)",
                fontSize: "0.72rem",
                fontWeight: 500,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)",
                marginBottom: 48,
              }}
            >
              Platform Franchise F&amp;B Indonesia
            </motion.p>

            {/* Progress bar container */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              style={{
                width: 220,
                height: 1,
                background: "rgba(255,255,255,0.08)",
                borderRadius: 99,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.05, ease: "linear" }}
                style={{
                  position: "absolute",
                  left: 0, top: 0, bottom: 0,
                  background: "linear-gradient(90deg, #FF5C1A, #FFCF40)",
                  borderRadius: 99,
                  boxShadow: "0 0 12px rgba(255,92,26,0.5)",
                }}
              />
            </motion.div>

            {/* Progress number */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              style={{
                marginTop: 12,
                fontFamily: "var(--font-jakarta, sans-serif)",
                fontSize: "0.65rem",
                fontWeight: 600,
                color: "rgba(255,255,255,0.2)",
                letterSpacing: "0.08em",
              }}
            >
              {Math.min(100, Math.round(progress))}%
            </motion.div>
          </div>

          {/* Bottom credits */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            style={{
              position: "absolute",
              bottom: 32,
              fontFamily: "var(--font-jakarta, sans-serif)",
              fontSize: "0.6rem",
              fontWeight: 500,
              color: "rgba(255,255,255,0.12)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Franchise Made Easy
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
