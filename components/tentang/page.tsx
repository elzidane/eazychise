import Navbar from "@/components/Navbar";
import WhyUs from "@/components/WhyUs";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import FranchiseAdvisor from "@/components/FranchiseAdvisor";

export default function TentangPage() {
  return (
    <>
      <ScrollReveal />
      <Navbar />
      <main className="pt-24">
        <WhyUs />
      </main>
      <Footer />
      <FranchiseAdvisor />
    </>
  );
}