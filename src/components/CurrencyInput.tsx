import type { ChangeEvent } from 'react';
import styled from 'styled-components';

import { COLOR } from '../styles/color';

const InputSection = styled.div`
  margin-bottom: 1.5rem;
`;

const InputLabel = styled.label`
  display: block;
  font-weight: 500;
  color: ${COLOR.TEXT_PRIMARY};
  margin-bottom: 0.5rem;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
`;

const AmountInput = styled.input`
  flex: 1;
  padding: 1rem;
  border: 2px solid ${COLOR.BORDER};
  border-radius: 8px;
  max-width: 100%;

  &:focus {
    outline: none;
    border-color: ${COLOR.DODGER_BLUE};
  }

  &::placeholder {
    color: ${COLOR.SANTAS_GREEN};
  }
`;

const HelpText = styled.div`
  font-size: 0.8rem;
  color: ${COLOR.TEXT_SECONDARY};
  margin-top: 0.25rem;
`;

type CurrencyInputProps = {
  amount: string;
  onAmountChange: (amount: string) => void;
};

export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  amount,
  onAmountChange,
}) => {
  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      onAmountChange(value);
    }
  };

  return (
    <InputSection>
      <InputLabel htmlFor="amount-input">Convert CZK</InputLabel>
      <InputContainer>
        <AmountInput
          id="amount-input"
          type="text"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Enter amount"
          aria-label="Amount in CZK to convert"
          aria-describedby="amount-help"
        />
      </InputContainer>
      <HelpText id="amount-help">Enter a number (e.g., 1, 0.34, 100)</HelpText>
    </InputSection>
  );
};
