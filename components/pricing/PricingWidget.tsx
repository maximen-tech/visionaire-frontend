'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Calculator } from 'lucide-react';
import ROICalculator from './ROICalculator';
import ComparisonMatrix from './ComparisonMatrix';
import PaymentPlans from './PaymentPlans';

interface PricingWidgetProps {
  // Pre-fill calculator with analysis data
  defaultHourlyRate?: number;
  defaultHoursPerWeek?: number;
  defaultComplexity?: number;

  // Display options
  showConfetti?: boolean;
  showPopularBadge?: boolean;
  collapsible?: boolean;
  defaultExpanded?: boolean;

  // Section visibility
  showROICalculator?: boolean;
  showComparisonMatrix?: boolean;
  showPaymentPlans?: boolean;

  // Title customization
  title?: string;
  subtitle?: string;
}

export default function PricingWidget({
  defaultHourlyRate = 50,
  defaultHoursPerWeek = 10,
  defaultComplexity = 5,
  showConfetti = true,
  showPopularBadge = true,
  collapsible = false,
  defaultExpanded = true,
  showROICalculator = true,
  showComparisonMatrix = true,
  showPaymentPlans = true,
  title = 'Calculez votre retour sur investissement',
  subtitle = 'Découvrez combien vous pourriez économiser avec l\'automatisation',
}: PricingWidgetProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  // If collapsible mode is off, always show expanded
  const expanded = collapsible ? isExpanded : true;

  return (
    <div className="w-full">
      {/* Header (always visible) */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-slate-400 text-lg mb-6">
            {subtitle}
          </p>

          {/* Toggle Button (only if collapsible) */}
          {collapsible && (
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg font-medium shadow-lg transition-all"
            >
              <Calculator className="w-5 h-5" />
              <span>{isExpanded ? 'Masquer le calculateur' : 'Afficher le calculateur'}</span>
              {isExpanded ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </motion.button>
          )}
        </motion.div>
      </div>

      {/* Collapsible Content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="space-y-8 overflow-hidden"
          >
            {/* ROI Calculator */}
            {showROICalculator && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <ROICalculator
                  defaultHourlyRate={defaultHourlyRate}
                  defaultHoursPerWeek={defaultHoursPerWeek}
                  defaultComplexity={defaultComplexity}
                  showConfetti={showConfetti}
                />
              </motion.div>
            )}

            {/* Comparison Matrix */}
            {showComparisonMatrix && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <ComparisonMatrix />
              </motion.div>
            )}

            {/* Payment Plans */}
            {showPaymentPlans && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <PaymentPlans showPopularBadge={showPopularBadge} />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
