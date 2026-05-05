import Navbar from "@/components/Navbar";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import FranchiseAdvisor from "@/components/FranchiseAdvisor";

export default function UlasanPage() {
  return (
    <>
      <ScrollReveal />
      <Navbar />
      <main className="pt-24">
        <Testimonials />
      </main>
      <Footer />
      <FranchiseAdvisor />
    </>
  );
}