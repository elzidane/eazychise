import { Metadata } from "next";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "Blog & Tips Bisnis Franchise F&B | EazyChise",
  description: "Dapatkan panduan lengkap, tips investasi, dan analisis pasar terbaru seputar industri franchise makanan dan minuman di Indonesia.",
  openGraph: {
    title: "Insight Bisnis F&B Indonesia - EazyChise",
    description: "Belajar cara membangun bisnis franchise yang sukses bersama para ahli.",
  }
};

export default function BlogPage() {
  return <BlogContent />;
}
