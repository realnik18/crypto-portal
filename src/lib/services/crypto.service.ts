import { apiClient, handleApiError, ApiResponse } from "@/lib/api";
import { config } from "@/lib/config";

/**
 * Crypto asset types
 */
export interface CryptoAsset {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume: number;
  imageUrl: string;
}

/**
 * Market stats interface
 */
export interface MarketStats {
  totalValueLocked: number;
  activeUsers: number;
  transactionVolume: number;
  averageFee: number;
  growthTrends: { name: string; value: number; users: number; transactions: number }[];
}

// Mock data for development
const MOCK_ASSETS: CryptoAsset[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 50000,
    change24h: 2.5,
    marketCap: 950000000000,
    volume: 30000000000,
    imageUrl: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png'
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    price: 3000,
    change24h: 1.8,
    marketCap: 350000000000,
    volume: 20000000000,
    imageUrl: 'https://cryptologos.cc/logos/ethereum-eth-logo.png'
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    price: 150,
    change24h: 7.2,
    marketCap: 65000000000,
    volume: 5000000000,
    imageUrl: 'https://cryptologos.cc/logos/solana-sol-logo.png'
  }
];

const MOCK_MARKET_STATS: MarketStats = {
  totalValueLocked: 1800000000,
  activeUsers: 45378,
  transactionVolume: 7245,
  averageFee: 0.015,
  growthTrends: [
    { name: 'Jan', value: 4000, users: 240, transactions: 1200 },
    { name: 'Feb', value: 5000, users: 300, transactions: 1600 },
    { name: 'Mar', value: 6000, users: 380, transactions: 2100 },
    { name: 'Apr', value: 8700, users: 490, transactions: 2800 },
    { name: 'May', value: 9800, users: 590, transactions: 3200 },
    { name: 'Jun', value: 11000, users: 690, transactions: 3800 },
    { name: 'Jul', value: 12000, users: 780, transactions: 4300 },
    { name: 'Aug', value: 14000, users: 880, transactions: 4800 },
    { name: 'Sep', value: 17000, users: 990, transactions: 5400 },
    { name: 'Oct', value: 19000, users: 1100, transactions: 5900 },
    { name: 'Nov', value: 21000, users: 1250, transactions: 6500 },
    { name: 'Dec', value: 25000, users: 1500, transactions: 7200 }
  ]
};

// Helper for mock API responses
const mockResponse = <T>(data: T): Promise<T> => {
  return new Promise(resolve => {
    setTimeout(() => resolve(data), 500);
  });
};

/**
 * Crypto service for fetching all crypto-related data
 */
export const cryptoService = {
  /**
   * Get list of top crypto assets
   */
  async getTopAssets(limit = 10): Promise<CryptoAsset[]> {
    // Use mock data in development
    if (config.isDevelopment) {
      return mockResponse(MOCK_ASSETS.slice(0, limit));
    }
    
    try {
      const response = await apiClient.get<CryptoAsset[]>(`/assets?limit=${limit}`);
      return response.data;
    } catch (error) {
      handleApiError(error, "Failed to fetch crypto assets");
      return [];
    }
  },

  /**
   * Get details for a specific crypto asset
   */
  async getAssetDetails(assetId: string): Promise<CryptoAsset | null> {
    // Use mock data in development
    if (config.isDevelopment) {
      const asset = MOCK_ASSETS.find(a => a.id === assetId);
      return mockResponse(asset || null);
    }
    
    try {
      const response = await apiClient.get<CryptoAsset>(`/assets/${assetId}`);
      return response.data;
    } catch (error) {
      handleApiError(error, `Failed to fetch details for ${assetId}`);
      return null;
    }
  },

  /**
   * Get market statistics
   */
  async getMarketStats(): Promise<MarketStats | null> {
    // Use mock data in development
    if (config.isDevelopment) {
      return mockResponse(MOCK_MARKET_STATS);
    }
    
    try {
      const response = await apiClient.get<MarketStats>('/market/stats');
      return response.data;
    } catch (error) {
      handleApiError(error, "Failed to fetch market statistics");
      return null;
    }
  },

  /**
   * Get historical price data for a specific asset
   */
  async getHistoricalPrices(
    assetId: string, 
    timeframe: 'day' | 'week' | 'month' | 'year' = 'month'
  ): Promise<{ timestamp: number; price: number }[]> {
    // Use mock data in development
    if (config.isDevelopment) {
      // Generate some random historical data
      const now = Date.now();
      const day = 24 * 60 * 60 * 1000;
      const asset = MOCK_ASSETS.find(a => a.id === assetId);
      const basePrice = asset ? asset.price : 1000;
      
      let dataPoints = 30;
      let interval = day;
      
      if (timeframe === 'day') {
        dataPoints = 24;
        interval = 60 * 60 * 1000; // hour
      } else if (timeframe === 'week') {
        dataPoints = 7;
        interval = day;
      } else if (timeframe === 'year') {
        dataPoints = 12;
        interval = 30 * day;
      }
      
      const mockData = Array(dataPoints).fill(0).map((_, i) => {
        const timestamp = now - (dataPoints - i) * interval;
        const randomFactor = 0.9 + Math.random() * 0.2; // +/- 10%
        return {
          timestamp,
          price: basePrice * randomFactor
        };
      });
      
      return mockResponse(mockData);
    }
    
    try {
      const response = await apiClient.get<{ timestamp: number; price: number }[]>(
        `/assets/${assetId}/history?timeframe=${timeframe}`
      );
      return response.data;
    } catch (error) {
      handleApiError(error, "Failed to fetch historical price data");
      return [];
    }
  },

  /**
   * Subscribe to newsletter
   */
  async subscribeToNewsletter(email: string): Promise<boolean> {
    // Use mock data in development
    if (config.isDevelopment) {
      console.log('Newsletter subscription:', email);
      return mockResponse(true);
    }
    
    try {
      await apiClient.post('/newsletter/subscribe', { email });
      return true;
    } catch (error) {
      handleApiError(error, "Failed to subscribe to newsletter");
      return false;
    }
  }
}; 