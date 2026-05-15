"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowRight, Target, Eye, Heart, Shield, Users, Lightbulb, 
  CheckCircle2 
} from "lucide-react";
import WhyUs from "@/components/sections/WhyUs";
import Image from "next/image";

const team = [
  { name: "El Zidane Ardyansyah", role: "FullStack Developer, Mobile Developer", image: "/images/team/profile.jpg", color: "#FF5C1A" },
  { name: "Avis Zola Raditya Kurniawan", role: "Mobile App Developer", image: "/images/team/avatar_sari.png", color: "#7C3AED" },
];

const values = [
  { 
    icon: Shield, 
    title: "Transparansi", 
    desc: "Semua informasi franchise — modal, ROI, risiko — disajikan secara terbuka tanpa markup tersembunyi.",
    color: "#1B8C5A",
  },
  { 
    icon: Heart, 
    title: "Keberpihakan UMKM", 
    desc: "Platform ini dibangun untuk memberdayakan wirausaha kecil Indonesia, bukan sekadar keuntungan.",
    color: "#FF5C1A",
  },
  { 
    icon: Lightbulb, 
    title: "Inovasi Teknologi", 
    desc: "Memanfaatkan AI dan data analytics untuk membantu calon franchisee membuat keputusan yang lebih cerdas.",
    color: "#7C3AED",
  },
  { 
    icon: Users, 
    title: "Komunitas", 
    desc: "Membangun jaringan sesama pengusaha F&B yang saling mendukung dan berbagi pengalaman.",
    color: "#FFCF40",
  },
];

const timeline = [
  { year: "2024", title: "Ide Awal", desc: "Melihat betapa sulitnya calon pengusaha kecil menemukan dan membandingkan franchise F&B yang terpercaya." },
  { year: "2024", title: "Riset Pasar", desc: "Survei ke 50+ calon franchisee and 10+ brand franchise untuk memahami pain points utama di industri." },
  { year: "2025", title: "Pengembangan", desc: "Membangun platform dengan fitur AI Advisor, kalkulasi BEP, dan kurasi brand franchise terpercaya." },
  { year: "2025", title: "Beta Launch", desc: "Peluncuran versi beta EazyChise dengan 20+ brand franchise terkurasi dari seluruh Indonesia." },
];

export default function TentangContent() {
  return (
    <main className="pt-20">
      
      <section className="px-[5%] py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF5C1A]/5 rounded-full blur-[150px] -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FFCF40]/8 rounded-full blur-[120px] translate-y-1/2 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-[#FF5C1A] text-[0.72rem] font-bold uppercase tracking-[4px] mb-6 flex items-center justify-center gap-3">
              <span className="w-8 h-px bg-[#FF5C1A]" />
              Tentang Kami
              <span className="w-8 h-px bg-[#FF5C1A]" />
            </p>
            <h1 className="font-syne font-black text-[clamp(2.5rem,5vw,4.5rem)] text-[#111] leading-[1.05] mb-6">
              Kami Hadir Karena Franchise Seharusnya{" "}
              <em className="text-[#FF5C1A] not-italic">Mudah Dijangkau</em> Siapa Pun
            </h1>
            <p className="text-[#666] text-lg leading-[1.8] max-w-2xl mx-auto">
              Di Indonesia, ribuan orang bermimpi punya bisnis kuliner sendiri. 
              Tapi informasi franchise tersebar, tidak transparan, dan sering menjebak. 
              EazyChise hadir untuk mengubah itu.
            </p>
          </motion.div>
        </div>
      </section>

      
      <section className="px-[5%] py-20 bg-[#111111] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-30" style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF5C1A]/20 to-transparent" />

        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[#FF5C1A] text-[0.72rem] font-bold uppercase tracking-[3px] mb-4 flex items-center gap-2">
              <span className="w-6 h-px bg-[#FF5C1A]" />
              Cerita Kami
            </p>
            <h2 className="font-syne font-black text-[clamp(2rem,3.5vw,3rem)] text-white leading-[1.08] mb-12">
              Dari Masalah Nyata Menjadi{" "}
              <em className="text-[#FFCF40] not-italic">Solusi Nyata</em>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative bg-white/5 border border-white/8 rounded-2xl p-6 hover:bg-white/8 hover:border-[#FF5C1A]/20 transition-all group"
              >
                <div className="text-[#FF5C1A] font-syne font-extrabold text-sm mb-3">
                  {item.year}
                </div>
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#FF5C1A] transition-colors">
                  {item.title}
                </h3>
                <p className="text-white/40 text-sm leading-[1.7]">{item.desc}</p>
                
                {i < timeline.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-white/10" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="px-[5%] py-24 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#FF5C1A]/5 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[#FF5C1A] text-[0.72rem] font-bold uppercase tracking-[4px] mb-4 flex items-center justify-center gap-3">
              <span className="w-8 h-px bg-[#FF5C1A]" />
              Tim Kami
              <span className="w-8 h-px bg-[#FF5C1A]" />
            </p>
            <h2 className="font-syne font-black text-[clamp(2rem,3.5vw,3rem)] text-[#111] leading-[1.08]">
              Orang-orang di Balik <em className="text-[#FF5C1A] not-italic">EazyChise</em>
            </h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group bg-white rounded-2xl p-6 border border-black/5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:border-transparent transition-all text-center w-full max-w-[200px]"
              >
                <div 
                  className="w-16 h-16 rounded-2xl mx-auto mb-4 overflow-hidden relative shadow-sm"
                  style={{ background: `${member.color}15`, border: `2px solid ${member.color}30` }}
                >
                  <Image 
                    src={member.image} 
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <h3 className="font-bold text-[#111] text-sm mb-1 group-hover:text-[#FF5C1A] transition-colors">
                  {member.name}
                </h3>
                <p className="text-[#999] text-xs font-medium">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="px-[5%] py-24 bg-gradient-to-br from-[#111111] to-[#1a1a1a] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-20" style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Visi */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#FF5C1A]/20 flex items-center justify-center">
                  <Eye className="w-6 h-6 text-[#FF5C1A]" />
                </div>
                <h2 className="font-syne font-extrabold text-2xl text-white">Visi</h2>
              </div>
              <p className="font-syne font-black text-[clamp(1.5rem,2.5vw,2.2rem)] text-white/90 leading-[1.3] italic">
                &ldquo;Menjadi platform franchise F&B terpercaya yang memberdayakan 
                jutaan wirausaha Indonesia dari berbagai latar belakang.&rdquo;
              </p>
            </motion.div>

            {/* Misi */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#FFCF40]/20 flex items-center justify-center">
                  <Target className="w-6 h-6 text-[#FFCF40]" />
                </div>
                <h2 className="font-syne font-extrabold text-2xl text-white">Misi</h2>
              </div>
              <ul className="space-y-4">
                {[
                  "Mengkurasi brand franchise F&B terpercaya dengan verifikasi ketat",
                  "Menyediakan tools analisis seperti BEP Calculator dan AI Advisor gratis",
                  "Menjembatani calon franchisee dengan franchisor secara transparan",
                  "Mendukung pemerataan ekonomi UMKM di 34 provinsi Indonesia",
                  "Membangun komunitas wirausaha F&B yang saling mendukung",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/70 text-[0.92rem] leading-[1.7]">
                    <CheckCircle2 className="w-5 h-5 text-[#1B8C5A] flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      
      <section className="px-[5%] py-24 relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-[#FF5C1A] text-[0.72rem] font-bold uppercase tracking-[4px] mb-4 flex items-center justify-center gap-3">
              <span className="w-8 h-px bg-[#FF5C1A]" />
              Prinsip Kami
              <span className="w-8 h-px bg-[#FF5C1A]" />
            </p>
            <h2 className="font-syne font-black text-[clamp(2rem,3.5vw,3rem)] text-[#111] leading-[1.08]">
              Nilai-nilai yang <em className="text-[#FF5C1A] not-italic">Kami Pegang</em>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-7 border border-black/5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] transition-all group"
              >
                <div className="flex items-start gap-5">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                    style={{ background: `${v.color}15` }}
                  >
                    <v.icon className="w-6 h-6" style={{ color: v.color }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#111] text-lg mb-2 group-hover:text-[#FF5C1A] transition-colors">
                      {v.title}
                    </h3>
                    <p className="text-[#777] text-[0.88rem] leading-[1.7]">{v.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
      <WhyUs />

      
      <section className="px-[5%] py-24 relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-syne font-black text-[clamp(2rem,4vw,3.5rem)] text-[#111] leading-[1.08] mb-5">
              Bergabunglah dengan Wirausaha{" "}
              <em className="text-[#FF5C1A] not-italic">F&B Indonesia</em>
            </h2>
            <p className="text-[#777] text-lg leading-[1.7] mb-10 max-w-xl mx-auto">
              Jadilah bagian dari ekosistem franchise terpercaya. 
              Modal kecil, pendampingan penuh, peluang besar.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/daftar"
                className="group flex items-center gap-2 bg-[#FF5C1A] text-white px-8 py-4 rounded-full font-bold text-[0.95rem] shadow-[0_8px_28px_rgba(255,92,26,0.35)] hover:shadow-[0_12px_36px_rgba(255,92,26,0.5)] hover:-translate-y-0.5 transition-all"
              >
                Mulai Sekarang
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
