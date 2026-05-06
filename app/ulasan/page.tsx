import ReviewsSection from "@/components/ReviewsSection";

export const metadata = {
  title: "Ulasan Pengguna - EazyChise",
  description: "Lihat apa kata para pengusaha dan calon mitra mengenai platform EazyChise.",
};

export default function UlasanPage() {
  return (
    <main className="pt-20">
      <ReviewsSection />
    </main>
  );
}
