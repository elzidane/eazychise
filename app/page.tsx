import Navbar from "@/components/Navbar";
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
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import FranchiseAdvisor from "@/components/FranchiseAdvisor";

export default function Home() {
  return (
    <>
      <ScrollReveal />
      <Navbar />
      <main>
        <Hero />
        <TrustMarquee />
        <HowItWorks />
        <FeaturedSection />
        <FranchiseListings />
        <WhyUs />
        <ReactBitsShowcase />
        <AIAdvisorSection />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
      <FranchiseAdvisor />
    </>
  );
}