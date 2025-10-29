#!/bin/bash
# Setup Git hooks for visionaire-frontend (Unix/Mac)

echo "Setting up Git hooks..."

# Copy hooks to .git/hooks/
cp pre-commit ../../.git/hooks/pre-commit
cp post-commit ../../.git/hooks/post-commit

# Make them executable
chmod +x ../../.git/hooks/pre-commit
chmod +x ../../.git/hooks/post-commit

echo ""
echo "Git hooks installed successfully!"
echo "- pre-commit: ESLint checks"
echo "- post-commit: Auto-update STATE.md"
echo ""
echo "Hooks are now active for this repository."
