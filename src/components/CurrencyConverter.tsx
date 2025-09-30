import { useState, useMemo } from 'react';
import styled from 'styled-components';

import { type ForexRate } from '../model/forex';
import { CurrencyInput } from './CurrencyInput';
import { CurrencyList } from './CurrencyList';
import { ConversionResult } from './ConversionResult';
import { useDebounce } from '../hooks/useDebounce';
import { COLOR } from '../styles/color';
import { BREAKPOINT } from '../styles/breakpoint';

const ConverterContainer = styled.div`
  margin: 0 auto;
  padding: 1rem;
  max-width: 100%;
  width: 100%;
  border: 1px solid ${COLOR.BORDER};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (min-width: ${BREAKPOINT.MOBILE}) {
    max-width: 600px;
    padding: 2rem;
  }
`;

const Title = styled.h2`
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${COLOR.TEXT_PRIMARY};
  text-align: center;
`;

type CurrencyConverterProps = {
  rates: ForexRate[];
};

export const CurrencyConverter: React.FC<CurrencyConverterProps> = ({
  rates,
}) => {
  const [amount, setAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('');

  const debouncedAmount = useDebounce(amount, 200);

  const conversionResult = useMemo(() => {
    if (!debouncedAmount || !selectedCurrency || !rates.length) {
      return null;
    }

    const numericAmount = parseFloat(debouncedAmount);
    if (isNaN(numericAmount)) {
      return null;
    }

    const selectedRate = rates.find((rate) => rate.code === selectedCurrency);
    if (!selectedRate || selectedRate.rate == null) {
      return null;
    }

    const convertedAmount = (numericAmount * selectedRate.rate).toFixed(2);

    return {
      amount: numericAmount,
      currency: selectedRate,
      convertedAmount,
    };
  }, [debouncedAmount, selectedCurrency, rates]);

  return (
    <ConverterContainer>
      <Title>Currency Converter</Title>

      <CurrencyInput amount={amount} onAmountChange={setAmount} />

      <CurrencyList
        rates={rates}
        selectedCurrency={selectedCurrency}
        onCurrencySelect={setSelectedCurrency}
      />

      <ConversionResult
        amount={amount}
        selectedCurrency={selectedCurrency}
        convertedAmount={conversionResult?.convertedAmount}
        exchangeRate={conversionResult?.currency.rate}
      />
    </ConverterContainer>
  );
};
