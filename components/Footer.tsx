export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p className="mb-2">
            © {currentYear} Chen Zhang. All rights reserved.
          </p>
          <p className="text-sm">
            Powered by{' '}
            <a 
              href="https://nextjs.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              Next.js
            </a>
            {' '}& deployed on{' '}
            <a 
              href="https://pages.github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              GitHub Pages
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}