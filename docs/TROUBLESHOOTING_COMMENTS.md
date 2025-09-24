# Troubleshooting Giscus Comments

## Common Issues & Solutions

### 1. "Unable to create discussion" Error

**Cause**: Domain verification issue or incorrect configuration.

**Solutions**:

#### A. Development Mode (localhost)
- **Expected**: Comments don't work in development mode
- **Reason**: Giscus validates the domain, and `localhost:3000` isn't your GitHub Pages domain
- **Solution**: Test comments on the deployed site at `https://kidchen.github.io`

#### B. Incorrect Repository Configuration
Check these values in `components/Comments.tsx`:
```typescript
repo="kidchen/kidchen.github.io"                    // ✅ Correct
repoId="MDEwOlJlcG9zaXRvcnkyNzE2NDQzNQ=="           // ✅ Your repo ID
category="Announcements"                             // ✅ Must match GitHub
categoryId="DIC_kwDOAZ5_E84Cv1RE"                   // ✅ Your category ID
```

#### C. GitHub Discussions Not Enabled
1. Go to your GitHub repo: `https://github.com/kidchen/kidchen.github.io`
2. Click **Settings** tab
3. Scroll to **Features** section
4. Ensure **Discussions** is checked ✅

#### D. Repository Permissions
- Repository must be **public** for Giscus to work
- You must be the repository owner or have admin access

### 2. Comments Not Loading

**Possible Causes**:
- Network issues
- Giscus service temporarily down
- Incorrect configuration

**Solutions**:
1. Check browser console for errors
2. Verify internet connection
3. Try refreshing the page
4. Check if https://giscus.app is accessible

### 3. Wrong Discussion Category

**Symptoms**: Comments appear in wrong category or fail to load

**Solution**:
1. Go to your GitHub repo → Discussions
2. Check available categories
3. Update `category` and `categoryId` in Comments.tsx if needed

### 4. Theme Issues

**Symptoms**: Comments don't match site theme

**Solution**: The current config uses `theme="preferred_color_scheme"` which automatically follows system preference. To force a specific theme:

```typescript
theme="light"        // Always light
theme="dark"         // Always dark  
theme="github_light" // GitHub light theme
theme="github_dark"  // GitHub dark theme
```

## Testing Checklist

### ✅ Pre-deployment Checklist
- [ ] GitHub Discussions enabled
- [ ] Repository is public
- [ ] Correct repo ID and category ID
- [ ] Category exists in GitHub Discussions

### ✅ Post-deployment Testing
1. Deploy to GitHub Pages
2. Visit a blog post on live site
3. Scroll to comments section
4. Sign in with GitHub
5. Try posting a test comment
6. Verify comment appears in GitHub Discussions

## Getting Help

If comments still don't work after trying these solutions:

1. **Check GitHub Discussions**: Visit your repo's Discussions tab to see if comments are being created there
2. **Browser Console**: Check for JavaScript errors in browser developer tools
3. **Giscus Status**: Visit https://giscus.app to ensure the service is working
4. **Repository Settings**: Double-check all repository settings and permissions

## Alternative: Disable Comments

If you prefer to disable comments temporarily:

```typescript
// In app/posts/[...slug]/page.tsx, comment out this line:
// <Comments slug={slug} />
```