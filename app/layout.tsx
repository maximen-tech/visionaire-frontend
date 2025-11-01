import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import CookieBanner from "@/components/CookieBanner";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import MicrosoftClarity from "@/components/MicrosoftClarity";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ABTestingProvider } from "@/lib/ab-testing/init";
import "./globals.css";

// Optimized Font Loading with Next.js
const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Eliminates FOUT
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'arial']
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
  preload: true,
  fallback: ['system-ui', 'arial']
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  preload: true,
  fallback: ['Courier New', 'monospace']
});

export const metadata: Metadata = {
  metadataBase: new URL('https://visionaire-frontend.vercel.app'),
  title: {
    default: "Vision'AI're - Analyseur Automatisation IA pour PME Québécoises",
    template: "%s | Vision'AI're",
  },
  description: "Découvrez combien d'heures VOTRE entreprise pourrait récupérer avec l'IA. Analyse personnalisée gratuite en 2 minutes. Économisez jusqu'à 200h/an.",
  keywords: [
    "automatisation IA PME",
    "économie temps entreprise",
    "analyse maturité digitale",
    "PME Québec",
    "automatisation Québec",
    "IA entreprise",
    "productivité PME",
    "temps sauvé IA",
    "ROI automatisation",
    "outils IA PME",
  ],
  authors: [{ name: "Vision'AI're" }],
  creator: "Vision'AI're",
  publisher: "Vision'AI're",
  alternates: {
    canonical: 'https://visionaire-frontend.vercel.app',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_CA',
    url: 'https://visionaire-frontend.vercel.app',
    siteName: "Vision'AI're",
    title: "Vision'AI're - Économisez jusqu'à 200h/an avec l'IA | PME Québec",
    description: "Découvrez exactement combien d'heures VOTRE entreprise pourrait récupérer avec l'automatisation IA. Analyse gratuite personnalisée en 2 minutes.",
    images: [
      {
        url: 'https://visionaire-frontend.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: "Vision'AI're - Analyseur automatisation IA pour PME québécoises",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@VisionAIre',
    creator: '@VisionAIre',
    title: "Économisez jusqu'à 200h/an avec l'IA | Vision'AI're",
    description: "Découvrez combien d'heures VOTRE entreprise pourrait récupérer. Analyse gratuite en 2 minutes.",
    images: ['https://visionaire-frontend.vercel.app/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add these when available:
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <head>

        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#4F46E5" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Vision'AI're" />

        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192x192.png" />

        {/* Favicons */}
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-72x72.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-72x72.png" />

        {/* Organization Structured Data */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Vision'AI're",
              "url": "https://visionaire-frontend.vercel.app",
              "logo": "https://visionaire-frontend.vercel.app/logo.png",
              "description": "Analyseur d'automatisation IA pour PME québécoises. Découvrez combien d'heures vous pourriez économiser avec l'IA.",
              "email": "support@visionai.re",
              "areaServed": {
                "@type": "Country",
                "name": "Canada"
              },
              "sameAs": [
                // Add social media links when available
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "support@visionai.re",
                "contactType": "customer support",
                "areaServed": "CA",
                "availableLanguage": ["French", "fr-CA"]
              }
            }),
          }}
        />
        {/* WebSite Structured Data */}
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Vision'AI're",
              "url": "https://visionaire-frontend.vercel.app",
              "description": "Analyseur d'automatisation IA pour PME québécoises. Économisez jusqu'à 200h/an.",
              "inLanguage": "fr-CA",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://visionaire-frontend.vercel.app/?s={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ABTestingProvider>
            <GoogleAnalytics />
            <MicrosoftClarity />
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
            <CookieBanner />
            <ThemeSwitcher />
          </ABTestingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
