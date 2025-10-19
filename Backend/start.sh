#!/bin/bash

echo "========================================"
echo "AURA Financial Assistant - Backend API"
echo "========================================"
echo ""

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
    echo ""
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate
echo ""

# Install/Update dependencies
echo "Installing dependencies..."
pip install -r requirements.txt
echo ""

# Check for .env file
if [ ! -f ".env" ]; then
    echo "WARNING: .env file not found!"
    echo "Please create a .env file with your GEMINI_API_KEY"
    echo "Example: GEMINI_API_KEY=your_api_key_here"
    echo ""
    exit 1
fi

# Start Flask server
echo "Starting Flask API server..."
echo "API will be available at http://localhost:5000"
echo ""
python app.py
