import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import '../styles/tailwind.css';
import { LanguageProvider } from '@/context/LanguageContext';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Insight Academy — Cours d\'anglais à Alger pour tous les niveaux',
  description: 'Insight Academy à Ben Aknoun, Alger, propose des formations d\'anglais pour enfants, adolescents, adultes et professionnels — tous niveaux A1 à C2.',
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={plusJakartaSans.variable}>
      <body className={plusJakartaSans.className}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
</body>
    </html>
  );
}