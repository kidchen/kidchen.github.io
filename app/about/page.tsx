export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About</h1>
        
        <div className="prose prose-lg max-w-none">
          <p>
            I am Chen, a Chinese living in the United States. Music lover. 
            I am trying to learn Korean just because I really want to understand 
            the meanings of Epik High's lyrics. I'm also trying to learn how to play guitar. 
            It's just cool!
          </p>
          
          <p>
            Sometimes hiking, sometimes sleeping… But for the most of my time, 
            I'm working on search related technologies such as indexing (ElasticSearch) 
            and query processing (NLP). So yes, I am a software engineer, back-end.
          </p>
          
          <p>
            Want to know more about me? Check:
          </p>
          
          <ul>
            <li><a href="#" className="text-blue-600 hover:text-blue-800">微博</a></li>
            <li><a href="#" className="text-blue-600 hover:text-blue-800">GitHub</a></li>
            <li><a href="#" className="text-blue-600 hover:text-blue-800">LinkedIn</a></li>
            <li><a href="#" className="text-blue-600 hover:text-blue-800">Instagram</a></li>
            <li><a href="#" className="text-blue-600 hover:text-blue-800">Facebook</a></li>
          </ul>
          
          <p>
            or send me an Email. I always like meeting new friends.
          </p>
          
          <h2>About this site</h2>
          
          <p>
            This static website is powered by Next.js. The design is modern and responsive,
            built with Tailwind CSS.
          </p>
          
          <p>
            When you meet 404 Error (Not Found Error), it redirects to NotFound Project 
            to help finding missing children.
          </p>
        </div>
      </div>
    </div>
  )
}