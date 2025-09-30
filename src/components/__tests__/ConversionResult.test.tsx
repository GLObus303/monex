import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { ConversionResult } from '../ConversionResult';

describe('ConversionResult', () => {
  it('renders conversion result when all data is provided', () => {
    render(
      <ConversionResult
        userAmount="100"
        selectedCurrency="USD"
        convertedAmount="2,326.5"
        exchangeRate={23.265}
        baseAmount={1}
      />,
    );

    expect(screen.getByText('Conversion Result')).toBeInTheDocument();
    expect(screen.getByText('2,326.5 USD')).toBeInTheDocument();
  });

  it('renders conversion result with decimal amount', () => {
    render(
      <ConversionResult
        userAmount="0.34"
        selectedCurrency="EUR"
        convertedAmount="8.58"
        exchangeRate={25.23}
        baseAmount={1}
      />,
    );

    expect(screen.getByText('8.58 EUR')).toBeInTheDocument();
  });

  it('handles zero amount correctly', () => {
    render(
      <ConversionResult
        userAmount="0"
        selectedCurrency="USD"
        convertedAmount="0"
        exchangeRate={23.265}
        baseAmount={1}
      />,
    );

    expect(screen.getByText('0 USD')).toBeInTheDocument();
  });

  it('handles large amounts correctly', () => {
    render(
      <ConversionResult
        userAmount="10000"
        selectedCurrency="EUR"
        convertedAmount="252,300"
        exchangeRate={25.23}
        baseAmount={1}
      />,
    );

    expect(screen.getByText('252,300 EUR')).toBeInTheDocument();
  });

  it('handles null conversion result correctly', () => {
    render(
      <ConversionResult
        userAmount="100"
        selectedCurrency="USD"
        convertedAmount=""
        exchangeRate={23.265}
        baseAmount={1}
      />,
    );

    expect(screen.queryByText('Conversion Result')).not.toBeInTheDocument();
  });
});
