# gmoplus-store-blog-web

## What It Does
Standalone Next.js blog for the GMOPlus store vertical. Serves SEO-optimized articles about e-commerce, shopping guides, and seller tips. Content comes from the shared CMS (admin-api blog endpoints). Runs independently on port 3013.

## Who Uses It
- Readers: organic search traffic landing on blog articles
- Store users: navigated from store-web /haberler links

## Key Features
- Multilingual blog (next-intl, [locale] routing)
- Post listing, featured post, related posts
- Category browser (/kategoriler)
- Author profile pages (/author/[slug])
- Tag pages (/tag/[slug])
- Full-text search within blog
- Reading progress indicator
- Social share buttons
- Newsletter CTA component
- HTML content sanitized via isomorphic-dompurify
- Dynamic SEO metadata per post

## Business Flow
1. Admin publishes article in admin panel
2. Blog fetches posts from admin-api (or dedicated blog CMS endpoint)
3. Visitor lands from Google or store-web link
4. Reads article, shares, or subscribes to newsletter

## Success Criteria
- All post pages return valid OG/Twitter meta tags
- Content renders sanitized HTML without XSS risk
- Locale switching preserves current article slug