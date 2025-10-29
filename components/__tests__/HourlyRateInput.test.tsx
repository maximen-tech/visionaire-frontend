import { render, screen, fireEvent } from '@testing-library/react';
import HourlyRateInput from '../HourlyRateInput';

describe('HourlyRateInput', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders with null value', () => {
    render(<HourlyRateInput value={null} onChange={mockOnChange} />);

    expect(screen.getByLabelText(/Quel est votre taux horaire/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ex: 75')).toBeInTheDocument();
  });

  it('renders with initial value', () => {
    render(<HourlyRateInput value={100} onChange={mockOnChange} />);

    const input = screen.getByDisplayValue('100');
    expect(input).toBeInTheDocument();
  });

  it('calls onChange with valid number', () => {
    render(<HourlyRateInput value={null} onChange={mockOnChange} />);

    const input = screen.getByPlaceholderText('Ex: 75');
    fireEvent.change(input, { target: { value: '75' } });

    expect(mockOnChange).toHaveBeenCalledWith(75);
  });

  it('shows error for value below minimum', () => {
    render(<HourlyRateInput value={null} onChange={mockOnChange} />);

    const input = screen.getByPlaceholderText('Ex: 75');
    fireEvent.change(input, { target: { value: '15' } });

    expect(screen.getByText(/Le taux horaire minimum est de 20 \$ CAD/)).toBeInTheDocument();
    expect(mockOnChange).toHaveBeenCalledWith(null);
  });

  it('shows error for value above maximum', () => {
    render(<HourlyRateInput value={null} onChange={mockOnChange} />);

    const input = screen.getByPlaceholderText('Ex: 75');
    fireEvent.change(input, { target: { value: '600' } });

    expect(screen.getByText(/Le taux horaire maximum est de 500 \$ CAD/)).toBeInTheDocument();
    expect(mockOnChange).toHaveBeenCalledWith(null);
  });

  it('handles edge case values correctly', () => {
    render(<HourlyRateInput value={null} onChange={mockOnChange} />);

    const input = screen.getByPlaceholderText('Ex: 75');

    // Test boundary: exactly 20 (minimum)
    fireEvent.change(input, { target: { value: '20' } });
    expect(mockOnChange).toHaveBeenCalledWith(20);

    // Test boundary: exactly 500 (maximum)
    fireEvent.change(input, { target: { value: '500' } });
    expect(mockOnChange).toHaveBeenCalledWith(500);

    // Test decimal values
    fireEvent.change(input, { target: { value: '75.50' } });
    expect(mockOnChange).toHaveBeenCalledWith(75.50);
  });

  it('resets to null on empty input', () => {
    render(<HourlyRateInput value={100} onChange={mockOnChange} />);

    const input = screen.getByDisplayValue('100');
    fireEvent.change(input, { target: { value: '' } });

    expect(mockOnChange).toHaveBeenCalledWith(null);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('accepts valid range (20-500)', () => {
    render(<HourlyRateInput value={null} onChange={mockOnChange} />);

    const input = screen.getByPlaceholderText('Ex: 75');

    // Test minimum
    fireEvent.change(input, { target: { value: '20' } });
    expect(mockOnChange).toHaveBeenCalledWith(20);

    // Test maximum
    fireEvent.change(input, { target: { value: '500' } });
    expect(mockOnChange).toHaveBeenCalledWith(500);

    // Test middle
    fireEvent.change(input, { target: { value: '150' } });
    expect(mockOnChange).toHaveBeenCalledWith(150);
  });

  it('has proper ARIA attributes', () => {
    render(<HourlyRateInput value={null} onChange={mockOnChange} />);

    const input = screen.getByPlaceholderText('Ex: 75');
    expect(input).toHaveAttribute('aria-describedby', 'hourly-rate-help');
    expect(input).toHaveAttribute('aria-invalid', 'false');
  });

  it('updates ARIA attributes on error', () => {
    render(<HourlyRateInput value={null} onChange={mockOnChange} />);

    const input = screen.getByPlaceholderText('Ex: 75');
    fireEvent.change(input, { target: { value: '15' } });

    expect(input).toHaveAttribute('aria-describedby', 'hourly-rate-error');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });
});
