@echo off
echo ========================================
echo AURA Financial Assistant - Backend API
echo ========================================
echo.

REM Check if virtual environment exists
if not exist "venv\" (
    echo Creating virtual environment...
    python -m venv venv
    echo.
)

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate
echo.

REM Install/Update dependencies
echo Installing dependencies...
pip install -r requirements.txt
echo.

REM Check for .env file
if not exist ".env" (
    echo WARNING: .env file not found!
    echo Please create a .env file with your GEMINI_API_KEY
    echo Example: GEMINI_API_KEY=your_api_key_here
    echo.
    pause
    exit /b 1
)

REM Start Flask server
echo Starting Flask API server...
echo API will be available at http://localhost:5000
echo.
python app.py
