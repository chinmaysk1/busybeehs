# Use an official Node.js image with the right version
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Build the Next.js app
RUN npm run build

# Expose port (Next.js default)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
