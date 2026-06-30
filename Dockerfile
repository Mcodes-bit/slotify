# Use the official lightweight Node.js 20 image.
FROM node:20-slim

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install production dependencies.
RUN npm ci --only=production

# Copy local code to the container image.
COPY . ./

# Expose port 8080 (Cloud Run defaults to 8080)
EXPOSE 8080

# Run the web service on container startup.
CMD [ "node", "server.js" ]
