'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import SearchModal from './SearchModal'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  // Keyboard shortcut for search (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="kidChen"
              width={28}
              height={28}
              className="h-7 w-auto dark:[filter:invert(1)_hue-rotate(180deg)]"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400">
              Home
            </Link>
            <Link href="/archives" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400">
              Archives
            </Link>
            <Link href="/categories" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400">
              Categories
            </Link>
            <Link href="/tags" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400">
              Tags
            </Link>
            <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400">
              About
            </Link>
            
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 flex items-center gap-2"
              title="Search (⌘K)"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="hidden lg:inline">Search</span>
            </button>
            
            {/* Theme Toggle */}
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                Home
              </Link>
              <Link href="/archives" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                Archives
              </Link>
              <Link href="/categories" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                Categories
              </Link>
              <Link href="/tags" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                Tags
              </Link>
              <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                About
              </Link>
              
              {/* Mobile Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </button>
              
              {/* Mobile Theme Toggle */}
              <button
                onClick={() => {
                  // Get the theme toggle button and click it
                  const themeButton = document.querySelector('[aria-label*="mode"]') as HTMLButtonElement
                  if (themeButton) themeButton.click()
                }}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Theme
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </nav>
  )
}