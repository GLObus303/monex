import type { VercelRequest, VercelResponse } from '@vercel/node';

import { parseForexData } from '../src/utils/parseForexData.js';

export const config = {
  runtime: 'nodejs',
};

const CNB_API_URL =
  'https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt';

export default async function handler(_: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    const response = await fetch(CNB_API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    const forexData = parseForexData(text);

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(forexData);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching CNB data:', error);

    res.status(500).json({
      error: 'Failed to fetch forex rates',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
