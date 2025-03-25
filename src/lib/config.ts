/**
 * Application configuration from environment variables with type safety
 */

// Environment type
type Environment = 'development' | 'staging' | 'production';

/**
 * Feature flags interface
 */
interface FeatureFlags {
  enableAnalytics: boolean;
  enableDarkMode: boolean;
  enableTestnet: boolean;
}

/**
 * Get boolean value from environment variable
 */
const getBooleanValue = (key: string, defaultValue: boolean): boolean => {
  const value = import.meta.env[key];
  if (value === undefined) return defaultValue;
  if (value === 'true') return true;
  if (value === 'false') return false;
  return defaultValue;
};

/**
 * App configuration with defaults and proper typing
 */
export const config = {
  // API
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.example.com',
  
  // Environment
  environment: (import.meta.env.VITE_APP_ENV || 'development') as Environment,
  isDevelopment: (import.meta.env.VITE_APP_ENV || 'development') === 'development',
  isStaging: import.meta.env.VITE_APP_ENV === 'staging',
  isProduction: import.meta.env.VITE_APP_ENV === 'production',
  
  // Feature flags
  features: {
    enableAnalytics: getBooleanValue('VITE_ENABLE_ANALYTICS', true),
    enableDarkMode: getBooleanValue('VITE_ENABLE_DARK_MODE', true),
    enableTestnet: getBooleanValue('VITE_ENABLE_TESTNET', false),
  } as FeatureFlags,
  
  // Error tracking
  sentryDsn: import.meta.env.VITE_SENTRY_DSN || '',
};

/**
 * Helper to check if a feature is enabled
 */
export const isFeatureEnabled = (feature: keyof FeatureFlags): boolean => {
  return config.features[feature];
}; 