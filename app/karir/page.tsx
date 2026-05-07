"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Clock, Briefcase, Code, Palette, BarChart3, Heart } from "lucide-react";
import { MdRocketLaunch, MdHandshake, MdLightbulb, MdFavorite } from "react-icons/md";

const positions = [
  {
    title: "Frontend Developer (React/Next.js)",
    type: "Full-time",
    location: "Remote / Jakarta",
    icon: Code,
    color: "#7C3AED",
    description: "Membantu mengembangkan fitur baru di platform EazyChise. Pengalaman dengan React, Next.js, dan Tailwind CSS diperlukan.",
    requirements: [
      "Minimal 1 tahun pengalaman dengan React/Next.js",
      "Familiar dengan Tailwind CSS dan TypeScript",
      "Memahami responsive design dan web performance",
      "Mampu bekerja dalam tim dan komunikasi yang baik",
    ],
  },
  {
    title: "Business Development Intern",
    type: "Internship (3 bulan)",
    location: "Jakarta",
    icon: BarChart3,
    color: "#FF5C1A",
    description: "Membantu tim dalam mencari dan mengkurasi brand franchise F&B baru untuk bergabung di platform EazyChise.",
    requirements: [
      "Mahasiswa aktif jurusan Bisnis, Manajemen, atau terkait",
      "Tertarik dengan industri F&B dan franchise",
      "Kemampuan komunikasi dan negosiasi yang baik",
      "Proaktif dan mau belajar hal baru",
    ],
  },
];

export default function KarirPage() {
  return (
    <main className="min-h-screen pt-28 pb-20 px-[5%]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="text-[#FF5C1A] text-[0.72rem] font-bold uppercase tracking-[4px] mb-4 flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-[#FF5C1A]" />
            Karir
            <span className="w-8 h-px bg-[#FF5C1A]" />
          </p>
          <h1 className="font-fraunces font-black text-[clamp(2.2rem,4vw,3.5rem)] text-[#111] leading-[1.08] mb-5">
            Bergabung Bersama <em className="text-[#FF5C1A] not-italic">Kami</em>
          </h1>
          <p className="text-[#777] text-lg max-w-xl mx-auto leading-[1.7]">
            Kami mencari orang-orang passionate yang ingin membantu jutaan wirausaha F&B Indonesia mewujudkan mimpinya.
          </p>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {[
            { icon: MdRocketLaunch, label: "Growth Mindset", color: "#FF5C1A" },
            { icon: MdHandshake, label: "Kolaboratif", color: "#7C3AED" },
            { icon: MdLightbulb, label: "Inovatif", color: "#FFCF40" },
            { icon: MdFavorite, label: "Impact Driven", color: "#E11D48" },
          ].map((v) => (
            <div key={v.label} className="bg-white rounded-2xl p-5 border border-black/5 text-center">
              <div className="w-12 h-12 rounded-xl mx-auto flex items-center justify-center text-2xl" style={{ background: `${v.color}15`, color: v.color }}>
                <v.icon />
              </div>
              <p className="text-sm font-bold text-[#555] mt-2">{v.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Positions */}
        <div className="space-y-6">
          <h2 className="font-syne font-extrabold text-xl text-[#111]">Posisi Terbuka</h2>
          
          {positions.map((pos, i) => (
            <motion.div
              key={pos.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="bg-white rounded-2xl p-7 border border-black/5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] transition-all group"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-5">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${pos.color}15` }}
                >
                  <pos.icon className="w-6 h-6" style={{ color: pos.color }} />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-bold text-[#111] text-lg mb-2 group-hover:text-[#FF5C1A] transition-colors">
                    {pos.title}
                  </h3>
                  <div className="flex items-center gap-4 flex-wrap mb-4">
                    <span className="text-xs text-[#999] flex items-center gap-1">
                      <Briefcase className="w-3 h-3" /> {pos.type}
                    </span>
                    <span className="text-xs text-[#999] flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {pos.location}
                    </span>
                  </div>
                  <p className="text-[#777] text-sm leading-[1.7] mb-4">{pos.description}</p>
                  
                  <div className="space-y-2 mb-5">
                    {pos.requirements.map((req, j) => (
                      <p key={j} className="text-[#888] text-sm flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF5C1A] flex-shrink-0 mt-1.5" />
                        {req}
                      </p>
                    ))}
                  </div>

                  <a
                    href="mailto:karir@eazychise.id"
                    className="inline-flex items-center gap-2 bg-[#111] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#FF5C1A] transition-all"
                  >
                    Lamar Sekarang <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-[#999] text-sm mb-2">Tidak menemukan posisi yang cocok?</p>
          <p className="text-[#555] text-sm font-medium">
            Kirim CV dan portofoliomu ke{" "}
            <a href="mailto:karir@eazychise.id" className="text-[#FF5C1A] font-bold hover:underline">
              karir@eazychise.id
            </a>
          </p>
        </motion.div>
      </div>
    </main>
  );
}
