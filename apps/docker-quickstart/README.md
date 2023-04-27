# Docker Quickstart

- [Complete(?) NodeJS Project Setup from Docker to Testing](https://medium.com/@nur_islam/complete-node-js-project-setup-from-docker-to-testing-docker-restfull-apis-with-node-js-9f384e06734a)

# <project_name>

Source: <org> - [<article_name>](https://example.com)
Author: <author>

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

## Routes

### Public
- '/' (GET)

### Protected
- '/api' (GET)

## Extra

> Any extra information, such as notes or suggestions for future development, goes here.
