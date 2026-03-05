# Polish Translation Scripts for wiks.wiki

This directory contains scripts to automatically translate your Jekyll blog posts from English to Polish using OpenAI's GPT-4.

## Features

- 🤖 **AI-Powered Translation**: Uses GPT-4 to maintain your voice and meaning
- 👩 **Feminine Voice**: Automatically uses Polish feminine forms (ja, moja, moje, etc.)
- 📝 **Preserves Formatting**: Maintains markdown, HTML links, and structure
- 🔗 **Cross-Language Links**: Adds links between English and Polish versions
- ⚡ **Batch Processing**: Translate all posts at once or individual posts
- 🎯 **Smart Translation**: Preserves technical terms and philosophical nuances

## Setup

1. **Install Node.js dependencies:**
   ```bash
   cd scripts
   npm install
   ```

2. **Set up OpenAI API key:**
   ```bash
   export OPENAI_API_KEY="your-openai-api-key-here"
   ```
   
   Or add it to your shell profile (`.zshrc`, `.bashrc`, etc.):
   ```bash
   echo 'export OPENAI_API_KEY="your-openai-api-key-here"' >> ~/.zshrc
   source ~/.zshrc
   ```

3. **Create Polish posts directory:**
   ```bash
   mkdir -p ../_posts_pl
   ```

## Usage

### Translate All Posts
```bash
npm run translate
```

### Translate a Single Post
```bash
npm run translate-single 2025-09-13-systems-of-faith.markdown
```

### Manual Translation
```bash
node translate-posts.js
node translate-single.js <post-filename>
```

## How It Works

1. **Reads** all markdown files from `_posts/` directory
2. **Parses** front matter (title, subtitle, tags, etc.)
3. **Translates** content using GPT-4 with specialized prompts
4. **Creates** Polish versions in `_posts_pl/` directory
5. **Adds** cross-language links and language indicators

## Translation Quality

The script uses specialized prompts to:
- Maintain your intimate, personal writing style
- Preserve philosophical depth and intellectual sophistication
- Use appropriate Polish feminine forms throughout
- Keep technical terms in context (English when appropriate)
- Maintain the rhythm and pacing of your original writing

## File Structure

```
scripts/
├── translate-posts.js      # Main translation script
├── translate-single.js     # Single post translation
├── package.json           # Node.js dependencies
└── README.md              # This file

_posts/                    # Original English posts
_posts_pl/                 # Generated Polish posts
```

## Cost Estimation

- **GPT-4 API**: ~$0.03-0.06 per post (depending on length)
- **Your 50+ posts**: ~$1.50-3.00 total for complete translation

## Next Steps

After running the translation:

1. **Review** the generated Polish posts
2. **Add language switcher** to your Jekyll layout
3. **Update navigation** to include Polish posts
4. **Test** the cross-language linking

## Troubleshooting

- **API Key Error**: Make sure `OPENAI_API_KEY` is set correctly
- **Permission Error**: Ensure the script has write access to `_posts_pl/`
- **Translation Quality**: The script preserves your voice, but you may want to review technical terms







