import type { KeyboardEvent } from 'react';
import styled from 'styled-components';

import { type ForexRate } from '../model/forex';
import { COLOR } from '../styles/color';
import { BREAKPOINT } from '../styles/breakpoint';

const ExchangeRatesSection = styled.div`
  margin-bottom: 1.5rem;
`;

const ExchangeRatesTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${COLOR.TEXT_PRIMARY};
  margin: 0 0 1rem 0;
`;

const CurrencyListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  max-height: 310px;
  overflow-y: auto;
  border: 1px solid ${COLOR.BORDER};
  border-radius: 8px;
  padding: 0.5rem;
  box-shadow: inset 0 -5px 10px -5px rgba(0, 0, 0, 0.2);
`;

const CurrencyItem = styled.button<{ $isSelected: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid
    ${({ $isSelected }) => ($isSelected ? COLOR.DODGER_BLUE : COLOR.BORDER)};
  border-radius: 8px;
  background: ${({ $isSelected }) =>
    $isSelected ? COLOR.BACKGROUND_ALICE_BLUE : 'transparent'};
  cursor: pointer;

  &:hover {
    border-color: ${COLOR.DODGER_BLUE};
    background: ${COLOR.BACKGROUND_WASH_ME};
  }

  &:focus {
    outline: 2px solid ${COLOR.DODGER_BLUE};
    outline-offset: 2px;
  }
`;

const CurrencyInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: left;

  @media (min-width: ${BREAKPOINT.MOBILE}) {
    flex-direction: row;
  }
`;

const CurrencyCode = styled.span`
  font-weight: 600;
  color: ${COLOR.TEXT_PRIMARY};
  font-size: 0.9rem;
`;

const CurrencyName = styled.span`
  font-size: 0.8rem;
  color: ${COLOR.TEXT_SECONDARY};
`;

const CurrencyRate = styled.span`
  font-weight: 600;
  color: ${COLOR.TEXT_PRIMARY};
  font-size: 0.9rem;
`;

type CurrencyListProps = {
  rates: ForexRate[];
  selectedCurrency: string;
  onCurrencySelect: (currencyCode: string) => void;
};

export const CurrencyList: React.FC<CurrencyListProps> = ({
  rates,
  selectedCurrency,
  onCurrencySelect,
}) => {
  const handleCurrencyClick = (currencyCode: string) => {
    onCurrencySelect(currencyCode);
  };

  const handleKeyDown = (event: KeyboardEvent, currencyCode: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onCurrencySelect(currencyCode);
    }
  };

  return (
    <ExchangeRatesSection>
      <ExchangeRatesTitle>Exchange Rates</ExchangeRatesTitle>
      <CurrencyListContainer>
        {rates.map((rate) => (
          <CurrencyItem
            key={rate.code}
            $isSelected={selectedCurrency === rate.code}
            onClick={() => handleCurrencyClick(rate.code)}
            aria-label={`Select ${rate.currency} (${rate.code})`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e, rate.code)}
          >
            <CurrencyInfo>
              <CurrencyCode>{rate.code}</CurrencyCode>
              <CurrencyName>{rate.currency}</CurrencyName>
            </CurrencyInfo>
            <CurrencyRate>{rate.rate?.toLocaleString() || 'N/A'}</CurrencyRate>
          </CurrencyItem>
        ))}
      </CurrencyListContainer>
    </ExchangeRatesSection>
  );
};
