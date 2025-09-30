import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import { CurrencyInput } from '../CurrencyInput';

describe('CurrencyInput', () => {
  const defaultProps = {
    amount: '',
    onAmountChange: vi.fn(),
  };

  it('renders the currency input with all elements', () => {
    render(<CurrencyInput {...defaultProps} />);

    expect(screen.getByText('Convert CZK')).toBeInTheDocument();
    expect(
      screen.getByLabelText('Amount in CZK to convert'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Enter a number (e.g., 1, 0.34, 100)'),
    ).toBeInTheDocument();
  });

  it('displays the current amount value', () => {
    render(<CurrencyInput {...defaultProps} amount="100" />);

    const amountInput = screen.getByLabelText('Amount in CZK to convert');
    expect(amountInput).toHaveValue('100');
  });

  it('calls onAmountChange when amount input changes', async () => {
    const onAmountChange = vi.fn();
    render(<CurrencyInput {...defaultProps} onAmountChange={onAmountChange} />);

    const amountInput = screen.getByLabelText('Amount in CZK to convert');
    await userEvent.type(amountInput, '58');

    expect(onAmountChange).toHaveBeenLastCalledWith('8');
  });

  it('validates amount input to only allow numbers and decimals', async () => {
    const onAmountChange = vi.fn();
    render(<CurrencyInput {...defaultProps} onAmountChange={onAmountChange} />);

    const amountInput = screen.getByLabelText('Amount in CZK to convert');

    await userEvent.clear(amountInput);
    await userEvent.type(amountInput, 'abc');
    expect(onAmountChange).not.toHaveBeenCalled();

    await userEvent.clear(amountInput);
    await userEvent.type(amountInput, '100abc');
    expect(onAmountChange).toHaveBeenLastCalledWith('0');
  });
});
