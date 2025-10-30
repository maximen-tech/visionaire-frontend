'use client';

import { motion } from 'framer-motion';
import { Check, Sparkles, Zap, Rocket, Building2 } from 'lucide-react';

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  priceSubtext?: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  cta: string;
  ctaLink: string;
  popular?: boolean;
  color: 'gray' | 'cyan' | 'blue' | 'purple';
}

const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'diy',
    name: 'DIY (Gratuit)',
    price: '0 $',
    description: 'Analyse gratuite + guides pour faire soi-même',
    icon: <Zap className="w-8 h-8" />,
    features: [
      'Analyse complète gratuite',
      'Rapport détaillé des opportunités',
      'Guides d\'automatisation',
      'Recommandations d\'outils',
      'Accès à la documentation',
    ],
    cta: 'Commencer Gratuitement',
    ctaLink: '#lead-form',
    color: 'gray',
  },
  {
    id: 'starter',
    name: 'Starter',
    price: '499 $',
    priceSubtext: 'CAD, paiement unique',
    description: 'Consultation + plan d\'action personnalisé',
    icon: <Rocket className="w-8 h-8" />,
    features: [
      'Tout du plan DIY',
      'Consultation 1h avec expert',
      'Plan d\'action prioritisé',
      'Sélection d\'outils optimale',
      'Support email 30 jours',
      'Accès communauté Slack',
    ],
    cta: 'Réserver Consultation',
    ctaLink: '#lead-form',
    popular: true,
    color: 'cyan',
  },
  {
    id: 'expert',
    name: 'Expert',
    price: '1 499 $',
    priceSubtext: 'CAD ou 3 × 500 $ CAD',
    description: 'Implémentation guidée par nos experts',
    icon: <Sparkles className="w-8 h-8" />,
    features: [
      'Tout du plan Starter',
      'Implémentation guidée pas-à-pas',
      'Configuration des outils',
      'Tests & validation',
      'Formation de votre équipe',
      'Support prioritaire 90 jours',
      'Garantie résultats',
    ],
    cta: 'Obtenir l\'Expert',
    ctaLink: '#lead-form',
    color: 'blue',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Sur mesure',
    description: 'Solution complète pour grandes organisations',
    icon: <Building2 className="w-8 h-8" />,
    features: [
      'Tout du plan Expert',
      'Analyse multi-départements',
      'Automatisations complexes',
      'Intégrations personnalisées',
      'Accompagnement continu',
      'SLA dédié',
      'Account manager dédié',
    ],
    cta: 'Contacter l\'Équipe',
    ctaLink: 'mailto:contact@visionaiare.com',
    color: 'purple',
  },
];

const colorClasses = {
  gray: {
    card: 'from-slate-800 to-slate-900 border-slate-700',
    icon: 'from-slate-600 to-slate-700',
    badge: 'from-slate-600 to-slate-700',
    button: 'bg-slate-700 hover:bg-slate-600 text-white',
  },
  cyan: {
    card: 'from-cyan-900/30 to-slate-900 border-cyan-500',
    icon: 'from-cyan-500 to-cyan-600',
    badge: 'from-yellow-500 to-orange-500',
    button: 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg',
  },
  blue: {
    card: 'from-blue-900/30 to-slate-900 border-blue-500',
    icon: 'from-blue-500 to-blue-600',
    badge: 'from-blue-500 to-blue-600',
    button: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg',
  },
  purple: {
    card: 'from-purple-900/30 to-slate-900 border-purple-500',
    icon: 'from-purple-500 to-purple-600',
    badge: 'from-purple-500 to-purple-600',
    button: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg',
  },
};

interface PaymentPlansProps {
  showPopularBadge?: boolean;
}

export default function PaymentPlans({ showPopularBadge = true }: PaymentPlansProps) {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Choisissez votre formule
        </h3>
        <p className="text-slate-400">
          Des options flexibles adaptées à votre niveau de confort technique
        </p>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PRICING_PLANS.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className={`relative bg-gradient-to-br ${colorClasses[plan.color].card} border-2 rounded-xl p-6 flex flex-col`}
          >
            {/* Popular Badge */}
            {plan.popular && showPopularBadge && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className={`bg-gradient-to-r ${colorClasses[plan.color].badge} text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg`}>
                  Plus Populaire
                </span>
              </div>
            )}

            {/* Icon */}
            <div className={`inline-block p-3 rounded-lg bg-gradient-to-br ${colorClasses[plan.color].icon} mb-4 w-fit`}>
              {plan.icon}
            </div>

            {/* Plan Name */}
            <h4 className="text-xl font-bold text-white mb-2">{plan.name}</h4>

            {/* Price */}
            <div className="mb-2">
              <span className="text-3xl font-bold text-white">{plan.price}</span>
              {plan.priceSubtext && (
                <p className="text-slate-400 text-sm mt-1">{plan.priceSubtext}</p>
              )}
            </div>

            {/* Description */}
            <p className="text-slate-400 text-sm mb-6">{plan.description}</p>

            {/* Features */}
            <ul className="space-y-3 mb-6 flex-grow">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <motion.a
              href={plan.ctaLink}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`block text-center px-6 py-3 rounded-lg font-medium transition-all ${colorClasses[plan.color].button}`}
            >
              {plan.cta}
            </motion.a>
          </motion.div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="mt-8 text-center text-sm text-slate-400">
        <p>
          💡 <strong className="text-white">Note:</strong> Tous les plans incluent une garantie satisfait ou remboursé de 30 jours.
        </p>
        <p className="mt-2">
          Questions? <a href="mailto:contact@visionaiare.com" className="text-cyan-400 hover:text-cyan-300 underline">Contactez-nous</a>
        </p>
      </div>
    </div>
  );
}
