import styled from 'styled-components';
import { useAutoAnimate } from '@formkit/auto-animate/react';

import { COLOR } from '../styles/color';

const ResultSection = styled.section`
  padding: 1rem;
  background: ${COLOR.BACKGROUND_WASH_ME};
  border-radius: 8px;
  border: 1px solid ${COLOR.BORDER};
`;

const ResultTitle = styled.h4`
  font-weight: 600;
  color: ${COLOR.TEXT_PRIMARY};
`;

const ResultValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${COLOR.TEXT_DARK};
  word-wrap: break-word;
`;

const ResultDetails = styled.div`
  font-size: 0.9rem;
  color: ${COLOR.TEXT_PRIMARY};
  word-wrap: break-word;
`;

type ConversionResultProps = {
  userAmount: string;
  selectedCurrency: string;
  convertedAmount?: string;
  exchangeRate?: number;
  baseAmount?: number;
};

export const ConversionResult: React.FC<ConversionResultProps> = ({
  userAmount,
  selectedCurrency,
  convertedAmount,
  exchangeRate,
  baseAmount,
}) => {
  const [parent] = useAutoAnimate();

  const hasValidConversion =
    !!userAmount && !!selectedCurrency && !!convertedAmount;

  return (
    <div ref={parent}>
      {hasValidConversion && (
        <ResultSection>
          <ResultTitle>Conversion Result</ResultTitle>

          <ResultValue aria-live="polite" aria-atomic="true">
            {convertedAmount} {selectedCurrency}
          </ResultValue>
          <ResultDetails>
            {Number(userAmount).toFixed(2)} CZK = {convertedAmount}{' '}
            {selectedCurrency}
            <div>
              Rate: {baseAmount} CZK = {exchangeRate} {selectedCurrency}
            </div>
          </ResultDetails>
        </ResultSection>
      )}
    </div>
  );
};
