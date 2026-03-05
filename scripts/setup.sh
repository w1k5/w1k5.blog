#!/bin/bash

echo "🚀 Setting up Polish translation for wiks.wiki..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first:"
    echo "   https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Create Polish posts directory
echo "📁 Creating Polish posts directory..."
mkdir -p ../_posts_pl

if [ $? -eq 0 ]; then
    echo "✅ Polish posts directory created"
else
    echo "❌ Failed to create Polish posts directory"
    exit 1
fi

# Check for OpenAI API key
if [ -z "$OPENAI_API_KEY" ]; then
    echo ""
    echo "⚠️  OpenAI API key not found in environment variables"
    echo "   Please set your API key:"
    echo "   export OPENAI_API_KEY=\"your-openai-api-key-here\""
    echo ""
    echo "   Or add it to your shell profile:"
    echo "   echo 'export OPENAI_API_KEY=\"your-key\"' >> ~/.zshrc"
    echo "   source ~/.zshrc"
    echo ""
else
    echo "✅ OpenAI API key found"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Set your OpenAI API key (if not already set)"
echo "2. Run: npm run translate"
echo "3. Review the generated Polish posts in _posts_pl/"
echo ""
echo "For single post translation:"
echo "   npm run translate-single <post-filename>"







