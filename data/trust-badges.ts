// data/trust-badges.ts
// Trust badges for credibility

export interface TrustBadge {
  id: string;
  name: string;
  logo: string; // SVG path or emoji for now
  description: string;
  url?: string;
}

export const TRUST_BADGES: TrustBadge[] = [
  {
    id: 'b1',
    name: 'Entreprise Québécoise',
    logo: '🍁',
    description: 'Fièrement québécoise, basée à Montréal',
  },
  {
    id: 'b2',
    name: 'PME MTL',
    logo: '🏢',
    description: 'Membre PME MTL - Soutien aux entreprises québécoises',
    url: 'https://pmemtl.com',
  },
  {
    id: 'b3',
    name: 'IA Responsable',
    logo: '🤖',
    description: 'Engagement envers une IA éthique et transparente',
  },
  {
    id: 'b4',
    name: 'Sécurité SSL',
    logo: '🔒',
    description: 'Données chiffrées et sécurisées (SSL/TLS)',
  },
  {
    id: 'b5',
    name: 'Support Local',
    logo: '💬',
    description: 'Support en français par des experts québécois',
  },
  {
    id: 'b6',
    name: 'Satisfaction Garantie',
    logo: '⭐',
    description: 'Plus de 95% de satisfaction client',
  },
];
