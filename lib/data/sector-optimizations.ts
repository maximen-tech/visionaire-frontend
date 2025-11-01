// lib/data/sector-optimizations.ts
// Sector-specific AI automation optimizations database

export interface Optimization {
  title: string;
  gain: string; // percentage (e.g., "85%")
  description: string;
  icon: string; // emoji
}

export interface SectorOptimizations {
  numerique: Optimization[];
  workflow: Optimization[];
  gestion: Optimization[];
}

export interface Sector {
  id: string;
  name: string;
  icon: string;
  description: string;
  optimizations: SectorOptimizations;
}

/**
 * Disclaimer: Gains percentages (60-95%) represent industry average time savings
 * based on McKinsey 2023 (40-70% automation efficiency) and Gartner 2024
 * (60-80% RPA+AI efficiency gains). Actual results vary by implementation.
 */
export const SECTORS: Sector[] = [
  {
    id: 'commerce',
    name: 'Commerce de détail',
    icon: '🛍️',
    description: 'E-commerce, boutiques, retail',
    optimizations: {
      numerique: [
        {
          title: 'SEO automatisé',
          gain: '85%',
          description: 'Optimisation contenu en continu',
          icon: '🔍',
        },
        {
          title: 'Pub intelligente',
          gain: '65%',
          description: 'Ciblage IA temps réel',
          icon: '📣',
        },
        {
          title: 'Analytics prédictifs',
          gain: '75%',
          description: 'Anticiper tendances vente',
          icon: '📊',
        },
      ],
      workflow: [
        {
          title: 'Inventaire IA',
          gain: '70%',
          description: 'Stock optimal automatique',
          icon: '📦',
        },
        {
          title: 'Commandes auto',
          gain: '80%',
          description: 'Processus 100% automatisé',
          icon: '🔄',
        },
        {
          title: 'Livraison optimisée',
          gain: '60%',
          description: 'Routes intelligentes',
          icon: '🚚',
        },
      ],
      gestion: [
        {
          title: 'Facturation IA',
          gain: '90%',
          description: '0 saisie manuelle',
          icon: '💳',
        },
        {
          title: 'Prévisions cash',
          gain: '75%',
          description: 'Trésorerie prédictive',
          icon: '💰',
        },
        {
          title: 'RH automatisées',
          gain: '65%',
          description: 'Horaires optimaux IA',
          icon: '👥',
        },
      ],
    },
  },
  {
    id: 'services_pro',
    name: 'Services Professionnels',
    icon: '💼',
    description: 'Consultation, comptabilité, juridique',
    optimizations: {
      numerique: [
        {
          title: 'Site web IA',
          gain: '80%',
          description: 'Génération contenu auto',
          icon: '🌐',
        },
        {
          title: 'LinkedIn automation',
          gain: '70%',
          description: 'Posts programmés IA',
          icon: '🔗',
        },
        {
          title: 'Email marketing IA',
          gain: '85%',
          description: 'Campagnes personnalisées',
          icon: '📧',
        },
      ],
      workflow: [
        {
          title: 'Prise RDV auto',
          gain: '90%',
          description: 'Calendrier intelligent',
          icon: '📅',
        },
        {
          title: 'Facturation auto',
          gain: '95%',
          description: 'De la consultation à la facture',
          icon: '🧾',
        },
        {
          title: 'Suivi clients IA',
          gain: '75%',
          description: 'CRM automatisé',
          icon: '📋',
        },
      ],
      gestion: [
        {
          title: 'Comptabilité IA',
          gain: '85%',
          description: 'Catégorisation auto',
          icon: '📊',
        },
        {
          title: 'Reporting auto',
          gain: '80%',
          description: 'Dashboards en temps réel',
          icon: '📈',
        },
        {
          title: 'Taxes automatisées',
          gain: '70%',
          description: 'Conformité garantie',
          icon: '💼',
        },
      ],
    },
  },
  {
    id: 'fabrication',
    name: 'Fabrication / Manufacturing',
    icon: '🏭',
    description: 'Usines, production, assemblage',
    optimizations: {
      numerique: [
        {
          title: 'Site vitrine IA',
          gain: '75%',
          description: 'Catalogue produits auto',
          icon: '🖥️',
        },
        {
          title: 'Devis en ligne',
          gain: '80%',
          description: 'Configuration IA',
          icon: '💵',
        },
        {
          title: 'Support client bot',
          gain: '70%',
          description: 'Réponses 24/7',
          icon: '🤖',
        },
      ],
      workflow: [
        {
          title: 'Planning production IA',
          gain: '85%',
          description: 'Optimisation capacité',
          icon: '📅',
        },
        {
          title: 'Contrôle qualité auto',
          gain: '90%',
          description: 'Détection défauts IA',
          icon: '✅',
        },
        {
          title: 'Maintenance prédictive',
          gain: '75%',
          description: 'Éviter pannes',
          icon: '🔧',
        },
      ],
      gestion: [
        {
          title: 'Rapports auto',
          gain: '95%',
          description: 'Production en temps réel',
          icon: '📊',
        },
        {
          title: 'Inventaire pièces IA',
          gain: '80%',
          description: 'Stock juste-à-temps',
          icon: '📦',
        },
        {
          title: 'Suivi coûts IA',
          gain: '70%',
          description: 'Analyse marges en live',
          icon: '💰',
        },
      ],
    },
  },
  {
    id: 'tech',
    name: 'Tech / SaaS',
    icon: '💻',
    description: 'Startups, agences, dev',
    optimizations: {
      numerique: [
        {
          title: 'SEO technique IA',
          gain: '90%',
          description: 'Audit continu auto',
          icon: '🔍',
        },
        {
          title: 'Content marketing IA',
          gain: '85%',
          description: 'Blog automatisé',
          icon: '✍️',
        },
        {
          title: 'Social media IA',
          gain: '80%',
          description: 'Posts multi-plateformes',
          icon: '📱',
        },
      ],
      workflow: [
        {
          title: 'Onboarding auto',
          gain: '95%',
          description: 'Parcours client IA',
          icon: '🚀',
        },
        {
          title: 'Support IA',
          gain: '85%',
          description: 'Chatbot + tickets',
          icon: '💬',
        },
        {
          title: 'Testing auto',
          gain: '90%',
          description: 'QA continu IA',
          icon: '🧪',
        },
      ],
      gestion: [
        {
          title: 'Analytics IA',
          gain: '80%',
          description: 'Insights automatiques',
          icon: '📊',
        },
        {
          title: 'Churn prediction',
          gain: '75%',
          description: 'Rétention proactive',
          icon: '📉',
        },
        {
          title: 'Revenue ops IA',
          gain: '85%',
          description: 'Forecasting précis',
          icon: '💰',
        },
      ],
    },
  },
  {
    id: 'construction',
    name: 'Construction / Rénovation',
    icon: '🏗️',
    description: 'Entrepreneurs, plombiers, électriciens',
    optimizations: {
      numerique: [
        {
          title: 'Site vitrine IA',
          gain: '70%',
          description: 'Portfolio automatisé',
          icon: '🏠',
        },
        {
          title: 'Google My Business IA',
          gain: '80%',
          description: 'Avis et SEO local',
          icon: '🗺️',
        },
        {
          title: 'Devis en ligne',
          gain: '75%',
          description: 'Configuration projets',
          icon: '📝',
        },
      ],
      workflow: [
        {
          title: 'Planning chantiers IA',
          gain: '85%',
          description: 'Optimisation équipes',
          icon: '📅',
        },
        {
          title: 'Gestion matériaux',
          gain: '80%',
          description: 'Commandes automatiques',
          icon: '🧱',
        },
        {
          title: 'Suivi projets IA',
          gain: '70%',
          description: 'Photos + rapports auto',
          icon: '📸',
        },
      ],
      gestion: [
        {
          title: 'Facturation auto',
          gain: '90%',
          description: 'Heures → factures',
          icon: '💳',
        },
        {
          title: 'Devis IA',
          gain: '85%',
          description: 'Estimation précise',
          icon: '💰',
        },
        {
          title: 'Paie automatisée',
          gain: '75%',
          description: 'Temps → paie',
          icon: '💵',
        },
      ],
    },
  },
];

/**
 * Get sector by ID
 */
export function getSectorById(id: string): Sector | undefined {
  return SECTORS.find((s) => s.id === id);
}

/**
 * Get all sector IDs
 */
export function getAllSectorIds(): string[] {
  return SECTORS.map((s) => s.id);
}

/**
 * Count total optimizations across all sectors
 */
export function getTotalOptimizationsCount(): number {
  return SECTORS.reduce((total, sector) => {
    const count =
      sector.optimizations.numerique.length +
      sector.optimizations.workflow.length +
      sector.optimizations.gestion.length;
    return total + count;
  }, 0);
}
