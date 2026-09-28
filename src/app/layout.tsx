import type { Metadata } from 'next';

import AppProviders from '@/providers/AppProviders';

import './globals.css';

export const metadata: Metadata = {
  title: 'Where in the World?',
  description:
    'Explore countries around the world.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}