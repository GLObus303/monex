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
  const [userAmount, setUserAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('');

  const debouncedAmount = useDebounce(userAmount, 200);

  const conversionResult = useMemo(() => {
    if (!debouncedAmount || !selectedCurrency || !rates.length) {
      return null;
    }

    const numericAmount = parseFloat(debouncedAmount);
    if (isNaN(numericAmount)) {
      return null;
    }

    const { rate, amount } =
      rates.find((innerRate) => innerRate.code === selectedCurrency) || {};
    if (rate == null || amount == null) {
      return null;
    }

    const convertedAmount = ((numericAmount / rate) * amount).toFixed(2);

    return {
      rate,
      convertedAmount,
      baseAmount: amount,
    };
  }, [debouncedAmount, selectedCurrency, rates]);

  return (
    <ConverterContainer>
      <Title>Currency Converter</Title>

      <CurrencyInput amount={userAmount} onAmountChange={setUserAmount} />

      <CurrencyList
        rates={rates}
        selectedCurrency={selectedCurrency}
        onCurrencySelect={setSelectedCurrency}
      />

      <ConversionResult
        userAmount={userAmount}
        selectedCurrency={selectedCurrency}
        convertedAmount={conversionResult?.convertedAmount}
        exchangeRate={conversionResult?.rate}
        baseAmount={conversionResult?.baseAmount}
      />
    </ConverterContainer>
  );
};
