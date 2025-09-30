import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';

import { CurrencyConverter } from '../CurrencyConverter';
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

describe('CurrencyConverter', () => {
  it('renders the currency converter with input and currency selection', () => {
    render(<CurrencyConverter rates={mockRates} />);

    expect(screen.getByText('Currency Converter')).toBeInTheDocument();
    expect(
      screen.getByLabelText('Amount in CZK to convert'),
    ).toBeInTheDocument();
    expect(screen.getByText('Exchange Rates')).toBeInTheDocument();
  });

  it('allows user to input amount and select currency', async () => {
    render(<CurrencyConverter rates={mockRates} />);

    const amountInput = screen.getByLabelText('Amount in CZK to convert');
    const usdButton = screen.getByLabelText('Select US Dollar (USD)');

    await userEvent.type(amountInput, '100');
    await userEvent.click(usdButton);

    expect(amountInput).toHaveValue('100');
    expect(usdButton).toHaveAttribute('aria-label', 'Select US Dollar (USD)');
  });

  it('displays conversion result when amount and currency are selected', async () => {
    render(<CurrencyConverter rates={mockRates} />);

    const amountInput = screen.getByLabelText('Amount in CZK to convert');
    const usdButton = screen.getByLabelText('Select US Dollar (USD)');

    await userEvent.type(amountInput, '100');
    await userEvent.click(usdButton);

    await waitFor(() => {
      expect(screen.getByText('2326.50 USD')).toBeInTheDocument();
    });
  });

  it('handles decimal input correctly', async () => {
    render(<CurrencyConverter rates={mockRates} />);

    const amountInput = screen.getByLabelText('Amount in CZK to convert');
    const eurButton = screen.getByLabelText('Select Euro (EUR)');

    await userEvent.type(amountInput, '0.34');
    await userEvent.click(eurButton);

    await waitFor(() => {
      expect(screen.getByText('8.58 EUR')).toBeInTheDocument();
    });
  });
});
