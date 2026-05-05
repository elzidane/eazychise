import Hero from "@/components/Hero";
import TrustMarquee from "@/components/TrustMarquee";
import FeaturedSection from "@/components/Featured";
import ReactBitsShowcase from "@/components/Reactbitsshowcase";
import AIAdvisorSection from "@/components/AIAdvisorSection";
import CTASection from "@/components/CTA";

export default function Home() {
  return (
    <main>
      <section id="hero">
        <Hero />
      </section>

      <section id="trust">
        <TrustMarquee />
      </section>

      <section id="featured">
        <FeaturedSection />
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