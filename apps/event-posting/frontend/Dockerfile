# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/engine/reference/builder/

ARG NODE_VERSION=lts

# Base on offical Node.js Alpine image
FROM node:${NODE_VERSION}-alpine AS builder

# Use production node environment by default.
#ENV NODE_ENV production

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY package*.json .

# Install dependencies
RUN npm ci --omit=dev

# Copy all files
COPY . .

# Build app
RUN npm run build


FROM node:${NODE_VERSION}-alpine AS runner

WORKDIR /usr/src/app

# Install PM2 globally
RUN npm install --global pm2

COPY --from=builder /usr/src/app/package*.json .
COPY --from=builder /usr/src/app/next.config.js .
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/.next/standalone .
COPY --from=builder /usr/src/app/.next/static ./.next/static

# Expose the listening port
EXPOSE 3000

# Run container as non-root (unprivileged) user
# The node user is provided in the Node.js Alpine base image
USER node

# Run npm start script with PM2 when container starts
ENTRYPOINT ["pm2-runtime", "server.js"]


#FROM nginx:stable-alpine
#
## Remove any existing config files
#RUN rm /etc/nginx/conf.d/*
#
#COPY nginx.conf /etc/nginx/nginx.conf
#COPY --from=builder /usr/src/app/.next/static /usr/share/nginx/html
#
#EXPOSE 80
