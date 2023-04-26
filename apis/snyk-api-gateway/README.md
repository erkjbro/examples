# Snyk API Gateway

Source: [How to build a secure API gateway in Node.js](https://snyk.io/blog/how-to-build-secure-api-gateway-node-js/)
Author: Florian Rappl

## Getting Started

From this directory:

```bash
echo SESSION_SECRET="super_secret_string" >> .env
npm ci
npm start
```

Once started, the server will run at http://localhost:3000 by default.

## Environment Variables

- `SESSION_SECRET` - [https://bitwarden.com/password-generator/](Password Generator)

## Dependencies

- `cors`: Node.js CORS middleware
- `dotenv`: Loads environment variables from .env file
- `express`: Fast, unopinionated, minimalist web framework
- `express-rate-limit`: Basic IP rate-limiting middleware for Express. Use to limit repeated requests to public APIs and/or endpoints such as password reset.
- `express-session`: Simple session middleware for Express
- `express-winston`: Express.js middleware for winstonjs/winston
- `helmet`: Help secure Express/Connect apps with various HTTP headers
- `http-proxy-middleware`: The one-liner node.js proxy middleware for connect, express and browser-sync
- `response-time`: Response time for Node.js servers
- `winston`: A logger for just about everything.

## Routes

### Public
- '/' - Accepts query param `name` and returns a greeting.
- '/login'
- '/logout'

### Protected
- '/protected' - Same as `/`, but protected.
- '/search' - proxy for duckduckgo search. Try `/search?q=x&format=json`.

## Extra

### Https Comments

Sometimes we might want to expose the running code directly to the internet. 
In this case, we would need a valid certificate.

Resources for more info:
- [Let's Encrypt](https://letsencrypt.org/)
- [Greenlock (Express)](https://www.npmjs.com/package/greenlock-express)
- [ACME Client](https://www.npmjs.com/package/acme-client)

Small example (See the article for more details on this topic):
```js
import readFileSync from 'fs';
import { createServer } from 'https';

// assumes that the key and certificate are stored in a "cert" directory
const credentials = {
key: readFileSync('cert/server.key', 'utf8'),
cert: readFileSync('cert/server.crt', 'utf8'),
};

// here we use the express "app" to attach to the created server
const httpsServer = createServer(credentials, app);

// use standard HTTPS port
httpsServer.listen(443);
```
