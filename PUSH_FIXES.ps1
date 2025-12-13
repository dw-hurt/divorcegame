# Push Fixes to GitHub - Black Screen Fix
# Run this script to deploy the fixes

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  DIVORCE QUEST - Push Fixes" -ForegroundColor Cyan
Write-Host "  Fixing Black Screen Issue" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Navigate to project directory
Set-Location "C:\Users\user\Documents\divorcegame"

Write-Host "📁 Current directory: $(Get-Location)" -ForegroundColor Yellow
Write-Host ""

# Check git status
Write-Host "🔍 Checking git status..." -ForegroundColor Yellow
git status --short
Write-Host ""

# Add all files
Write-Host "📦 Adding files..." -ForegroundColor Yellow
git add .
Write-Host ""

# Commit
Write-Host "💾 Committing changes..." -ForegroundColor Yellow
$commitMessage = "Fix black screen issue - Add CONFIG.SCREENS and update main.js to v1.1.0"
git commit -m $commitMessage
Write-Host ""

# Push
Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Yellow
git push
Write-Host ""

if ($LASTEXITCODE -eq 0) {
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  ✅ SUCCESS! Fixes pushed to GitHub" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "⏳ Wait 1-2 minutes for GitHub Pages to rebuild" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "🌐 Then test your game at:" -ForegroundColor Cyan
    Write-Host "   https://dw-hurt.github.io/divorcegame/" -ForegroundColor White
    Write-Host ""
    Write-Host "🔍 Run diagnostics at:" -ForegroundColor Cyan
    Write-Host "   https://dw-hurt.github.io/divorcegame/test-page.html" -ForegroundColor White
    Write-Host ""
    Write-Host "💡 Press F12 in browser to see console logs" -ForegroundColor Yellow
} else {
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "  ❌ ERROR: Push failed" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Check the error messages above" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
