import Hero from "@/components/Hero";
import TrustMarquee from "@/components/TrustMarquee";
import HowItWorks from "@/components/HowItWorks";
import FeaturedSection from "@/components/Featured";
import FranchiseListings from "@/components/FranchiseList";
import WhyUs from "@/components/WhyUs";
import ReactBitsShowcase from "@/components/Reactbitsshowcase";
import AIAdvisorSection from "@/components/AIAdvisorSection";
import Testimonials from "@/components/Testimonials";
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

      <section id="how-it-works">
        <HowItWorks />
      </section>

      <section id="featured">
        <FeaturedSection />
      </section>

      <section id="franchise">
        <FranchiseListings />
      </section>

      <section id="why-us">
        <WhyUs />
      </section>

      <section id="showcase">
        <ReactBitsShowcase />
      </section>

      <section id="ai-advisor">
        <AIAdvisorSection />
      </section>

      <section id="testimonials">
        <Testimonials />
      </section>

      <section id="cta">
        <CTASection />
      </section>
    </main>
  );
}