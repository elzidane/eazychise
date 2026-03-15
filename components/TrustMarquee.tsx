"use client";

const row1 = ["Kuliner Nusantara", "Minuman Kekinian", "Kopi & Teh", "Jajanan Pinggir Jalan"];
const row2 = ["Bakso & Mie", "Dessert & Kue", "Ayam Goreng", "Seafood Bakar"];

function MarqueeRow({
  items,
  reverse = false,
  speed = 28,
}: {
  items: string[];
  reverse?: boolean;
  speed?: number;
}) {
  const doubled = [...items, ...items, ...items, ...items];
  return (
    <div className="flex overflow-hidden">
      <div
        className="flex items-center gap-0 whitespace-nowrap"
        style={{
          animation: `marquee ${speed}s linear infinite ${reverse ? "reverse" : ""}`,
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-3 px-8"
          >
            <span className="text-[0.8rem] font-semibold text-white/40 uppercase tracking-[1.5px]">
              {item}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#FF5C1A]/40 flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}

export default function TrustMarquee() {
  return (
    <div className="relative bg-[#111111] overflow-hidden">
      {/* Top fade line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF5C1A]/20 to-transparent" />

      <div className="py-5 flex flex-col gap-3">
        <MarqueeRow items={row1} speed={30} />
        <MarqueeRow items={row2} reverse speed={24} />
      </div>

      {/* Left & right fade masks */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#111111] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#111111] to-transparent pointer-events-none" />

      {/* Bottom fade line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </div>
  );
}