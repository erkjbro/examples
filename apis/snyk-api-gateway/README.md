# Snyk API Gateway

Source: [How to build a secure API gateway in Node.js](https://snyk.io/blog/how-to-build-secure-api-gateway-node-js/) 

## Environment Variables

- `SESSION_SECRET` - https://bitwarden.com/password-generator/

## Packages

- dotenv
- express
- express-session

## Routes

### Public
- '/' - Accepts query param `name` and returns a greeting.
- '/login'
- '/logout'

### Protected
- '/protected' - Same as `/`, but protected.
- '/search' - proxy for duckduckgo search. Try `/search?q=x&format=json`.

## HTTPS Comments
However, sometimes we might want to expose the running code directly to the internet. 
In this case, we would need a valid certificate.

Resources for more info:
- [Let's Encrypt](https://letsencrypt.org/)
- [Greenlock (Express)](https://www.npmjs.com/package/greenlock-express)
- [ACME Client](https://www.npmjs.com/package/acme-client)

Small example (See the article for more details on this topic):
```js
const { readFileSync } = require('fs');
const { createServer } = require('https');

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
