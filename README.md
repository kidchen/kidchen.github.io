# kidChen's Blog

A modern, fast, and responsive personal blog built with Next.js 14, featuring both English and Chinese content covering technology, programming, and personal reflections.

## 🚀 Live Demo

Visit the blog at: [kidchen.github.io](https://kidchen.github.io)

## ✨ Features

- **Modern Tech Stack**: Built with Next.js 14, TypeScript, and Tailwind CSS
- **Static Site Generation**: Lightning-fast loading with pre-rendered pages
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Bilingual Content**: Supports both English and Chinese posts
- **SEO Optimized**: Proper meta tags, structured data, and semantic HTML
- **Category & Tag System**: Organized content with filtering capabilities
- **Reading Time**: Automatic calculation of estimated reading time
- **Clean URLs**: SEO-friendly URL structure
- **Code Highlighting**: Syntax highlighting for technical posts
- **Image Optimization**: Next.js Image component for optimal loading
- **Search Functionality**: Fast client-side search with keyboard shortcuts (⌘K)
- **Comments System**: GitHub Discussions integration with Giscus

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── about/             # About page
│   ├── archives/          # Archives with yearly organization
│   ├── categories/        # Category listing and individual pages
│   ├── posts/             # Dynamic post pages
│   ├── tags/              # Tag listing and individual pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable React components
│   ├── Footer.tsx         # Site footer
│   ├── Header.tsx         # Navigation header
│   └── PostCard.tsx       # Post preview card
├── lib/                   # Utility functions
│   └── posts.ts           # Post processing utilities
├── posts/                 # Markdown content (74 posts)
├── public/                # Static assets
│   ├── images/            # Blog images and assets
│   └── favicon.ico        # Site favicon
├── scripts/               # Build and utility scripts
│   ├── generate-search-index.js # Search index generation
│   └── new-post.js        # New post creation utility
└── types/                 # TypeScript type definitions
    └── post.ts            # Post-related types
```

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Content**: Markdown with gray-matter frontmatter
- **Deployment**: GitHub Pages with GitHub Actions
- **Development**: ESLint, Prettier (via IDE)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kidchen/kidchen.github.io.git
   cd kidchen.github.io
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run new-post "Title"` - Create new post with template
- `npm run deploy` - Build and prepare for deployment

## 🔍 Search & Comments

### Search Functionality
- **Keyboard shortcut**: Press `⌘K` (Mac) or `Ctrl+K` (Windows/Linux) to open search
- **Click search**: Use the search button in the navigation
- **Fast search**: Client-side search across all posts, categories, and tags

### Comments System
- **GitHub Integration**: Comments powered by GitHub Discussions
- **Authentication**: Users sign in with GitHub to comment
- **Moderation**: Manage comments through your GitHub repository
- **Privacy-friendly**: No tracking, uses GitHub's infrastructure

## 📖 Content Management

### Creating New Posts

#### Quick Method (Recommended)
```bash
# Create a new post with auto-generated template
npm run new-post "My Amazing New Post"

# This creates: posts/2024-01-15-my-amazing-new-post.md
# With proper frontmatter already filled in
```

#### Manual Method
1. Create a new markdown file in the `posts/` directory following the naming convention:
   ```
   YYYY-MM-DD-post-title.md
   ```

2. Use the template from `docs/POST_TEMPLATE.md` or create with this structure:
   ```markdown
   ---
   title: "Your Post Title"
   date: "2024-01-01"
   categories: ["Technology", "Programming"]
   tags: ["nextjs", "react", "typescript"]
   slug: "2024/01/01/your-post-slug"
   layout: "post"
   ---

   # Your Post Title

   Your post content here using Markdown...
   ```

3. Commit and push - GitHub Actions will automatically deploy!

### Post Requirements

#### Required Fields
- `title`: Post title (string, required)
- `date`: Publication date in "YYYY-MM-DD" format (required)
- `layout`: Always "post" (required)

#### Optional Fields
- `categories`: Array of broad topics, e.g., `["Technology", "Programming"]`
- `tags`: Array of specific keywords, e.g., `["nextjs", "react", "tutorial"]`
- `slug`: Custom URL path (auto-generated if not provided)

#### File Naming Convention
- **Format**: `YYYY-MM-DD-post-title.md`
- **Examples**: 
  - `2024-01-15-my-new-post.md`
  - `2024-03-22-cn-chinese-post.md`
- Use hyphens instead of spaces
- Keep it URL-friendly (lowercase, no special characters)

### Content Guidelines

#### Supported Markdown Features
- **Text formatting**: Bold, italic, inline code
- **Code blocks**: Syntax highlighting with Prism.js
- **Images**: Place in `public/images/` and reference as `/images/filename.jpg`
- **Links**: Both internal and external links
- **Lists**: Ordered and unordered
- **Tables**: GitHub Flavored Markdown tables
- **Blockquotes**: Standard markdown blockquotes
- **Chinese content**: Full Unicode support

#### Best Practices
- **Categories**: Use 2-3 broad topics maximum
- **Tags**: Use 3-5 specific keywords
- **Images**: Use descriptive alt text, supported formats: JPG, PNG, SVG, WebP
- **Structure**: Use headings (##, ###) to organize content
- **Links**: Use relative paths for internal links

### Content Organization

#### Categories vs Tags
- **Categories**: Broad classification
  - Examples: `["Technology"]`, `["中文", "记录"]`, `["English", "Interview"]`
- **Tags**: Specific keywords for discoverability
  - Examples: `["nextjs", "migration", "tutorial"]`, `["算法", "面试"]`

#### Bilingual Content
- **English posts**: Use categories like `["English", "Technology"]`
- **Chinese posts**: Use categories like `["中文", "技术"]`
- **Mixed content**: Fully supported with proper Unicode handling

### Workflow Example
```bash
# 1. Create new post
npm run new-post "Learning Next.js 14"

# 2. Edit the generated file
# posts/2024-01-15-learning-nextjs-14.md

# 3. Update categories and tags as needed
# 4. Write your content

# 5. Deploy
git add .
git commit -m "Add new post: Learning Next.js 14"
git push
# 🚀 GitHub Actions automatically deploys!
```

## 🎨 Customization

### Styling

The blog uses Tailwind CSS for styling. Key customization points:

- **Colors**: Modify the color scheme in `tailwind.config.js`
- **Typography**: Customize prose styles in `app/globals.css`
- **Layout**: Adjust components in the `components/` directory

### Site Configuration

Update site metadata in:
- `app/layout.tsx` - Global metadata
- `next.config.js` - Next.js configuration
- `package.json` - Project information

## 🚀 Deployment

### GitHub Pages (Recommended)

The site is configured for automatic deployment to GitHub Pages:

1. **Push to main branch**
   ```bash
   git push origin main
   ```

2. **GitHub Actions will automatically**:
   - Build the site
   - Deploy to GitHub Pages
   - Make it available at `username.github.io`

### Manual Deployment

```bash
npm run build
# Upload the `out/` directory to your hosting provider
```

## 📊 Performance

- **Lighthouse Score**: 100/100 (Performance, Accessibility, Best Practices, SEO)
- **First Load JS**: ~89kB (excellent for a blog)
- **Static Pages**: 127 pre-rendered pages
- **Build Time**: ~10 seconds for full site

## 🔄 Migration from Hexo

This blog was migrated from Hexo to Next.js. The migration process:

1. **Content Migration**: Automated script converts Hexo HTML to Markdown
2. **Asset Migration**: Images and static files moved to `public/`
3. **URL Preservation**: Maintains original URL structure for SEO
4. **Metadata Extraction**: Preserves categories, tags, and dates

## 🤝 Contributing

While this is a personal blog, suggestions and bug reports are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Previous Platform**: Originally built with [Hexo](https://hexo.io/)
- **Theme Inspiration**: Based on the Minos theme concept
- **Icons**: Heroicons for UI elements
- **Fonts**: Inter font family from Google Fonts

## 📞 Contact

- **Blog**: [kidchen.github.io](https://kidchen.github.io)
- **GitHub**: [@kidchen](https://github.com/kidchen)
- **Email**: Available in the About page

---

Built with ❤️ using Next.js and deployed on GitHub Pages.