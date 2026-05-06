import ReviewsSection from "@/components/ReviewsSection";

export const metadata = {
  title: "Ulasan Pengguna - EazyChise",
  description: "Lihat apa kata para pengusaha dan calon mitra mengenai platform EazyChise.",
};

export default function UlasanPage() {
  return (
    <main className="pt-24 lg:pt-28">
      <ReviewsSection />
    </main>
  );
}
