import { getAllPosts, getTagPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import Pagination from '@/components/Pagination'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { siteConfig } from '@/lib/config'

interface TagPageProps {
  params: {
    tag: string
    page: string
  }
}

export const dynamicParams = false // Disable dynamic params for static export

export async function generateStaticParams() {
  const posts = getAllPosts()
  const tags = new Set<string>()
  
  posts.forEach(post => {
    post.tags.forEach(tag => {
      tags.add(tag)
    })
  })
  
  const params: { tag: string; page: string }[] = []
  
  Array.from(tags).forEach(tag => {
    const { totalPages } = getTagPosts(tag, 1, siteConfig.pagination.postsPerPage.tag)
    
    // Generate pages 2 and onwards (page 1 is handled by the main tag route)
    for (let page = 2; page <= totalPages; page++) {
      params.push({
        tag: tag, // Use raw tag name
        page: page.toString()
      })
    }
  })
  
  return params
}

export async function generateMetadata({ params }: TagPageProps) {
  const tag = decodeURIComponent(params.tag)
  const page = parseInt(params.page)
  
  return {
    title: `#${tag} - Page ${page} | Tags | kidChen`,
    description: `Posts tagged with ${tag} - Page ${page}`,
  }
}

export default function TagPaginatedPage({ params }: TagPageProps) {
  const tag = decodeURIComponent(params.tag)
  const page = parseInt(params.page)
  
  if (isNaN(page) || page < 2) {
    redirect("/")
  }

  const { posts, totalPages, currentPage, totalPosts } = getTagPosts(tag, page, siteConfig.pagination.postsPerPage.tag)

  if (posts.length === 0) {
    redirect("/")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-600 dark:text-gray-400">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
          <span className="mx-2">→</span>
          <Link href="/tags" className="hover:text-blue-600 dark:hover:text-blue-400">Tags</Link>
          <span className="mx-2">→</span>
          <Link href={`/tags/${encodeURIComponent(tag)}`} className="hover:text-blue-600 dark:hover:text-blue-400">#{tag}</Link>
          <span className="mx-2">→</span>
          <span className="text-gray-900 dark:text-gray-100">Page {currentPage}</span>
        </nav>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          #{tag}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {totalPosts} post{totalPosts !== 1 ? 's' : ''} tagged with this • Page {currentPage} of {totalPages}
        </p>
        
        <div className="space-y-8">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          basePath={`/tags/${encodeURIComponent(tag)}`}
        />
      </div>
    </div>
  )
}