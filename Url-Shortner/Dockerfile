# Use lightweight Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy backend package files and install dependencies
COPY backend/package*.json ./backend/
RUN cd backend && npm install --production

# Copy backend source code
COPY backend ./backend

# Copy static frontend files into backend/public
COPY frontend/public ./frontend/public

# Set working directory to backend
WORKDIR /app/backend

# Expose your server port
EXPOSE 3000

# Start the app
CMD ["npm", "run", "dev"]
