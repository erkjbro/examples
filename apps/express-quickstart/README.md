# MERN Quickstart

Source: Medium - [[Unfinished] Complete Node.js Project Setup from Docker to Testing](https://medium.com/@nur_islam/complete-node-js-project-setup-from-docker-to-testing-docker-restfull-apis-with-node-js-9f384e06734a)
Author: [Nur Islam](https://medium.com/@nur_islam)

A simple project with Node.js + Express.js + MongoDB + JEST Integration Testing that's Dockerized.

## Comments

The article is unfinished, so there's no integration testing demonstrated here. However, I thought it
was a good example overall and a nice way to play around with a Dockerized MERN environment.

## Getting Started

Prerequisites:
1) Node.js
2) Docker

From project root:

```bash
# Please use v2 of docker-compose, as v1 will be deprecated shortly.
docker compose up
```

Once started, the server will run at http://localhost:80 by default.

> Server defaults to 8082, but Docker maps it to 80.

## Environment Variables

- `PORT`: Port to run the server on. Defaults to 8082.

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
- `/api/users/test` (GET)
- `/api/users/register` (POST) Expects a JSON body with the following fields:
  - `name`: String
  - `email`: String
  - `password`: String

### Private

none

## Extra

- Redis caching would be a nice addition to this project.
- No Nginx usage present, but would be nice to see as well.
- Volume mounting and environment variables reliance could be improved upon.
