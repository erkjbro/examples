# Base on offical NGINX Alpine image
FROM nginx:stable-alpine AS base

FROM base AS approachOne

# Remove any existing config files
RUN rm /etc/nginx/conf.d/*

# Copy config files
# *.conf files in conf.d/ dir get included in main config
COPY ./default.conf /etc/nginx/conf.d/

# Expose the listening port
EXPOSE 80

# Launch NGINX
CMD [ "nginx", "-g", "daemon off;" ]

FROM base AS approachTwo

# Remove any existing config files
RUN rm /etc/nginx/conf.d/*

# Copy config files
COPY nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# If this were included in the frontend Dockerfile as the final step, copy the build output to the nginx html folder
#COPY --from=builder /usr/src/app/.next/static /usr/share/nginx/html

EXPOSE 3000 80
