# Task Backlog — gmoplus-store-blog-web

## P0 — Critical
- (none currently identified)

## P1 — High
- [ ] Wrong domain in .env.example — uses localhost URLs instead of production domain; new developers will deploy pointing at localhost
- [ ] Newsletter CTA has no backend — form submits to nowhere; need endpoint or third-party integration

## P2 — Medium
- [ ] No sitemap.xml generation — blog posts not crawled efficiently by search engines
- [ ] No robots.txt — search engine crawl behavior undefined
- [ ] ReadingProgress component uses requestAnimationFrame on scroll — no cleanup on unmount (memory leak risk)
- [ ] Search page fetches on every keystroke without debounce

## P3 — Low
- [ ] ShareButtons uses window.open — should use Web Share API with fallback
- [ ] No pagination on category/tag pages — loads all posts in one request
- [ ] Missing structured data (JSON-LD Article schema) on post pages
- [ ] vertical-config.ts hardcodes blog identity — should come from env for white-label reuse