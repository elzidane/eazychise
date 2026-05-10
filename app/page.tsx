import Hero from "@/components/Hero";
import TrustMarquee from "@/components/TrustMarquee";
import FeaturedSection from "@/components/Featured";
import ReactBitsShowcase from "@/components/Reactbitsshowcase";
import AIAdvisorSection from "@/components/AIAdvisorSection";
import CTASection from "@/components/CTA";
import { createClient } from "@/utils/supabase/server";

async function getFranchises() {
  const supabase = await createClient();
  const { data } = await supabase.from('franchises').select('*');
  
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