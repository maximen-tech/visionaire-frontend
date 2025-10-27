@echo off
echo ========================================
echo GitHub Push Setup for visionaire-frontend
echo ========================================
echo.

echo Step 1: Authenticating with GitHub...
echo.
gh auth login

echo.
echo Step 2: Creating repository and pushing...
echo.
gh repo create visionaire-frontend --public --source=. --remote=origin --push

echo.
echo ========================================
echo Done! Repository created and code pushed!
echo ========================================
echo.
echo View your repository at:
echo https://github.com/maximen-tech/visionaire-frontend
echo.
echo View GitHub Actions:
echo https://github.com/maximen-tech/visionaire-frontend/actions
echo.
pause
