import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { Post } from '@/types/post'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterResult = matter(fileContents)

      const post: Post = {
        slug: matterResult.data.slug || slug,
        title: matterResult.data.title || 'Untitled',
        date: matterResult.data.date || '',
        content: matterResult.content,
        excerpt: matterResult.data.excerpt || extractExcerpt(matterResult.content),
        categories: matterResult.data.categories || [],
        tags: matterResult.data.tags || [],
        readingTime: calculateReadingTime(matterResult.content)
      }

      return post
    })

  // Sort posts by date (newest first)
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getPostBySlug(slug: string): Post | null {
  const posts = getAllPosts()
  return posts.find(post => post.slug === slug) || null
}

export async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}

// Helper function to calculate reading time
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

// Helper function to extract excerpt from content
export function extractExcerpt(content: string, length: number = 150): string {
  const plainText = content.replace(/<[^>]*>/g, '')
  return plainText.length > length 
    ? plainText.substring(0, length) + '...'
    : plainText
}