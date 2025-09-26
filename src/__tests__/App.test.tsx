import { render, screen } from '@testing-library/react';

import { App } from '../App';

describe('App', () => {
  it('should display the Monex title', () => {
    render(<App />);

    const titleElement = screen.getByText('Monex');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName).toBe('H1');
  });

  it('should display the subtitle', () => {
    render(<App />);

    const subtitleElement = screen.getByText('The Currency Converter');
    expect(subtitleElement).toBeInTheDocument();
    expect(subtitleElement.tagName).toBe('H2');
  });

  it('should display the footer text', () => {
    render(<App />);

    const footerElement = screen.getByText('Made by Lukas Cizek');
    expect(footerElement).toBeInTheDocument();
  });
});
