#!/bin/bash

echo "🧹 Cleaning up old Hexo files..."

# Remove old Hexo generated HTML files and directories
echo "Removing old Hexo generated content..."
rm -rf 2006/ 2007/ 2008/ 2009/ 2010/ 2011/ 2012/ 2013/ 2014/ 2015/ 2016/ 2017/
rm -rf about/
rm -rf archives/
rm -rf categories/
rm -rf page/
rm -rf tags/

# Remove old Hexo static files
echo "Removing old static files..."
rm -f index.html
rm -f 404.html
rm -f content.json

# Remove old Hexo CSS/JS (we're using Tailwind now)
echo "Removing old CSS/JS..."
rm -rf css/
rm -rf js/

# Keep images but move them to public/images if not already there
echo "Moving images to public directory..."
if [ -d "images/" ]; then
    cp -r images/* public/images/ 2>/dev/null || true
    rm -rf images/
fi

# Remove build artifacts
echo "Removing build artifacts..."
rm -rf out/
rm -rf .next/

echo "✅ Cleanup completed!"
echo ""
echo "📁 Remaining structure:"
echo "├── app/           (Next.js app directory)"
echo "├── components/    (React components)"
echo "├── lib/           (Utility functions)"
echo "├── posts/         (Migrated markdown posts)"
echo "├── public/        (Static assets)"
echo "├── scripts/       (Migration scripts)"
echo "├── types/         (TypeScript types)"
echo "└── config files   (Next.js, Tailwind, etc.)"