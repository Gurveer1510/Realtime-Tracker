# Use Node.js as base image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build TypeScript code
RUN npm run build

# Create and copy views directory
RUN mkdir -p dist/views && cp -r src/views/* dist/views/

# Create and copy public directory
RUN mkdir -p dist/public && cp -r src/public/* dist/public/

# Remove development dependencies
RUN npm prune --production

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]