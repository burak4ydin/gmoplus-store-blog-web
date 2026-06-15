import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { BlogHeader } from '@/components/layout/BlogHeader';
import { BlogFooter } from '@/components/layout/BlogFooter';

const VERTICAL = 'store';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://blog.store.gmoplus.com';
  return {
    metadataBase: new URL(siteUrl),
    title: { default: 'GMOPlus Store Blog', template: '%s | GMOPlus Store Blog' },
    description: 'Alisveris rehberleri ve urun incelemeleri',
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `${siteUrl}/${l}`])),
    },
    openGraph: { siteName: 'GMOPlus Store Blog', locale, type: 'website' },
    twitter: { card: 'summary_large_image' },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <BlogHeader vertical={VERTICAL} language={locale} />
      <main className="flex-1">{children}</main>
      <BlogFooter language={locale} />
    </NextIntlClientProvider>
  );
}