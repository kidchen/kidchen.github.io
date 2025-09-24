import { Post } from '@/types/post'

// Client-safe search data structure
export interface SearchablePost {
  slug: string
  title: string
  excerpt: string
  categories: string[]
  tags: string[]
  date: string
}

// This will be populated at build time
export function createSearchIndex(posts: Post[]): SearchablePost[] {
  return posts.map(post => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt?.replace(/<[^>]*>/g, '') || '', // Strip HTML
    categories: post.categories,
    tags: post.tags,
    date: post.date
  }))
}