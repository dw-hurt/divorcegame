# ========================================
# Divorce Quest - Quick Deploy Script
# For: https://github.com/dw-hurt/divorcegame
# ========================================

Write-Host ""
Write-Host "╔════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   DIVORCE QUEST - QUICK DEPLOY         ║" -ForegroundColor Cyan
Write-Host "║   Repository: dw-hurt/divorcegame      ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Pre-configured settings
$repoUrl = "https://github.com/dw-hurt/divorcegame.git"
$repoOwner = "dw-hurt"
$repoName = "divorcegame"

# Check Git installation
Write-Host "[1/5] Checking Git installation..." -ForegroundColor Yellow
$gitInstalled = Get-Command git -ErrorAction SilentlyContinue

if (-not $gitInstalled) {
    Write-Host "✗ Git is not installed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Git from: https://git-scm.com/download/win" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "✓ Git is installed" -ForegroundColor Green
Write-Host ""

# Check Git configuration
Write-Host "[2/5] Checking Git configuration..." -ForegroundColor Yellow
$gitUserName = git config user.name
$gitUserEmail = git config user.email

if (-not $gitUserName) {
    $userName = Read-Host "Enter your Git username (e.g., dw-hurt)"
    git config user.name "$userName"
    Write-Host "✓ Username set to: $userName" -ForegroundColor Green
} else {
    Write-Host "✓ Username: $gitUserName" -ForegroundColor Green
}

if (-not $gitUserEmail) {
    $userEmail = Read-Host "Enter your Git email"
    git config user.email "$userEmail"
    Write-Host "✓ Email set to: $userEmail" -ForegroundColor Green
} else {
    Write-Host "✓ Email: $gitUserEmail" -ForegroundColor Green
}
Write-Host ""

# Initialize repository
Write-Host "[3/5] Initializing Git repository..." -ForegroundColor Yellow

if (Test-Path ".git") {
    Write-Host "✓ Git repository already exists" -ForegroundColor Green
} else {
    git init
    Write-Host "✓ Repository initialized" -ForegroundColor Green
}

# Set up remote
$existingRemote = git remote get-url origin 2>$null
if ($existingRemote -and $existingRemote -ne $repoUrl) {
    Write-Host "Updating remote URL..." -ForegroundColor Yellow
    git remote set-url origin $repoUrl
    Write-Host "✓ Remote updated to: $repoUrl" -ForegroundColor Green
} elseif (-not $existingRemote) {
    git remote add origin $repoUrl
    Write-Host "✓ Remote added: $repoUrl" -ForegroundColor Green
} else {
    Write-Host "✓ Remote already configured" -ForegroundColor Green
}
Write-Host ""

# Show files
Write-Host "[4/5] Files to be committed:" -ForegroundColor Yellow
$fileCount = 0
Get-ChildItem -Recurse -File | Where-Object { 
    $_.FullName -notmatch "\.git" -and 
    $_.Name -notmatch "^DEPLOY.*\.ps1$"
} | ForEach-Object {
    $fileCount++
}
Write-Host "Total files: $fileCount" -ForegroundColor Cyan
Write-Host ""

# Confirm
Write-Host "Ready to deploy to: https://github.com/$repoOwner/$repoName" -ForegroundColor Cyan
$confirm = Read-Host "Continue with deployment? (y/n)"

if ($confirm -ne "y") {
    Write-Host "Deployment cancelled." -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 0
}
Write-Host ""

# Add and commit
Write-Host "[5/5] Committing and pushing..." -ForegroundColor Yellow
git add .

$commitMessage = "Initial commit - Divorce Quest v1.0.0

- Complete turn-based RPG game
- Bayesian prediction engine  
- 27 default questions (factual + emotional)
- State-specific data for all 50 US states
- Content management system
- Multiple scenario support
- Idle timeout protection (5 minutes)
- Complete documentation
- RESTful API integration with localStorage fallback
- Retro 1980s Zelda-inspired UI"

git commit -m "$commitMessage"

# Ensure main branch
$currentBranch = git branch --show-current
if ($currentBranch -ne "main") {
    git branch -M main
}

Write-Host ""
Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
Write-Host "You may need to authenticate..." -ForegroundColor Yellow
Write-Host ""
Write-Host "IMPORTANT: Use Personal Access Token as password!" -ForegroundColor Red
Write-Host "Generate at: https://github.com/settings/tokens" -ForegroundColor Yellow
Write-Host ""

try {
    git push -u origin main
    
    Write-Host ""
    Write-Host "╔════════════════════════════════════════╗" -ForegroundColor Green
    Write-Host "║          ✓ DEPLOYMENT SUCCESS!         ║" -ForegroundColor Green
    Write-Host "╚════════════════════════════════════════╝" -ForegroundColor Green
    Write-Host ""
    Write-Host "Your code is now on GitHub!" -ForegroundColor Green
    Write-Host ""
    Write-Host "┌─────────────────────────────────────────┐" -ForegroundColor Cyan
    Write-Host "│ NEXT STEPS:                             │" -ForegroundColor Cyan
    Write-Host "└─────────────────────────────────────────┘" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "1. View your repository:" -ForegroundColor White
    Write-Host "   https://github.com/$repoOwner/$repoName" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "2. Enable GitHub Pages:" -ForegroundColor White
    Write-Host "   • Go to Settings → Pages" -ForegroundColor White
    Write-Host "   • Source: main branch" -ForegroundColor White
    Write-Host "   • Folder: / (root)" -ForegroundColor White
    Write-Host "   • Click Save" -ForegroundColor White
    Write-Host ""
    Write-Host "3. Your game will be live at:" -ForegroundColor White
    Write-Host "   https://$repoOwner.github.io/$repoName/" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "   (Wait 1-2 minutes after enabling Pages)" -ForegroundColor Gray
    Write-Host ""
    
} catch {
    Write-Host ""
    Write-Host "╔════════════════════════════════════════╗" -ForegroundColor Red
    Write-Host "║         ✗ DEPLOYMENT FAILED            ║" -ForegroundColor Red
    Write-Host "╚════════════════════════════════════════╝" -ForegroundColor Red
    Write-Host ""
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Common solutions:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. Authentication Issue:" -ForegroundColor White
    Write-Host "   • Generate Personal Access Token" -ForegroundColor Gray
    Write-Host "   • Go to: https://github.com/settings/tokens" -ForegroundColor Gray
    Write-Host "   • Click: Generate new token → Classic" -ForegroundColor Gray
    Write-Host "   • Select scope: repo (all)" -ForegroundColor Gray
    Write-Host "   • Use token as password when prompted" -ForegroundColor Gray
    Write-Host ""
    Write-Host "2. Repository Access:" -ForegroundColor White
    Write-Host "   • Verify repository exists" -ForegroundColor Gray
    Write-Host "   • Check you have write permission" -ForegroundColor Gray
    Write-Host ""
    Write-Host "3. Try again:" -ForegroundColor White
    Write-Host "   • Run this script again: .\DEPLOY_NOW.ps1" -ForegroundColor Gray
    Write-Host ""
}

Read-Host "Press Enter to exit"
