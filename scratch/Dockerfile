# Use a lighter version of Node as a parent image
FROM node:current-alpine AS build

# Set the working directory to /api
WORKDIR /usr/src/api

# copy package.json into the container at /api
COPY package*.json .

# install dependencies
RUN npm ci

# Copy the current directory contents into the container at /api
COPY . .

# Make port 80 available to the world outside this container
EXPOSE 80

# Run the app when the container launches
CMD ["npm", "start"]
