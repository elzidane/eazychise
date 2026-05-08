"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Brain, Zap, ShieldCheck, Target, TrendingUp, Info } from "lucide-react";

interface AIConsultantCardProps {
  isAnalyzing: boolean;
  analysis: string;
  onGenerate: () => void;
}

const AIConsultantCard: React.FC<AIConsultantCardProps> = ({ isAnalyzing, analysis, onGenerate }) => {
  return (
    <div className="relative w-full">
      <AnimatePresence mode="wait">
        {!analysis && !isAnalyzing ? (
          <motion.div
            key="generate-btn"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="group"
          >
            <button
              onClick={onGenerate}
              className="relative w-full py-8 px-6 rounded-[2rem] overflow-hidden bg-[#111] transition-all duration-500 hover:shadow-[0_0_50px_rgba(255,92,26,0.3)]"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF5C1A]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                  <Brain className="w-8 h-8 text-[#FFCF40]" />
                </div>
                <div className="text-center">
                  <h3 className="font-syne font-extrabold text-2xl text-white mb-2">Jalankan AI Market Consultant</h3>
                  <p className="text-gray-400 text-sm max-w-md mx-auto">
                    Biarkan AI kami menganalisis data, ROI, dan potensi pasar untuk memberikan rekomendasi investasi terbaik bagi Anda.
                  </p>
                </div>
                <div className="mt-4 px-8 py-3 bg-[#FF5C1A] text-white rounded-full font-bold text-sm flex items-center gap-2 group-hover:bg-[#e04710] transition-colors shadow-lg">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  Mulai Analisis Strategis
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-[#FF5C1A]/10 rounded-full blur-3xl" />
              <div className="absolute -top-12 -left-12 w-32 h-32 bg-[#FFCF40]/10 rounded-full blur-3xl" />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="analysis-result"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-black/[0.05] rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.08)] overflow-hidden relative"
          >
            {/* Header / Scanning Area */}
            <div className={`p-8 border-b border-black/[0.05] relative overflow-hidden ${isAnalyzing ? 'bg-[#FAFAFA]' : 'bg-gradient-to-r from-[#111] to-[#222]'}`}>
              {isAnalyzing && (
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,92,26,0.05)_50%,transparent_100%)] animate-scan" />
                </div>
              )}
              
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition-colors duration-500 ${isAnalyzing ? 'bg-white border border-black/5' : 'bg-gradient-to-br from-[#FF5C1A] to-[#FF8C1A]'}`}>
                    <Sparkles className={`w-6 h-6 ${isAnalyzing ? 'text-[#FF5C1A]' : 'text-white'}`} />
                  </div>
                  <div>
                    <h4 className={`font-syne font-bold text-lg leading-none mb-1.5 ${isAnalyzing ? 'text-[#111]' : 'text-white'}`}>
                      {isAnalyzing ? 'AI Consultant sedang Berpikir...' : 'AI Strategic Insight'}
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${isAnalyzing ? 'bg-[#FF5C1A] animate-ping' : 'bg-green-500'}`} />
                      <span className={`text-[0.65rem] font-bold uppercase tracking-widest ${isAnalyzing ? 'text-[#888]' : 'text-gray-400'}`}>
                        {isAnalyzing ? 'Processing Market Data' : 'Analysis Complete'}
                      </span>
                    </div>
                  </div>
                </div>
                {!isAnalyzing && (
                  <button 
                    onClick={onGenerate}
                    className="text-white/60 hover:text-white text-xs font-bold transition-colors flex items-center gap-1.5 bg-white/5 px-4 py-2 rounded-full border border-white/10"
                  >
                    Regenerate <Zap className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Analysis Content */}
            <div className="p-8 md:p-10">
              {isAnalyzing ? (
                <div className="space-y-8 py-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="space-y-3">
                      <div className="h-4 bg-gray-100 rounded-full w-1/4 animate-pulse" />
                      <div className="h-3 bg-gray-50 rounded-full w-full animate-pulse" />
                      <div className="h-3 bg-gray-50 rounded-full w-5/6 animate-pulse" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  {/* Left Column: Icons/Categories */}
                  <div className="md:col-span-1 hidden md:flex flex-col gap-6 pt-2">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500" title="Financial Analysis">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500" title="Market Potential">
                      <Target className="w-5 h-5" />
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-500" title="Final Recommendation">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Right Column: Analysis Text */}
                  <div className="md:col-span-11 prose prose-orange max-w-none">
                    <div className="text-[#333] text-[1.05rem] leading-[1.8] whitespace-pre-wrap font-medium font-syne">
                      {analysis}
                    </div>
                    
                    {/* Visual Badges / Summary Points (Optional - can be auto-generated later) */}
                    <div className="mt-10 flex flex-wrap gap-3">
                      <div className="px-4 py-2 bg-[#F8F8F6] border border-black/5 rounded-xl flex items-center gap-2">
                        <Info className="w-4 h-4 text-[#FF5C1A]" />
                        <span className="text-xs font-bold text-[#666]">Data Terverifikasi</span>
                      </div>
                      <div className="px-4 py-2 bg-green-50 border border-green-100 rounded-xl flex items-center gap-2">
                        <Zap className="w-4 h-4 text-green-500" />
                        <span className="text-xs font-bold text-green-700">ROI Optimized</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Footer */}
            {!isAnalyzing && (
              <div className="bg-[#F8F8F6] p-6 border-t border-black/[0.05] flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-[#999] text-[0.7rem] font-bold uppercase tracking-widest">
                  AI analysis is based on available data and market trends.
                </p>
                <div className="flex items-center gap-3">
                   {/* Placeholder for future share/download features */}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AIConsultantCard;
