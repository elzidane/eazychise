import Hero from "@/components/sections/Hero";
import TrustMarquee from "@/components/sections/TrustMarquee";
import FeaturedSection from "@/components/sections/Featured";
import ReactBitsShowcase from "@/components/effects/Reactbitsshowcase";
import AIAdvisorSection from "@/components/sections/AIAdvisorSection";
import CTASection from "@/components/sections/CTA";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "EazyChise - Platform Franchise F&B Terlengkap & Terpercaya",
  description: "Cari dan bandingkan ratusan peluang franchise F&B terbaik di Indonesia. Analisis modal, profit, dan lokasi secara instan dengan bantuan teknologi AI.",
  openGraph: {
    title: "EazyChise - Mudahkan Jalan Jadi Pengusaha",
    description: "Platform kurasi franchise kuliner dan minuman #1 di Indonesia.",
  }
};

async function getFranchises() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('franchises')
    .select('*')
    .limit(6)
    .order('rating', { ascending: false });
  
  if (!data) return undefined;
  
  // Format to match old structure
  return data.map(f => ({
    id: f.id,
    name: f.name,
    cat: f.cat,
    catKey: f.cat_key,
    city: f.city,
    rating: f.rating,
    invest: f.invest_text,
    investNum: f.invest_num,
    roi: f.roi,
    omzet: f.omzet,
    mitra: f.mitra_count,
    badge: f.badge,
    badgeColor: f.badge_color,
    img: f.img
  }));
}

export default async function Home() {
  const franchises = await getFranchises();
  const safeData = franchises && franchises.length > 0 ? franchises : undefined;

  return (
    <main>
      <section id="hero">
        <Hero />
      </section>

      <section id="trust">
        <TrustMarquee />
      </section>

      <section id="featured">
        <FeaturedSection initialData={safeData} />
      </section>

      <section id="showcase">
        <ReactBitsShowcase />
      </section>

      <section id="ai-advisor">
        <AIAdvisorSection />
      </section>

      <section id="cta">
        <CTASection />
      </section>
    </main>
  );
}