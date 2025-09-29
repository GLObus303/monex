import { useQuery } from '@tanstack/react-query';

import { type ForexData } from '../model/forex';

const CNB_API_URL = '/api/forex';

export const fetchForexRates = async () => {
  const url = CNB_API_URL;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = (await response.json()) as ForexData;

  return {
    date: data.date,
    rates: data.rates,
  };
};

export const useForexRates = () =>
  useQuery({
    queryKey: ['forex-rates'],
    queryFn: fetchForexRates,
  });
