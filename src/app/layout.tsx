import React from 'react';
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Pokedex — Gen 1',
  description:
    'A complete Gen 1 Pokedex for Pokemon Red, Blue, and Yellow. Browse all 151 Pokemon with stats, learnsets, TM/HM moves, evolution info, and version locations.',
  openGraph: {
    title: 'Pokedex — Gen 1',
    description:
      'A complete Gen 1 Pokedex for Pokemon Red, Blue, and Yellow. Browse all 151 Pokemon with stats, learnsets, TM/HM moves, evolution info, and version locations.',
    url: 'https://pokedex.thedeadbeat.club',
    siteName: 'Pokedex — Gen 1',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pokedex — Gen 1',
    description:
      'A complete Gen 1 Pokedex for Pokemon Red, Blue, and Yellow. Browse all 151 Pokemon with stats, learnsets, TM/HM moves, evolution info, and version locations.',
  },
  alternates: {
    canonical: 'https://pokedex.thedeadbeat.club',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#1e1e1e',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body id="root" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
