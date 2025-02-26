#!/bin/bash
# Check if prefix is provided
if [ -z "$1" ]; then
  echo "Error: Please provide a prefix as an argument."
  exit 1
fi

PREFIX=$1

# Create directories and files
mkdir -p src/lib/${PREFIX} src/lib/${PREFIX}/controllers
touch src/lib/${PREFIX}/${PREFIX}.model.js
touch src/lib/${PREFIX}/${PREFIX}.routes.js

echo "Folder and file structure created for ${PREFIX} collection"