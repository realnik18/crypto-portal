import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, LineChart, Line
} from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { cryptoService, MarketStats } from '@/lib/services/crypto.service';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency, formatNumber } from '@/lib/utils';

const StatsCard = ({ 
  title, 
  value, 
  change, 
  chart,
  isLoading 
}: { 
  title: string; 
  value: string; 
  change: string; 
  chart: React.ReactNode;
  isLoading?: boolean;
}) => {
  return (
    <div className="glass-card p-6 rounded-xl animate-scale-in">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg text-white/70">{title}</h3>
          {isLoading ? (
            <Skeleton className="h-8 w-28 mt-1 bg-white/10" />
          ) : (
            <p className="text-2xl sm:text-3xl font-bold text-white mt-1">{value}</p>
          )}
        </div>
        {isLoading ? (
          <Skeleton className="h-6 w-16 bg-white/10" />
        ) : (
          <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
            change.startsWith('+') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
          }`}>
            {change}
          </span>
        )}
      </div>
      <div className="h-24">
        {isLoading ? (
          <div className="h-full w-full flex items-center justify-center">
            <Skeleton className="h-20 w-full bg-white/10" />
          </div>
        ) : (
          chart
        )}
      </div>
    </div>
  );
};

const Stats = () => {
  // Fetch market stats using React Query
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['marketStats'],
    queryFn: () => cryptoService.getMarketStats(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  
  // Default data if API call fails
  const fallbackData = {
    totalValueLocked: 1800000000,
    activeUsers: 45378,
    transactionVolume: 7245,
    averageFee: 0.015,
    growthTrends: Array(12).fill(0).map((_, i) => ({
      name: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
      value: 4000 + (i * 2000),
      users: 200 + (i * 100),
      transactions: 1000 + (i * 500)
    }))
  };
  
  // Use real data or fallback
  const marketData: MarketStats = stats || fallbackData;
  const chartData = marketData.growthTrends;
  
  return (
    <section id="stats" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-primary font-medium mb-2 animate-fade-in">STATS & METRICS</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Real-time Performance
          </h2>
          <p className="text-white/70 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Track our growth and performance with transparent, real-time metrics
            that showcase our platform's reliability and adoption.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <StatsCard 
            title="Total Value Locked" 
            value={formatCurrency(marketData.totalValueLocked)} 
            change="+12.5%" 
            isLoading={isLoading}
            chart={
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    fill="url(#colorValue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            }
          />
          
          <StatsCard 
            title="Active Users" 
            value={formatNumber(marketData.activeUsers)} 
            change="+8.3%" 
            isLoading={isLoading}
            chart={
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                  <Line 
                    type="monotone" 
                    dataKey="users" 
                    stroke="#A855F7" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            }
          />
          
          <StatsCard 
            title="Transaction Volume" 
            value={formatNumber(marketData.transactionVolume)} 
            change="+15.2%" 
            isLoading={isLoading}
            chart={
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                  <Bar 
                    dataKey="transactions" 
                    fill="#EC4899" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            }
          />
          
          <StatsCard 
            title="Average Transaction Fee" 
            value={`$${marketData.averageFee}`} 
            change="-2.1%" 
            isLoading={isLoading}
            chart={
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData.slice(-6)} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            }
          />
        </div>
        
        <div className="glass-card p-8 rounded-xl animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <h3 className="text-xl font-semibold text-white mb-6">Growth Trends</h3>
          <div className="h-80">
            {isLoading ? (
              <div className="h-full w-full flex items-center justify-center">
                <Skeleton className="h-64 w-full bg-white/10" />
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(23, 23, 23, 0.9)', 
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      color: 'white'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
