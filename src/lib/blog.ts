import { getCollection, type CollectionEntry } from 'astro:content';

export async function getBlogPosts() {
  const showDrafts = process.env.SHOW_DRAFTS === 'true';
  return (await getCollection('blog', ({ data }) => showDrafts || !data.draft)).sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime() || a.id.localeCompare(b.id),
  );
}

export function readingTime(post: CollectionEntry<'blog'>) {
  if (post.data.readingTime) return post.data.readingTime;
  const words = (post.body ?? '').trim().split(/\s+/u).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function blogUrl(id: string) {
  return `/blog/${id.split('/').map(encodeURIComponent).join('/')}/`;
}
