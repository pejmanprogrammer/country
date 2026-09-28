'use client';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import {
  useState,
  type ReactNode,
} from 'react';

import { ThemeProvider } from '@/context/ThemeContext';

interface AppProvidersProps {
  children: ReactNode;
}

export default function AppProviders({
  children,
}: AppProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider
      client={queryClient}
    >
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}