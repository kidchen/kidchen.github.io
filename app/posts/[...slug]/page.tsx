import { getAllPosts, getPostBySlug, markdownToHtml } from '@/lib/posts'
import { format } from 'date-fns'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Comments from '@/components/Comments'

interface PostPageProps {
  params: {
    slug: string[]
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  
  return posts.map((post) => ({
    slug: post.slug.split('/'),
  }))
}

export async function generateMetadata({ params }: PostPageProps) {
  const slug = params.slug.join('/')
  const post = getPostBySlug(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | kidChen`,
    description: post.excerpt,
    keywords: post.tags.join(', '),
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const slug = params.slug.join('/')
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const contentHtml = await markdownToHtml(post.content)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">→</span>
          <Link href="/archives" className="hover:text-blue-600">Archives</Link>
          <span className="mx-2">→</span>
          <span className="text-gray-900">{post.title}</span>
        </nav>

        <article className="prose prose-lg max-w-none">
          {/* Post Header */}
          <header className="mb-8 pb-8 border-b">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-gray-600">
              <time dateTime={post.date} className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {format(new Date(post.date), 'MMMM dd, yyyy')}
              </time>
              
              {post.readingTime && (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {post.readingTime} minutes read
                </span>
              )}
            </div>

            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="mt-4">
                <span className="text-gray-600 mr-2">Categories:</span>
                {post.categories.map((category, index) => (
                  <span key={category}>
                    <Link 
                      href={`/categories/${encodeURIComponent(category)}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {category}
                    </Link>
                    {index < post.categories.length - 1 && <span className="mx-1 text-gray-400">&gt;</span>}
                  </span>
                ))}
              </div>
            )}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-2">
                <span className="text-gray-600 mr-2">Tags:</span>
                <div className="inline-flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tags/${encodeURIComponent(tag)}`}
                      className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm hover:bg-blue-200"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </header>

          {/* Post Content */}
          <div 
            className="prose prose-lg max-w-none 
                       prose-headings:text-gray-900 prose-headings:font-bold
                       prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline 
                       prose-code:text-pink-600 prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded prose-code:text-sm
                       prose-pre:bg-gray-900 prose-pre:text-gray-100
                       prose-blockquote:border-l-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-2 prose-blockquote:px-4
                       prose-img:rounded-lg prose-img:shadow-md
                       prose-table:text-sm
                       prose-th:bg-gray-100 prose-th:font-semibold
                       prose-td:border-gray-300 prose-th:border-gray-300"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </article>

        {/* Comments */}
        <Comments slug={slug} />

        {/* Navigation */}
        <nav className="mt-12 pt-8 border-t">
          <div className="flex justify-between">
            <Link 
              href="/archives"
              className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Archives
            </Link>
            
            <Link 
              href="/"
              className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
            >
              Home
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  )
}