FROM node/alpine:latest

WORKDIR /usr/src/app

COPY package*.json .

RUN npm ci

COPY . .

EXPOSE 8082

CMD ["npm", "start"]
