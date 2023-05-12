# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/engine/reference/builder/

ARG NODE_VERSION=lts

# Base on offical Node.js Alpine image
FROM node:${NODE_VERSION}-alpine AS base

LABEL authors="Erik"


FROM base AS deps

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY package.json package-lock.json* yarn.lock* ./

# Install dependencies
RUN \
    if [ -f package-lock.json ]; then npm ci --omit=dev; \
    elif [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    else echo "Lockfile not found." && exit 1; \
    fi


FROM base AS builder

# Set working directory
WORKDIR /usr/src/app

# Copy all files
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .

# Build app
RUN npm run build


FROM base AS runner

# Set working directory
WORKDIR /usr/src/app

# Use production node environment by default.
ENV NODE_ENV production

# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1

# Add nextjs user and group
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Install PM2 globally
RUN npm install --global pm2

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder  /usr/src/app/package*.json .
COPY --from=builder  /usr/src/app/next.config.js .
COPY --from=builder  /usr/src/app/public ./public

COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next/static ./.next/static

# Run container as non-root (unprivileged) user
# A node user is also provided in the Node.js Alpine base image
USER nextjs

# Expose the listening port
EXPOSE 3000

ENV PORT 3000

# Run npm start script with PM2 when container starts
ENTRYPOINT ["pm2-runtime", "server.js"]
