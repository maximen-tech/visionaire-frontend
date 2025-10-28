import type { Metadata } from "next";
import Script from "next/script";
import CookieBanner from "@/components/CookieBanner";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import MicrosoftClarity from "@/components/MicrosoftClarity";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://visionai.re'),
  title: {
    default: "Vision'AI're - Analyse digitale en 10 minutes | Gratuit",
    template: "%s | Vision'AI're",
  },
  description: "Identifiez vos 3 priorités digitales en 10 minutes avec notre IA. Analyse gratuite, sans carte bancaire. 500+ PME nous font confiance.",
  keywords: ["analyse digitale", "audit site web", "IA", "PME", "gratuit", "priorités digitales", "score maturité", "benchmark"],
  authors: [{ name: "Vision'AI're" }],
  creator: "Vision'AI're",
  publisher: "Vision'AI're",
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://visionai.re',
    siteName: "Vision'AI're",
    title: "Vision'AI're - Analyse digitale en 10 minutes",
    description: "Identifiez vos 3 priorités digitales en 10 minutes. Gratuit, sans carte bancaire. 500+ PME nous font confiance.",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: "Vision'AI're - Analyse digitale gratuite",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Vision'AI're - Analyse digitale en 10 minutes",
    description: "Identifiez vos 3 priorités digitales en 10 minutes. Gratuit, sans carte bancaire.",
    images: ['/og-image.png'],
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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        {/* Google Fonts - Blueprint Design */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

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
              "url": "https://visionai.re",
              "logo": "https://visionai.re/logo.png",
              "description": "Analyse digitale gratuite pour PME. Identifiez vos priorités en 10 minutes avec l'IA.",
              "email": "support@visionai.re",
              "areaServed": "FR",
              "sameAs": [
                // Add social media links when available
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "support@visionai.re",
                "contactType": "customer support",
                "areaServed": "FR",
                "availableLanguage": ["French"]
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
              "url": "https://visionai.re",
              "description": "Analyse digitale gratuite pour PME",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://visionai.re/?s={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <GoogleAnalytics />
          <MicrosoftClarity />
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
          <CookieBanner />
          <ThemeSwitcher />
        </ThemeProvider>
      </body>
    </html>
  );
}
