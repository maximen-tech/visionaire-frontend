import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import BlueprintGrid from '@/components/design-system/BlueprintGrid';
import GlassmorphicCard from '@/components/design-system/GlassmorphicCard';
import PulsingButton from '@/components/design-system/PulsingButton';
import { getBlogPost, getAllBlogSlugs } from '@/lib/mdx';
import { ArticleSchema, BreadcrumbListSchema } from '@/components/StructuredData';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();

  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: 'Article non trouvé | Vision\'AI\'re',
    };
  }

  return {
    title: `${post.title} | Vision'AI're Blog`,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://visionaire-frontend.vercel.app/blog/${post.slug}`,
      siteName: "Vision'AI're",
      locale: 'fr_CA',
      type: 'article',
      publishedTime: post.publishDate,
      authors: [post.author],
      images: [
        {
          url: `https://visionaire-frontend.vercel.app${post.image}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [`https://visionaire-frontend.vercel.app${post.image}`],
    },
    alternates: {
      canonical: `https://visionaire-frontend.vercel.app/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      <BlueprintGrid density="low" animated={true} />

      {/* Structured Data */}
      <ArticleSchema
        title={post.title}
        description={post.description}
        publishDate={post.publishDate}
        authorName={post.author}
        imageUrl={`https://visionaire-frontend.vercel.app${post.image}`}
        slug={post.slug}
      />
      <BreadcrumbListSchema
        items={[
          { name: 'Accueil', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: post.title, url: `/blog/${post.slug}` },
        ]}
      />

      <div className="relative z-10 max-w-4xl mx-auto p-4 md:p-8 space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            ← Retour au blog
          </Link>

          <div className="flex items-center gap-4 text-sm text-slate-400">
            <span className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full">
              {post.category}
            </span>
            <span>{post.readingTime}</span>
            <span>•</span>
            <span>{new Date(post.publishDate).toLocaleDateString('fr-CA', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white">
            {post.title}
          </h1>

          <p className="text-xl text-slate-300">
            {post.description}
          </p>

          <div className="text-sm text-slate-400">
            Par {post.author}
          </div>
        </div>

        {/* Article Content */}
        <GlassmorphicCard>
          <article className="prose prose-invert prose-slate max-w-none
            prose-headings:font-heading prose-headings:text-white
            prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
            prose-p:text-slate-300 prose-p:leading-relaxed
            prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white prose-strong:font-bold
            prose-code:text-cyan-300 prose-code:bg-slate-800 prose-code:px-1 prose-code:rounded
            prose-pre:bg-slate-800 prose-pre:border prose-pre:border-slate-700
            prose-blockquote:border-l-amber-500 prose-blockquote:text-slate-300
            prose-ul:text-slate-300 prose-ol:text-slate-300
            prose-li:text-slate-300
            prose-table:text-slate-300
            prose-th:text-white prose-th:bg-slate-800
            prose-td:border-slate-700
          ">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </article>
        </GlassmorphicCard>

        {/* CTA */}
        <GlassmorphicCard className="border-2 border-amber-500/50 bg-gradient-to-br from-amber-500/5 to-amber-600/5">
          <div className="text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white">
              🚀 Prêt à Automatiser Votre Entreprise?
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Découvrez exactement combien d&apos;heures VOTRE entreprise pourrait récupérer avec l&apos;IA.
              Analyse personnalisée en 2 minutes.
            </p>

            <Link href="/">
              <PulsingButton
                variant="primary"
                size="lg"
                rightIcon={<span>→</span>}
              >
                Commencer mon analyse gratuite
              </PulsingButton>
            </Link>

            <p className="text-xs text-slate-400">
              ✓ Gratuit · ✓ 2 minutes · ✓ Résultats immédiats
            </p>
          </div>
        </GlassmorphicCard>

        {/* Related Articles */}
        <div className="text-center pt-8">
          <Link
            href="/blog"
            className="text-amber-400 hover:text-amber-300 transition-colors font-semibold"
          >
            Voir tous les articles →
          </Link>
        </div>
      </div>
    </div>
  );
}
