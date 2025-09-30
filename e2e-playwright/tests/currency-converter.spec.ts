import { test, expect } from '@playwright/test';

test.describe('Currency Converter', () => {
  test('should perform currency conversion with mocked API', async ({
    page,
  }) => {
    const mockForexData = {
      date: '2024-01-15',
      rates: [
        {
          country: 'United States',
          currency: 'US Dollar',
          amount: 1,
          code: 'USD',
          rate: 0.043,
        },
        {
          country: 'European Union',
          currency: 'Euro',
          amount: 1,
          code: 'EUR',
          rate: 0.039,
        },
      ],
    };

    await page.route('/api/forex', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockForexData),
      });
    });

    await page.goto('/');

    await expect(page.getByText('Loading exchange rates...')).not.toBeVisible();

    await expect(
      page.getByRole('heading', { name: 'Currency Converter', exact: true }),
    ).toBeVisible();

    const amountInput = page.getByLabel('Amount in CZK to convert');
    await amountInput.fill('100');
    await expect(amountInput).toHaveValue('100');

    await expect(page.getByText('Exchange Rates')).toBeVisible();

    const usdCurrencyButton = page.getByRole('button', { name: /USD/ });
    await usdCurrencyButton.click();

    await expect(page.getByText('Conversion Result')).toBeVisible();

    await expect(page.getByText('4.30 USD', { exact: true })).toBeVisible();

    await expect(page.getByText('100.00 CZK = 4.30 USD')).toBeVisible();

    await expect(page.getByText('Rate: 1 CZK = 0.043 USD')).toBeVisible();

    await amountInput.fill('250');
    await expect(amountInput).toHaveValue('250');

    await expect(page.getByText('10.75 USD', { exact: true })).toBeVisible();
    await expect(page.getByText('250.00 CZK = 10.75 USD')).toBeVisible();
  });
});
