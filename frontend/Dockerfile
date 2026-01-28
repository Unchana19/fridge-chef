# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy workspace configuration
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy packages
COPY packages ./packages
COPY frontend ./frontend

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build args
ARG VITE_API_BASE_URL=""
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Build the frontend
RUN pnpm --filter frontend build

# Final stage
FROM nginx:alpine

# Copy built assets from builder
COPY --from=builder /app/frontend/dist /usr/share/nginx/html

# Copy Nginx config
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
