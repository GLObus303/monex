import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { ConversionResult } from '../ConversionResult';

describe('ConversionResult', () => {
  it('renders conversion result when all data is provided', () => {
    render(
      <ConversionResult
        amount="100"
        selectedCurrency="USD"
        convertedAmount="2326.50"
        exchangeRate={23.265}
      />,
    );

    expect(screen.getByText('Conversion Result')).toBeInTheDocument();
    expect(screen.getByText('2326.50 USD')).toBeInTheDocument();
  });

  it('renders conversion result with decimal amount', () => {
    render(
      <ConversionResult
        amount="0.34"
        selectedCurrency="EUR"
        convertedAmount="8.58"
        exchangeRate={25.23}
      />,
    );

    expect(screen.getByText('8.58 EUR')).toBeInTheDocument();
  });

  it('handles zero amount correctly', () => {
    render(
      <ConversionResult
        amount="0"
        selectedCurrency="USD"
        convertedAmount="0.00"
        exchangeRate={23.265}
      />,
    );

    expect(screen.getByText('0.00 USD')).toBeInTheDocument();
  });

  it('handles large amounts correctly', () => {
    render(
      <ConversionResult
        amount="10000"
        selectedCurrency="EUR"
        convertedAmount="252300.00"
        exchangeRate={25.23}
      />,
    );

    expect(screen.getByText('252300.00 EUR')).toBeInTheDocument();
  });

  it('handles null conversion result correctly', () => {
    render(
      <ConversionResult
        amount="100"
        selectedCurrency="USD"
        convertedAmount=""
        exchangeRate={23.265}
      />,
    );

    expect(screen.queryByText('Conversion Result')).not.toBeInTheDocument();
  });
});
