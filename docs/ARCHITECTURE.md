# Architecture — gmoplus-store-blog-web

## Stack
- Framework: Next.js (App Router)
- Language: TypeScript
- i18n: next-intl ([locale] prefix routing)
- Styling: Tailwind CSS + tailwind-merge + clsx
- Content safety: isomorphic-dompurify (HTML sanitization)
- No auth, no state management library

## Folder Structure
```
src/
  app/
    [locale]/
      page.tsx              — Blog index (featured + post list)
      [slug]/page.tsx       — Post detail
      category/[slug]/      — Category filtered posts
      author/[slug]/        — Author profile + posts
      tag/[slug]/           — Tag filtered posts
      search/page.tsx       — Search results
      kategoriler/          — Category list
  components/
    blog/                   — PostCard, FeaturedPost, PostContent,
                              PostHeader, RelatedPosts, TagList,
                              ShareButtons, SidebarSearch,
                              NewsletterCTA, ReadingProgress
    layout/                 — BlogHeader, BlogFooter, BlogSidebar,
                              LanguageSwitcher
  lib/
    api.ts                  — Fetch wrapper for CMS/blog API calls
    seo.ts                  — OG/Twitter metadata helpers
    translations.ts         — i18n message loader
    vertical-config.ts      — Blog identity (name, domain, color)
  i18n/                     — next-intl routing and request config
  middleware.ts             — Locale detection and redirect
  types/blog.ts             — Post, Category, Author, Tag types
```

## Data Flow
Next.js server component → lib/api.ts fetch → admin-api (or CMS) → render HTML → isomorphic-dompurify sanitize → output

All data fetching is server-side (no client-side data fetching). Pages use generateMetadata() for SEO.

## Service Communication
- Read-only consumer of blog CMS API (admin-api or dedicated endpoint)
- Domain: store-blog.gmoplus.com (or subdomain per CLAUDE.md routing)
- No calls to store-api or core-api