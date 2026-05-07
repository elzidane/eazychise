import { Review, Stat, AIAdvisorStep } from "../types";
import { MdAttachMoney, MdLocationOn, MdExtension, MdRestaurant } from "react-icons/md";

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 1,
    name: "Andi Saputra",
    rating: 5,
    comment: "Platform yang sangat membantu untuk cari franchise. Akhirnya saya buka outlet kopi pertama saya!",
    date: "2 hari yang lalu"
  },
  {
    id: 2,
    name: "Siti Aminah",
    rating: 4,
    comment: "UI nya bagus banget, gampang nyarinya. Saran saya tambahin lebih banyak kategori snack.",
    date: "1 minggu yang lalu"
  },
  {
    id: 3,
    name: "Budi Hermawan",
    rating: 5,
    comment: "Fitur AI Advisor nya jenius! Rekomendasinya pas banget sama budget saya.",
    date: "3 hari yang lalu"
  }
];

export const HERO_STATS: Stat[] = [
  { value: "20", suffix: "+", label: "Brand F&B Dikurasi" },
  { value: "34", suffix: "", label: "Provinsi Terjangkau" },
  { value: "4", suffix: "", label: "Kategori F&B" },
];

export const HERO_IMAGES = [
  {
    src: "https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/b5c9d124-ac38-4461-ad28-6b847b0dc223_Combo-Jiwa-Toast.jpg",
    alt: "Jiwa Toast",
    name: "Janji Jiwa",
    meta: "Modal Rp 5 Juta • Kuliner",
    tall: true,
  },
  {
    src: "https://franchiseindo.co.id/wp-content/uploads/2025/12/image-7-1024x538.webp",
    alt: "Nescafe",
    name: "Nescafe",
    meta: "Modal Rp 3,5 Juta • Minuman",
    tall: false,
  },
  {
    src: "https://cdn.sanity.io/images/kbqq3e0r/production/d19beba03d5c400bb058dfe803e8994e653a5516-2400x1334.png",
    alt: "KFC",
    name: "KFC",
    meta: "Modal Rp 7 Juta • Kuliner",
    tall: false,
  },
];

export const AI_ADVISOR_STEPS: AIAdvisorStep[] = [
  { id: "modal", q: "Berapa modal yang kamu siapkan?", icon: MdAttachMoney, options: ["< Rp 3 Juta", "Rp 3–7 Juta", "Rp 7–15 Juta", "> Rp 15 Juta"] },
  { id: "lokasi", q: "Di mana kamu akan buka usaha?", icon: MdLocationOn, options: ["Jabodetabek", "Jawa Tengah/DIY", "Jawa Timur", "Luar Jawa"] },
  { id: "pengalaman", q: "Pengalaman bisnismu sejauh ini?", icon: MdExtension, options: ["Belum pernah", "Pernah, tapi gagal", "Punya bisnis sampingan", "Sudah berpengalaman"] },
  { id: "kategori", q: "Kategori F&B yang paling menarik?", icon: MdRestaurant, options: ["Kopi & Minuman", "Makanan Berat", "Dessert & Snack", "Semua cocok"] },
];
