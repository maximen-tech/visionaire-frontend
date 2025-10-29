import { render, screen } from '@testing-library/react';
import ComplexityBar from '../ComplexityBar';

describe('ComplexityBar', () => {
  it('renders with default props', () => {
    render(<ComplexityBar level={5} />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByText('5/10 · Moyen')).toBeInTheDocument();
  });

  it('displays correct label for easy level', () => {
    render(<ComplexityBar level={2} />);
    expect(screen.getByText('2/10 · Facile')).toBeInTheDocument();
  });

  it('displays correct label for medium level', () => {
    render(<ComplexityBar level={6} />);
    expect(screen.getByText('6/10 · Moyen')).toBeInTheDocument();
  });

  it('displays correct label for complex level', () => {
    render(<ComplexityBar level={9} />);
    expect(screen.getByText('9/10 · Complexe')).toBeInTheDocument();
  });

  it('hides label when showLabel is false', () => {
    render(<ComplexityBar level={5} showLabel={false} />);
    expect(screen.queryByText('Complexité')).not.toBeInTheDocument();
  });

  it('normalizes level outside 1-10 range', () => {
    const { rerender } = render(<ComplexityBar level={0} />);
    expect(screen.getByText('1/10 · Facile')).toBeInTheDocument();

    rerender(<ComplexityBar level={15} />);
    expect(screen.getByText('10/10 · Complexe')).toBeInTheDocument();
  });

  it('has correct ARIA attributes', () => {
    render(<ComplexityBar level={7} />);
    const progressbar = screen.getByRole('progressbar');

    expect(progressbar).toHaveAttribute('aria-valuenow', '7');
    expect(progressbar).toHaveAttribute('aria-valuemin', '1');
    expect(progressbar).toHaveAttribute('aria-valuemax', '10');
    expect(progressbar).toHaveAttribute('aria-label', 'Niveau de complexité: 7 sur 10');
  });
});
