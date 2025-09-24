'use client'

import Giscus from '@giscus/react'

interface CommentsProps {
  slug: string
}

export default function Comments({ slug }: CommentsProps) {
  return (
    <div className="mt-12 pt-8 border-t">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Comments</h3>
      <Giscus
        id="comments"
        repo="kidchen/kidchen.github.io"
        repoId="R_kgDONGxYdw" // You'll need to get this from GitHub
        category="General"
        categoryId="DIC_kwDONGxYd84CjvQs" // You'll need to get this from GitHub
        mapping="pathname"
        term={slug}
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="light"
        lang="en"
        loading="lazy"
      />
    </div>
  )
}

// To get your repo ID and category ID:
// 1. Go to https://giscus.app/
// 2. Enter your repo: kidchen/kidchen.github.io
// 3. Enable Discussions in your GitHub repo settings
// 4. Copy the generated repo ID and category ID from the giscus configuration