#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get command line arguments
const args = process.argv.slice(2);
const title = args[0];

if (!title) {
  console.log('Usage: node scripts/new-post.js "Your Post Title"');
  console.log('Example: node scripts/new-post.js "My New Blog Post"');
  process.exit(1);
}

// Generate filename and slug
const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
const slug = title.toLowerCase()
  .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
  .replace(/\s+/g, '-') // Replace spaces with hyphens
  .replace(/-+/g, '-') // Replace multiple hyphens with single
  .trim('-'); // Remove leading/trailing hyphens

const filename = `${today}-${slug}.md`;
const filepath = path.join('posts', filename);

// Create post template
const template = `---
title: "${title}"
date: "${today}"
categories: ["Uncategorized"]
tags: []
slug: "${today.replace(/-/g, '/')}/${slug}"
layout: "post"
---

# ${title}

Write your post content here...

## Introduction

Start with an engaging introduction.

## Main Content

Add your main content sections here.

## Conclusion

Wrap up your thoughts.
`;

// Write the file
try {
  fs.writeFileSync(filepath, template);
  console.log(`✅ Created new post: ${filepath}`);
  console.log(`📝 Edit the file and update categories/tags as needed`);
  console.log(`🚀 When ready, commit and push to deploy!`);
} catch (error) {
  console.error('❌ Error creating post:', error.message);
}