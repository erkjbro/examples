# Event Posting App

Source: Docker - [Containerizing an Event Posting App Built with the MEAN Stack](https://www.docker.com/blog/containerizing-an-event-posting-app-built-with-the-mean-stack/)
Authors: 
- [Mohammad-Ali A'RÂBI](https://www.docker.com/author/raina-arabi/)
- [Ajeet Singh Raina](https://www.docker.com/author/ajeet-singh-raina/)
Article's Code Repo:
- [GitHub](https://github.com/dockersamples/events)

>> Give a brief description

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

## Routes

### Public
- '/' (GET)

### Protected
- '/api' (GET)

## Extra

> Any extra information, such as notes or suggestions for future development, goes here.
