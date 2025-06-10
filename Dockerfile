# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build
RUN npm prune --production


# Deploy stage
FROM nginx:stable-alpine

COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]