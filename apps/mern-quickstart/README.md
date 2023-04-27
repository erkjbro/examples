# MERN Quickstart

Source: Medium - [Complete(?) Node.js Project Setup from Docker to Testing](https://medium.com/@nur_islam/complete-node-js-project-setup-from-docker-to-testing-docker-restfull-apis-with-node-js-9f384e06734a)
Author: [Nur Islam](https://medium.com/@nur_islam)

A simple project with Node.js + Express.js + MongoDB + JEST Integration Testing that's Dockerized.

## Comments

>> What did you like about this project? What did you dislike? Did you learn anything from it?

## Getting Started

From project root:

```bash
# Example for steps to get started
echo PORT=3000 >> .env
npm ci
npm start
```

Once started, the server will run at http://localhost:<PORT> by default.

## Environment Variables

- `PORT`: Port to run the server on. Defaults to 3000.

## Dependencies

- `cors`: Node.js CORS middleware
- `dotenv`: Loads environment variables from .env file
- `express`: Fast, unopinionated, minimalist web framework
- `mongoose`: To connect/interact with MongoDB.
- `passport`: For authentication.
- `jsonwebtoken`: Generates JWTs.
- `body-parser`: Used to get data through the request.
- `validator`: For validation.

## Routes

### Public
- '/' (GET)

### Protected
- '/api' (GET)

## Extra

> Any extra information, such as notes or suggestions for future development, goes here.