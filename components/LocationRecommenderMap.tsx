"use client";

import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    // Try to get user location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.log("Geolocation error or denied, using default Jakarta:", error);
        }
      );
    }
  }, []);

  useEffect(() => {
    const fetchPOIs = async () => {
      setLoading(true);
      
      // Determine what to search based on franchise category
      let queryType = "";
      let radius = 3000; // 3km
      
      const catLower = category.toLowerCase();
      if (catLower.includes("minuman")) {
        // Universities, schools, offices
        queryType = `
          node["amenity"~"university|school|college"](around:${radius},${center[0]},${center[1]});
          way["building"="office"](around:${radius},${center[0]},${center[1]});
        `;
      } else if (catLower.includes("kuliner")) {
        // Malls, residential, industrial
        queryType = `
          node["shop"="mall"](around:${radius},${center[0]},${center[1]});
          way["landuse"~"residential|industrial"](around:${radius},${center[0]},${center[1]});
        `;
      } else if (catLower.includes("dessert") || catLower.includes("snack")) {
        // Malls, cafes, marketplace
        queryType = `
          node["shop"~"mall|convenience|supermarket"](around:${radius},${center[0]},${center[1]});
          node["amenity"="cafe"](around:${radius},${center[0]},${center[1]});
        `;
      } else {
        queryType = `node["shop"="mall"](around:${radius},${center[0]},${center[1]});`;
      }

      const overpassQuery = `
        [out:json][timeout:10];
        (
          ${queryType}
        );
        out center 15;
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
          const name = el.tags?.name || el.tags?.brand || el.tags?.operator || el.tags?.office || el.tags?.building || el.tags?.amenity?.replace(/_/g, ' ') || el.tags?.shop?.replace(/_/g, ' ') || el.tags?.tourism?.replace(/_/g, ' ');
          
          if (lat && lon && name) {
            let type = "Lokasi Strategis";
            if (el.tags.amenity === "university" || el.tags.amenity === "college") type = "Kampus / Universitas";
            else if (el.tags.amenity === "school") type = "Sekolah";
            else if (el.tags.shop === "mall" || el.tags.amenity === "marketplace") type = "Pusat Perbelanjaan";
            else if (el.tags.building === "office" || el.tags.office) type = "Area Perkantoran";
            else if (el.tags.landuse === "residential" || el.tags.highway === "residential") type = "Kawasan Pemukiman";
            else if (el.tags.amenity === "cafe" || el.tags.amenity === "restaurant") type = "Area Kafe / Nongkrong";

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

        // If Overpass is empty, fallback to some dummy points around center
        if (results.length === 0) {
          throw new Error("No POIs found, using fallback");
        }
        
        setPois(results);
      } catch (err) {
        console.log("Fallback to generated POIs:", err);
        // Generate 3-5 random points around center
        const fallbackPOIs = [
          {
            id: Date.now() + 1,
            lat: center[0] + 0.005,
            lon: center[1] + 0.005,
            name: catLower.includes("minuman") ? "Zona Pendidikan & Kampus" : "Pusat Perbelanjaan & Retail",
            type: catLower.includes("minuman") ? "Kampus / Universitas" : "Pusat Perbelanjaan",
            description: getPOIDescription(catLower.includes("minuman") ? "Kampus / Universitas" : "Pusat Perbelanjaan", category)
          },
          {
            id: Date.now() + 2,
            lat: center[0] - 0.004,
            lon: center[1] + 0.008,
            name: "Kawasan Perkantoran Utama",
            type: "Area Perkantoran",
            description: getPOIDescription("Area Perkantoran", category)
          },
          {
            id: Date.now() + 3,
            lat: center[0] + 0.007,
            lon: center[1] - 0.003,
            name: "Cluster Pemukiman Padat",
            type: "Kawasan Pemukiman",
            description: getPOIDescription("Kawasan Pemukiman", category)
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
      {loading && (
        <div className="absolute inset-0 bg-white/80 z-[1000] flex flex-col items-center justify-center">
          <div className="w-8 h-8 border-4 border-[#FF5C1A]/30 border-t-[#FF5C1A] rounded-full animate-spin mb-3"></div>
          <p className="text-sm font-semibold text-gray-600">Menganalisis lokasi potensial...</p>
        </div>
      )}
      <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        <MapUpdater center={center} />
        
        {/* User Location Marker */}
        <Marker position={center}>
          <Popup>
            <div className="text-center font-semibold">Pusat Area Anda</div>
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
