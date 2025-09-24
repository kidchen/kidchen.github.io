import { getAllPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface CategoryPageProps {
  params: {
    category: string
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  const categories = new Set<string>()
  
  posts.forEach(post => {
    post.categories.forEach(category => {
      categories.add(category)
    })
  })
  
  return Array.from(categories).map((category) => ({
    category: encodeURIComponent(category),
  }))
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const category = decodeURIComponent(params.category)
  
  return {
    title: `${category} | Categories | kidChen`,
    description: `Posts in the ${category} category`,
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = decodeURIComponent(params.category)
  const posts = getAllPosts()
  
  const categoryPosts = posts.filter(post => 
    post.categories.includes(category)
  )

  if (categoryPosts.length === 0) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">→</span>
          <Link href="/categories" className="hover:text-blue-600">Categories</Link>
          <span className="mx-2">→</span>
          <span className="text-gray-900">{category}</span>
        </nav>

        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {category}
        </h1>
        <p className="text-gray-600 mb-8">
          {categoryPosts.length} post{categoryPosts.length !== 1 ? 's' : ''} in this category
        </p>
        
        <div className="space-y-8">
          {categoryPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}