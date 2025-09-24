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

// Pagination helper functions
export function getPaginatedPosts(page: number = 1, postsPerPage: number = 10): {
  posts: Post[]
  totalPages: number
  currentPage: number
  totalPosts: number
} {
  const allPosts = getAllPosts()
  const totalPosts = allPosts.length
  const totalPages = Math.ceil(totalPosts / postsPerPage)
  const currentPage = Math.max(1, Math.min(page, totalPages))
  
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const posts = allPosts.slice(startIndex, endIndex)

  return {
    posts,
    totalPages,
    currentPage,
    totalPosts
  }
}

// Get posts for specific category with pagination
export function getCategoryPosts(category: string, page: number = 1, postsPerPage: number = 10) {
  const allPosts = getAllPosts().filter(post => 
    post.categories.includes(category)
  )
  
  const totalPosts = allPosts.length
  const totalPages = Math.ceil(totalPosts / postsPerPage)
  const currentPage = Math.max(1, Math.min(page, totalPages))
  
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const posts = allPosts.slice(startIndex, endIndex)

  return {
    posts,
    totalPages,
    currentPage,
    totalPosts
  }
}

// Get posts for specific tag with pagination
export function getTagPosts(tag: string, page: number = 1, postsPerPage: number = 10) {
  const allPosts = getAllPosts().filter(post => 
    post.tags.includes(tag)
  )
  
  const totalPosts = allPosts.length
  const totalPages = Math.ceil(totalPosts / postsPerPage)
  const currentPage = Math.max(1, Math.min(page, totalPages))
  
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  const posts = allPosts.slice(startIndex, endIndex)

  return {
    posts,
    totalPages,
    currentPage,
    totalPosts
  }
}

export function getPostBySlug(slug: string): Post | null {
  const posts = getAllPosts()
  return posts.find(post => post.slug === slug) || null
}

export async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(html, { sanitize: false })
    .process(markdown)
  return result.toString()
}

// Helper function to calculate reading time
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

// Helper function to extract excerpt from content
export function extractExcerpt(content: string, length: number = 200): string {
  // Simple approach: extract plain text and format lightly
  let plainText = content
    .replace(/^#{1,6}\s+(.+)$/gm, '$1') // Remove header markers
    .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold markers
    .replace(/\*(.+?)\*/g, '$1') // Remove italic markers
    .replace(/`(.+?)`/g, '$1') // Remove code markers
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to text
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim()
  
  if (plainText.length <= length) {
    return plainText
  }
  
  // Truncate at word boundary
  const truncated = plainText.substring(0, length)
  const lastSpace = truncated.lastIndexOf(' ')
  const finalText = lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated
  
  return finalText + '...'
}