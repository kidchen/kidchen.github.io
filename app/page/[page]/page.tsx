import { getPaginatedPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import Pagination from '@/components/Pagination'
import { siteConfig } from '@/lib/config'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    page: string
  }
}

export const dynamicParams = false // Disable dynamic params for static export

export async function generateStaticParams() {
  const { totalPages } = getPaginatedPosts(1, siteConfig.pagination.postsPerPage.homepage)
  
  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    page: (i + 2).toString(), // Start from page 2 (page 1 is the homepage)
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const page = parseInt(params.page)
  
  return {
    title: `Page ${page} | kidChen`,
    description: `Blog posts - Page ${page}`,
  }
}

export default function PaginatedPage({ params }: PageProps) {
  const page = parseInt(params.page)
  
  if (isNaN(page) || page < 2) {
    notFound()
  }

  const { posts, totalPages, currentPage } = getPaginatedPosts(page, siteConfig.pagination.postsPerPage.homepage)

  if (posts.length === 0) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          kidChen's Blog
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
          Page {currentPage} of {totalPages}
        </p>
        
        <div className="space-y-8">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          basePath="/"
        />
      </div>
    </div>
  )
}