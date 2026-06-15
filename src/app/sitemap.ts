import { MetadataRoute } from 'next';
import { blogApi } from '@/lib/api';
import { routing } from '@/i18n/routing';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://blog.store.gmoplus.com';
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    entries.push({ url: `${siteUrl}/${locale}`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 });
  }

  try {
    const { items } = await blogApi.getArticles({ limit: 200 });
    for (const post of items) {
      for (const locale of routing.locales) {
        entries.push({
          url: `${siteUrl}/${locale}/${post.slug}`,
          lastModified: new Date(post.updatedAt || post.publishedAt || Date.now()),
          changeFrequency: 'weekly',
          priority: 0.8,
        });
      }
    }
  } catch {}

  return entries;
}