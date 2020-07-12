#!/bin/sh
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo "${BLUE}==>1. Install Expo command line${NC}"
npm install -g exp

echo "${BLUE}==>2. Detaching ${NC}"
cp scripts/app.json ./app.json
exp detach
cd ios
pod install