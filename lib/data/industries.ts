// lib/data/industries.ts
// Industry-specific content for landing pages

export interface IndustryData {
  slug: string;
  name: string;
  icon: string;
  tagline: string;
  description: string;
  challenges: {
    title: string;
    description: string;
    icon: string;
  }[];
  useCases: {
    title: string;
    description: string;
    hoursSaved: string;
    tools: string[];
  }[];
  opportunities: {
    area: string;
    potential: string;
    complexity: number; // 1-10
  }[];
  testimonial?: {
    quote: string;
    author: string;
    company: string;
    role: string;
  };
}

export const industries: Record<string, IndustryData> = {
  restauration: {
    slug: 'restauration',
    name: 'Restauration & Hôtellerie',
    icon: '🍽️',
    tagline: 'Automatisez vos réservations, inventaires et communications clients',
    description:
      "Le secteur de la restauration et de l'hôtellerie est souvent submergé par des tâches administratives répétitives qui empêchent les propriétaires de se concentrer sur l'essentiel : l'expérience client.",
    challenges: [
      {
        title: 'Gestion des Réservations',
        description: 'Appels téléphoniques constants, double bookings, confirmations manuelles',
        icon: '📞',
      },
      {
        title: 'Inventaire & Approvisionnement',
        description: 'Suivi manuel des stocks, commandes répétitives, gaspillage',
        icon: '📦',
      },
      {
        title: 'Communication Clients',
        description: 'Réponses aux avis, marketing, fidélisation client',
        icon: '💬',
      },
    ],
    useCases: [
      {
        title: 'Système de Réservation Automatisé',
        description:
          'Intégration avec Google/Facebook pour accepter les réservations 24/7, confirmations automatiques par SMS/email, rappels pré-visite',
        hoursSaved: '15-20h/semaine',
        tools: ['OpenTable', 'Zapier', 'Calendly', 'Twilio'],
      },
      {
        title: 'Gestion d\'Inventaire Intelligente',
        description:
          'Suivi automatique des stocks, alertes de réapprovisionnement, analyse des tendances de consommation, réduction du gaspillage',
        hoursSaved: '8-12h/semaine',
        tools: ['Toast POS', 'Square', 'MarketMan'],
      },
      {
        title: 'Marketing Automatisé',
        description:
          'Emails de fidélisation, promotions ciblées, gestion des avis clients, campagnes saisonnières',
        hoursSaved: '5-8h/semaine',
        tools: ['Mailchimp', 'ChatGPT', 'Canva'],
      },
    ],
    opportunities: [
      {
        area: 'Réservations & Confirmations',
        potential: '15-20h/semaine',
        complexity: 4,
      },
      {
        area: 'Inventaire & Commandes',
        potential: '8-12h/semaine',
        complexity: 6,
      },
      {
        area: 'Marketing & Fidélisation',
        potential: '5-8h/semaine',
        complexity: 3,
      },
    ],
    testimonial: {
      quote:
        "Avant Vision'AI're, je passais 20 heures par semaine à gérer les réservations. Maintenant, tout est automatisé et je peux me concentrer sur mes clients.",
      author: 'Marie Tremblay',
      company: 'Bistro La Petite France',
      role: 'Propriétaire',
    },
  },

  commerce: {
    slug: 'commerce',
    name: 'Commerce de Détail',
    icon: '🛍️',
    tagline: 'Optimisez votre gestion de stock, ventes et service client',
    description:
      'Les commerces de détail jonglent avec des inventaires complexes, des canaux de vente multiples et des attentes clients élevées. L\'automatisation permet de gérer tout cela efficacement.',
    challenges: [
      {
        title: 'Gestion Multi-Canal',
        description: 'Synchronisation boutique physique + en ligne, inventaire en temps réel',
        icon: '🌐',
      },
      {
        title: 'Service Client',
        description: 'Questions répétitives, suivi des commandes, retours/échanges',
        icon: '🤝',
      },
      {
        title: 'Marketing & Promotions',
        description: 'Campagnes saisonnières, segmentation clients, programmes de fidélité',
        icon: '📈',
      },
    ],
    useCases: [
      {
        title: 'Chatbot Service Client',
        description:
          'Réponses automatiques aux questions courantes (heures d\'ouverture, retours, disponibilité), suivi de commandes, recommandations personnalisées',
        hoursSaved: '12-15h/semaine',
        tools: ['Tidio', 'Zendesk', 'ChatGPT API'],
      },
      {
        title: 'Synchronisation Inventaire Multi-Canal',
        description:
          'Stock synchronisé en temps réel entre boutique et site web, alertes de rupture, prévisions de demande',
        hoursSaved: '10-14h/semaine',
        tools: ['Shopify', 'Lightspeed', 'Square'],
      },
      {
        title: 'Campagnes Marketing Automatisées',
        description:
          'Emails de panier abandonné, promotions personnalisées, newsletters segmentées, avis clients automatisés',
        hoursSaved: '6-10h/semaine',
        tools: ['Klaviyo', 'Mailchimp', 'Yotpo'],
      },
    ],
    opportunities: [
      {
        area: 'Service Client & Support',
        potential: '12-15h/semaine',
        complexity: 5,
      },
      {
        area: 'Gestion d\'Inventaire',
        potential: '10-14h/semaine',
        complexity: 7,
      },
      {
        area: 'Marketing Automation',
        potential: '6-10h/semaine',
        complexity: 4,
      },
    ],
  },

  services: {
    slug: 'services',
    name: 'Services Professionnels',
    icon: '💼',
    tagline: 'Automatisez votre prospection, facturation et gestion de projets',
    description:
      'Les entreprises de services professionnels (consultants, comptables, agences) passent trop de temps sur l\'administratif au lieu de facturer des heures clients.',
    challenges: [
      {
        title: 'Prospection & Qualification',
        description: 'Génération de leads, suivi des prospects, propositions commerciales',
        icon: '🎯',
      },
      {
        title: 'Facturation & Comptabilité',
        description: 'Création de factures, suivi des paiements, rappels clients',
        icon: '💰',
      },
      {
        title: 'Gestion de Projets',
        description: 'Coordination d\'équipe, reporting clients, timesheet',
        icon: '📊',
      },
    ],
    useCases: [
      {
        title: 'Pipeline CRM Automatisé',
        description:
          'Qualification automatique des leads, séquences d\'emails de prospection, rappels de suivi, scoring des opportunités',
        hoursSaved: '15-20h/semaine',
        tools: ['HubSpot', 'Pipedrive', 'ActiveCampaign'],
      },
      {
        title: 'Facturation & Recouvrement Automatisé',
        description:
          'Génération automatique de factures, rappels de paiement, réconciliation bancaire, reporting financier',
        hoursSaved: '8-12h/semaine',
        tools: ['QuickBooks', 'FreshBooks', 'Stripe'],
      },
      {
        title: 'Rapports Clients & Timesheet',
        description:
          'Tracking automatique du temps, rapports de projet générés par IA, dashboards clients en temps réel',
        hoursSaved: '6-10h/semaine',
        tools: ['Toggl', 'Harvest', 'Notion AI'],
      },
    ],
    opportunities: [
      {
        area: 'CRM & Prospection',
        potential: '15-20h/semaine',
        complexity: 5,
      },
      {
        area: 'Facturation & Finance',
        potential: '8-12h/semaine',
        complexity: 4,
      },
      {
        area: 'Reporting & Timesheet',
        potential: '6-10h/semaine',
        complexity: 6,
      },
    ],
    testimonial: {
      quote:
        'En automatisant notre CRM et notre facturation, nous avons récupéré 25 heures par semaine. Cela représente 3 clients supplémentaires par mois.',
      author: 'François Leblanc',
      company: 'Leblanc Consulting',
      role: 'Fondateur',
    },
  },

  construction: {
    slug: 'construction',
    name: 'Construction & Immobilier',
    icon: '🏗️',
    tagline: 'Simplifiez vos soumissions, planification et gestion de chantiers',
    description:
      'Le secteur de la construction et de l\'immobilier est notoirement inefficace sur le plan administratif. L\'automatisation permet de réduire les retards et les dépassements de budget.',
    challenges: [
      {
        title: 'Soumissions & Estimations',
        description: 'Calculs manuels d\'estimations, modèles de soumissions, suivi des appels d\'offres',
        icon: '📝',
      },
      {
        title: 'Gestion de Chantiers',
        description: 'Planification des équipes, suivi de l\'avancement, communication multi-partie',
        icon: '🚧',
      },
      {
        title: 'Conformité & Documentation',
        description: 'Permis, inspections, rapports de sécurité, garanties',
        icon: '📋',
      },
    ],
    useCases: [
      {
        title: 'Générateur de Soumissions Automatisé',
        description:
          'Templates intelligents, calcul automatique des coûts (matériaux + main-d\'œuvre), génération PDF professionnelle, suivi des versions',
        hoursSaved: '12-18h/semaine',
        tools: ['PlanSwift', 'Procore', 'Notion'],
      },
      {
        title: 'Planification & Suivi de Chantiers',
        description:
          'Calendriers synchronisés, notifications d\'étapes, rapports d\'avancement automatiques, gestion des retards',
        hoursSaved: '10-15h/semaine',
        tools: ['Procore', 'CoConstruct', 'Buildertrend'],
      },
      {
        title: 'Gestion Documentaire Intelligente',
        description:
          'Scan et OCR de documents, rappels de renouvellement de permis, archivage automatique, recherche intelligente',
        hoursSaved: '5-8h/semaine',
        tools: ['Dropbox', 'DocuSign', 'ChatGPT'],
      },
    ],
    opportunities: [
      {
        area: 'Soumissions & Estimations',
        potential: '12-18h/semaine',
        complexity: 6,
      },
      {
        area: 'Planification de Chantiers',
        potential: '10-15h/semaine',
        complexity: 7,
      },
      {
        area: 'Documentation & Conformité',
        potential: '5-8h/semaine',
        complexity: 5,
      },
    ],
  },

  sante: {
    slug: 'sante',
    name: 'Santé & Bien-être',
    icon: '🏥',
    tagline: 'Automatisez vos rendez-vous, dossiers patients et rappels',
    description:
      'Les professionnels de la santé et du bien-être passent trop de temps sur l\'administratif, réduisant le temps disponible pour les soins aux patients.',
    challenges: [
      {
        title: 'Prise de Rendez-vous',
        description: 'Appels répétitifs, confirmations, no-shows, annulations de dernière minute',
        icon: '📅',
      },
      {
        title: 'Dossiers Patients',
        description: 'Saisie manuelle des notes, recherche d\'historique, rappels de suivi',
        icon: '📁',
      },
      {
        title: 'Communication & Rappels',
        description: 'Rappels de RDV, résultats d\'analyses, renouvellements d\'ordonnances',
        icon: '📲',
      },
    ],
    useCases: [
      {
        title: 'Système de Rendez-vous Intelligent',
        description:
          'Réservation en ligne 24/7, confirmations automatiques, rappels SMS/email, gestion des annulations',
        hoursSaved: '15-20h/semaine',
        tools: ['Jane App', 'Cliniko', 'Acuity'],
      },
      {
        title: 'Gestion Électronique des Dossiers',
        description:
          'Transcription automatique des notes vocales, recherche intelligente dans l\'historique, rappels de suivi',
        hoursSaved: '10-14h/semaine',
        tools: ['Telus Health', 'CloudMD', 'ChatGPT'],
      },
      {
        title: 'Communication Patients Automatisée',
        description:
          'Rappels de rendez-vous, notifications de résultats, séquences d\'emails post-consultation, sondages de satisfaction',
        hoursSaved: '6-10h/semaine',
        tools: ['Twilio', 'Mailchimp', 'Typeform'],
      },
    ],
    opportunities: [
      {
        area: 'Rendez-vous & Confirmations',
        potential: '15-20h/semaine',
        complexity: 4,
      },
      {
        area: 'Dossiers Électroniques',
        potential: '10-14h/semaine',
        complexity: 7,
      },
      {
        area: 'Communication Patients',
        potential: '6-10h/semaine',
        complexity: 3,
      },
    ],
    testimonial: {
      quote:
        'Grâce à l\'automatisation, j\'ai éliminé 90% de mes no-shows et récupéré 18 heures par semaine. Je peux maintenant voir 15 patients de plus chaque semaine.',
      author: 'Dr. Sophie Gagnon',
      company: 'Clinique Santé Plus',
      role: 'Chiropraticienne',
    },
  },
};

export const industryOrder = ['restauration', 'commerce', 'services', 'construction', 'sante'];
