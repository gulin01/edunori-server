# Use an official Node.js base image
FROM node:23

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the app
COPY . .

# Build the app
RUN npm run build

# Expose port (Nest default is 3000)
EXPOSE 3000

# Run the app
CMD ["npm", "run", "start:prod"]
