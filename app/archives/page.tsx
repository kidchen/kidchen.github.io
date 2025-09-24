import { getAllPosts } from '@/lib/posts'
import Link from 'next/link'
import { format } from 'date-fns'

export default function Archives() {
  const posts = getAllPosts()
  
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
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Archives</h1>
        
        <div className="space-y-8">
          {years.map(year => (
            <div key={year}>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{year}</h2>
              <div className="space-y-4">
                {postsByYear[year].map(post => (
                  <article key={post.slug} className="border-l-4 border-blue-500 pl-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">
                          <Link 
                            href={`/posts/${post.slug}`}
                            className="text-gray-900 hover:text-blue-600 transition-colors"
                          >
                            {post.title}
                          </Link>
                        </h3>
                        {post.categories && post.categories.length > 0 && (
                          <div className="text-sm text-gray-600 mt-1">
                            {post.categories.join(' > ')}
                          </div>
                        )}
                      </div>
                      <time className="text-sm text-gray-500 mt-2 sm:mt-0">
                        {format(new Date(post.date), 'MMM dd')}
                      </time>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}