#!/bin/bash

# Auto Evolution System Setup Script
echo "===================================="
echo "Auto Evolution System Setup"
echo "===================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed. Please install Node.js v14+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v)
echo "Detected Node.js version: $NODE_VERSION"

# Create directory structure
echo "Creating directory structure..."
mkdir -p auto-evolution

# Copy files to target directory
echo "Copying files..."
cp -r * auto-evolution/

# Install dependencies
echo "Installing dependencies..."
cd auto-evolution
npm install

# Make the script executable
chmod +x index.js

# Create OpenClaw cron job
echo "Setting up OpenClaw cron job..."
if command -v openclaw &> /dev/null; then
    # Remove existing job if it exists
    openclaw cron remove --name "auto-evolution" 2>/dev/null
    
    # Add new cron job
    openclaw cron add \
        --name "auto-evolution" \
        --schedule "0 * * * *" \
        --command "node $(pwd)/index.js" \
        --enabled
    
    echo "OpenClaw cron job created successfully!"
else
    echo "OpenClaw command not found. Please set up the cron job manually."
    echo "Use: openclaw cron add --name \"auto-evolution\" --schedule \"0 * * * *\" --command \"node $(pwd)/index.js\" --enabled"
fi

# Test the system
echo "Testing the evolution system..."
node index.js

# Show completion message
echo "===================================="
echo "Setup completed successfully!"
echo "===================================="
echo "Auto Evolution System is now installed and ready to use."
echo "It will run automatically every hour to enhance your AI agent's capabilities."
echo ""
echo "To manually run an evolution cycle:"
echo "  cd auto-evolution && node index.js"
echo ""
echo "To check the evolution logs:"
echo "  cat auto-evolution/evolution.log"
echo ""
echo "To view the capability library:"
echo "  cat auto-evolution/CAPABILITY_LIBRARY.md"
echo "===================================="