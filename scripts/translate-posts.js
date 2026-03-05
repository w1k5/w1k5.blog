#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { OpenAI } = require('openai');

// Configuration
const CONFIG = {
  // Set your OpenAI API key as an environment variable: OPENAI_API_KEY
  openai: new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  }),
  
  // Directories
  postsDir: path.join(__dirname, '..', '_posts'),
  polishPostsDir: path.join(__dirname, '..', '_posts_pl'),
  
  // Translation settings
  model: 'gpt-4o',
  temperature: 0.3, // Lower temperature for more consistent translations
  maxTokens: 4000
};

// Ensure Polish posts directory exists
if (!fs.existsSync(CONFIG.polishPostsDir)) {
  fs.mkdirSync(CONFIG.polishPostsDir, { recursive: true });
}

// Translation prompt that emphasizes feminine voice and preserving meaning
const TRANSLATION_PROMPT = `You are translating a personal blog post from English to Polish. 

IMPORTANT TRANSLATION GUIDELINES:
- The author is a female writer - use feminine forms throughout (ja, moja, moje, etc.)
- Preserve the intimate, personal tone and emotional energy of the original
- Maintain the philosophical depth and intellectual sophistication
- Keep the same paragraph structure and flow
- Preserve any HTML links and formatting
- Translate titles and subtitles to sound natural in Polish
- Keep technical terms in English if they're commonly used that way in Polish tech/finance contexts
- Maintain the author's distinctive voice - thoughtful, introspective, sometimes raw
- Preserve the rhythm and pacing of the original sentences
- Keep the same level of formality/informality

The post is written in a personal, reflective style with philosophical undertones. The author writes about technology, finance, personal experiences, and social commentary with intellectual depth.

Translate the following blog post to Polish, maintaining all the emotional and intellectual nuances:`;

class PostTranslator {
  constructor() {
    this.processedCount = 0;
    this.errorCount = 0;
  }

  async translatePost(filePath) {
    try {
      console.log(`\n📖 Processing: ${path.basename(filePath)}`);
      
      // Read the original post
      const content = fs.readFileSync(filePath, 'utf8');
      const { frontMatter, body } = this.parsePost(content);
      
      // Check if Polish version already exists
      const polishFilePath = this.getPolishFilePath(filePath);
      if (fs.existsSync(polishFilePath)) {
        console.log(`   ⏭️  Polish version already exists, skipping...`);
        return;
      }

      // Translate the content
      console.log(`   🔄 Translating content...`);
      const translatedContent = await this.translateContent(body);
      
      // Translate front matter
      const translatedFrontMatter = await this.translateFrontMatter(frontMatter, filePath);
      
      // Create Polish post
      const polishPost = this.createPolishPost(translatedFrontMatter, translatedContent, frontMatter);
      
      // Write Polish post
      fs.writeFileSync(polishFilePath, polishPost, 'utf8');
      
      console.log(`   ✅ Created: ${path.basename(polishFilePath)}`);
      this.processedCount++;
      
    } catch (error) {
      console.error(`   ❌ Error processing ${path.basename(filePath)}:`, error.message);
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

  async translateContent(body) {
    const response = await CONFIG.openai.chat.completions.create({
      model: CONFIG.model,
      messages: [
        {
          role: 'system',
          content: TRANSLATION_PROMPT
        },
        {
          role: 'user',
          content: body
        }
      ],
      temperature: CONFIG.temperature,
      max_tokens: CONFIG.maxTokens
    });

    return response.choices[0].message.content.trim();
  }

  async translateFrontMatter(frontMatter, filePath) {
    const translated = { ...frontMatter };
    
    // Translate title
    if (frontMatter.title) {
      const titleResponse = await CONFIG.openai.chat.completions.create({
        model: CONFIG.model,
        messages: [
          {
            role: 'system',
            content: 'Translate the following blog post title to Polish, maintaining the same tone and impact. The author is female, so use appropriate feminine forms if needed.'
          },
          {
            role: 'user',
            content: frontMatter.title
          }
        ],
        temperature: CONFIG.temperature,
        max_tokens: 200
      });
      translated.title = titleResponse.choices[0].message.content.trim().replace(/^["']|["']$/g, '');
    }

    // Translate subtitle
    if (frontMatter.subtitle) {
      const subtitleResponse = await CONFIG.openai.chat.completions.create({
        model: CONFIG.model,
        messages: [
          {
            role: 'system',
            content: 'Translate the following blog post subtitle to Polish, maintaining the same tone and impact. The author is female.'
          },
          {
            role: 'user',
            content: frontMatter.subtitle
          }
        ],
        temperature: CONFIG.temperature,
        max_tokens: 200
      });
      translated.subtitle = subtitleResponse.choices[0].message.content.trim().replace(/^["']|["']$/g, '');
    }

    // Add language and original post link (Jekyll pretty URL: /category/year/month/day/slug/)
    translated.lang = 'pl';
    const slug = this.getSlugFromFilePath(filePath);
    const category = Array.isArray(frontMatter.categories)
      ? frontMatter.categories[0]
      : (frontMatter.categories || 'personal').toString().trim();
    const dateStr = (frontMatter.date || '').toString().trim().slice(0, 10);
    const dateMatch = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    const [year, month, day] = dateMatch ? [dateMatch[1], dateMatch[2], dateMatch[3]] : ['', '', ''];
    translated.original_post = `/${category}/${year}/${month}/${day}/${slug}/`;

    return translated;
  }

  getSlugFromFilePath(filePath) {
    const nameWithoutExt = path.parse(path.basename(filePath)).name;
    const match = nameWithoutExt.match(/^\d{4}-\d{2}-\d{2}-(.+)$/);
    return match ? match[1] : nameWithoutExt;
  }

  getSlugFromTitle(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  createPolishPost(translatedFrontMatter, translatedContent, originalFrontMatter) {
    // Create YAML front matter
    let yaml = '---\n';
    
    Object.entries(translatedFrontMatter).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        yaml += `${key}: ${JSON.stringify(value)}\n`;
      } else {
        yaml += `${key}: "${value}"\n`;
      }
    });
    
    yaml += '---\n\n';
    
    // Add language note and link to original
    const languageNote = `> *Ten post został przetłumaczony z języka angielskiego. [Przeczytaj oryginał](${translatedFrontMatter.original_post})*\n\n`;
    
    return yaml + languageNote + translatedContent;
  }

  getPolishFilePath(originalFilePath) {
    const filename = path.basename(originalFilePath);
    const nameWithoutExt = path.parse(filename).name;
    const ext = path.parse(filename).ext;
    return path.join(CONFIG.polishPostsDir, `${nameWithoutExt}-pl${ext}`);
  }

  async translateAllPosts() {
    console.log('🚀 Starting Polish translation process...\n');
    
    // Check for API key
    if (!process.env.OPENAI_API_KEY) {
      console.error('❌ Error: OPENAI_API_KEY environment variable not set');
      console.log('   Please set your OpenAI API key: export OPENAI_API_KEY="your-key-here"');
      process.exit(1);
    }

    // Get all markdown files in posts directory
    const files = fs.readdirSync(CONFIG.postsDir)
      .filter(file => file.endsWith('.markdown') || file.endsWith('.md'))
      .map(file => path.join(CONFIG.postsDir, file))
      .sort(); // Process in chronological order

    console.log(`📚 Found ${files.length} posts to translate\n`);

    // Process each post
    for (const file of files) {
      await this.translatePost(file);
      
      // Add a small delay to respect API rate limits
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Summary
    console.log('\n🎉 Translation process completed!');
    console.log(`   ✅ Successfully processed: ${this.processedCount} posts`);
    console.log(`   ❌ Errors: ${this.errorCount} posts`);
    console.log(`   📁 Polish posts saved to: ${CONFIG.polishPostsDir}`);
  }
}

// Run the translator
if (require.main === module) {
  const translator = new PostTranslator();
  translator.translateAllPosts().catch(console.error);
}

module.exports = PostTranslator;







