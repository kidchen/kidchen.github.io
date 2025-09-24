'use client'

import { useState, useEffect, useRef } from 'react'
import { SearchablePost } from '@/lib/search'
import Link from 'next/link'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchablePost[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      // Focus input when modal opens
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setQuery('')
      setResults([])
    }
  }, [isOpen])

  useEffect(() => {
    if (query.length >= 2) {
      setIsLoading(true)
      
      // Debounce search requests
      const timeoutId = setTimeout(async () => {
        try {
          // Load search index
          const response = await fetch('/search-index.json')
          if (!response.ok) {
            throw new Error('Failed to load search index')
          }
          
          const searchIndex: SearchablePost[] = await response.json()
          
          // Import Fuse.js dynamically for client-side use
          const Fuse = (await import('fuse.js')).default
          
          // Create Fuse instance
          const fuse = new Fuse(searchIndex, {
            keys: [
              { name: 'title', weight: 0.4 },
              { name: 'excerpt', weight: 0.3 },
              { name: 'categories', weight: 0.2 },
              { name: 'tags', weight: 0.1 }
            ],
            threshold: 0.3,
            includeScore: true,
            minMatchCharLength: 2
          })

          // Perform search
          const searchResults = fuse.search(query)
          setResults(searchResults.slice(0, 10).map(result => result.item))
        } catch (error) {
          console.error('Search error:', error)
          setResults([])
        } finally {
          setIsLoading(false)
        }
      }, 300)

      return () => clearTimeout(timeoutId)
    } else {
      setResults([])
      setIsLoading(false)
    }
  }, [query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-xl">
          {/* Search Input */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <svg 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                placeholder="Search posts..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto">
            {query.length < 2 ? (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                Type at least 2 characters to search...
              </div>
            ) : isLoading ? (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <div className="mt-2">Searching...</div>
              </div>
            ) : results.length === 0 ? (
              <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                No results found for "{query}"
              </div>
            ) : (
              <div className="p-2">
                {results.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/posts/${post.slug}`}
                    className="block p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    onClick={onClose}
                  >
                    <div className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                      {post.title}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      {post.excerpt.substring(0, 100)}...
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <time>{post.date}</time>
                      {post.categories.length > 0 && (
                        <>
                          <span>•</span>
                          <span>{post.categories.join(', ')}</span>
                        </>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-500 dark:text-gray-400 text-center">
            Press <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-600 rounded">Esc</kbd> to close
          </div>
        </div>
      </div>
    </div>
  )
}