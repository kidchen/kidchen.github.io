import { getPaginatedPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import Pagination from '@/components/Pagination'
import { siteConfig } from '@/lib/config'

export default function Home() {
  const { posts, totalPages, currentPage } = getPaginatedPosts(1, siteConfig.pagination.postsPerPage.homepage)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          Welcome to kidChen's Blog
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
          Chen Zhang's personal website - sharing thoughts on technology, life, and everything in between.
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