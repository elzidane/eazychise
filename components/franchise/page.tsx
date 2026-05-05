import Navbar from "@/components/Navbar";
import FranchiseListings from "@/components/FranchiseList";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import FranchiseAdvisor from "@/components/FranchiseAdvisor";

export default function FranchisePage() {
  return (
    <>
      <ScrollReveal />
      <Navbar />
      <main className="pt-24">
        <FranchiseListings />
      </main>
      <Footer />
      <FranchiseAdvisor />
    </>
  );
}