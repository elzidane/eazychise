"use client";
import { BlurText, CountUp, ShinyText, GradientText, Particles, TiltCard, ScrollRevealText } from "./Reactbitseffects";

const features = [
  {
    icon: "🤖",
    title: "AI Franchise Matcher",
    desc: "Teknologi AI kami menganalisis ratusan data franchise dan profil bisnismu untuk memberikan rekomendasi yang paling akurat.",
    stat: 94,
    statLabel: "% akurasi rekomendasi",
    color: "#FF5C1A",
  },
  {
    icon: "🔍",
    title: "Verifikasi Menyeluruh",
    desc: "Setiap brand melewati 47 poin verifikasi ketat — legalitas, keuangan, sistem operasional, dan rekam jejak mitra.",
    stat: 47,
    statLabel: " poin verifikasi",
    color: "#FF8C42",
  },
  {
    icon: "📈",
    title: "ROI Tercepat",
    desc: "Franchise pilihan kami rata-rata balik modal dalam 3–6 bulan. Kami hanya tampilkan brand yang terbukti menguntungkan.",
    stat: 4.5,
    statLabel: " bln rata-rata ROI",
    color: "#FFCF40",
  },
  {
    icon: "🤝",
    title: "Pendampingan Penuh",
    desc: "Tim mentor berpengalaman mendampingi mulai dari persiapan modal, pemilihan lokasi, hingga operasional hari pertama.",
    stat: 320,
    statLabel: "+ mitra aktif",
    color: "#FF5C1A",
  },
];

export default function ReactBitsShowcase() {
  return (
    <section
      id="keunggulan"
      style={{
        background: "#0d0d10",
        padding: "120px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Particles background */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <Particles count={35} color="#FF5C1A" speed={0.25} size={1.5} opacity={0.3} />
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 99, background: "rgba(255,92,26,.1)", border: "1px solid rgba(255,92,26,.2)", marginBottom: 24 }}>
            <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "#FF8C42", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Kenapa GoChise?
            </span>
          </div>

          <h2
            style={{
              fontFamily: "var(--font-syne,sans-serif)",
              fontSize: "clamp(2rem,4vw,3.2rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            <BlurText
              text="Platform Franchise"
              delay={50}
              animateBy="words"
              className="text-white block"
            />
            <GradientText
              text="Paling Dipercaya di Indonesia"
              colors={["#FF5C1A", "#FF8C42", "#FFCF40", "#FF3D00", "#FF5C1A"]}
              speed={5}
              className="block"
            />
          </h2>

          <ScrollRevealText
            text="Kami bukan sekadar marketplace. GoChise adalah ekosistem franchise F&B terlengkap dengan teknologi AI, verifikasi ketat, dan komunitas mitra terbesar."
            stagger={40}
            from="bottom"
            className="text-[rgba(255,255,255,0.45)] text-[0.95rem] leading-[1.8] max-w-[560px] mx-auto"
          />
        </div>

        {/* Feature cards with TiltCard */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {features.map((f, i) => (
            <TiltCard
              key={f.title}
              maxTilt={10}
              scale={1.02}
              glare
              style={{
                borderRadius: 20,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "28px 24px",
                cursor: "default",
              }}
            >
              {/* Icon */}
              <div style={{ marginBottom: 16 }}>
                <div
                  style={{
                    width: 48, height: 48, borderRadius: 14,
                    background: `rgba(255,92,26,0.12)`,
                    border: `1px solid rgba(255,92,26,0.2)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.4rem",
                    animation: `float ${3 + i * 0.5}s ease-in-out ${i * 0.3}s infinite`,
                  }}
                >
                  {f.icon}
                </div>
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-syne,sans-serif)",
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "white",
                  marginBottom: 10,
                  letterSpacing: "-0.02em",
                }}
              >
                {f.title}
              </h3>

              <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.75, marginBottom: 20 }}>
                {f.desc}
              </p>

              {/* Stat */}
              <div
                style={{
                  padding: "12px 16px",
                  borderRadius: 12,
                  background: "rgba(255,92,26,0.08)",
                  border: "1px solid rgba(255,92,26,0.15)",
                  display: "flex",
                  alignItems: "baseline",
                  gap: 2,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-syne,sans-serif)",
                    fontSize: "1.6rem",
                    fontWeight: 800,
                    color: "#FF8C42",
                    lineHeight: 1,
                  }}
                >
                  <CountUp end={f.stat} duration={2000} decimals={f.stat % 1 !== 0 ? 1 : 0} />
                </span>
                <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>
                  {f.statLabel}
                </span>
              </div>

              {/* Bottom glow line */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: "20%",
                  right: "20%",
                  height: 1,
                  background: `linear-gradient(90deg, transparent, ${f.color}60, transparent)`,
                }}
              />
            </TiltCard>
          ))}
        </div>

        {/* Big CTA strip */}
        <div
          style={{
            marginTop: 64,
            padding: "40px 48px",
            borderRadius: 24,
            background: "linear-gradient(135deg, rgba(255,92,26,0.12) 0%, rgba(255,92,26,0.04) 100%)",
            border: "1px solid rgba(255,92,26,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <div>
            <ShinyText
              text="Siap mulai perjalanan franchise-mu?"
              speed={4}
              className="text-white font-bold text-[1.3rem] block mb-2"
            />
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.88rem" }}>
              Sudah <CountUp end={9000} duration={3000} suffix="+" className="text-[#FF8C42] font-bold" /> mitra aktif bergabung — giliran kamu!
            </p>
          </div>
          <a
            href="/"
            style={{
              padding: "14px 28px",
              borderRadius: 14,
              background: "linear-gradient(135deg,#FF5C1A,#FF8C42)",
              color: "white",
              fontWeight: 700,
              fontSize: "0.9rem",
              textDecoration: "none",
              boxShadow: "0 8px 28px rgba(255,92,26,.35)",
              transition: "all .2s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.transform="translateY(-2px)"; a.style.boxShadow="0 14px 36px rgba(255,92,26,.5)"; }}
            onMouseLeave={e => { const a = e.currentTarget as HTMLAnchorElement; a.style.transform="translateY(0)"; a.style.boxShadow="0 8px 28px rgba(255,92,26,.35)"; }}
          >
            ✨ Analisis AI Gratis →
          </a>
        </div>
      </div>

      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
      `}</style>
    </section>
  );
}