export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-600">
          <p>
            © {new Date().getFullYear()} Chen Zhang
          </p>
          <p className="mt-2 text-sm">
            Powered by{' '}
            <a 
              href="https://nextjs.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              Next.js
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}