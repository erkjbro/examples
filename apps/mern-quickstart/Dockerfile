FROM node:current-alpine AS build

ENV PORT 8082

WORKDIR /usr/src/app

COPY package*.json .

RUN npm ci

COPY . .

EXPOSE 8082

CMD ["npm", "run", "dev"]
