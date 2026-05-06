"use client";

import React, { useEffect, useState, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// ── Leaflet Icon Fix ─────────────────────────────────────────────
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom marker icons by type
const makeIcon = (color: string) =>
  L.divIcon({
    className: "",
    iconAnchor: [14, 14],
    popupAnchor: [0, -16],
    html: `
      <div style="
        width:28px; height:28px; border-radius:50%;
        background:${color}; border:3px solid #fff;
        box-shadow:0 2px 8px rgba(0,0,0,0.3);
        display:flex; align-items:center; justify-content:center;
        font-size:13px;
      ">
        <span style="filter:drop-shadow(0 0 2px rgba(0,0,0,0.3))">📍</span>
      </div>
    `,
  });

const icons: Record<string, L.DivIcon> = {
  kampus:       makeIcon("#6C47FF"),
  sekolah:      makeIcon("#2563EB"),
  mall:         makeIcon("#FF5C1A"),
  pasar:        makeIcon("#D97706"),
  perkantoran:  makeIcon("#059669"),
  kafe:         makeIcon("#DB2777"),
  stasiun:      makeIcon("#0284C7"),
  perumahan:    makeIcon("#7C3AED"),
  default:      makeIcon("#64748B"),
};

const userIcon = L.divIcon({
  className: "",
  iconAnchor: [14, 14],
  popupAnchor: [0, -16],
  html: `
    <div style="
      width:28px; height:28px; border-radius:50%;
      background:#111; border:3px solid #FF5C1A;
      box-shadow:0 2px 12px rgba(255,92,26,0.5);
      display:flex; align-items:center; justify-content:center;
      font-size:13px;
    ">🏠</div>
  `,
});

// ── Types ────────────────────────────────────────────────────────
type POI = {
  id: number;
  lat: number;
  lon: number;
  name: string;
  type: string;
  typeKey: string;
  score: number; // traffic potential score 1-5
  why: string;
};

// ── Traffic analysis per type ────────────────────────────────────
const WHY: Record<string, string> = {
  kampus:       "Ratusan mahasiswa setiap hari butuh minuman & camilan saat kuliah, ujian, dan istirahat.",
  sekolah:      "Pelajar dan orang tua adalah konsumen harian yang konsisten saat jam masuk & pulang sekolah.",
  mall:         "Pengunjung yang sudah dalam mood belanja & makan — konversi penjualan cenderung sangat tinggi.",
  pasar:        "Keramaian pagi yang konsisten. Penjual & pembeli pasar biasa mampir untuk sarapan & minuman.",
  perkantoran:  "Ribuan karyawan butuh kopi pagi, makan siang, dan cemilan sore setiap hari kerja.",
  kafe:         "Ekosistem F&B yang sudah matang — konsumen terbiasa beli makanan & minuman di area ini.",
  stasiun:      "Commuter yang berlalu lalang setiap jam adalah pasar yang sangat ideal untuk produk cepat saji.",
  perumahan:    "Keluarga sebagai target delivery dan kunjungan santai di sore-malam hari.",
  default:      "Titik keramaian dengan potensi traffic konsumen F&B yang signifikan.",
};

const SCORE: Record<string, number> = {
  mall: 5, stasiun: 5, kampus: 4, perkantoran: 4, pasar: 4, kafe: 3, sekolah: 3, perumahan: 2, default: 2,
};

function classifyElement(el: any): { type: string; typeKey: string } | null {
  const t = el.tags || {};

  if (t.amenity === "university" || t.amenity === "college") return { type: "Kampus/Universitas", typeKey: "kampus" };
  if (t.amenity === "school") return { type: "Sekolah", typeKey: "sekolah" };
  if (t.shop === "mall" || t.leisure === "shopping_centre" || t.building === "mall")
    return { type: "Pusat Perbelanjaan", typeKey: "mall" };
  if (t.amenity === "marketplace" || t.shop === "market") return { type: "Pasar Tradisional", typeKey: "pasar" };
  if (t.amenity === "cafe" || t.amenity === "coffee_shop") return { type: "Area Kafe", typeKey: "kafe" };
  if (t.amenity === "railway_station" || t.railway === "station" || t.public_transport === "station")
    return { type: "Stasiun/Terminal", typeKey: "stasiun" };
  if (t.office || t.building === "office") return { type: "Area Perkantoran", typeKey: "perkantoran" };
  if (t.landuse === "residential" || t.place === "neighbourhood")
    return { type: "Kawasan Perumahan", typeKey: "perumahan" };

  return null;
}

// ── Build Overpass query per category ───────────────────────────
function buildQuery(catLower: string, lat: number, lon: number, r = 4000) {
  const c = `around:${r},${lat},${lon}`;

  if (catLower.includes("minuman")) {
    return `[out:json][timeout:20];(
      node["amenity"~"^(university|college|school)$"](${c});
      way["amenity"~"^(university|college|school)$"](${c});
      node["amenity"="railway_station"](${c});
      way["railway"="station"](${c});
      node["building"="office"](${c});
      way["building"="office"](${c});
      way["shop"="mall"](${c});
      node["shop"="mall"](${c});
    );out center 30;`;
  }
  if (catLower.includes("kuliner")) {
    return `[out:json][timeout:20];(
      way["shop"="mall"](${c});
      node["shop"="mall"](${c});
      node["amenity"="marketplace"](${c});
      node["shop"="market"](${c});
      node["amenity"="railway_station"](${c});
      way["railway"="station"](${c});
      way["landuse"="industrial"](${c});
      node["building"="office"](${c});
    );out center 30;`;
  }
  // dessert / snack
  return `[out:json][timeout:20];(
    way["shop"="mall"](${c});
    node["shop"="mall"](${c});
    node["amenity"="cafe"](${c});
    node["amenity"="school"](${c});
    way["amenity"="school"](${c});
    node["amenity"="marketplace"](${c});
    node["leisure"="shopping_centre"](${c});
  );out center 30;`;
}

// ── MapUpdater ───────────────────────────────────────────────────
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => { map.setView(center, map.getZoom()); }, [center, map]);
  return null;
}

// ── Main Component ───────────────────────────────────────────────
export default function LocationRecommenderMap({ category }: { category: string }) {
  const [center, setCenter] = useState<[number, number]>([-6.2088, 106.8456]);
  const [pois, setPois] = useState<POI[]>([]);
  const [loading, setLoading] = useState(true);
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState("");

  const requestLocation = useCallback(() => {
    if (!("geolocation" in navigator)) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCenter([pos.coords.latitude, pos.coords.longitude]);
        setLocating(false);
      },
      () => setLocating(false),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  useEffect(() => { requestLocation(); }, [requestLocation]);

  useEffect(() => {
    const fetchPOIs = async () => {
      setLoading(true);
      setError("");
      const catLower = category.toLowerCase();
      const query = buildQuery(catLower, center[0], center[1]);

      // Multiple Overpass endpoints for reliability
      const OVERPASS_ENDPOINTS = [
        "https://overpass-api.de/api/interpreter",
        "https://overpass.kumi.systems/api/interpreter",
        "https://overpass.openstreetmap.ru/api/interpreter",
      ];

      let data: any = null;

      for (const endpoint of OVERPASS_ENDPOINTS) {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 20000);

        try {
          const res = await fetch(endpoint, {
            method: "POST",
            body: query,
            signal: controller.signal,
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          });
          clearTimeout(timeout);

          if (!res.ok) {
            console.warn(`[Overpass] ${endpoint} returned ${res.status}, trying next...`);
            continue;
          }

          data = await res.json();
          break; // Success — stop trying other endpoints
        } catch (e: any) {
          clearTimeout(timeout);
          if (e.name === "AbortError") {
            console.warn(`[Overpass] ${endpoint} timed out, trying next...`);
          } else {
            console.warn(`[Overpass] ${endpoint} failed:`, e.message);
          }
        }
      }

      // Process results from whichever endpoint succeeded
      const results: POI[] = [];
      const seen = new Set<string>();

      if (data?.elements) {
        for (const el of data.elements) {
          const lat = el.lat ?? el.center?.lat;
          const lon = el.lon ?? el.center?.lon;
          if (!lat || !lon) continue;

          const name =
            el.tags?.name ||
            el.tags?.["name:id"] ||
            el.tags?.brand ||
            el.tags?.operator;
          if (!name) continue;

          const nameKey = name.toLowerCase().trim();
          if (seen.has(nameKey)) continue;
          seen.add(nameKey);

          const classified = classifyElement(el);
          if (!classified) continue;

          const { type, typeKey } = classified;
          results.push({
            id: el.id,
            lat,
            lon,
            name,
            type,
            typeKey,
            score: SCORE[typeKey] ?? 2,
            why: WHY[typeKey] ?? WHY.default,
          });
        }
      }

      results.sort((a, b) => b.score - a.score);
      setPois(results.slice(0, 25));

      if (!data) {
        setError("Semua server peta tidak merespons. Coba beberapa saat lagi.");
      } else if (results.length === 0) {
        setError("Tidak ada data lokasi ditemukan di area ini.");
      }

      setLoading(false);
    };

    fetchPOIs();
  }, [center, category]);

  return (
    <div className="w-full h-full relative rounded-2xl overflow-hidden border border-black/10 z-0">
      {/* Loading overlay */}
      {(loading || locating) && (
        <div className="absolute inset-0 bg-white/85 backdrop-blur-sm z-[1000] flex flex-col items-center justify-center gap-3">
          <div className="w-9 h-9 border-4 border-[#FF5C1A]/20 border-t-[#FF5C1A] rounded-full animate-spin" />
          <p className="text-sm font-semibold text-gray-600">
            {locating ? "Mendeteksi lokasi Anda…" : "Mengambil data lokasi nyata…"}
          </p>
          <p className="text-xs text-gray-400">Sumber: OpenStreetMap / Overpass API</p>
        </div>
      )}

      {/* Error overlay */}
      {error && !loading && (
        <div className="absolute inset-0 bg-white/90 z-[1000] flex flex-col items-center justify-center gap-2 p-6 text-center">
          <p className="text-2xl">⚠️</p>
          <p className="text-sm font-semibold text-gray-700">{error}</p>
          <button
            onClick={() => { setLoading(true); setError(""); }}
            className="mt-2 text-xs font-bold text-[#FF5C1A] border border-[#FF5C1A] px-4 py-2 rounded-full hover:bg-[#FF5C1A] hover:text-white transition-all"
          >
            Coba Lagi
          </button>
        </div>
      )}

      {/* GPS button */}
      <button
        onClick={requestLocation}
        className="absolute top-3 right-3 z-[500] bg-white p-2.5 rounded-xl shadow-lg border border-black/5 hover:bg-orange-50 active:scale-95 transition-all"
        title="Gunakan Lokasi Saya"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="#FF5C1A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          className={locating ? "animate-pulse" : ""}
        >
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="3" />
          <line x1="12" y1="2" x2="12" y2="5" />
          <line x1="12" y1="19" x2="12" y2="22" />
          <line x1="2" y1="12" x2="5" y2="12" />
          <line x1="19" y1="12" x2="22" y2="12" />
        </svg>
      </button>

      {/* Legend */}
      {!loading && pois.length > 0 && (
        <div className="absolute bottom-3 left-3 z-[500] bg-white/95 backdrop-blur-sm rounded-xl shadow-md border border-black/5 px-3 py-2 flex flex-col gap-1">
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mb-1">Legenda</p>
          {[
            { label: "Kampus/Universitas", color: "#6C47FF" },
            { label: "Mall/Perbelanjaan", color: "#FF5C1A" },
            { label: "Perkantoran", color: "#059669" },
            { label: "Stasiun/Terminal", color: "#0284C7" },
            { label: "Pasar/Kafe", color: "#D97706" },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div style={{ background: l.color }} className="w-2.5 h-2.5 rounded-full flex-shrink-0" />
              <span className="text-[10px] text-gray-600 font-medium">{l.label}</span>
            </div>
          ))}
        </div>
      )}

      <MapContainer center={center} zoom={14} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <MapUpdater center={center} />

        {/* Radius circle */}
        <Circle
          center={center}
          radius={4000}
          pathOptions={{ color: "#FF5C1A", fillColor: "#FF5C1A", fillOpacity: 0.04, weight: 1, dashArray: "6 4" }}
        />

        {/* User marker */}
        <Marker position={center} icon={userIcon}>
          <Popup>
            <div className="text-sm font-bold text-gray-800">📍 Lokasi Anda</div>
            <div className="text-xs text-gray-400 mt-0.5">Pusat radius pencarian 4 km</div>
          </Popup>
        </Marker>

        {/* POI markers */}
        {pois.map(poi => (
          <Marker key={poi.id} position={[poi.lat, poi.lon]} icon={icons[poi.typeKey] ?? icons.default}>
            <Popup maxWidth={240}>
              <div style={{ minWidth: 210, fontFamily: "sans-serif" }}>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#FF5C1A", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>
                      {poi.type}
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: "#111", lineHeight: 1.3 }}>{poi.name}</div>
                  </div>
                </div>

                {/* Traffic score */}
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                  <span style={{ fontSize: 10, color: "#6b7280", fontWeight: 600 }}>Potensi Traffic:</span>
                  <div style={{ display: "flex", gap: 2 }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} style={{
                        width: 10, height: 10, borderRadius: 2,
                        background: i < poi.score ? "#FF5C1A" : "#e5e7eb"
                      }} />
                    ))}
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: poi.score >= 4 ? "#16a34a" : "#d97706" }}>
                    {poi.score >= 5 ? "Sangat Tinggi" : poi.score >= 4 ? "Tinggi" : poi.score >= 3 ? "Sedang" : "Cukup"}
                  </span>
                </div>

                {/* Analysis */}
                <div style={{ background: "#fafafa", borderRadius: 10, padding: "8px 10px", border: "1px solid #f0f0f0" }}>
                  <p style={{ fontSize: 11, color: "#4b5563", lineHeight: 1.55, margin: 0 }}>
                    {poi.why}
                  </p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
