'use client';

import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { type CaseStudySnippet } from '@/data/case-studies';

interface CaseStudyCardProps {
  caseStudy: CaseStudySnippet;
  index?: number;
}

export default function CaseStudyCard({ caseStudy, index = 0 }: CaseStudyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      {/* Image with gradient overlay */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/20" />
        {/* Placeholder for image - will be replaced with actual images */}
        <div className="w-full h-full flex items-center justify-center text-6xl opacity-20">
          {caseStudy.sector === 'Commerce de détail' && '🛍️'}
          {caseStudy.sector === 'Services professionnels' && '💼'}
          {caseStudy.sector === 'Fabrication' && '🏭'}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-20 p-6">
        {/* ROI Badge */}
        <div className="absolute -top-24 right-6 bg-gradient-to-br from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
          <TrendingUp className="w-4 h-4 inline-block mr-1" />
          {caseStudy.roi}
        </div>

        {/* Company & Sector */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white mb-1">{caseStudy.company}</h3>
          <p className="text-sm text-cyan-400">{caseStudy.sector}</p>
        </div>

        {/* Challenge → Result */}
        <div className="mb-4 space-y-3">
          <div>
            <div className="text-xs uppercase text-slate-500 font-semibold mb-1">Défi</div>
            <p className="text-sm text-slate-300">{caseStudy.challenge}</p>
          </div>

          <div className="flex items-center justify-center text-cyan-500">
            <ArrowRight className="w-5 h-5" />
          </div>

          <div>
            <div className="text-xs uppercase text-slate-500 font-semibold mb-1">Résultat</div>
            <p className="text-sm text-green-400 font-semibold">{caseStudy.result}</p>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href={caseStudy.cta_url}
          className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-medium transition-colors group-hover:bg-cyan-500"
        >
          {caseStudy.cta_text}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}
