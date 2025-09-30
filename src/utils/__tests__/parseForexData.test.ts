import { parseForexData } from '../parseForexData';

describe('parseForexData', () => {
  it('should parse valid forex data correctly, even with extra whitespace', () => {
    const input = `1 Jan 2024
Country | Currency | Amount | Code | Rate
Australia | dollar | 1 | AUD | 15.123
Brazil | real | 1 | BRL | 4.567`;

    const result = parseForexData(input);

    expect(result).toEqual({
      date: '1 Jan 2024',
      rates: [
        {
          country: 'Australia',
          currency: 'dollar',
          amount: 1,
          code: 'AUD',
          rate: 15.123,
        },
        {
          country: 'Brazil',
          currency: 'real',
          amount: 1,
          code: 'BRL',
          rate: 4.567,
        },
      ],
    });
  });

  it('should handle decimal rates correctly', () => {
    const input = `1 Jan 2024
Country | Currency | Amount | Code | Rate
Japan|yen|100|JPY|15.123456
Switzerland|franc|1|CHF|25.789`;

    const result = parseForexData(input);

    expect(result.rates[0].rate).toBe(15.123456);
    expect(result.rates[1].rate).toBe(25.789);
  });

  it('should handle countries with spaces in names', () => {
    const input = `1 Jan 2024
Country | Currency | Amount | Code | Rate
United Kingdom|pound|1|GBP|28.5
South Africa|rand|1|ZAR|1.2`;

    const result = parseForexData(input);

    expect(result.rates[0].country).toBe('United Kingdom');
    expect(result.rates[1].country).toBe('South Africa');
  });

  it('should handle currencies with spaces in names', () => {
    const input = `1 Jan 2024
Country | Currency | Amount | Code | Rate
New Zealand|New Zealand dollar|1|NZD|13.5`;

    const result = parseForexData(input);

    expect(result.rates[0].currency).toBe('New Zealand dollar');
  });
});
