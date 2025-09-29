type ForexRate = {
  country: string;
  currency: string;
  amount: number;
  code: string;
  rate: number;
};

type ForexData = {
  date: string;
  rates: ForexRate[];
};

export const parseForexData = (text: string): ForexData => {
  const [headerLine, ...rateLines] = text.trim().split('\n');
  const [day, month, year] = headerLine.split(' ');

  const rates: ForexRate[] = rateLines.map((line) => {
    const [country, currency, amount, code, rate] = line.split('|');

    return {
      country: country.trim(),
      currency: currency.trim(),
      amount: Number(amount.trim()),
      code: code.trim(),
      rate: parseFloat(rate.trim()),
    };
  });

  return {
    date: `${day} ${month} ${year}`,
    rates,
  };
};
