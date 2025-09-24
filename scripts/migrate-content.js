const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Create posts directory if it doesn't exist
const postsDir = path.join(process.cwd(), 'posts');
if (!fs.existsSync(postsDir)) {
  fs.mkdirSync(postsDir, { recursive: true });
}

// Function to extract content from Hexo HTML files
function extractContentFromHexoHTML(htmlContent) {
  // Extract title from h1.article-title tag (better pattern)
  let title = 'Untitled';
  
  // Try multiple patterns for title extraction
  const titlePatterns = [
    /<h1[^>]*class="[^"]*article-title[^"]*"[^>]*>\s*(?:<a[^>]*>)?\s*(.*?)\s*(?:<\/a>)?\s*<\/h1>/s,
    /<h1[^>]*class="[^"]*article-title[^"]*"[^>]*>(.*?)<\/h1>/s,
    /<title>(.*?)\s*-\s*kidChen<\/title>/,
    /<meta property="og:title" content="([^"]*)"[^>]*>/
  ];
  
  for (const pattern of titlePatterns) {
    const match = htmlContent.match(pattern);
    if (match && match[1] && match[1].trim() !== '') {
      title = match[1].trim();
      break;
    }
  }
  
  // Extract date from time tag
  const dateMatch = htmlContent.match(/<time datetime="([^"]*)"[^>]*>/);
  const date = dateMatch ? dateMatch[1].split('T')[0] : '';
  
  // Extract categories
  const categoryMatches = htmlContent.match(/<a class="article-category-link"[^>]*>([^<]*)<\/a>/g);
  const categories = categoryMatches ? categoryMatches.map(match => {
    const categoryMatch = match.match(/>([^<]*)</);
    return categoryMatch ? decodeURIComponent(categoryMatch[1]) : '';
  }).filter(Boolean) : [];
  
  // Extract tags
  const tagMatches = htmlContent.match(/<a class="tag[^"]*article-tag"[^>]*href="[^"]*">([^<]*)<\/a>/g);
  const tags = tagMatches ? tagMatches.map(match => {
    const tagMatch = match.match(/>([^<]*)</);
    if (tagMatch) {
      return tagMatch[1].replace('#', '').trim();
    }
    return '';
  }).filter(Boolean) : [];
  
  // Extract content from article-entry div
  const contentMatch = htmlContent.match(/<div class="article-entry[^>]*"[^>]*>(.*?)<\/div>/s);
  let content = contentMatch ? contentMatch[1] : '';
  
  // Clean up HTML content
  content = content
    .replace(/<html><head><\/head><body>/g, '')
    .replace(/<\/body><\/html>/g, '')
    .replace(/<span id="more"><\/span>/g, '') // Remove Hexo "more" marker
    .replace(/\s+/g, ' ')
    .trim();
  
  return { title, date, categories, tags, content };
}

// Function to convert HTML content to markdown (basic conversion)
function htmlToMarkdown(html) {
  return html
    .replace(/<h([1-6])(?:[^>]*)>(.*?)<\/h[1-6]>/g, (match, level, text) => {
      const hashes = '#'.repeat(parseInt(level));
      return `${hashes} ${text}\n\n`;
    })
    .replace(/<p(?:[^>]*)>(.*?)<\/p>/g, '$1\n\n')
    .replace(/<strong(?:[^>]*)>(.*?)<\/strong>/g, '**$1**')
    .replace(/<em(?:[^>]*)>(.*?)<\/em>/g, '*$1*')
    .replace(/<code(?:[^>]*)>(.*?)<\/code>/g, '`$1`')
    .replace(/<a(?:[^>]*href="([^"]*)"[^>]*)>(.*?)<\/a>/g, '[$2]($1)')
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/<[^>]*>/g, '') // Remove remaining HTML tags
    .replace(/\n\s*\n\s*\n/g, '\n\n') // Clean up multiple newlines
    .trim();
}

// Scan year directories for content
const yearDirs = fs.readdirSync('.').filter(dir => 
  fs.statSync(dir).isDirectory() && /^\d{4}$/.test(dir)
);

console.log('Found year directories:', yearDirs);

yearDirs.forEach(year => {
  const yearPath = path.join(process.cwd(), year);
  
  function scanDirectory(dirPath, relativePath = '') {
    const items = fs.readdirSync(dirPath);
    
    items.forEach(item => {
      const itemPath = path.join(dirPath, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        scanDirectory(itemPath, path.join(relativePath, item));
      } else if (item === 'index.html') {
        try {
          const htmlContent = fs.readFileSync(itemPath, 'utf8');
          const { title, date, categories, tags, content } = extractContentFromHexoHTML(htmlContent);
          
          if (title && date && content) {
            const slug = relativePath || `${year}-post`;
            const markdownContent = htmlToMarkdown(content);
            
            const frontMatter = {
              title,
              date,
              categories: categories.length > 0 ? categories : ['Uncategorized'],
              tags: tags.length > 0 ? tags : [],
              slug: `${year}/${slug}`,
              layout: 'post'
            };
            
            const postContent = matter.stringify(markdownContent, frontMatter);
            const filename = `${year}-${slug.replace(/\//g, '-')}.md`;
            const outputPath = path.join(postsDir, filename);
            
            fs.writeFileSync(outputPath, postContent);
            console.log(`Migrated: ${filename} - "${title}"`);
          }
        } catch (error) {
          console.error(`Error processing ${itemPath}:`, error.message);
        }
      }
    });
  }
  
  scanDirectory(yearPath);
});

console.log('Migration completed!');