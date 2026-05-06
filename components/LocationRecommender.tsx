import dynamic from "next/dynamic";
import { MapPin } from "lucide-react";

// Dynamically import the map component with SSR disabled
const DynamicMap = dynamic(() => import("./LocationRecommenderMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] bg-gray-100 rounded-2xl flex flex-col items-center justify-center animate-pulse border border-black/5">
      <MapPin className="w-10 h-10 text-gray-300 mb-2" />
      <p className="text-gray-400 font-medium">Memuat Peta...</p>
    </div>
  ),
});

export default function LocationRecommender({ category }: { category: string }) {
  return (
    <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm mt-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h3 className="font-syne font-bold text-2xl flex items-center gap-3">
            <MapPin className="w-6 h-6 text-[#FF5C1A]" />
            Rekomendasi Lokasi Potensial
          </h3>
          <p className="text-gray-500 mt-2">
            Berdasarkan kategori franchise <strong className="text-gray-800">{category}</strong>, berikut adalah area strategis (sekolah, mal, pemukiman padat) di sekitar Anda yang berpotensi menghasilkan *traffic* tinggi.
          </p>
        </div>
      </div>
      
      {/* Map Container */}
      <div className="w-full h-[450px] relative rounded-2xl">
        <DynamicMap category={category} />
      </div>
      
      <p className="text-xs text-gray-400 mt-4 text-center">
        Peta menggunakan OpenStreetMap. Izinkan akses lokasi pada browser Anda untuk mendapatkan rekomendasi di kota Anda.
      </p>
    </div>
  );
}
