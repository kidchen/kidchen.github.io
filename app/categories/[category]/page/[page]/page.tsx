import { getAllPosts, getCategoryPosts } from '@/lib/posts'
import { toPinyinSlug, createPinyinMapping, findOriginalFromPinyin } from '@/lib/pinyin'
import PostCard from '@/components/PostCard'
import Pagination from '@/components/Pagination'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { siteConfig } from '@/lib/config'

interface CategoryPageProps {
  params: {
    category: string
    page: string
  }
}

export const dynamicParams = false

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
        category: toPinyinSlug(category), // Use pinyin slug
        page: page.toString()
      })
    }
  })
  
  return params
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const posts = getAllPosts()
  const categories = Array.from(new Set(posts.flatMap(post => post.categories)))
  const categoryMapping = createPinyinMapping(categories)
  const originalCategory = findOriginalFromPinyin(params.category, categoryMapping)
  const category = originalCategory || params.category
  
  return {
    title: `${category} | Page ${params.page} | Categories | kidChen`,
    description: `Posts in the ${category} category - Page ${params.page}`,
  }
}

export default function CategoryPagePaginated({ params }: CategoryPageProps) {
  const posts = getAllPosts()
  const categories = Array.from(new Set(posts.flatMap(post => post.categories)))
  const categoryMapping = createPinyinMapping(categories)
  const originalCategory = findOriginalFromPinyin(params.category, categoryMapping)
  
  if (!originalCategory) {
    redirect('/categories')
  }
  
  const page = parseInt(params.page)
  const { posts: categoryPosts, totalPages, currentPage, totalPosts } = getCategoryPosts(
    originalCategory, 
    page, 
    siteConfig.pagination.postsPerPage.category
  )

  if (categoryPosts.length === 0 || page > totalPages) {
    redirect('/categories')
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
          <Link href={`/categories/${params.category}`} className="hover:text-blue-600 dark:hover:text-blue-400">{originalCategory}</Link>
          <span className="mx-2">→</span>
          <span className="text-gray-900 dark:text-gray-100">Page {page}</span>
        </nav>

        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Category: {originalCategory}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Page {page} of {totalPages} • {totalPosts} total posts
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid gap-6 mb-8">
          {categoryPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath={`/categories/${params.category}`}
        />
      </div>
    </div>
  )
}
