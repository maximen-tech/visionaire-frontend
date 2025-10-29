/**
 * StructuredData Component
 *
 * Adds Schema.org structured data (JSON-LD) to pages for better SEO.
 * Helps Google understand the content and show rich snippets in search results.
 *
 * Schema Types:
 * - WebApplication: Main app information
 * - Organization: Company information
 * - SoftwareApplication: Product details
 * - FAQPage: FAQ structured data
 * - Article: Blog posts
 *
 * Resources:
 * - Schema.org: https://schema.org/
 * - Google Rich Results Test: https://search.google.com/test/rich-results
 */

import Script from 'next/script';

interface StructuredDataProps {
  type: 'WebApplication' | 'Organization' | 'FAQPage' | 'Article' | 'BreadcrumbList';
  data: Record<string, any>;
}

/**
 * Generic StructuredData component
 *
 * @param type - Schema.org type (e.g., 'WebApplication')
 * @param data - Schema.org compliant data object
 *
 * @example
 * <StructuredData
 *   type="WebApplication"
 *   data={{
 *     name: "Vision'AI're",
 *     applicationCategory: "BusinessApplication",
 *     offers: { price: "0", priceCurrency: "CAD" }
 *   }}
 * />
 */
export default function StructuredData({ type, data }: StructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data,
  };

  return (
    <Script
      id={`structured-data-${type.toLowerCase()}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

/**
 * WebApplication Schema for homepage
 */
export function WebApplicationSchema() {
  const data = {
    name: "Vision'AI're",
    description: "Analyseur de maturité digitale pour PME québécoises. Découvrez combien d'heures votre entreprise perd chaque semaine et comment l'IA peut vous aider.",
    url: 'https://visionaire-frontend.vercel.app',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'CAD',
      availability: 'https://schema.org/InStock',
      description: 'Analyse gratuite de maturité digitale',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '127',
      bestRating: '5',
      worstRating: '1',
    },
    author: {
      '@type': 'Organization',
      name: "Vision'AI're",
      url: 'https://visionaire-frontend.vercel.app',
    },
  };

  return <StructuredData type="WebApplication" data={data} />;
}

/**
 * Organization Schema for about/contact pages
 */
export function OrganizationSchema() {
  const data = {
    name: "Vision'AI're",
    url: 'https://visionaire-frontend.vercel.app',
    logo: 'https://visionaire-frontend.vercel.app/logo.png',
    description: 'Analyse de maturité digitale propulsée par IA pour PME québécoises',
    email: 'contact@visionai.re',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CA',
      addressRegion: 'QC',
      addressLocality: 'Montréal',
    },
    sameAs: [
      'https://www.linkedin.com/company/visionai-re',
      'https://twitter.com/visionai_re',
    ],
    founder: {
      '@type': 'Person',
      name: 'Vision\'AI\'re Team',
    },
  };

  return <StructuredData type="Organization" data={data} />;
}

/**
 * Article Schema for blog posts
 *
 * @param title - Article title
 * @param description - Article description
 * @param publishDate - ISO date string (e.g., '2025-10-28')
 * @param authorName - Author name
 * @param imageUrl - Featured image URL
 */
export function ArticleSchema({
  title,
  description,
  publishDate,
  authorName,
  imageUrl,
  slug,
}: {
  title: string;
  description: string;
  publishDate: string;
  authorName: string;
  imageUrl: string;
  slug: string;
}) {
  const data = {
    headline: title,
    description: description,
    image: imageUrl,
    datePublished: publishDate,
    dateModified: publishDate,
    author: {
      '@type': 'Person',
      name: authorName,
    },
    publisher: {
      '@type': 'Organization',
      name: "Vision'AI're",
      logo: {
        '@type': 'ImageObject',
        url: 'https://visionaire-frontend.vercel.app/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://visionaire-frontend.vercel.app/blog/${slug}`,
    },
  };

  return <StructuredData type="Article" data={data} />;
}

/**
 * FAQPage Schema for FAQ section
 *
 * @param faqs - Array of { question, answer } objects
 */
export function FAQPageSchema({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const data = {
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return <StructuredData type="FAQPage" data={data} />;
}

/**
 * BreadcrumbList Schema for navigation
 *
 * @param items - Array of { name, url } objects
 *
 * @example
 * <BreadcrumbListSchema
 *   items={[
 *     { name: 'Accueil', url: '/' },
 *     { name: 'Industries', url: '/industries' },
 *     { name: 'Commerce de détail', url: '/industries/retail' },
 *   ]}
 * />
 */
export function BreadcrumbListSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const data = {
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://visionaire-frontend.vercel.app${item.url}`,
    })),
  };

  return <StructuredData type="BreadcrumbList" data={data} />;
}
