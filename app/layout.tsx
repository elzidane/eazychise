import type { Metadata } from "next";
import { Syne, Fraunces, Plus_Jakarta_Sans } from "next/font/google";
// @ts-ignore
import "./globals.css";
import GlobalEffects from "@/components/Globaleffect";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import FranchiseAdvisor from "@/components/FranchiseAdvisor";
import SplashScreen from "@/components/SplashScreen";

// Logo & UI accent — geometric, tegas
const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
  display: "swap",
});

// Section headings — serif ekspresif, karakteristik kuat
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

// Body & UI text — modern, mudah dibaca
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EazyChise – Platform Franchise F&B Indonesia",
  description:
    "Platform franchise digital fokus makanan & minuman terpercaya untuk UMKM Indonesia. Modal kecil, dukungan penuh.",
  keywords: "franchise, makanan, minuman, UMKM, Indonesia, F&B, kopi, bubble tea",
  openGraph: {
    title: "EazyChise – Platform Franchise F&B Indonesia",
    description:
      "Temukan 320+ franchise makanan & minuman terpercaya. Modal mulai Rp 2 juta.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${syne.variable} ${fraunces.variable} ${jakarta.variable}`}>
      <body className="font-jakarta bg-[#FFF9F0] text-[#111111] overflow-x-hidden">
        <SplashScreen />
        <ScrollReveal />
        <GlobalEffects />
        <Navbar />
        {children}
        <Footer />
        <FranchiseAdvisor />
      </body>
    </html>
  );
}