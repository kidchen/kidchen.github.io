import { getAllPosts, getTagPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import Pagination from '@/components/Pagination'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { siteConfig } from '@/lib/config'

interface TagPageProps {
  params: {
    tag: string
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
  
  return Array.from(tags).map((tag) => ({
    tag: encodeURIComponent(tag),
  }))
}

export async function generateMetadata({ params }: TagPageProps) {
  const tag = decodeURIComponent(params.tag)
  
  return {
    title: `#${tag} | Tags | kidChen`,
    description: `Posts tagged with ${tag}`,
  }
}

export default function TagPage({ params }: TagPageProps) {
  const tag = decodeURIComponent(params.tag)
  const { posts, totalPages, currentPage, totalPosts } = getTagPosts(tag, 1, siteConfig.pagination.postsPerPage.tag)

  if (posts.length === 0) {
    redirect('/tags')
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
          <span className="text-gray-900 dark:text-gray-100">#{tag}</span>
        </nav>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          #{tag}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {totalPosts} post{totalPosts !== 1 ? 's' : ''} tagged with this
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