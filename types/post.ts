export interface Post {
  slug: string
  title: string
  date: string
  content: string
  excerpt: string
  categories: string[]
  tags: string[]
  readingTime: number
  author?: string
  featured?: boolean
}

export interface PostMeta {
  slug: string
  title: string
  date: string
  excerpt: string
  categories: string[]
  tags: string[]
  readingTime: number
}