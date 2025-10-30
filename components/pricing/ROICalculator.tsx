'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, DollarSign, Target } from 'lucide-react';
import Confetti from 'react-confetti';
import { calculateAllMetrics, type ROIMetrics } from '@/lib/calculators';
import { formatCAD } from '@/lib/formatters';

interface ROICalculatorProps {
  defaultHoursPerWeek?: number;
  defaultComplexity?: number;
  defaultHourlyRate?: number;
  showConfetti?: boolean;
}

interface ResultCardProps {
  label: string;
  value: string;
  color: 'green' | 'cyan' | 'yellow' | 'orange' | 'red';
  icon: React.ReactNode;
  subtitle?: string;
}

function ResultCard({ label, value, color, icon, subtitle }: ResultCardProps) {
  const colorClasses = {
    green: 'from-green-500 to-emerald-600',
    cyan: 'from-cyan-500 to-blue-600',
    yellow: 'from-yellow-500 to-orange-600',
    orange: 'from-orange-500 to-red-600',
    red: 'from-red-500 to-pink-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 shadow-lg"
    >
      <div className={`inline-block p-3 rounded-lg bg-gradient-to-br ${colorClasses[color]} mb-4`}>
        {icon}
      </div>
      <div className="text-3xl md:text-4xl font-bold text-white mb-2">
        {value}
      </div>
      <div className="text-slate-400 text-sm font-medium mb-1">{label}</div>
      {subtitle && <div className="text-slate-500 text-xs">{subtitle}</div>}
    </motion.div>
  );
}

export default function ROICalculator({
  defaultHoursPerWeek = 10,
  defaultComplexity = 5,
  defaultHourlyRate = 50,
  showConfetti = true,
}: ROICalculatorProps) {
  const [hourlyRate, setHourlyRate] = useState(defaultHourlyRate);
  const [hoursPerWeek, setHoursPerWeek] = useState(defaultHoursPerWeek);
  const [metrics, setMetrics] = useState<ROIMetrics | null>(null);
  const [showConfettiEffect, setShowConfettiEffect] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Update calculations whenever inputs change
  useEffect(() => {
    const newMetrics = calculateAllMetrics(hourlyRate, hoursPerWeek, defaultComplexity);
    setMetrics(newMetrics);

    // Show confetti if ROI > 500%
    if (showConfetti && newMetrics.roi > 500) {
      setShowConfettiEffect(true);
      const timer = setTimeout(() => setShowConfettiEffect(false), 5000);
      return () => clearTimeout(timer);
    } else {
      setShowConfettiEffect(false);
    }
  }, [hourlyRate, hoursPerWeek, defaultComplexity, showConfetti]);

  // Get window size for confetti
  useEffect(() => {
    const updateSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  if (!metrics) return null;

  return (
    <div className="relative">
      {/* Confetti Effect */}
      {showConfettiEffect && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
        />
      )}

      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Calculateur de ROI
          </h3>
          <p className="text-slate-400">
            Découvrez vos économies potentielles avec l'automatisation
          </p>
        </div>

        {/* Sliders */}
        <div className="space-y-6 mb-8">
          {/* Hourly Rate Slider */}
          <div>
            <label className="block text-white font-medium mb-2">
              Votre taux horaire: <span className="text-cyan-400">{hourlyRate} $ CAD/h</span>
            </label>
            <input
              type="range"
              min={20}
              max={500}
              step={10}
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>20 $/h</span>
              <span>500 $/h</span>
            </div>
          </div>

          {/* Hours Per Week Slider */}
          <div>
            <label className="block text-white font-medium mb-2">
              Heures économisées: <span className="text-cyan-400">{hoursPerWeek}h/semaine</span>
            </label>
            <input
              type="range"
              min={1}
              max={40}
              step={1}
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>1h/sem</span>
              <span>40h/sem</span>
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <ResultCard
            label="Économies Annuelles"
            value={formatCAD(metrics.annualSavings)}
            color="green"
            icon={<DollarSign className="w-6 h-6 text-white" />}
            subtitle={`${formatCAD(metrics.monthlySavings)}/mois`}
          />
          <ResultCard
            label="Coût d'Implémentation"
            value={formatCAD(metrics.implementationCost)}
            color="yellow"
            icon={<Clock className="w-6 h-6 text-white" />}
            subtitle={`~${metrics.implementationHours}h expert`}
          />
          <ResultCard
            label="ROI"
            value={`${Math.round(metrics.roi)}%`}
            color={metrics.roiRating.color}
            icon={<TrendingUp className="w-6 h-6 text-white" />}
            subtitle={metrics.roiRating.message}
          />
          <ResultCard
            label="Seuil de Rentabilité"
            value={metrics.breakEvenFormatted}
            color="cyan"
            icon={<Target className="w-6 h-6 text-white" />}
            subtitle={`Après ${metrics.breakEvenWeeks} semaine${metrics.breakEvenWeeks > 1 ? 's' : ''}`}
          />
        </div>

        {/* ROI Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={`p-4 rounded-lg border-2 ${
            metrics.roi > 300
              ? 'bg-green-500/10 border-green-500'
              : metrics.roi > 150
              ? 'bg-cyan-500/10 border-cyan-500'
              : 'bg-yellow-500/10 border-yellow-500'
          }`}
        >
          <p className="text-white text-center font-medium">
            {metrics.roiRating.message}
          </p>
          {metrics.roi > 500 && (
            <p className="text-green-400 text-center text-sm mt-2">
              🎉 ROI exceptionnel! Cet investissement se rembourse {Math.floor(metrics.roi / 100)}x
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
