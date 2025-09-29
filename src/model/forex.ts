export type ForexRate = {
  country: string;
  currency: string;
  amount: number;
  code: string;
  rate: number;
};

export type ForexData = {
  date: string;
  rates: ForexRate[];
};
