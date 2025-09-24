// Site configuration
export const siteConfig = {
  // Pagination settings
  pagination: {
    postsPerPage: {
      homepage: 5,      // Show 5 posts on homepage for better loading
      archives: 20,     // Show 20 posts per archives page
      category: 10,     // Show 10 posts per category page
      tag: 10,          // Show 10 posts per tag page
    }
  },
  
  // Site metadata
  site: {
    name: 'kidChen',
    description: "Chen Zhang's personal website",
    author: 'Chen Zhang',
    url: 'https://kidchen.github.io',
    keywords: 'kidChen, Chen Zhang, blog, programming, personal'
  },
  
  // Feature flags
  features: {
    search: true,
    comments: true,
    darkMode: true,
    analytics: false // Can be enabled later
  }
}

export default siteConfig