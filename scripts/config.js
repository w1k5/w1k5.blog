// Configuration for Polish translation
module.exports = {
  // OpenAI settings
  openai: {
    model: 'gpt-4o',
    temperature: 0.3, // Lower = more consistent, Higher = more creative
    maxTokens: 4000
  },
  
  // Translation settings
  translation: {
    // Emphasize feminine voice in Polish
    useFeminineVoice: true,
    
    // Preserve technical terms in English when appropriate
    preserveTechnicalTerms: true,
    
    // Add language note at the top of translated posts
    addLanguageNote: true,
    
    // Add cross-language links
    addCrossLanguageLinks: true
  },
  
  // File paths
  paths: {
    postsDir: '../_posts',
    polishPostsDir: '../_posts_pl'
  },
  
  // Rate limiting (milliseconds between API calls)
  rateLimit: 1000,
  
  // Skip existing Polish posts
  skipExisting: true
};







