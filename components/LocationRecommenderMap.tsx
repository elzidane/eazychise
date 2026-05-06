"use client";

import React, { useEffect, useState, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet's default icon missing issues in Webpack/Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const customMarkerIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

type POI = {
  id: number;
  lat: number;
  lon: number;
  name: string;
  type: string;
  description: string;
};

const getPOIDescription = (type: string, category: string) => {
  const catLower = category.toLowerCase();
  if (type === "Kampus / Universitas" || type === "Sekolah") {
    return "Tinggi konsumsi pelajar dan mahasiswa yang mencari camilan atau minuman cepat saji di sela aktivitas.";
  }
  if (type === "Pusat Perbelanjaan") {
    return "Memiliki traffic pengunjung yang sangat stabil setiap hari, terutama saat akhir pekan dan jam makan.";
  }
  if (type === "Area Perkantoran") {
    return "Potensi market yang besar dari karyawan untuk kebutuhan makan siang, kopi sore, atau pesanan grup.";
  }
  if (type === "Kawasan Pemukiman") {
    return "Target pasar keluarga yang ideal untuk layanan delivery dan kunjungan santai di sore atau malam hari.";
  }
  if (type === "Area Kafe / Nongkrong") {
    return "Lokasi strategis dengan ekosistem konsumen F&B yang sudah matang dan siap mencoba brand baru.";
  }
  return "Lokasi dengan kepadatan penduduk tinggi dan aktivitas ekonomi yang mendukung pertumbuhan bisnis F&B.";
};

// Component to dynamically update map center
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export default function LocationRecommenderMap({ category }: { category: string }) {
  const [center, setCenter] = useState<[number, number]>([-6.2088, 106.8456]); // Default: Jakarta
  const [pois, setPois] = useState<POI[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLocating, setIsLocating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const requestLocation = useCallback(() => {
    if (!("geolocation" in navigator)) return;
    
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCenter([position.coords.latitude, position.coords.longitude]);
        setIsLocating(false);
      },
      (error) => {
        console.log("Geolocation error:", error);
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      if (data && data.length > 0) {
        setCenter([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
      }
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  useEffect(() => {
    const fetchPOIs = async () => {
      setLoading(true);
      
      // Broader queries for better results
      let queryType = "";
      let radius = 5000; // Increased to 5km
      
      const catLower = category.toLowerCase();
      if (catLower.includes("minuman") || catLower.includes("kopi") || catLower.includes("teh")) {
        queryType = `
          node["amenity"~"university|school|college"](around:${radius},${center[0]},${center[1]});
          node["amenity"="cafe"](around:${radius},${center[0]},${center[1]});
          node["office"](around:${radius},${center[0]},${center[1]});
        `;
      } else if (catLower.includes("kuliner") || catLower.includes("makan") || catLower.includes("resto")) {
        queryType = `
          node["shop"="mall"](around:${radius},${center[0]},${center[1]});
          node["amenity"="marketplace"](around:${radius},${center[0]},${center[1]});
          node["amenity"="restaurant"](around:${radius},${center[0]},${center[1]});
        `;
      } else if (catLower.includes("dessert") || catLower.includes("snack") || catLower.includes("es krim")) {
        queryType = `
          node["shop"~"mall|convenience|supermarket"](around:${radius},${center[0]},${center[1]});
          node["amenity"~"cafe|fast_food"](around:${radius},${center[0]},${center[1]});
        `;
      } else {
        queryType = `
          node["shop"="mall"](around:${radius},${center[0]},${center[1]});
          node["amenity"~"marketplace|townhall|stadium"](around:${radius},${center[0]},${center[1]});
        `;
      }

      const overpassQuery = `
        [out:json][timeout:15];
        (
          ${queryType}
        );
        out center 20;
      `;

      try {
        const response = await fetch("https://overpass-api.de/api/interpreter", {
          method: "POST",
          body: overpassQuery,
        });
        
        if (!response.ok) throw new Error("Overpass API failed");
        
        const data = await response.json();
        const results: POI[] = [];
        
        data.elements.forEach((el: any) => {
          const lat = el.lat || el.center?.lat;
          const lon = el.lon || el.center?.lon;
          const name = el.tags?.name || el.tags?.brand || el.tags?.operator || el.tags?.office || el.tags?.building || el.tags?.amenity?.replace(/_/g, ' ') || el.tags?.shop?.replace(/_/g, ' ');
          
          if (lat && lon && name && name.length > 2) {
            let type = "Lokasi Strategis";
            const tags = el.tags || {};
            if (tags.amenity === "university" || tags.amenity === "college") type = "Kampus / Universitas";
            else if (tags.amenity === "school") type = "Sekolah";
            else if (tags.shop === "mall" || tags.amenity === "marketplace") type = "Pusat Perbelanjaan";
            else if (tags.office || tags.building === "office") type = "Area Perkantoran";
            else if (tags.landuse === "residential") type = "Kawasan Pemukiman";
            else if (tags.amenity === "cafe" || tags.amenity === "restaurant") type = "Area Kuliner / Kafe";

            results.push({ 
              id: el.id, 
              lat, 
              lon, 
              name, 
              type,
              description: getPOIDescription(type, category)
            });
          }
        });

        if (results.length === 0) throw new Error("No POIs found");
        setPois(results);
      } catch (err) {
        console.log("Fallback to generated POIs:", err);
        const fallbackPOIs = [
          {
            id: Date.now() + 1,
            lat: center[0] + 0.003,
            lon: center[1] + 0.003,
            name: `Area Strategis ${category} A`,
            type: "Potensi Traffic Tinggi",
            description: "Lokasi ini memiliki karakteristik yang sesuai dengan kebutuhan operasional franchise Anda."
          },
          {
            id: Date.now() + 2,
            lat: center[0] - 0.004,
            lon: center[1] + 0.002,
            name: `Area Strategis ${category} B`,
            type: "Kawasan Komersial",
            description: "Kepadatan penduduk dan aktivitas ekonomi di area ini sangat mendukung pertumbuhan bisnis."
          },
          {
            id: Date.now() + 3,
            lat: center[0] + 0.002,
            lon: center[1] - 0.005,
            name: `Area Strategis ${category} C`,
            type: "Pusat Keramaian",
            description: "Lokasi ini sering menjadi titik temu masyarakat, ideal untuk brand awareness yang cepat."
          }
        ];
        setPois(fallbackPOIs);
      } finally {
        setLoading(false);
      }
    };

    fetchPOIs();
  }, [center, category]);

  return (
    <div className="w-full h-full relative rounded-2xl overflow-hidden border border-black/10 shadow-sm z-0">
      {(loading || isLocating) && (
        <div className="absolute inset-0 bg-white/80 z-[1000] flex flex-col items-center justify-center">
          <div className="w-8 h-8 border-4 border-[#FF5C1A]/30 border-t-[#FF5C1A] rounded-full animate-spin mb-3"></div>
          <p className="text-sm font-semibold text-gray-600 px-10 text-center">{isLocating ? "Mencari lokasi Anda..." : `Menganalisis lokasi potensial ${category}...`}</p>
        </div>
      )}

      {/* Top Controls: Search and Recenter */}
      <div className="absolute top-4 left-4 right-4 z-[500] flex gap-2">
        <form onSubmit={handleSearch} className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kota atau area..."
              className="w-full bg-white px-4 py-2.5 rounded-xl shadow-lg border border-black/5 outline-none focus:ring-2 focus:ring-[#FF5C1A]/50 text-sm"
            />
            {searchQuery && (
              <button 
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            )}
          </div>
          <button 
            type="submit"
            className="bg-[#FF5C1A] text-white p-2.5 rounded-xl shadow-lg hover:bg-[#E04710] active:scale-95 transition-all flex items-center justify-center"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </button>
        </form>

        <button 
          onClick={requestLocation}
          className="bg-white p-2.5 rounded-xl shadow-lg border border-black/5 hover:bg-gray-50 active:scale-95 transition-all group shrink-0"
          title="Gunakan Lokasi Saya"
        >
          <svg 
            width="20" height="20" viewBox="0 0 24 24" fill="none" 
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            className={`text-[#FF5C1A] ${isLocating ? 'animate-pulse' : ''}`}
          >
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="3" />
            <line x1="12" y1="2" x2="12" y2="4" />
            <line x1="12" y1="20" x2="12" y2="22" />
            <line x1="2" y1="12" x2="4" y2="12" />
            <line x1="20" y1="12" x2="22" y2="12" />
          </svg>
        </button>
      </div>

      <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <MapUpdater center={center} />
        
        {/* User Location Marker */}
        <Marker position={center}>
          <Popup>
            <div className="text-center font-semibold text-sm">Lokasi Anda Sekarang</div>
          </Popup>
        </Marker>

        {pois.map((poi) => (
          <Marker key={poi.id} position={[poi.lat, poi.lon]} icon={customMarkerIcon}>
            <Popup>
              <div className="min-w-[200px] py-1">
                <div className="text-[10px] font-bold text-[#FF5C1A] uppercase tracking-widest mb-2 opacity-80">Analisis Lokasi</div>
                <div className="font-bold text-gray-900 text-base mb-1 leading-tight">{poi.name}</div>
                <div className="text-[10px] text-gray-400 font-medium mb-3">{poi.type}</div>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <p className="text-[11px] text-gray-600 leading-relaxed m-0 italic">
                    &ldquo;{poi.description}&rdquo;
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
