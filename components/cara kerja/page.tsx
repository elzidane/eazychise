import Navbar from "@/components/Navbar";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import FranchiseAdvisor from "@/components/FranchiseAdvisor";

export default function CaraKerjaPage() {
  return (
    <>
      <ScrollReveal />
      <Navbar />
      <main className="pt-24">
        <HowItWorks />
      </main>
      <Footer />
      <FranchiseAdvisor />
    </>
  );
}