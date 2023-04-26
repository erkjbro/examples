/**
 * @file Configures and runs the API proxy.
 *
 */

import express from 'express';
import session from 'express-session';
import rateLimit from 'express-rate-limit';
import expressWinston from 'express-winston';
import responseTime from 'response-time';
import cors from 'cors';
import helmet from 'helmet';
import { createProxyMiddleware } from 'http-proxy-middleware';

import * as config from './config.js';
import { alwaysAllow, mustProtect, nameQuery, login, logout } from './helpers.js';

const app = express();
const port = config.serverPort;

// Unset nonfunctional server description data to give away less information.
app.disable('x-powered-by');

// Security headers
app.use(helmet());
// Enable ALL CORS requests
app.use(cors());
// Server response time header
app.use(responseTime());
// Rate limiting middleware
app.use(rateLimit(config.rate));
// Logger configuration
app.use(expressWinston.logger(config.loggerOptions));
// Session management
app.use(session(config.sessionOptions));

// Appending proxy routes for each configured entry
Object.keys(config.proxies).forEach((path) => {
  const { isProtected, ...options } = config.proxies[path];
  const authCheck = isProtected ? mustProtect : alwaysAllow;

  app.use(
    path,
    authCheck,
    createProxyMiddleware(options)
  );
});

// Authentication routes
app.get('/login', login);
app.get('/logout', logout);

// The /protected and / routes are provided purely for demonstrative purposes.
// Protected route
app.get('/protected', mustProtect, nameQuery);
// Unprotected route
app.get('/', nameQuery);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
