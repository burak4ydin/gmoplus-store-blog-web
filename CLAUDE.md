# gmoplus-store-blog-web

## Proje Bilgileri
- **Domain:** blog.store.gmoplus.com
- **VERTICAL:** store
- **Coolify UUID:** TBD (henüz deploy edilmedi)
- **Blog API:** https://blog-api.gmoplus.com/api/v1
- **Diller:** tr, de, en, es, fr, ru (defaultLocale: tr)

## Özel Kurallar
- VERTICAL = "store" — değiştirme
- routing.ts basit config — localePrefix + pathnames eklenecek
- `output: 'standalone'`, `"start": "node server.js"`

## Coolify Env Vars
```
NEXT_PUBLIC_BLOG_API_URL=https://blog-api.gmoplus.com/api/v1  (is_buildtime=true)
NEXT_PUBLIC_SITE_URL=https://blog.store.gmoplus.com            (is_buildtime=true)
BLOG_API_INTERNAL_URL=https://blog-api.gmoplus.com/api/v1
NODE_ENV=production
PORT=3000
```

## Deploy
```bash
git push
curl -s -o /dev/null -w "%{http_code}" https://blog.store.gmoplus.com
```