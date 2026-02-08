# Push this project to https://github.com/Danokhov/pro-mnemo-app
# Run in PowerShell. Requires Git in PATH (e.g. "Git for Windows").

$ErrorActionPreference = "Stop"
$repoUrl = "https://github.com/Danokhov/pro-mnemo-app.git"
$branch = "main"
$projectRoot = $PSScriptRoot
Set-Location $projectRoot

# Try to find Git if not in PATH
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    $gitPaths = @(
        "${env:ProgramFiles}\Git\bin",
        "${env:ProgramFiles(x86)}\Git\bin",
        "$env:LOCALAPPDATA\Programs\Git\bin"
    )
    foreach ($p in $gitPaths) {
        if (Test-Path "$p\git.exe") {
            $env:Path = "$p;$env:Path"
            break
        }
    }
}

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "Git not found. Install from: https://git-scm.com/download/win" -ForegroundColor Red
    Write-Host "After install, restart the terminal and run this script again." -ForegroundColor Yellow
    exit 1
}

# Set identity for this repo if not set (required for commit)
if (-not (git config user.email 2>$null)) { git config user.email "danokhov@users.noreply.github.com" }
if (-not (git config user.name 2>$null))  { git config user.name "Danokhov" }

if (-not (Test-Path ".git")) {
    Write-Host "Initializing repo and adding remote..."
    git init
    git remote add origin $repoUrl
}

git add -A
git status
git commit -m "Initial commit: pro-mnemo Russian-German app"
if ($LASTEXITCODE -ne 0) {
    Write-Host "Nothing to commit (or commit failed)." -ForegroundColor Yellow
} else {
    git branch -M $branch
    git push -u origin $branch
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    Write-Host "Done. Pushed to $repoUrl" -ForegroundColor Green
}
