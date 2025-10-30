'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
}

export default function ProgressBar({
  currentStep,
  totalSteps,
  labels = [],
}: ProgressBarProps) {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full mb-8">
      {/* Progress Bar */}
      <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>

      {/* Step Indicators */}
      <div className="flex justify-between mt-4">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isUpcoming = stepNumber > currentStep;

          return (
            <div key={stepNumber} className="flex flex-col items-center flex-1">
              {/* Step Circle */}
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                  isCompleted
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                    : isCurrent
                    ? 'bg-white border-4 border-cyan-500 text-cyan-600'
                    : 'bg-gray-200 text-gray-400'
                }`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                {isCompleted ? (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  stepNumber
                )}
              </motion.div>

              {/* Step Label */}
              {labels[index] && (
                <motion.p
                  className={`text-xs mt-2 text-center ${
                    isCurrent ? 'text-cyan-600 font-semibold' : 'text-gray-500'
                  }`}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.1 }}
                >
                  {labels[index]}
                </motion.p>
              )}

              {/* Connector Line (except for last step) */}
              {index < totalSteps - 1 && (
                <div className="hidden md:block absolute top-5 left-1/2 w-full h-0.5 bg-gray-200 -z-10" />
              )}
            </div>
          );
        })}
      </div>

      {/* Percentage Text */}
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Étape {currentStep} sur {totalSteps} • {Math.round(percentage)}% complété
        </p>
      </div>
    </div>
  );
}
