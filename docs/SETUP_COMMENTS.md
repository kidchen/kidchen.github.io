# Setting Up Comments with Giscus

## Prerequisites

1. **Enable GitHub Discussions** in your repository:
   - Go to your GitHub repo: `https://github.com/kidchen/kidchen.github.io`
   - Click **Settings** tab
   - Scroll down to **Features** section
   - Check **Discussions**

## Configuration Steps

1. **Visit Giscus Configuration**:
   - Go to https://giscus.app/
   - Enter your repository: `kidchen/kidchen.github.io`

2. **Get Configuration Values**:
   The site will generate configuration values. Update `components/Comments.tsx` with:
   
   ```typescript
   <Giscus
     repo="kidchen/kidchen.github.io"
     repoId="YOUR_REPO_ID_HERE"        // Copy from giscus.app
     category="General"
     categoryId="YOUR_CATEGORY_ID_HERE" // Copy from giscus.app
     // ... other props
   />
   ```

3. **Test Comments**:
   - Deploy your site
   - Visit any blog post
   - Try leaving a comment
   - Comments will appear as GitHub Discussions

## Features

- ✅ **GitHub Integration**: Comments stored as GitHub Discussions
- ✅ **Markdown Support**: Full markdown in comments
- ✅ **Reactions**: GitHub-style emoji reactions
- ✅ **Moderation**: Manage comments through GitHub
- ✅ **No Tracking**: Privacy-friendly alternative to Disqus
- ✅ **Theme Support**: Matches your site's appearance

## Alternative: Disable Comments

If you prefer no comments, remove the `<Comments />` component from:
- `app/posts/[...slug]/page.tsx`

## Troubleshooting

- **Comments not loading**: Check repo ID and category ID
- **Permission errors**: Ensure Discussions are enabled
- **Theme issues**: Adjust theme prop in Comments.tsx