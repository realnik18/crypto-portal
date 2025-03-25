import '@testing-library/jest-dom';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

// Mock server setup for API requests
export const server = setupServer(
  // Default handlers
  http.get('*/assets', () => {
    return HttpResponse.json([
      {
        id: 'bitcoin',
        name: 'Bitcoin',
        symbol: 'BTC',
        price: 50000,
        change24h: 2.5,
        marketCap: 950000000000,
        volume: 30000000000,
        imageUrl: 'https://example.com/btc.png'
      },
      {
        id: 'ethereum',
        name: 'Ethereum',
        symbol: 'ETH',
        price: 3000,
        change24h: 1.8,
        marketCap: 350000000000,
        volume: 20000000000,
        imageUrl: 'https://example.com/eth.png'
      }
    ]);
  }),
  
  http.get('*/market/stats', () => {
    return HttpResponse.json({
      totalValueLocked: 1800000000,
      activeUsers: 45378,
      transactionVolume: 7245,
      averageFee: 0.015,
      growthTrends: [
        { name: 'Jan', value: 4000, users: 240, transactions: 1200 },
        { name: 'Feb', value: 5000, users: 300, transactions: 1600 }
      ]
    });
  }),
  
  // Default handler for unhandled requests
  http.all('*', ({ request }) => {
    console.error(`Unhandled request: ${request.method} ${request.url}`);
    return new HttpResponse(null, { status: 404 });
  })
);

// Start mock server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));

// Reset handlers after each test
afterEach(() => {
  cleanup();
  server.resetHandlers();
});

// Close server after all tests
afterAll(() => server.close()); 