# Dockerfile
FROM node:18-slim

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
RUN npm install --production

# Copy everything
COPY . .

# Build-time env (if you compile assets) — not needed here

ENV PORT=8080
EXPOSE 8080

# Start the server
CMD ["node", "server.js"]
