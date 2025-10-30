'use client';

import { motion } from 'framer-motion';
import { Check, X, Sparkles } from 'lucide-react';

interface ComparisonRow {
  criteria: string;
  diy: string | boolean;
  expert: string | boolean;
  tooltip?: string;
}

const COMPARISON_DATA: ComparisonRow[] = [
  {
    criteria: 'Temps d\'implémentation',
    diy: '20-40 heures',
    expert: '2-10 heures',
    tooltip: 'Temps total pour implémenter une automatisation complète',
  },
  {
    criteria: 'Connaissances techniques',
    diy: 'Requises',
    expert: 'Aucune requise',
    tooltip: 'Niveau de compétence technique nécessaire',
  },
  {
    criteria: 'Sélection d\'outils',
    diy: 'Essais & erreurs',
    expert: 'Recommandations pré-validées',
    tooltip: 'Processus de sélection des bons outils',
  },
  {
    criteria: 'Support d\'intégration',
    diy: false,
    expert: true,
    tooltip: 'Aide pour connecter vos outils existants',
  },
  {
    criteria: 'Maintenance',
    diy: 'Votre responsabilité',
    expert: 'Guidance fournie',
    tooltip: 'Support après implémentation',
  },
  {
    criteria: 'Coût initial',
    diy: '0 $ (votre temps)',
    expert: 'À partir de 499 $',
    tooltip: 'Investissement financier initial',
  },
  {
    criteria: 'Taux de réussite',
    diy: '40-60%',
    expert: '95%+',
    tooltip: 'Pourcentage d\'implémentations réussies',
  },
  {
    criteria: 'Support continu',
    diy: false,
    expert: true,
    tooltip: 'Accès à l\'équipe pour questions',
  },
];

function Cell({ value, isExpert }: { value: string | boolean; isExpert: boolean }) {
  if (typeof value === 'boolean') {
    return (
      <div className="flex justify-center">
        {value ? (
          <Check className={`w-6 h-6 ${isExpert ? 'text-green-500' : 'text-gray-400'}`} />
        ) : (
          <X className={`w-6 h-6 ${isExpert ? 'text-red-500' : 'text-gray-500'}`} />
        )}
      </div>
    );
  }

  return (
    <div className={`text-center ${isExpert ? 'font-semibold text-cyan-400' : 'text-slate-400'}`}>
      {value}
    </div>
  );
}

export default function ComparisonMatrix() {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
          DIY vs Expert: Quelle approche vous convient?
        </h3>
        <p className="text-slate-400">
          Comparez les deux options et choisissez ce qui correspond à vos besoins
        </p>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="px-4 py-4 text-left text-white font-semibold">
                Critère
              </th>
              <th className="px-4 py-4 text-center text-white font-semibold">
                DIY (Gratuit)
              </th>
              <th className="px-4 py-4 text-center relative">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-white font-semibold">Expert (Avec Vision'AI're)</span>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring' }}
                  >
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                  </motion.div>
                </div>
                <div className="absolute -top-2 right-4">
                  <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Recommandé
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON_DATA.map((row, index) => (
              <motion.tr
                key={row.criteria}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors"
              >
                <td className="px-4 py-4 text-slate-200 font-medium">
                  <div className="group relative inline-block">
                    {row.criteria}
                    {row.tooltip && (
                      <>
                        <span className="ml-2 text-slate-500 cursor-help">ⓘ</span>
                        <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block w-64 p-3 bg-slate-950 text-slate-300 text-sm rounded-lg shadow-xl z-10">
                          {row.tooltip}
                          <div className="absolute top-full left-4 border-4 border-transparent border-t-slate-950" />
                        </div>
                      </>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <Cell value={row.diy} isExpert={false} />
                </td>
                <td className="px-4 py-4 bg-slate-800/30">
                  <Cell value={row.expert} isExpert={true} />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CTAs */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.a
          href="#lead-form"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium text-center transition-colors"
        >
          Commencer en DIY (Gratuit)
        </motion.a>
        <motion.a
          href="#lead-form"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg font-medium text-center transition-colors shadow-lg"
        >
          Réserver une Consultation Expert →
        </motion.a>
      </div>

      {/* Additional Info */}
      <div className="mt-6 text-center text-sm text-slate-400">
        <p>
          💡 <strong className="text-white">Astuce:</strong> La plupart de nos clients commencent en DIY
          avec l'analyse gratuite, puis choisissent l'option Expert pour l'implémentation.
        </p>
      </div>
    </div>
  );
}
