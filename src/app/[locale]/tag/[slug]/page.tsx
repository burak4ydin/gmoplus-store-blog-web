import { notFound } from "next/navigation";
import { blogApi } from "@/lib/api";
import { PostCard } from "@/components/blog/PostCard";
import type { Metadata } from "next";

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ cursor?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `#${slug} — GMOPlus Auto Blog`,
    description: `Articles tagged with #${slug} on GMOPlus Auto Blog.`,
  };
}

export default async function TagPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { cursor } = await searchParams;

  let data: { items: any[]; hasMore: boolean; nextCursor: string | null } = {
    items: [],
    hasMore: false,
    nextCursor: null,
  };

  try {
    data = await blogApi.getArticlesByTag(slug, { cursor });
  } catch {
    notFound();
  }

  const tagName = data.items[0]?.tags?.find((t: any) => t.slug === slug)?.name || slug;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-400 mb-6 flex items-center gap-1.5">
        <a href="/" className="hover:text-gray-600 transition-colors">Ana Sayfa</a>
        <span>›</span>
        <span className="text-gray-600 font-medium">#{tagName}</span>
      </nav>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
          #{tagName}
        </h1>
        <p className="text-gray-500">Bu etiketle işaretlenmiş makaleler</p>
      </header>

      {/* Articles grid */}
      {data.items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {data.items.map((post: any) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <p className="text-lg font-medium text-gray-400">Bu etiketle işaretlenmiş makale yok.</p>
        </div>
      )}

      {/* Load more */}
      {data.hasMore && data.nextCursor && (
        <div className="mt-6 text-center">
          <a
            href={`/tag/${slug}?cursor=${data.nextCursor}`}
            className="inline-flex items-center gap-2 px-8 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all"
          >
            Daha Fazla Yükle
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
}