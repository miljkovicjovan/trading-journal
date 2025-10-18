# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Expose dev port
EXPOSE 3000

# Default command (overridden in docker-compose)
CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0"]
