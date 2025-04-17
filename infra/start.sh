#!/bin/bash

# Run this from your EC2 instance home directory

echo "? Cloning or pulling latest code..."
REPO_DIR="edunori-server"

if [ ! -d "$REPO_DIR" ]; then
  git clone git@github.com:gulin01/edunori-server.git
else
  cd $REPO_DIR
  git pull origin master
  cd ..
fi

echo "? Copying production env file..."
cp ./infra/.env.production ./$REPO_DIR/.env

cd $REPO_DIR

echo "? Building and starting Docker..."
docker-compose down
docker-compose build
docker-compose up -d

echo "? Deployment complete! App should be running."
