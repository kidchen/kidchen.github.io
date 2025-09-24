import { getAllPosts } from '@/lib/posts'
import Link from 'next/link'

export const metadata = {
  title: 'Tags | kidChen',
  description: 'Browse posts by tag',
}

export default function Tags() {
  const posts = getAllPosts()
  
  // Count posts by tag
  const tagCount = posts.reduce((acc, post) => {
    post.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1
    })
    return acc
  }, {} as Record<string, number>)

  const tags = Object.entries(tagCount)
    .sort(([,a], [,b]) => b - a) // Sort by count, descending

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">Tags</h1>
        
        <div className="flex flex-wrap gap-3">
          {tags.map(([tag, count]) => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
            >
              <span className="font-medium">#{tag}</span>
              <span className="text-sm bg-blue-200 dark:bg-blue-800 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">
                {count}
              </span>
            </Link>
          ))}
        </div>
        
        {tags.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">No tags found.</p>
          </div>
        )}
      </div>
    </div>
  )
}