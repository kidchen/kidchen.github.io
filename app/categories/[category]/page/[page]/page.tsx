import { getAllPosts, getCategoryPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import Pagination from '@/components/Pagination'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { siteConfig } from '@/lib/config'

interface CategoryPageProps {
  params: {
    category: string
    page: string
  }
}

export const dynamicParams = false // Disable dynamic params for static export

export async function generateStaticParams() {
  const posts = getAllPosts()
  const categories = new Set<string>()
  
  posts.forEach(post => {
    post.categories.forEach(category => {
      categories.add(category)
    })
  })
  
  const params: { category: string; page: string }[] = []
  
  Array.from(categories).forEach(category => {
    const { totalPages } = getCategoryPosts(category, 1, siteConfig.pagination.postsPerPage.category)
    
    // Generate pages 2 and onwards (page 1 is handled by the main category route)
    for (let page = 2; page <= totalPages; page++) {
      params.push({
        category: encodeURIComponent(category),
        page: page.toString()
      })
    }
  })
  
  return params
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const category = decodeURIComponent(params.category)
  const page = parseInt(params.page)
  
  return {
    title: `${category} - Page ${page} | Categories | kidChen`,
    description: `Posts in the ${category} category - Page ${page}`,
  }
}

export default function CategoryPaginatedPage({ params }: CategoryPageProps) {
  const category = decodeURIComponent(params.category)
  const page = parseInt(params.page)
  
  if (isNaN(page) || page < 2) {
    notFound()
  }

  const { posts, totalPages, currentPage, totalPosts } = getCategoryPosts(category, page, siteConfig.pagination.postsPerPage.category)

  if (posts.length === 0) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-600 dark:text-gray-400">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
          <span className="mx-2">→</span>
          <Link href="/categories" className="hover:text-blue-600 dark:hover:text-blue-400">Categories</Link>
          <span className="mx-2">→</span>
          <Link href={`/categories/${encodeURIComponent(category)}`} className="hover:text-blue-600 dark:hover:text-blue-400">{category}</Link>
          <span className="mx-2">→</span>
          <span className="text-gray-900 dark:text-gray-100">Page {currentPage}</span>
        </nav>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          {category}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          {totalPosts} post{totalPosts !== 1 ? 's' : ''} in this category • Page {currentPage} of {totalPages}
        </p>
        
        <div className="space-y-8">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          basePath={`/categories/${encodeURIComponent(category)}`}
        />
      </div>
    </div>
  )
}