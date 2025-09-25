import { getPaginatedPosts } from '@/lib/posts'
import { toPinyinSlug } from '@/lib/pinyin'
import Link from 'next/link'
import { format } from 'date-fns'
import Pagination from '@/components/Pagination'
import { siteConfig } from '@/lib/config'

export const metadata = {
  title: 'Archives | kidChen',
  description: 'All blog posts organized by date',
}

export default function Archives() {
  const { posts, totalPages, currentPage, totalPosts } = getPaginatedPosts(1, siteConfig.pagination.postsPerPage.archives)
  
  // Group posts by year
  const postsByYear = posts.reduce((acc, post) => {
    const year = new Date(post.date).getFullYear()
    if (!acc[year]) {
      acc[year] = []
    }
    acc[year].push(post)
    return acc
  }, {} as Record<number, typeof posts>)

  const years = Object.keys(postsByYear)
    .map(Number)
    .sort((a, b) => b - a)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Archives</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {totalPosts} posts total • Showing page {currentPage} of {totalPages}
        </p>
        
        <div className="space-y-8">
          {years.map(year => (
            <div key={year}>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                {year} ({postsByYear[year].length} posts)
              </h2>
              <div className="space-y-4">
                {postsByYear[year].map(post => (
                  <article key={post.slug} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <time 
                      dateTime={post.date}
                      className="text-sm text-gray-500 dark:text-gray-400 font-mono sm:w-24 flex-shrink-0"
                    >
                      {format(new Date(post.date), 'MM-dd')}
                    </time>
                    
                    <div className="flex-grow">
                      <h3 className="text-lg font-medium mb-1">
                        <Link 
                          href={`/posts/${post.slug}`}
                          className="text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                          {post.title}
                        </Link>
                      </h3>
                      
                      {post.excerpt && (
                        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                          {post.excerpt.replace(/<[^>]*>/g, '')}
                        </p>
                      )}
                      
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        {post.categories.slice(0, 2).map(category => (
                          <Link
                            key={category}
                            href={`/categories/${toPinyinSlug(category)}`}
                            className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                          >
                            {category}
                          </Link>
                        ))}
                        
                        {post.readingTime && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {post.readingTime} min read
                          </span>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          basePath="/archives"
        />
        
        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">No posts found. Run the migration script to import your Hexo content!</p>
          </div>
        )}
      </div>
    </div>
  )
}