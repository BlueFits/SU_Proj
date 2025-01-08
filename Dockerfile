FROM node:20-slim AS builder

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app/

# Build the Gatsby app
RUN npm run build

# Use a lightweight HTTP server to serve the built files
FROM nginx:stable-alpine AS server

# Copy the built files to the Nginx container
COPY --from=builder /app/public /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]