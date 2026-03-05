#!/usr/bin/env node

const PostTranslator = require('./translate-posts');
const path = require('path');

// Get the post filename from command line arguments
const postFilename = process.argv[2];

if (!postFilename) {
  console.error('❌ Error: Please provide a post filename');
  console.log('   Usage: node translate-single.js <post-filename>');
  console.log('   Example: node translate-single.js 2025-09-13-systems-of-faith.markdown');
  process.exit(1);
}

const postPath = path.join(__dirname, '..', '_posts', postFilename);

// Check if file exists
const fs = require('fs');
if (!fs.existsSync(postPath)) {
  console.error(`❌ Error: Post file not found: ${postFilename}`);
  console.log('   Make sure the file exists in the _posts directory');
  process.exit(1);
}

// Translate the single post
const translator = new PostTranslator();
translator.translatePost(postPath)
  .then(() => {
    console.log('\n✅ Single post translation completed!');
  })
  .catch(console.error);







