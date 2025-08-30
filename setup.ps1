Write-Host "Setting up MyCV project..." -ForegroundColor Green
Write-Host ""

Write-Host "Installing dependencies..." -ForegroundColor Yellow
try {
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "Dependencies installed successfully!" -ForegroundColor Green
        Write-Host ""
        Write-Host "To start the development server, run:" -ForegroundColor Cyan
        Write-Host "  npm run dev" -ForegroundColor White
        Write-Host ""
        Write-Host "To build for production, run:" -ForegroundColor Cyan
        Write-Host "  npm run build" -ForegroundColor White
    } else {
        Write-Host ""
        Write-Host "Error: npm install failed. Please check if Node.js is installed." -ForegroundColor Red
        Write-Host "You can download Node.js from: https://nodejs.org/" -ForegroundColor Yellow
    }
} catch {
    Write-Host ""
    Write-Host "Error: npm install failed. Please check if Node.js is installed." -ForegroundColor Red
    Write-Host "You can download Node.js from: https://nodejs.org/" -ForegroundColor Yellow
}

Write-Host ""
Read-Host "Press Enter to continue"
