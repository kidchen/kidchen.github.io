import Link from 'next/link'
import { format } from 'date-fns'
import { Post } from '@/types/post'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
      <header className="mb-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          <Link 
            href={`/posts/${post.slug}`}
            className="hover:text-blue-600 transition-colors"
          >
            {post.title}
          </Link>
        </h2>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <time dateTime={post.date}>
            {format(new Date(post.date), 'MMMM dd, yyyy')}
          </time>
          
          {post.categories && post.categories.length > 0 && (
            <div className="flex items-center gap-2">
              <span>in</span>
              {post.categories.map((category, index) => (
                <span key={category}>
                  <Link 
                    href={`/categories/${encodeURIComponent(category)}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {category}
                  </Link>
                  {index < post.categories.length - 1 && <span className="mx-1">&gt;</span>}
                </span>
              ))}
            </div>
          )}
          
          {post.readingTime && (
            <span>{post.readingTime} minutes read</span>
          )}
        </div>
      </header>

      {post.excerpt && (
        <div className="text-gray-700 mb-4 prose prose-sm max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
        </div>
      )}

      <div className="flex justify-between items-center">
        <Link 
          href={`/posts/${post.slug}`}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Read More →
        </Link>
        
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag)}`}
                className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs hover:bg-gray-200"
              >
                #{tag}
              </Link>
            ))}
            {post.tags.length > 3 && (
              <span className="text-gray-500 text-xs">+{post.tags.length - 3} more</span>
            )}
          </div>
        )}
      </div>
    </article>
  )
}