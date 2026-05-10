"use client";
import { motion } from 'framer-motion';

interface FranchiseCardProps {
  title: string;
  description: string;
  image?: string;
}

const franchises = [
  {
    title: 'Kopi Kenangan',
    description: 'Franchise kopi lokal dengan pertumbuhan tercepat.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop'
  },
  {
    title: 'Mixue Ice Cream',
    description: 'Franchise es krim dan teh viral dengan ROI tinggi.',
    image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?q=80&w=1000&auto=format&fit=crop'
  },
  {
    title: 'Haus! Indonesia',
    description: 'Minuman kekinian yang sangat populer di kalangan Gen Z.',
    image: 'https://images.unsplash.com/photo-1544145945-f904253d0c7b?q=80&w=1000&auto=format&fit=crop'
  }
];

const FranchiseCards = () => (
  <div className="grid gap-6 md:grid-cols-3">
    {franchises.map((franchise, i) => (
      <motion.div
        key={i}
        className="relative overflow-hidden rounded-2xl group shadow-sm hover:shadow-xl transition-all duration-500 bg-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.1, duration: 0.3 }}
      >
        <div className="h-48 overflow-hidden">
          <img
            src={franchise.image}
            alt={franchise.title}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="p-5 border-t border-black/5">
          <h3 className="text-lg font-bold text-[#111]">{franchise.title}</h3>
          <p className="mt-1 text-sm text-gray-500 leading-relaxed">{franchise.description}</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-[0.75rem] font-bold text-[#FF5C1A] bg-[#FF5C1A]/5 px-2 py-1 rounded-md uppercase tracking-wider">Aktif</span>
            <button className="text-sm font-semibold text-[#555] hover:text-[#FF5C1A] transition-colors">Detail →</button>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

export default FranchiseCards;