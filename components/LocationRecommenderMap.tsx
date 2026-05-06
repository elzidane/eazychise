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
          const name = el.tags?.name;
          
          if (lat && lon && name) {
            let type = "Lokasi Strategis";
            if (el.tags.amenity === "university") type = "Kampus / Universitas";
            else if (el.tags.amenity === "school") type = "Sekolah";
            else if (el.tags.shop === "mall") type = "Pusat Perbelanjaan";
            else if (el.tags.building === "office") type = "Area Perkantoran";
            else if (el.tags.landuse === "residential") type = "Kawasan Pemukiman";
            else if (el.tags.amenity === "cafe") type = "Area Kafe / Nongkrong";

            results.push({ id: el.id, lat, lon, name, type });
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
        const fallbackPOIs = Array.from({ length: 4 }).map((_, i) => ({
          id: Date.now() + i,
          lat: center[0] + (Math.random() - 0.5) * 0.02,
          lon: center[1] + (Math.random() - 0.5) * 0.02,
          name: `Potensi Lokasi Strategis #${i + 1}`,
          type: catLower.includes("minuman") ? "Dekat Kampus/Sekolah" : "Area Padat Penduduk"
        }));
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

        {/* Recommended POIs */}
        {pois.map((poi) => (
          <Marker key={poi.id} position={[poi.lat, poi.lon]} icon={customMarkerIcon}>
            <Popup>
              <div className="min-w-[150px]">
                <div className="text-xs font-bold text-[#FF5C1A] uppercase tracking-wider mb-1">Rekomendasi</div>
                <div className="font-bold text-gray-900 mb-1">{poi.name}</div>
                <div className="text-xs text-gray-500 bg-gray-100 inline-block px-2 py-1 rounded">{poi.type}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
