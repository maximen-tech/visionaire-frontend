import { Metadata } from 'next';
import Link from 'next/link';
import BlueprintGrid from '@/components/design-system/BlueprintGrid';
import GlassmorphicCard from '@/components/design-system/GlassmorphicCard';
import { getAllBlogPosts } from '@/lib/mdx';
import { WebApplicationSchema, OrganizationSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: "Blog - Conseils IA et Automatisation pour PME | Vision'AI're",
  description: "Découvrez nos guides pratiques sur l'IA, l'automatisation et la productivité pour entrepreneurs québécois. Études de cas, tutoriels et stratégies éprouvées.",
  keywords: "blog IA PME, automatisation entreprise, conseils productivité, guides IA Québec",
  openGraph: {
    title: "Blog Vision'AI're - Conseils IA pour PME Québécoises",
    description: "Guides pratiques, études de cas et stratégies d'automatisation pour entrepreneurs.",
    url: 'https://visionaire-frontend.vercel.app/blog',
    siteName: "Vision'AI're",
    locale: 'fr_CA',
    type: 'website',
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      <BlueprintGrid density="low" animated={true} />

      {/* Structured Data */}
      <WebApplicationSchema />
      <OrganizationSchema />

      <div className="relative z-10 max-w-6xl mx-auto p-4 md:p-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white">
            📚 Blog Vision&apos;AI&apos;re
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Guides pratiques, études de cas et stratégies d&apos;automatisation pour entrepreneurs québécois
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <GlassmorphicCard className="h-full hover:border-amber-500/50 transition-all cursor-pointer group">
                <div className="space-y-4">
                  {/* Category Badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-slate-400">{post.readingTime}</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-heading font-bold text-white group-hover:text-amber-400 transition-colors">
                    {post.title}
                  </h2>

                  {/* Description */}
                  <p className="text-sm text-slate-300 line-clamp-3">
                    {post.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-700">
                    <span>{post.author}</span>
                    <span>{new Date(post.publishDate).toLocaleDateString('fr-CA')}</span>
                  </div>
                </div>
              </GlassmorphicCard>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center pt-8">
          <Link
            href="/"
            className="text-slate-400 hover:text-white transition-colors"
          >
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
