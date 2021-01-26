#!/bin/bash

export API_BASE_URL="https://api.myhowm.com"

# Load nvm (node version manager), install node (version in .nvmrc), and npm install packages
[ -s "$HOME/.nvm/nvm.sh" ] && source "$HOME/.nvm/nvm.sh" && nvm use
# Npm install if not already.
[ ! -d "node_modules" ] && npm install

npm run generate
aws s3 cp dist s3://myhowm.com --recursive
