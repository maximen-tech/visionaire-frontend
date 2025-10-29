import { render, screen } from '@testing-library/react';
import OpportunityCard from '../OpportunityCard';
import type { TimeOpportunity } from '@/lib/types';

describe('OpportunityCard', () => {
  const mockOpportunity: TimeOpportunity = {
    hours_per_week: 5.0,
    hours_per_year: 260.0,
    problem_teaser: 'Site web lent, SEO inexistant, présence digitale limitée',
    complexity_level: 7,
    tools_hint: 'SEO automation, CMS moderne, outils analytics',
  };

  const defaultProps = {
    number: 1,
    title: 'Présence Digitale',
    opportunity: mockOpportunity,
    hourlyRate: null,
    icon: <span>🌐</span>,
  };

  it('renders with required props', () => {
    render(<OpportunityCard {...defaultProps} />);

    expect(screen.getByText('Présence Digitale')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('5.0h/semaine')).toBeInTheDocument();
    expect(screen.getByText(/260h\/an/)).toBeInTheDocument();
  });

  it('displays opportunity number badge', () => {
    render(<OpportunityCard {...defaultProps} number={2} />);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('displays icon', () => {
    render(<OpportunityCard {...defaultProps} />);
    expect(screen.getByText('🌐')).toBeInTheDocument();
  });

  it('displays problem teaser', () => {
    render(<OpportunityCard {...defaultProps} />);
    expect(screen.getByText(/Site web lent/)).toBeInTheDocument();
  });

  it('displays complexity bar', () => {
    render(<OpportunityCard {...defaultProps} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('displays tools hint with blur effect', () => {
    render(<OpportunityCard {...defaultProps} />);
    expect(screen.getByText(/SEO automation/)).toBeInTheDocument();
    expect(screen.getByText('Déverrouillé dans le rapport complet')).toBeInTheDocument();
  });

  it('displays implementation time estimates', () => {
    render(<OpportunityCard {...defaultProps} />);

    expect(screen.getByText('Seul (DIY)')).toBeInTheDocument();
    expect(screen.getByText('Avec expert IA')).toBeInTheDocument();
    expect(screen.getByText(/gagnées/)).toBeInTheDocument();
  });

  it('does not show monetary value without hourly rate', () => {
    render(<OpportunityCard {...defaultProps} hourlyRate={null} />);
    expect(screen.queryByText(/de valeur\/an/)).not.toBeInTheDocument();
  });

  it('shows monetary value with hourly rate', () => {
    render(<OpportunityCard {...defaultProps} hourlyRate={100} />);

    // 260 hours × $100 = $26,000
    expect(screen.getByText(/26 000 \$ CAD/)).toBeInTheDocument();
    expect(screen.getByText(/de valeur\/an/)).toBeInTheDocument();
  });

  it('formats currency in Quebec style', () => {
    render(<OpportunityCard {...defaultProps} hourlyRate={100} />);

    // Should use space as thousands separator and $ CAD suffix
    const monetaryValue = screen.getByText(/26 000 \$ CAD/);
    expect(monetaryValue).toBeInTheDocument();
  });

  it('calculates implementation time based on complexity', () => {
    const { rerender } = render(
      <OpportunityCard {...defaultProps} opportunity={{ ...mockOpportunity, complexity_level: 5 }} />
    );

    // Solo: complexity × 10 - 20 = 5 × 10 - 20 = 30h
    expect(screen.getByText('30.0h')).toBeInTheDocument();

    // Expert: complexity × 1 - 2 = 5 × 1 - 2 = 3h
    expect(screen.getByText('3.0h')).toBeInTheDocument();

    // Test with higher complexity
    rerender(
      <OpportunityCard {...defaultProps} opportunity={{ ...mockOpportunity, complexity_level: 10 }} />
    );

    // Solo: 10 × 10 - 20 = 80h
    expect(screen.getByText('80.0h')).toBeInTheDocument();

    // Expert: 10 × 1 - 2 = 8h
    expect(screen.getByText('8.0h')).toBeInTheDocument();
  });

  it('displays complexity description', () => {
    render(<OpportunityCard {...defaultProps} />);
    // Complexity level 7 should show "Expert IA fortement recommandé"
    expect(screen.getByText(/Expert IA fortement recommandé/)).toBeInTheDocument();
  });

  it('renders skeleton variant', () => {
    const { OpportunityCardSkeleton } = require('../OpportunityCard');
    render(<OpportunityCardSkeleton />);

    // Skeleton should have animate-pulse class
    const skeleton = document.querySelector('.animate-pulse');
    expect(skeleton).toBeInTheDocument();
  });
});
