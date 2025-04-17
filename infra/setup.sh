#!/bin/bash

# Run as: bash setup.sh

echo "? Updating system packages..."
sudo yum update -y

echo "? Installing Docker..."
sudo yum install docker -y
sudo systemctl start docker
sudo systemctl enable docker

echo "? Installing Docker Compose..."
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

echo "? Installing Node.js & npm..."
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

echo "? Configuring Git SSH key access..."
ssh-keyscan github.com >> ~/.ssh/known_hosts

echo "? Setup completed!"