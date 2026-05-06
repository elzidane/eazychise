export type Franchise = {
  img: string;
  alt: string;
  cat: string;
  catKey: string;
  name: string;
  rating: number;
  city: string;
  invest: string;
  investNum: number;
  roi: string;
  omzet: string;
  mitra: string;
  badge?: string;
  badgeColor?: string;
};

export const FRANCHISE_DATA: Franchise[] = [
  // ─── Minuman ───────────────────────────────────────────────────
  {
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/1280px-A_small_cup_of_coffee.JPG",
    alt: "Kopi", cat: "Minuman", catKey: "minuman",
    name: "Kopiku Nusantara", rating: 4.9, city: "25+ kota Indonesia",
    invest: "Rp 2,8 Juta", investNum: 2_800_000, roi: "3–5 bln",
    omzet: "Rp 8–18 Juta", mitra: "3.100+",
    badge: "Modal Kecil", badgeColor: "#1B8C5A",
  },
  {
    img: "https://arengaindonesia.com/wp-content/uploads/2025/03/Rahasia-boba-kekinian-dengan-gula-aren-cair-premium.jpg",
    alt: "Bubble Tea", cat: "Minuman", catKey: "minuman",
    name: "BubbleBOOM Indonesia", rating: 4.8, city: "Jawa, Bali, Sumatera",
    invest: "Rp 3,5 Juta", investNum: 3_500_000, roi: "4–6 bln",
    omzet: "Rp 12–22 Juta", mitra: "2.300+",
    badge: "Terpopuler", badgeColor: "#FF5C1A",
  },
  {
    img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80",
    alt: "Kopi Susu Kekinian", cat: "Minuman", catKey: "minuman",
    name: "Kopi Kenangan Express", rating: 4.9, city: "100+ kota Indonesia",
    invest: "Rp 15 Juta", investNum: 15_000_000, roi: "8–12 bln",
    omzet: "Rp 30–60 Juta", mitra: "900+",
    badge: "Unicorn Brand", badgeColor: "#7C3AED",
  },
  {
    img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80",
    alt: "Es Teh", cat: "Minuman", catKey: "minuman",
    name: "Es Teh Indonesia", rating: 4.7, city: "Jawa, Bali, Kalimantan",
    invest: "Rp 5 Juta", investNum: 5_000_000, roi: "4–6 bln",
    omzet: "Rp 10–20 Juta", mitra: "2.500+",
    badge: "Viral 2024", badgeColor: "#1B8C5A",
  },
  {
    img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
    alt: "Kopi Janji Jiwa", cat: "Minuman", catKey: "minuman",
    name: "Janji Jiwa Coffee", rating: 4.8, city: "30+ kota Indonesia",
    invest: "Rp 10 Juta", investNum: 10_000_000, roi: "6–9 bln",
    omzet: "Rp 18–35 Juta", mitra: "1.000+",
    badge: "Lokal Terbaik", badgeColor: "#FF5C1A",
  },
  {
    img: "https://i.gojekapi.com/darkroom/gofood-indonesia/v2/images/uploads/e4f13c30-ae96-4e41-8d7c-654861057ae9_Oolong-Silken-Milk-Tea.jpg",
    alt: "Chatime Bubble Tea", cat: "Minuman", catKey: "minuman",
    name: "Chatime Indonesia", rating: 4.6, city: "50+ kota Indonesia",
    invest: "Rp 45 Juta", investNum: 45_000_000, roi: "12–18 bln",
    omzet: "Rp 50–100 Juta", mitra: "200+",
    badge: "Premium Brand", badgeColor: "#7C3AED",
  },
  {
    img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80",
    alt: "Minuman Manis", cat: "Minuman", catKey: "minuman",
    name: "Mixue Ice Cream & Tea", rating: 4.5, city: "Seluruh Indonesia",
    invest: "Rp 8 Juta", investNum: 8_000_000, roi: "5–8 bln",
    omzet: "Rp 12–28 Juta", mitra: "3.000+",
    badge: "Ekspansi Cepat", badgeColor: "#FF5C1A",
  },

  // ─── Kuliner ───────────────────────────────────────────────────
  {
    img: "https://cdn1-production-images-kly.akamaized.net/vM8lSOhUdwyTysWXZgFHPx6QR9A=/0x0:6000x3382/1200x675/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/3524401/original/066199400_1627521905-2021-07-28.jpg",
    alt: "Mie Ayam", cat: "Kuliner", catKey: "kuliner",
    name: "Mie Ayam Bakso Mas Agus", rating: 4.7, city: "Pulau Jawa & Bali",
    invest: "Rp 8,5 Juta", investNum: 8_500_000, roi: "6–9 bln",
    omzet: "Rp 18–30 Juta", mitra: "940+",
    badge: "Best Seller", badgeColor: "#FF5C1A",
  },
  {
    img: "https://asset.kompas.com/crops/VcgvggZKE2VHqIAUp1pyHFXXYCs=/202x66:1000x599/1200x800/data/photo/2023/05/07/6456a450d2edd.jpg",
    alt: "Nasi Goreng", cat: "Kuliner", catKey: "kuliner",
    name: "Nasi Goreng Gila Express", rating: 4.8, city: "20+ kota Indonesia",
    invest: "Rp 7 Juta", investNum: 7_000_000, roi: "5–7 bln",
    omzet: "Rp 14–25 Juta", mitra: "1.200+",
    badge: "Trending", badgeColor: "#7C3AED",
  },
  {
    img: "https://www.dapurkobe.co.id/wp-content/uploads/soto-ayam.jpg",
    alt: "Soto Betawi", cat: "Kuliner", catKey: "kuliner",
    name: "Soto Betawi Pak Haji", rating: 4.9, city: "Jabodetabek & Jawa Barat",
    invest: "Rp 12 Juta", investNum: 12_000_000, roi: "6–8 bln",
    omzet: "Rp 20–35 Juta", mitra: "520+",
  },
  {
    img: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600&q=80",
    alt: "Kebab", cat: "Kuliner", catKey: "kuliner",
    name: "Kebab Turki Baba Rafi", rating: 4.8, city: "Seluruh Indonesia",
    invest: "Rp 8 Juta", investNum: 8_000_000, roi: "5–8 bln",
    omzet: "Rp 15–28 Juta", mitra: "1.800+",
    badge: "Legendaris", badgeColor: "#FF5C1A",
  },
  {
    img: "https://images.unsplash.com/photo-1562967914-608f82629710?w=600&q=80",
    alt: "Ayam Geprek", cat: "Kuliner", catKey: "kuliner",
    name: "Ayam Geprek Bensu", rating: 4.7, city: "Jawa & Sumatera",
    invest: "Rp 25 Juta", investNum: 25_000_000, roi: "10–14 bln",
    omzet: "Rp 35–60 Juta", mitra: "600+",
    badge: "Brand Artis", badgeColor: "#7C3AED",
  },
  {
    img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80",
    alt: "Mie Pedas", cat: "Kuliner", catKey: "kuliner",
    name: "Mie Gacoan", rating: 4.9, city: "Jawa, Bali, Sumatera",
    invest: "Rp 30 Juta", investNum: 30_000_000, roi: "10–15 bln",
    omzet: "Rp 50–90 Juta", mitra: "150+",
    badge: "Antrian Panjang", badgeColor: "#FF5C1A",
  },
  {
    img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
    alt: "Bakso", cat: "Kuliner", catKey: "kuliner",
    name: "Bakso Benhil Jakarta", rating: 4.8, city: "Jabodetabek & Bandung",
    invest: "Rp 10 Juta", investNum: 10_000_000, roi: "6–9 bln",
    omzet: "Rp 20–38 Juta", mitra: "420+",
  },
  {
    img: "https://images.unsplash.com/photo-1594221708779-94832f4320d1?w=600&q=80",
    alt: "Ayam Bakar", cat: "Kuliner", catKey: "kuliner",
    name: "Ayam Bakar Wong Solo", rating: 4.9, city: "30+ kota Indonesia",
    invest: "Rp 18 Juta", investNum: 18_000_000, roi: "8–12 bln",
    omzet: "Rp 30–55 Juta", mitra: "350+",
    badge: "Legendaris", badgeColor: "#1B8C5A",
  },
  {
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
    alt: "Ayam Penyet", cat: "Kuliner", catKey: "kuliner",
    name: "Ayam Penyet Ria", rating: 4.7, city: "Jawa & Kalimantan",
    invest: "Rp 14 Juta", investNum: 14_000_000, roi: "7–10 bln",
    omzet: "Rp 22–42 Juta", mitra: "280+",
    badge: "Klasik", badgeColor: "#1B8C5A",
  },
  {
    img: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=600&q=80",
    alt: "Nasi Padang", cat: "Kuliner", catKey: "kuliner",
    name: "Padang Express Sederhana", rating: 4.8, city: "Seluruh Indonesia",
    invest: "Rp 20 Juta", investNum: 20_000_000, roi: "8–11 bln",
    omzet: "Rp 35–65 Juta", mitra: "500+",
  },

  // ─── Dessert ───────────────────────────────────────────────────
  {
    img: "https://richcreme.com/wp-content/uploads/2022/11/18.RCWC-Nastar-Crumble-Dessert-Box.jpg",
    alt: "Dessert Box", cat: "Dessert", catKey: "dessert",
    name: "Sweet Street Dessert Co.", rating: 4.7, city: "Jawa, Bali & Makassar",
    invest: "Rp 6,5 Juta", investNum: 6_500_000, roi: "5–8 bln",
    omzet: "Rp 10–18 Juta", mitra: "780+",
    badge: "Hits", badgeColor: "#FF5C1A",
  },
  {
    img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80",
    alt: "Brownies", cat: "Dessert", catKey: "dessert",
    name: "Brownies Amanda Bandung", rating: 4.9, city: "Jawa & Bali",
    invest: "Rp 12 Juta", investNum: 12_000_000, roi: "7–10 bln",
    omzet: "Rp 20–40 Juta", mitra: "300+",
    badge: "Terkenal", badgeColor: "#7C3AED",
  },
  {
    img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80",
    alt: "Es Krim", cat: "Dessert", catKey: "dessert",
    name: "Aice Ice Cream", rating: 4.6, city: "Seluruh Indonesia",
    invest: "Rp 3 Juta", investNum: 3_000_000, roi: "3–5 bln",
    omzet: "Rp 6–14 Juta", mitra: "5.000+",
    badge: "Modal Kecil", badgeColor: "#1B8C5A",
  },

  // ─── Snack ─────────────────────────────────────────────────────
  {
    img: "https://images.unsplash.com/photo-1528825871115-3581a5387919?w=600&q=80",
    alt: "Pisang Goreng", cat: "Snack", catKey: "snack",
    name: "Pisang Goreng Madu Bu Nanik", rating: 4.8, city: "15+ kota Indonesia",
    invest: "Rp 4 Juta", investNum: 4_000_000, roi: "3–5 bln",
    omzet: "Rp 8–15 Juta", mitra: "1.200+",
    badge: "Modal Kecil", badgeColor: "#1B8C5A",
  },
  {
    img: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=600&q=80",
    alt: "Martabak", cat: "Snack", catKey: "snack",
    name: "Martabak San Francisco", rating: 4.7, city: "Jawa & Bali",
    invest: "Rp 6 Juta", investNum: 6_000_000, roi: "4–6 bln",
    omzet: "Rp 12–22 Juta", mitra: "800+",
    badge: "Klasik", badgeColor: "#FF5C1A",
  },
  {
    img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80",
    alt: "Siomay", cat: "Snack", catKey: "snack",
    name: "Siomay & Batagor Bandung", rating: 4.6, city: "Jawa & Sumatera",
    invest: "Rp 3,5 Juta", investNum: 3_500_000, roi: "3–4 bln",
    omzet: "Rp 7–13 Juta", mitra: "950+",
    badge: "Modal Kecil", badgeColor: "#1B8C5A",
  },
];
