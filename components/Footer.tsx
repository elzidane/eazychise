"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = { label: string; href: string };

const navLinks: Record<string, NavItem[]> = {
  "Franchise F&B": [
    { label: "Cari Franchise", href: "/franchise" },
    { label: "Franchise Terlaris", href: "/unggulan" },
    { label: "Modal < Rp 5 Juta", href: "/franchise" },
    { label: "Franchise Minuman", href: "/franchise" },
    { label: "Franchise Kuliner", href: "/franchise" },
  ],
  "Franchisor": [
    { label: "Daftarkan Brand", href: "/daftar" },
    { label: "Kelola Mitra", href: "/masuk" },
    { label: "Dashboard Brand", href: "/masuk" },
    { label: "Paket Promosi", href: "/daftar" },
    { label: "Panduan Listing", href: "/cara-kerja" },
  ],
  "Perusahaan": [
    { label: "Tentang EazyChise", href: "/tentang" },
    { label: "Blog & Tips Bisnis", href: "/blog" },
    { label: "Karir", href: "/karir" },
    { label: "Hubungi Kami", href: "https://wa.me/6287792735999" },
    { label: "Syarat & Kebijakan", href: "/kebijakan" },
  ],
};

const socials = [
  {
    label: "Facebook",
    href: "https://facebook.com/EazyChise.id",
    path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/EazyChise.id",
    path: "M16 3H8a5 5 0 0 0-5 5v8a5 5 0 0 0 5 5h8a5 5 0 0 0 5-5V8a5 5 0 0 0-5-5zm-4 5a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm4.5-.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2z",
  },
  {
    label: "X / Twitter",
    href: "https://twitter.com/EazyChise_id",
    path: "M4 4l16 16M4 20L20 4",
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@EazyChise",
    path: "M22 8s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C15.6 3.8 12 3.8 12 3.8s-3.6 0-5.8.1c-.6.1-1.9.1-3 1.3C2.3 6 2 8 2 8S1.7 10.2 1.7 12.4v2c0 2.2.3 4.4.3 4.4s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C8.2 23 12 23 12 23s3.6 0 5.8-.2c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.8 1.2-2.8s.3-2.2.3-4.4v-2C22 10.2 22 8 22 8z M9.5 15.5v-7l7 3.5-7 3.5z",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/6287792735999",
    path: "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z",
  },
];

export default function Footer() {
  const pathname = usePathname();

  // Hide Footer on Login and Register pages
  if (pathname === "/masuk" || pathname === "/daftar") {
    return null;
  }

  return (
    <footer className="bg-[#0A0A0A] text-white/40 px-[5%] pt-16 pb-8 relative overflow-hidden">
      {/* Subtle top glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,92,26,0.25), transparent)" }}
      />

      {/* Main grid */}
      <div className="grid grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1fr] gap-10 mb-14">

        {/* Brand col */}
        <div className="col-span-2 lg:col-span-1">
          <Link
            href="/"
            className="inline-flex items-baseline gap-0 font-syne font-extrabold text-[1.6rem] tracking-[-1px] text-white mb-4"
          >
            Eazy<span className="text-[#FF5C1A]">Chise</span>
            <sup className="text-[0.45rem] text-[#FF5C1A] font-bold ml-0.5 tracking-widest align-super">F&B</sup>
          </Link>
          <p className="text-[0.82rem] leading-[1.75] text-white/30 max-w-[260px] mb-6">
            Platform franchise digital fokus makanan &amp; minuman terpercaya untuk UMKM Indonesia.
          </p>

          {/* Socials */}
          <div className="flex gap-2">
            {socials.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/7 flex items-center justify-center hover:bg-[#FF5C1A] hover:border-[#FF5C1A] transition-all duration-200 group"
              >
                <svg
                  width="13" height="13" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                  className="text-white/40 group-hover:text-white transition-colors"
                >
                  <path d={s.path} />
                </svg>
              </Link>
            ))}
          </div>
        </div>

        {/* Link cols */}
        {Object.entries(navLinks).map(([heading, items]) => (
          <div key={heading}>
            <h4 className="text-[0.75rem] font-bold text-white uppercase tracking-[2px] mb-5">
              {heading}
            </h4>
            <ul className="flex flex-col gap-3">
              {items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    {...(item.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="text-[0.82rem] text-white/30 hover:text-white transition-colors duration-150"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[0.75rem] text-white/20">
          © 2025 EazyChise. Platform F&amp;B Franchise Indonesia 🇮🇩
        </p>
        <div className="flex items-center gap-3 flex-wrap justify-center">
          {["Kemenkominfo", "Kemenkop UKM", "BPOM Partner"].map((badge) => (
            <span
              key={badge}
              className="text-[0.65rem] text-white/15 border border-white/8 px-2.5 py-1 rounded-full"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}