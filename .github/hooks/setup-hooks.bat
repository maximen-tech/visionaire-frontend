@echo off
REM Setup Git hooks for visionaire-frontend (Windows)

echo Setting up Git hooks...

REM Copy hooks to .git/hooks/
copy /Y pre-commit ..\..\..\.git\hooks\pre-commit
copy /Y post-commit ..\..\..\.git\hooks\post-commit

echo.
echo Git hooks installed successfully!
echo - pre-commit: ESLint checks
echo - post-commit: Auto-update STATE.md
echo.
echo Hooks are now active for this repository.
pause
