## Build command: docker build -t artour-app .

# Stage 1: Build the application ans run.
FROM node:lts-alpine3.16 AS builder
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build

# Run command on container starting.
CMD ["npx", "vite", "preview", "--host"]