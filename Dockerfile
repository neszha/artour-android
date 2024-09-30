## Build command: docker build -t artour-app .

# Stage 1: Build the application.
FROM node:lts-alpine3.16 as builder
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build

# Stage 2: Run the application.
FROM nginx:alpine
WORKDIR /app
COPY --from=builder /app/dist /app
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Run command on container starting.
CMD ["nginx", "-g", "daemon off;"]