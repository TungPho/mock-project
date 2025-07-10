# Stage 1: Build React app
FROM node:20 AS builder

WORKDIR /app

# Copy package.json và lock file trước
COPY package.json package-lock.json ./

# Cài đặt dependencies với npm ci (nhanh và chính xác hơn)
RUN npm ci

# Copy toàn bộ source code
COPY . .

# Build production
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:stable-alpine

# Copy build folder từ builder stage sang Nginx
COPY --from=builder /app/dist /usr/share/nginx/html


EXPOSE 80

# Khởi động nginx
CMD ["nginx", "-g", "daemon off;"]
