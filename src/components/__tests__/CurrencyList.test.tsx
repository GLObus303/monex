import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

import { CurrencyList } from '../CurrencyList';
import { type ForexRate } from '../../model/forex';

const mockRates: ForexRate[] = [
  {
    country: 'USA',
    currency: 'US Dollar',
    amount: 1,
    code: 'USD',
    rate: 23.265,
  },
  {
    country: 'EU',
    currency: 'Euro',
    amount: 1,
    code: 'EUR',
    rate: 25.23,
  },
  {
    country: 'GB',
    currency: 'British Pound',
    amount: 1,
    code: 'GBP',
    rate: 29.496,
  },
];

describe('CurrencyList', () => {
  const defaultProps = {
    rates: mockRates,
    selectedCurrency: '',
    onCurrencySelect: vi.fn(),
  };

  it('renders the currency list with title and rates', () => {
    render(<CurrencyList {...defaultProps} />);

    expect(screen.getByText('Exchange Rates')).toBeInTheDocument();
    expect(screen.getByText('USD')).toBeInTheDocument();
    expect(screen.getByText('US Dollar')).toBeInTheDocument();
    expect(screen.getByText('23.265')).toBeInTheDocument();
    expect(screen.getByText('EUR')).toBeInTheDocument();
    expect(screen.getByText('Euro')).toBeInTheDocument();
    expect(screen.getByText('25.23')).toBeInTheDocument();
  });

  it('calls onCurrencySelect when a currency item is clicked', async () => {
    const onCurrencySelect = vi.fn();

    render(
      <CurrencyList {...defaultProps} onCurrencySelect={onCurrencySelect} />,
    );

    const usdButton = screen.getByLabelText('Select US Dollar (USD)');
    await userEvent.click(usdButton);

    expect(onCurrencySelect).toHaveBeenCalledWith('USD');
  });

  it('calls onCurrencySelect when a currency item is activated with keyboard', async () => {
    const onCurrencySelect = vi.fn();

    render(
      <CurrencyList {...defaultProps} onCurrencySelect={onCurrencySelect} />,
    );

    const eurButton = screen.getByLabelText('Select Euro (EUR)');
    eurButton.focus();
    await userEvent.keyboard('{Enter}');

    expect(onCurrencySelect).toHaveBeenCalledWith('EUR');
  });

  it('calls onCurrencySelect when space key is pressed on a currency item', async () => {
    const onCurrencySelect = vi.fn();

    render(
      <CurrencyList {...defaultProps} onCurrencySelect={onCurrencySelect} />,
    );

    const gbpButton = screen.getByLabelText('Select British Pound (GBP)');
    gbpButton.focus();
    await userEvent.keyboard(' ');

    expect(onCurrencySelect).toHaveBeenCalledWith('GBP');
  });

  it('does not call onCurrencySelect for other keys', async () => {
    const onCurrencySelect = vi.fn();

    render(
      <CurrencyList {...defaultProps} onCurrencySelect={onCurrencySelect} />,
    );

    const usdButton = screen.getByLabelText('Select US Dollar (USD)');
    usdButton.focus();
    await userEvent.keyboard('{Tab}');

    expect(onCurrencySelect).not.toHaveBeenCalled();
  });

  it('handles empty rates array', () => {
    render(<CurrencyList {...defaultProps} rates={[]} />);

    expect(screen.getByText('Exchange Rates')).toBeInTheDocument();
  });
});
