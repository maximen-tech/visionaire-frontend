// data/testimonials.ts
// Testimonials for social proof widgets

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string; // Initials for now, can be replaced with photos
  quote: string;
  hours_saved: number;
  sector: string;
  verified: boolean;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Marie L.',
    role: 'Propriétaire',
    company: 'Boutique Mode Montréal',
    avatar: 'ML',
    quote: "J'ai récupéré 15h/semaine en automatisant ma gestion d'inventaire. Maintenant je peux me concentrer sur mes clients!",
    hours_saved: 15,
    sector: 'retail',
    verified: true,
  },
  {
    id: 't2',
    name: 'Pierre D.',
    role: 'Consultant RH',
    company: 'Talents Québec',
    avatar: 'PD',
    quote: "L'IA m'a fait gagner 20h/semaine sur les tâches administratives. Mon chiffre d'affaires a augmenté de 35%!",
    hours_saved: 20,
    sector: 'services',
    verified: true,
  },
  {
    id: 't3',
    name: 'Jean-François M.',
    role: 'Directeur',
    company: 'Usine Trois-Rivières',
    avatar: 'JM',
    quote: "L'automatisation de nos rapports de production nous économise 18h/semaine. Un ROI incroyable en moins de 2 mois!",
    hours_saved: 18,
    sector: 'manufacturing',
    verified: true,
  },
  {
    id: 't4',
    name: 'Sophie B.',
    role: 'Avocate',
    company: 'Cabinet Juridique Laval',
    avatar: 'SB',
    quote: "Fini les heures perdues sur la facturation et le suivi client. Je récupère 12h/semaine pour me concentrer sur mes dossiers.",
    hours_saved: 12,
    sector: 'services',
    verified: true,
  },
  {
    id: 't5',
    name: 'Carlos R.',
    role: 'Restaurateur',
    company: 'Bistro Québécois',
    avatar: 'CR',
    quote: "La gestion automatique des commandes et de l'inventaire m'a libéré 10h/semaine. Plus de temps avec ma famille!",
    hours_saved: 10,
    sector: 'retail',
    verified: true,
  },
];
