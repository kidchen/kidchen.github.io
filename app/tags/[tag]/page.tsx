import { getAllPosts, getTagPosts } from '@/lib/posts'
import { toPinyinSlug, createPinyinMapping, findOriginalFromPinyin } from '@/lib/pinyin'
import PostCard from '@/components/PostCard'
import Pagination from '@/components/Pagination'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { siteConfig } from '@/lib/config'

interface TagPageProps {
  params: {
    tag: string
  }
}

export const dynamicParams = false // Disable dynamic params for static export

export async function generateStaticParams() {
  const posts = getAllPosts()
  const tags = new Set<string>()
  
  posts.forEach(post => {
    post.tags.forEach(tag => {
      tags.add(tag)
    })
  })
  
  return Array.from(tags).map((tag) => ({
    tag: toPinyinSlug(tag), // Use pinyin slug for URL
  }))
}

export async function generateMetadata({ params }: TagPageProps) {
  const posts = getAllPosts()
  const tags = Array.from(new Set(posts.flatMap(post => post.tags)))
  const tagMapping = createPinyinMapping(tags)
  const originalTag = findOriginalFromPinyin(params.tag, tagMapping)
  const tag = originalTag || params.tag
  
  return {
    title: `#${tag} | Tags | kidChen`,
    description: `Posts tagged with ${tag}`,
  }
}

export default function TagPage({ params }: TagPageProps) {
  const posts = getAllPosts()
  const tags = Array.from(new Set(posts.flatMap(post => post.tags)))
  const tagMapping = createPinyinMapping(tags)
  const originalTag = findOriginalFromPinyin(params.tag, tagMapping)
  
  if (!originalTag) {
    redirect('/tags')
  }
  
  const { posts: tagPosts, totalPages, currentPage, totalPosts } = getTagPosts(originalTag, 1, siteConfig.pagination.postsPerPage.tag)

  if (tagPosts.length === 0) {
    redirect('/tags')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-600 dark:text-gray-400">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
          <span className="mx-2">→</span>
          <Link href="/tags" className="hover:text-blue-600 dark:hover:text-blue-400">Tags</Link>
          <span className="mx-2">→</span>
          <span className="text-gray-900 dark:text-gray-100">#{originalTag}</span>
        </nav>

        {/* Tag Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Tag: #{originalTag}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {totalPosts} {totalPosts === 1 ? 'post' : 'posts'} with this tag
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid gap-6 mb-8">
          {tagPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath={`/tags/${params.tag}`}
          />
        )}
      </div>
    </div>
  )
}
