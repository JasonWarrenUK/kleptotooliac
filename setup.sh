#!/usr/bin/env bash
set -euo pipefail

echo "🧰 Project setup starting..."

# 1) Install deps once (respect lockfile if present)
if [ -f package-lock.json ]; then
  echo "📦 Using lockfile -> npm ci"
  npm ci
else
  echo "📦 No lockfile -> npm install"
  npm install
fi

# 2) Create .env safely
if [ -f .env ]; then
  echo "🔐 .env already exists; leaving it alone."
elif [ -f .env.example ]; then
  echo "🔐 Creating .env from .env.example"
  cp .env.example .env
else
  echo "❗ No .env or .env.example found. Create .env before running the app." >&2
fi

# 3) Ensure runtime directories exist
mkdir -p logs temp

# 4) Build the project (expects tsconfig to output to dist/)
echo "🏗️  Building..."
npm run build

# 5) Friendly outro
echo ""
echo "✅ Setup complete."
echo "   - Check your .env values."
echo "   - Start developing: npm run dev"
echo "   - Inspect your MCP server: npm run inspect"
