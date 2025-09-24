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
├── scripts/               # Build and migration scripts
│   └── migrate-content.js # Hexo to Next.js migration script
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
- `npm run migrate` - Migrate content from Hexo (one-time use)
- `npm run clean` - Clean up old Hexo files
- `npm run deploy` - Build and prepare for deployment

## 📖 Content Management

### Adding New Posts

1. Create a new markdown file in the `posts/` directory:
   ```markdown
   ---
   title: "Your Post Title"
   date: "2024-01-01"
   categories: ["Technology", "Programming"]
   tags: ["nextjs", "react", "typescript"]
   slug: "your-post-slug"
   layout: "post"
   ---

   Your post content here...
   ```

2. The post will automatically appear on the site after rebuilding.

### Post Frontmatter

- `title`: Post title (required)
- `date`: Publication date in YYYY-MM-DD format (required)
- `categories`: Array of categories (optional)
- `tags`: Array of tags (optional)
- `slug`: Custom URL slug (optional, auto-generated from filename)
- `layout`: Always "post" (required)

### Supported Content

- **Markdown**: Full CommonMark support
- **Code blocks**: Syntax highlighting with Prism.js
- **Images**: Place in `public/images/` and reference as `/images/filename.jpg`
- **Links**: Both internal and external links
- **Chinese content**: Full Unicode support

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