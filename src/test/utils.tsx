import { ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import userEvent from '@testing-library/user-event';

/**
 * Custom renderer that includes providers from your app
 */
interface CustomRenderOptions extends Omit<RenderOptions, 'queries'> {
  route?: string;
  queryClient?: QueryClient;
}

/**
 * App providers wrapper for tests
 */
export function AppProviders({ children, queryClient }: { children: ReactNode; queryClient?: QueryClient }) {
  const client = queryClient || new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
        cacheTime: 0,
      },
    },
  });

  return (
    <QueryClientProvider client={client}>
      <TooltipProvider>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

/**
 * Custom render with all required providers
 */
export function renderWithProviders(
  ui: ReactElement,
  options: CustomRenderOptions = {}
) {
  const { route = '/', queryClient, ...renderOptions } = options;

  // Set initial route if provided
  window.history.pushState({}, 'Test page', route);

  function Wrapper({ children }: { children: ReactNode }) {
    return <AppProviders queryClient={queryClient}>{children}</AppProviders>;
  }

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

/**
 * Wait for a given time
 */
export const waitFor = (ms: number) => new Promise(resolve => setTimeout(resolve, ms)); 