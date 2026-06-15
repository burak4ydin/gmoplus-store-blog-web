export function buildArticleJsonLd(post: any, locale: string, siteUrl: string, siteName: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || post.seoDescription || '',
    image: post.coverImageUrl || '',
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    inLanguage: locale,
    url: `${siteUrl}/${locale}/${post.slug}`,
    author: { '@type': 'Person', name: post.author?.displayName || 'GMOPlus' },
    publisher: { '@type': 'Organization', name: siteName, url: siteUrl },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}/${locale}/${post.slug}` },
    keywords: (post.seoKeywords || []).join(', '),
  };
}

export function buildBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem', position: i + 1, name: item.name, item: item.url,
    })),
  };
}