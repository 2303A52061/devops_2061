# ─── Stage 1: Build ───────────────────────────────────────────────
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies first (layer cache)
COPY package.json ./
RUN npm install --legacy-peer-deps && \
    npm install ajv@^8.11.0 ajv-keywords@^5.1.0 --legacy-peer-deps

# Copy source and build
COPY public/ ./public/
COPY src/    ./src/
RUN npm run build

# ─── Stage 2: Serve with Nginx (tiny image) ───────────────────────
FROM nginx:stable-alpine

# Remove default nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy built React app
COPY --from=builder /app/build /usr/share/nginx/html

# Custom nginx config for React Router support
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
