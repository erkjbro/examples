FROM node:14-slim

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN yarn install

EXPOSE 3000

CMD ["node", "./dist/app.js"]

# docker build . -t tag_your_image_here
# docker run -p 3000:3000 tag_your_image_here
