'use client'

import Giscus from '@giscus/react'

interface CommentsProps {
  slug: string
}

export default function Comments({ slug }: CommentsProps) {
  // Check if we're in development mode
  const isDevelopment = process.env.NODE_ENV === 'development'

  return (
    <div className="mt-12 pt-8 border-t">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Comments</h3>

      {isDevelopment ? (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start">
            <svg className="h-5 w-5 text-blue-400 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="text-blue-800 font-medium mb-2">Comments in Development Mode</h4>
              <p className="text-blue-700 text-sm mb-3">
                Comments are disabled in development mode because Giscus requires domain verification.
                Comments will work normally when deployed to GitHub Pages.
              </p>
              <p className="text-blue-600 text-xs">
                <strong>To test comments:</strong> Deploy to GitHub Pages and test on the live site.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <Giscus
          id="comments"
          repo="kidchen/kidchen.github.io"
          repoId="MDEwOlJlcG9zaXRvcnkyNzE2NDQzNQ=="
          category="Announcements"
          categoryId="DIC_kwDOAZ5_E84Cv1RE"
          mapping="pathname"
          term={slug}
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="bottom"
          theme="preferred_color_scheme"
          lang="en"
          loading="lazy"
          strict="0"
        />
      )}
    </div>
  )
}

// To get your repo ID and category ID:
// 1. Go to https://giscus.app/
// 2. Enter your repo: kidchen/kidchen.github.io
// 3. Enable Discussions in your GitHub repo settings
// 4. Copy the generated repo ID and category ID from the giscus configuration