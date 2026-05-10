"use client";
import { motion } from 'framer-motion';
import { Users, Star, Trophy } from 'lucide-react';

export default function StatsSection() {
 const stats = [
 { label: 'Total Franchises', value: '12', icon: <Users /> },
 { label: 'Favorites', value: '3', icon: <Star /> },
 { label: 'Achievements', value: '5', icon: <Trophy /> },
 ];

 return (
 <motion.div
 initial={{ opacity: 0, y: -20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.5, delay: 0.2 }}
 className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
 {stats.map((stat, index) => (
 <div
 key={index}
 className="bg-white rounded-2xl p-6 text-center shadow-sm border border-black/5 transition hover:scale-[1.02] hover:shadow-md">
 <div className="mx-auto mb-3 w-12 h-12 rounded-xl bg-[#FF5C1A]/10 flex items-center justify-center text-[#FF5C1A]">
 {stat.icon}
 </div>
 <h3 className="text-3xl font-bold text-[#111]">{stat.value}</h3>
 <p className="mt-1 text-sm font-medium text-gray-500">{stat.label}</p>
 </div>
 ))}
 </motion.div>
 );
}