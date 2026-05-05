import Navbar from "@/components/Navbar";
import FeaturedSection from "@/components/Featured";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import FranchiseAdvisor from "@/components/FranchiseAdvisor";

export default function UnggulanPage() {
  return (
    <>
      <ScrollReveal />
      <Navbar />
      <main className="pt-24">
        <FeaturedSection />
      </main>
      <Footer />
      <FranchiseAdvisor />
    </>
  );
}