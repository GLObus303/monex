import { screen } from '@testing-library/react';

import { App } from '../App';
import { renderWithQueryClient } from '../test/testUtils';

vi.mock('../clientApi/forex', () => ({
  useForexRates: vi.fn().mockReturnValue({
    data: {
      date: '2024-01-15',
      rates: [],
    },
    isLoading: false,
    error: null,
  }),
}));

describe('App', () => {
  it('should display the Monex title', () => {
    renderWithQueryClient(<App />);

    const titleElement = screen.getByText('Monex');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName).toBe('H1');
  });

  it('should display the subtitle', () => {
    renderWithQueryClient(<App />);

    const subtitleElement = screen.getByText('The Currency Converter');
    expect(subtitleElement).toBeInTheDocument();
    expect(subtitleElement.tagName).toBe('H2');
  });

  it('should display the currency converter', () => {
    renderWithQueryClient(<App />);

    const converterElement = screen.getByText('Currency Converter');
    expect(converterElement).toBeInTheDocument();
    expect(converterElement.tagName).toBe('H2');
  });

  it('should display the footer text', () => {
    renderWithQueryClient(<App />);

    const footerElement = screen.getByText('Made by Lukas Cizek');
    expect(footerElement).toBeInTheDocument();
  });
});
