// data/case-studies.ts
// Case study snippets for social proof

export interface CaseStudySnippet {
  id: string;
  company: string;
  sector: string;
  challenge: string;
  result: string;
  roi: string;
  image: string;
  cta_text: string;
  cta_url: string;
}

export const CASE_STUDIES: CaseStudySnippet[] = [
  {
    id: 'cs1',
    company: 'Boutique Mode MTL',
    sector: 'Commerce de détail',
    challenge: 'Gestion manuelle d\'inventaire prenait 15h/semaine',
    result: '15h/semaine économisées',
    roi: '733% ROI',
    image: '/images/case-studies/retail-placeholder.jpg',
    cta_text: 'Lire l\'étude complète',
    cta_url: '/blog/ia-economie-200h-pme#retail',
  },
  {
    id: 'cs2',
    company: 'Talents Québec',
    sector: 'Services professionnels',
    challenge: 'Tâches administratives RH accaparaient 20h/semaine',
    result: '20h/semaine économisées',
    roi: '3722% ROI',
    image: '/images/case-studies/services-placeholder.jpg',
    cta_text: 'Découvrir le cas',
    cta_url: '/blog/ia-economie-200h-pme#services',
  },
  {
    id: 'cs3',
    company: 'Usine Trois-Rivières',
    sector: 'Fabrication',
    challenge: 'Rapports de production manuels prenaient 18h/semaine',
    result: '18h/semaine économisées',
    roi: '594% ROI',
    image: '/images/case-studies/manufacturing-placeholder.jpg',
    cta_text: 'Voir les résultats',
    cta_url: '/blog/ia-economie-200h-pme#manufacturing',
  },
];
