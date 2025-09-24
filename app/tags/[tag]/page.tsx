import { getAllPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface TagPageProps {
  params: {
    tag: string
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  const tags = new Set<string>()
  
  posts.forEach(post => {
    post.tags.forEach(tag => {
      tags.add(tag)
    })
  })
  
  return Array.from(tags).map((tag) => ({
    tag: encodeURIComponent(tag),
  }))
}

export async function generateMetadata({ params }: TagPageProps) {
  const tag = decodeURIComponent(params.tag)
  
  return {
    title: `#${tag} | Tags | kidChen`,
    description: `Posts tagged with ${tag}`,
  }
}

export default function TagPage({ params }: TagPageProps) {
  const tag = decodeURIComponent(params.tag)
  const posts = getAllPosts()
  
  const tagPosts = posts.filter(post => 
    post.tags.includes(tag)
  )

  if (tagPosts.length === 0) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">→</span>
          <Link href="/tags" className="hover:text-blue-600">Tags</Link>
          <span className="mx-2">→</span>
          <span className="text-gray-900">#{tag}</span>
        </nav>

        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          #{tag}
        </h1>
        <p className="text-gray-600 mb-8">
          {tagPosts.length} post{tagPosts.length !== 1 ? 's' : ''} tagged with this
        </p>
        
        <div className="space-y-8">
          {tagPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}