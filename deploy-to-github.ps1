# ========================================
# Divorce Quest - GitHub Deployment Script
# ========================================
# This PowerShell script will:
# 1. Initialize a Git repository
# 2. Add all files
# 3. Commit the code
# 4. Push to GitHub
# ========================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Divorce Quest - GitHub Deployment" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Git is installed
Write-Host "Checking if Git is installed..." -ForegroundColor Yellow
$gitInstalled = Get-Command git -ErrorAction SilentlyContinue

if (-not $gitInstalled) {
    Write-Host "ERROR: Git is not installed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Git from: https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host "After installing, restart PowerShell and run this script again." -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "✓ Git is installed" -ForegroundColor Green
Write-Host ""

# Get current directory
$currentDir = Get-Location
Write-Host "Current directory: $currentDir" -ForegroundColor Cyan
Write-Host ""

# Check if .git folder exists
if (Test-Path ".git") {
    Write-Host "Git repository already exists." -ForegroundColor Yellow
    $reinit = Read-Host "Do you want to reinitialize? (y/n)"
    if ($reinit -eq "y") {
        Write-Host "Removing existing .git folder..." -ForegroundColor Yellow
        Remove-Item -Recurse -Force .git
        Write-Host "✓ Removed existing repository" -ForegroundColor Green
    }
}

# Initialize Git repository
if (-not (Test-Path ".git")) {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
    Write-Host "✓ Git repository initialized" -ForegroundColor Green
    Write-Host ""
}

# Configure Git user (if not already configured)
Write-Host "Checking Git configuration..." -ForegroundColor Yellow
$gitUserName = git config user.name
$gitUserEmail = git config user.email

if (-not $gitUserName) {
    Write-Host ""
    $userName = Read-Host "Enter your Git username (e.g., dw-hurt)"
    git config user.name "$userName"
    Write-Host "✓ Git username set to: $userName" -ForegroundColor Green
}

if (-not $gitUserEmail) {
    Write-Host ""
    $userEmail = Read-Host "Enter your Git email (e.g., your@email.com)"
    git config user.email "$userEmail"
    Write-Host "✓ Git email set to: $userEmail" -ForegroundColor Green
}

Write-Host ""
Write-Host "Git configuration:" -ForegroundColor Cyan
Write-Host "  Username: $(git config user.name)" -ForegroundColor White
Write-Host "  Email: $(git config user.email)" -ForegroundColor White
Write-Host ""

# GitHub repository URL (pre-configured)
$repoUrl = "https://github.com/dw-hurt/divorcegame.git"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  GitHub Repository Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Repository URL (pre-configured):" -ForegroundColor Yellow
Write-Host "  $repoUrl" -ForegroundColor White
Write-Host ""

# Ask if user wants to use a different repository
$useDefault = Read-Host "Use this repository? (y/n, default: y)"

if ($useDefault -eq "n") {
    Write-Host ""
    $customUrl = Read-Host "Enter your GitHub repository URL"
    
    # Validate URL format
    if ($customUrl -notmatch "^https://github\.com/.+/.+\.git$") {
        if ($customUrl -notmatch "\.git$") {
            $customUrl = "$customUrl.git"
        }
        Write-Host "Repository URL formatted to: $customUrl" -ForegroundColor Yellow
    }
    $repoUrl = $customUrl
}

Write-Host ""
Write-Host "✓ Using repository: $repoUrl" -ForegroundColor Green
Write-Host ""

# Check for remote
$existingRemote = git remote get-url origin 2>$null
if ($existingRemote) {
    Write-Host "Removing existing remote..." -ForegroundColor Yellow
    git remote remove origin
}

# Add remote
Write-Host "Adding GitHub remote..." -ForegroundColor Yellow
git remote add origin $repoUrl
Write-Host "✓ Remote added" -ForegroundColor Green
Write-Host ""

# Show files to be committed
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Files to be committed:" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Get-ChildItem -Recurse -File | Where-Object { 
    $_.FullName -notmatch "\.git" -and 
    $_.FullName -notmatch "node_modules" -and
    $_.Name -ne "deploy-to-github.ps1"
} | ForEach-Object {
    Write-Host "  $($_.FullName.Replace($currentDir, '.'))" -ForegroundColor White
}

Write-Host ""
$confirm = Read-Host "Do you want to proceed with commit and push? (y/n)"

if ($confirm -ne "y") {
    Write-Host "Deployment cancelled." -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 0
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Committing Files" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Add all files
Write-Host "Adding files to Git..." -ForegroundColor Yellow
git add .
Write-Host "✓ Files added" -ForegroundColor Green
Write-Host ""

# Show status
Write-Host "Git status:" -ForegroundColor Cyan
git status --short
Write-Host ""

# Commit
Write-Host "Committing files..." -ForegroundColor Yellow
git commit -m "Initial commit - Divorce Quest v1.0.0

- Complete turn-based RPG game
- Bayesian prediction engine
- 27 default questions (factual + emotional)
- State-specific data for all 50 US states
- Content management system
- Multiple scenario support
- Idle timeout protection
- Complete documentation
- RESTful API integration with localStorage fallback
- Retro 1980s Zelda-inspired UI"

Write-Host "✓ Files committed" -ForegroundColor Green
Write-Host ""

# Create main branch (if needed)
$currentBranch = git branch --show-current
if ($currentBranch -ne "main") {
    Write-Host "Renaming branch to 'main'..." -ForegroundColor Yellow
    git branch -M main
    Write-Host "✓ Branch renamed to 'main'" -ForegroundColor Green
    Write-Host ""
}

# Push to GitHub
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Pushing to GitHub" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
Write-Host "You may be prompted to authenticate with GitHub..." -ForegroundColor Yellow
Write-Host ""

try {
    git push -u origin main
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  ✓ SUCCESS!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Your code has been successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "  1. Visit your repository:" -ForegroundColor White
    Write-Host "     $($repoUrl.Replace('.git', ''))" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "  2. Enable GitHub Pages:" -ForegroundColor White
    Write-Host "     - Go to Settings → Pages" -ForegroundColor White
    Write-Host "     - Source: Deploy from branch 'main'" -ForegroundColor White
    Write-Host "     - Folder: / (root)" -ForegroundColor White
    Write-Host "     - Click Save" -ForegroundColor White
    Write-Host ""
    Write-Host "  3. Your game will be live at:" -ForegroundColor White
    Write-Host "     https://dw-hurt.github.io/divorcegame/" -ForegroundColor Yellow
    Write-Host ""
} catch {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "  ERROR PUSHING TO GITHUB" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Error details:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ""
    Write-Host "Common issues:" -ForegroundColor Yellow
    Write-Host "  1. Authentication failed" -ForegroundColor White
    Write-Host "     - You may need to use a Personal Access Token" -ForegroundColor White
    Write-Host "     - Generate one at: https://github.com/settings/tokens" -ForegroundColor White
    Write-Host "     - Use the token as your password when prompted" -ForegroundColor White
    Write-Host ""
    Write-Host "  2. Repository doesn't exist" -ForegroundColor White
    Write-Host "     - Make sure you created the repository on GitHub" -ForegroundColor White
    Write-Host "     - Check the URL is correct" -ForegroundColor White
    Write-Host ""
    Write-Host "  3. Permission denied" -ForegroundColor White
    Write-Host "     - Make sure you have write access to the repository" -ForegroundColor White
    Write-Host ""
    Write-Host "To retry, run this script again." -ForegroundColor Yellow
    Write-Host ""
}

Read-Host "Press Enter to exit"
