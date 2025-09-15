#!/bin/bash
# One-command setup script

npm install
cp .env.example .env
mkdir -p logs temp

# Install additional dependencies for your APIs
npm install googleapis @notionhq/client octokit zod dotenv

# Build project  
npm run build

echo "✅ Setup complete! Edit .env file with your API credentials"
echo "🔧 Test with: npm run inspect"