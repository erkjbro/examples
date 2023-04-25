/**
 * @fileoverview Snyk API Gateway
 *
 *
 */

import express from 'express';
import session from 'express-session';
import rateLimit from 'express-rate-limit';
import winston from 'winston';
import expressWinston from 'express-winston';
import responseTime from 'response-time';
import cors from 'cors';
import helmet from 'helmet';
import * as config from "./config.js";
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();
const port = config.serverPort;
const secret = config.sessionSecret;
const store = new session.MemoryStore();

const alwaysAllow = (_1, _2, next) => {
  next();
};

// Authentication for session
const protect = (req, res, next) => {
  const { authenticated } = req.session;

  if (!authenticated) {
    return res.status(401).send('You are not authenticated');
  } else {
    next();
  }
};

const nameQuery = (req, res, next) => {
  const { name = "user" } = req.query;
  res.send(`Hello ${name}!`);
};

app.disable("x-powered-by");

app.use(helmet());
app.use(cors());
app.use(responseTime());
app.use(rateLimit(config.rate));

// Logging
app.use(expressWinston.logger({
  transports: [ new winston.transports.Console() ],
  format: winston.format.json(),
  statusLevels: true,
  meta: false,
  msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
  expressFormat: true,
  colorize: false,
  ignoreRoute: (req, res) => false
}));

// Session management
app.use(session({
  secret,
  resave: false,
  saveUninitialized: true,
  store
}));

Object.keys(config.proxies).forEach((path) => {
  const { isProtected, ...options } = config.proxies[path];
  const check = isProtected ? protect : alwaysAllow;
  app.use(path, check, createProxyMiddleware(options));
});

// AuthN routes
app.get("/login", (req, res) => {
  const { authenticated } = req.session;

  if (!authenticated) {
    req.session.authenticated = true;
    res.send("Successfully authenticated");
  } else {
    res.send("Already authenticated");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.send("Successfully logged out");
  });
});

// Protected route
app.get("/protected", protect, nameQuery);

// Unprotected route
app.get("/", nameQuery);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
