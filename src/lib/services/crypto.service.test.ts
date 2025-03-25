import { describe, it, expect, beforeEach, vi } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '@/test/setup';
import { cryptoService } from './crypto.service';
import { apiClient } from '@/lib/api';

describe('Crypto Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch top assets successfully', async () => {
    // Arrange
    const mockAssets = [
      {
        id: 'bitcoin',
        name: 'Bitcoin',
        symbol: 'BTC',
        price: 50000,
        change24h: 2.5,
        marketCap: 950000000000,
        volume: 30000000000,
        imageUrl: 'https://example.com/btc.png'
      }
    ];
    
    server.use(
      http.get('*/assets', () => {
        return HttpResponse.json(mockAssets);
      })
    );
    
    // Act
    const result = await cryptoService.getTopAssets();
    
    // Assert
    expect(result).toEqual(mockAssets);
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('bitcoin');
  });

  it('should return empty array when getTopAssets fails', async () => {
    // Arrange
    server.use(
      http.get('*/assets', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );
    
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    // Act
    const result = await cryptoService.getTopAssets();
    
    // Assert
    expect(result).toEqual([]);
    expect(spy).toHaveBeenCalled();
    
    spy.mockRestore();
  });

  it('should fetch market stats successfully', async () => {
    // Arrange
    const mockStats = {
      totalValueLocked: 1800000000,
      activeUsers: 45378,
      transactionVolume: 7245,
      averageFee: 0.015,
      growthTrends: [
        { name: 'Jan', value: 4000, users: 240, transactions: 1200 },
        { name: 'Feb', value: 5000, users: 300, transactions: 1600 }
      ]
    };
    
    server.use(
      http.get('*/market/stats', () => {
        return HttpResponse.json(mockStats);
      })
    );
    
    // Act
    const result = await cryptoService.getMarketStats();
    
    // Assert
    expect(result).toEqual(mockStats);
    expect(result?.totalValueLocked).toBe(1800000000);
  });

  it('should successfully subscribe to newsletter', async () => {
    // Arrange
    const email = 'test@example.com';
    
    server.use(
      http.post('*/newsletter/subscribe', async ({ request }) => {
        const body = await request.json();
        if (body.email === email) {
          return HttpResponse.json({ success: true });
        }
        return new HttpResponse(null, { status: 400 });
      })
    );
    
    const spy = vi.spyOn(apiClient, 'post');
    
    // Act
    const result = await cryptoService.subscribeToNewsletter(email);
    
    // Assert
    expect(result).toBe(true);
    expect(spy).toHaveBeenCalledWith('/newsletter/subscribe', { email });
  });
}); 