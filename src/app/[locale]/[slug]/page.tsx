import { notFound } from 'next/navigation';
import Image from 'next/image';
import { blogApi } from '@/lib/api';
import { buildArticleJsonLd, buildBreadcrumbJsonLd } from '@/lib/seo';
import type { Metadata } from 'next';

export const revalidate = 60;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://blog.store.gmoplus.com';
const SITE_NAME = 'GMOPlus Store Blog';

interface Props { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  try {
    const post = await blogApi.getArticleBySlug(slug);
    const canonical = `${SITE_URL}/${locale}/${post.slug}`;
    return {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt || '',
      alternates: {
        canonical,
        languages: Object.fromEntries(['tr', 'de', 'en', 'es', 'fr', 'ru'].map((l) => [l, `${SITE_URL}/${l}/${post.slug}`])),
      },
      openGraph: {
        title: post.seoTitle || post.title,
        description: post.seoDescription || post.excerpt || '',
        images: post.coverImageUrl ? [{ url: post.coverImageUrl }] : [],
        type: 'article', publishedTime: post.publishedAt, modifiedTime: post.updatedAt, locale,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.seoTitle || post.title,
        description: post.seoDescription || post.excerpt || '',
        images: post.coverImageUrl ? [post.coverImageUrl] : [],
      },
    };
  } catch {
    return { title: 'Makale Bulunamadi' };
  }
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  let post: any;
  try {
    post = await blogApi.getArticleBySlug(slug);
  } catch {
    notFound();
  }

  const canonical = `${SITE_URL}/${locale}/${post.slug}`;
  const articleJsonLd = buildArticleJsonLd(post, locale, SITE_URL, SITE_NAME);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Ana Sayfa', url: `${SITE_URL}/${locale}` },
    { name: post.title, url: canonical },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <div className="max-w-3xl mx-auto px-4 py-10">
        <nav className="text-xs text-gray-400 mb-6 flex items-center gap-1.5">
          <a href={`/${locale}`} className="hover:text-gray-600">Ana Sayfa</a>
          <span>›</span>
          <span className="text-gray-600 truncate max-w-xs">{post.title}</span>
        </nav>
        {post.coverImageUrl && (
          <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden mb-8 relative">
            <Image src={post.coverImageUrl} alt={post.coverImageAlt || post.title} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 768px" />
          </div>
        )}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            {post.vertical && <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{post.vertical.toUpperCase()}</span>}
            {post.language && <span className="text-xs text-gray-400">{post.language.toUpperCase()}</span>}
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 leading-tight mb-3">{post.title}</h1>
          {post.excerpt && <p className="text-lg text-gray-500 leading-relaxed">{post.excerpt}</p>}
          <div className="flex items-center gap-3 text-sm text-gray-400 mt-4">
            {post.publishedAt && <span>{new Date(post.publishedAt).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>}
            {post.readingTimeMin > 0 && <><span>·</span><span>{post.readingTimeMin} dk okuma</span></>}
          </div>
        </header>
        <article className="prose prose-gray max-w-none prose-headings:font-bold prose-a:text-indigo-600 prose-img:rounded-xl" dangerouslySetInnerHTML={{ __html: post.content }} />
        {post.seoKeywords?.length > 0 && (
          <div className="mt-8 pt-8 border-t border-gray-100 flex flex-wrap gap-2">
            {post.seoKeywords.map((k: string) => (
              <span key={k} className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full">{k}</span>
            ))}
          </div>
        )}
      </div>
    </>
  );
}