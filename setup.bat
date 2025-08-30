@echo off
echo Setting up MyCV project...
echo.

echo Installing dependencies...
call npm install

if %errorlevel% neq 0 (
    echo.
    echo Error: npm install failed. Please check if Node.js is installed.
    echo You can download Node.js from: https://nodejs.org/
    pause
    exit /b 1
)

echo.
echo Dependencies installed successfully!
echo.
echo To start the development server, run:
echo   npm run dev
echo.
echo To build for production, run:
echo   npm run build
echo.
pause
