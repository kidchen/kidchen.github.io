import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <Link 
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Go Home
          </Link>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link 
              href="/archives"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              Browse Archives
            </Link>
            <Link 
              href="/categories"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              View Categories
            </Link>
            <Link 
              href="/tags"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              Explore Tags
            </Link>
          </div>
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400">
          <p>
            If you believe this is an error, please{' '}
            <Link 
              href="/about"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              contact me
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}