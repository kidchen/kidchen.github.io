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
    page: string
  }
}

export const dynamicParams = false

export async function generateStaticParams() {
  const posts = getAllPosts()
  const tags = new Set<string>()
  
  posts.forEach(post => {
    post.tags.forEach(tag => {
      tags.add(tag)
    })
  })
  
  const params: { tag: string; page: string }[] = []
  
  Array.from(tags).forEach(tag => {
    const { totalPages } = getTagPosts(tag, 1, siteConfig.pagination.postsPerPage.tag)
    
    // Generate pages 2 and onwards (page 1 is handled by the main tag route)
    for (let page = 2; page <= totalPages; page++) {
      params.push({
        tag: toPinyinSlug(tag), // Use pinyin slug
        page: page.toString()
      })
    }
  })
  
  return params
}

export async function generateMetadata({ params }: TagPageProps) {
  const posts = getAllPosts()
  const tags = Array.from(new Set(posts.flatMap(post => post.tags)))
  const tagMapping = createPinyinMapping(tags)
  const originalTag = findOriginalFromPinyin(params.tag, tagMapping)
  const tag = originalTag || params.tag
  
  return {
    title: `#${tag} | Page ${params.page} | Tags | kidChen`,
    description: `Posts tagged with ${tag} - Page ${params.page}`,
  }
}

export default function TagPagePaginated({ params }: TagPageProps) {
  const posts = getAllPosts()
  const tags = Array.from(new Set(posts.flatMap(post => post.tags)))
  const tagMapping = createPinyinMapping(tags)
  const originalTag = findOriginalFromPinyin(params.tag, tagMapping)
  
  if (!originalTag) {
    redirect('/tags')
  }
  
  const page = parseInt(params.page)
  const { posts: tagPosts, totalPages, currentPage, totalPosts } = getTagPosts(
    originalTag, 
    page, 
    siteConfig.pagination.postsPerPage.tag
  )

  if (tagPosts.length === 0 || page > totalPages) {
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
          <Link href={`/tags/${params.tag}`} className="hover:text-blue-600 dark:hover:text-blue-400">#{originalTag}</Link>
          <span className="mx-2">→</span>
          <span className="text-gray-900 dark:text-gray-100">Page {page}</span>
        </nav>

        {/* Tag Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Tag: #{originalTag}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Page {page} of {totalPages} • {totalPosts} total posts
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid gap-6 mb-8">
          {tagPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          basePath={`/tags/${params.tag}`}
        />
      </div>
    </div>
  )
}
