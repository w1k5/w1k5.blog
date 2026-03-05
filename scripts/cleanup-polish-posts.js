#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  polishPostsDir: path.join(__dirname, '..', '_posts_pl'),
  postsDir: path.join(__dirname, '..', '_posts')
};

class PolishPostCleaner {
  constructor() {
    this.processedCount = 0;
    this.errorCount = 0;
  }

  async cleanPost(filePath) {
    try {
      console.log(`🧹 Cleaning: ${path.basename(filePath)}`);
      
      // Read the Polish post
      const content = fs.readFileSync(filePath, 'utf8');
      const { frontMatter, body } = this.parsePost(content);
      
      // Clean up front matter
      const cleanedFrontMatter = this.cleanFrontMatter(frontMatter, filePath);
      
      // Move translation disclaimer to bottom
      const cleanedBody = this.moveDisclaimerToBottom(body);
      
      // Create cleaned post
      const cleanedPost = this.createCleanedPost(cleanedFrontMatter, cleanedBody);
      
      // Write cleaned post
      fs.writeFileSync(filePath, cleanedPost, 'utf8');
      
      console.log(`   ✅ Cleaned: ${path.basename(filePath)}`);
      this.processedCount++;
      
    } catch (error) {
      console.error(`   ❌ Error cleaning ${path.basename(filePath)}:`, error.message);
      this.errorCount++;
    }
  }

  parsePost(content) {
    const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = content.match(frontMatterRegex);
    
    if (!match) {
      throw new Error('Invalid post format - no front matter found');
    }
    
    const frontMatterText = match[1];
    const body = match[2];
    
    // Parse YAML front matter
    const frontMatter = {};
    frontMatterText.split('\n').forEach(line => {
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).trim();
        let value = line.substring(colonIndex + 1).trim();
        
        // Handle quoted values
        if ((value.startsWith('"') && value.endsWith('"')) || 
            (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        
        // Handle array values (tags)
        if (key === 'tags' && value.startsWith('[')) {
          try {
            value = JSON.parse(value);
          } catch (e) {
            // If JSON parsing fails, treat as string
          }
        }
        
        frontMatter[key] = value;
      }
    });
    
    return { frontMatter, body };
  }

  cleanFrontMatter(frontMatter, filePath) {
    const cleaned = { ...frontMatter };
    
    // Remove quotes from all string values
    Object.keys(cleaned).forEach(key => {
      if (typeof cleaned[key] === 'string') {
        cleaned[key] = cleaned[key].replace(/^["']|["']$/g, '');
      }
    });
    
    // Fix tags - convert string to array if needed
    if (cleaned.tags && typeof cleaned.tags === 'string') {
      try {
        cleaned.tags = JSON.parse(cleaned.tags);
      } catch (e) {
        // If it's not JSON, split by comma and clean up
        cleaned.tags = cleaned.tags.split(',').map(tag => tag.trim());
      }
    }
    
    // Fix original_post URL - create proper English post URL from filename
    const filename = path.basename(filePath, '-pl.markdown');
    cleaned.original_post = this.getEnglishPostUrl(filename);
    
    // Ensure lang is set
    cleaned.lang = 'pl';
    
    return cleaned;
  }

  createSlugFromFilename(filename) {
    // Convert filename like "2025-09-13-systems-of-faith" to "systems-of-faith"
    const parts = filename.split('-');
    if (parts.length >= 4) {
      // Remove date parts (first 3 parts: YYYY-MM-DD)
      return parts.slice(3).join('-');
    }
    return filename;
  }

  getEnglishPostUrl(filename) {
    // Convert filename like "2025-09-13-systems-of-faith" to "/self-care/2025/09/13/systems-of-faith/"
    const parts = filename.split('-');
    if (parts.length >= 4) {
      const year = parts[0];
      const month = parts[1];
      const day = parts[2];
      const slug = parts.slice(3).join('-');
      return `/self-care/${year}/${month}/${day}/${slug}/`;
    }
    return `/${filename}/`;
  }

  moveDisclaimerToBottom(body) {
    // Remove ALL disclaimers and associated --- lines from anywhere in the content
    let cleanedBody = body;
    
    // Remove disclaimer with blockquote format
    const disclaimerRegex1 = /> \*Ten post został przetłumaczony z języka angielskiego\. \[Przeczytaj oryginał\]\([^)]+\)\*\n\n?/g;
    cleanedBody = cleanedBody.replace(disclaimerRegex1, '');
    
    // Remove disclaimer without blockquote format
    const disclaimerRegex2 = /\*Ten post został przetłumaczony z języka angielskiego\. \[Przeczytaj oryginał\]\([^)]+\)\*/g;
    cleanedBody = cleanedBody.replace(disclaimerRegex2, '');
    
    // Remove standalone disclaimer lines
    const disclaimerRegex3 = /^.*Ten post został przetłumaczony z języka angielskiego.*$/gm;
    cleanedBody = cleanedBody.replace(disclaimerRegex3, '');
    
    // Remove any remaining "Przeczytaj oryginał" lines
    const originalLinkRegex = /^.*Przeczytaj oryginał.*$/gm;
    cleanedBody = cleanedBody.replace(originalLinkRegex, '');
    
    // Remove standalone --- lines that might be left over
    const separatorRegex = /^\s*---\s*$/gm;
    cleanedBody = cleanedBody.replace(separatorRegex, '');
    
    // Clean up multiple consecutive newlines
    cleanedBody = cleanedBody.replace(/\n{3,}/g, '\n\n');
    
    // Clean up leading/trailing whitespace
    cleanedBody = cleanedBody.trim();
    
    return cleanedBody;
  }

  createCleanedPost(cleanedFrontMatter, cleanedBody) {
    // Create clean YAML front matter
    let yaml = '---\n';
    
    // Order the front matter nicely
    const orderedKeys = ['layout', 'title', 'subtitle', 'date', 'categories', 'tags', 'comments', 'lang', 'original_post'];
    
    orderedKeys.forEach(key => {
      if (cleanedFrontMatter[key] !== undefined) {
        if (Array.isArray(cleanedFrontMatter[key])) {
          yaml += `${key}: ${JSON.stringify(cleanedFrontMatter[key])}\n`;
        } else {
          // Quote values that contain special YAML characters
          const value = cleanedFrontMatter[key];
          if (this.needsQuoting(value)) {
            yaml += `${key}: "${value}"\n`;
          } else {
            yaml += `${key}: ${value}\n`;
          }
        }
      }
    });
    
    // Add any remaining keys
    Object.keys(cleanedFrontMatter).forEach(key => {
      if (!orderedKeys.includes(key)) {
        if (Array.isArray(cleanedFrontMatter[key])) {
          yaml += `${key}: ${JSON.stringify(cleanedFrontMatter[key])}\n`;
        } else {
          const value = cleanedFrontMatter[key];
          if (this.needsQuoting(value)) {
            yaml += `${key}: "${value}"\n`;
          } else {
            yaml += `${key}: ${value}\n`;
          }
        }
      }
    });
    
    yaml += '---\n\n';
    
    return yaml + cleanedBody;
  }

  needsQuoting(value) {
    if (typeof value !== 'string') return false;
    
    // Check for special YAML characters that need quoting
    return /[:@`"'\\]/.test(value) || 
           value.startsWith(' ') || 
           value.endsWith(' ') ||
           value.includes('\n') ||
           value.includes('#') ||
           value.includes('|') ||
           value.includes('>') ||
           value.includes('&') ||
           value.includes('*') ||
           value.includes('!') ||
           value.includes('%') ||
           value.includes('?');
  }

  async cleanAllPosts() {
    console.log('🧹 Starting Polish post cleanup...\n');
    
    // Get all Polish markdown files
    const files = fs.readdirSync(CONFIG.polishPostsDir)
      .filter(file => file.endsWith('.markdown') || file.endsWith('.md'))
      .map(file => path.join(CONFIG.polishPostsDir, file))
      .sort();

    console.log(`📚 Found ${files.length} Polish posts to clean\n`);

    // Process each post
    for (const file of files) {
      await this.cleanPost(file);
    }

    // Summary
    console.log('\n🎉 Cleanup process completed!');
    console.log(`   ✅ Successfully cleaned: ${this.processedCount} posts`);
    console.log(`   ❌ Errors: ${this.errorCount} posts`);
  }
}

// Run the cleaner
if (require.main === module) {
  const cleaner = new PolishPostCleaner();
  cleaner.cleanAllPosts().catch(console.error);
}

module.exports = PolishPostCleaner;
