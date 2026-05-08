"use client";
import { motion } from "framer-motion";

export default function DashboardSkeleton() {
  return (
    <main className="min-h-screen bg-[#FFF9F0] pt-28 pb-16 px-[5%]">
      <div className="max-w-6xl mx-auto">
        {/* Header Skeleton */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gray-200 animate-pulse" />
            <div className="space-y-2">
              <div className="h-6 w-48 bg-gray-200 rounded-lg animate-pulse" />
              <div className="h-4 w-64 bg-gray-200 rounded-lg animate-pulse" />
            </div>
          </div>
          <div className="flex gap-3">
            <div className="h-12 w-40 bg-gray-200 rounded-xl animate-pulse" />
            <div className="h-12 w-32 bg-gray-200 rounded-xl animate-pulse" />
          </div>
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-black/5 h-32">
              <div className="w-10 h-10 rounded-xl bg-gray-100 animate-pulse mb-3" />
              <div className="h-6 w-12 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-3 w-24 bg-gray-100 rounded animate-pulse" />
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_0.8fr] gap-8">
          {/* Main Card Skeleton */}
          <div className="bg-white rounded-3xl p-7 border border-black/5 h-[400px]">
            <div className="flex justify-between mb-8">
              <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-20 bg-gray-100 rounded animate-pulse" />
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-16 w-full bg-gray-50 rounded-2xl animate-pulse" />
              ))}
            </div>
          </div>

          {/* Sidebar Skeletons */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-7 border border-black/5 h-64">
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-6" />
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-12 w-full bg-gray-50 rounded-xl animate-pulse" />
                ))}
              </div>
            </div>
            <div className="bg-[#111] rounded-3xl p-7 h-64 animate-pulse opacity-50" />
          </div>
        </div>
      </div>
    </main>
  );
}
