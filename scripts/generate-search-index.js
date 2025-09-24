const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Generate search index for static site
function generateSearchIndex() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  
  if (!fs.existsSync(postsDirectory)) {
    console.log('No posts directory found');
    return;
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const searchIndex = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const matterResult = matter(fileContents);

      // Extract plain text excerpt
      const plainText = matterResult.content
        .replace(/^#{1,6}\s+(.+)$/gm, '$1') // Remove header markers
        .replace(/\*\*(.+?)\*\*/g, '$1') // Remove bold markers
        .replace(/\*(.+?)\*/g, '$1') // Remove italic markers
        .replace(/`(.+?)`/g, '$1') // Remove code markers
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to text
        .replace(/\n+/g, ' ') // Replace newlines with spaces
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim();

      const excerpt = plainText.length > 200 
        ? plainText.substring(0, 200) + '...'
        : plainText;

      return {
        slug: matterResult.data.slug || slug,
        title: matterResult.data.title || 'Untitled',
        excerpt,
        categories: matterResult.data.categories || [],
        tags: matterResult.data.tags || [],
        date: matterResult.data.date || ''
      };
    });

  // Write search index to public directory
  const outputPath = path.join(process.cwd(), 'public', 'search-index.json');
  fs.writeFileSync(outputPath, JSON.stringify(searchIndex, null, 2));
  
  console.log(`✅ Generated search index with ${searchIndex.length} posts`);
}

generateSearchIndex();