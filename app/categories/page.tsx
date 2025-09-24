import { getAllPosts } from '@/lib/posts'
import Link from 'next/link'

export const metadata = {
  title: 'Categories | kidChen',
  description: 'Browse posts by category',
}

export default function Categories() {
  const posts = getAllPosts()
  
  // Count posts by category
  const categoryCount = posts.reduce((acc, post) => {
    post.categories.forEach(category => {
      acc[category] = (acc[category] || 0) + 1
    })
    return acc
  }, {} as Record<string, number>)

  const categories = Object.entries(categoryCount)
    .sort(([,a], [,b]) => b - a) // Sort by count, descending

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Categories</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(([category, count]) => (
            <Link
              key={category}
              href={`/categories/${encodeURIComponent(category)}`}
              className="block p-6 bg-white rounded-lg border hover:shadow-md transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {category}
              </h2>
              <p className="text-gray-600">
                {count} post{count !== 1 ? 's' : ''}
              </p>
            </Link>
          ))}
        </div>
        
        {categories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No categories found.</p>
          </div>
        )}
      </div>
    </div>
  )
}