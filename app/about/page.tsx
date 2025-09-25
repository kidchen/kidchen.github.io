export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">About</h1>
        
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p>
            I'm Chen, a software engineer living in the Bay Area, originally from China. 
            I'm passionate about backend technologies, distributed systems, and building 
            scalable applications that handle real-world complexity.
          </p>
          
          <p>
            Music has always been a big part of my life. I recently got a digital piano 
            and I'm slowly learning to play—it's harder than it looks! I'm also learning 
            Korean these days, which keeps my brain busy when I'm not coding.
          </p>
          
          <p>
            I'm naturally outgoing and love connecting with people who share similar 
            interests in technology, music, or just life in general. This blog serves 
            as my digital notebook where I share technical insights, document interesting 
            problems I've solved, and occasionally write about non-technical topics 
            that catch my attention.
          </p>
          
          <p>
            You can find me on{' '}
            <a 
              href="https://github.com/kidchen" 
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            {' '}or send me an{' '}
            <a 
              href="mailto:kid.chen@outlook.com" 
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              Email
            </a>
            . I always enjoy meeting new people and having interesting conversations.
          </p>
          
          <h2>About this site</h2>
          
          <p>
            This website is built with Next.js and deployed as a static site. 
            It features a clean, responsive design powered by Tailwind CSS, 
            supporting both English and Chinese content with proper dark mode support.
          </p>
        </div>
      </div>
    </div>
  )
}