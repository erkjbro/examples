/**
 * @fileoverview Snyk API Gateway
 *
 *
 */

// Starting packages
import dotenv from 'dotenv';
import express from 'express';
// For session management
import session from 'express-session';
// For rate limiting
import rateLimit from 'express-rate-limit';
// For logging
import winston from 'winston';
import expressWinston from 'express-winston';
import responseTime from 'response-time';
// For cors
import cors from 'cors';
import helmet from 'helmet';
// For proxying
import { createProxyMiddleware } from 'http-proxy-middleware';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const secret = process.env.SESSION_SECRET;
const store = new session.MemoryStore();

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

// Rate Limiting
app.use(
  rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 5 // 5 requests,
  })
);

// Session management
app.use(session({
  secret,
  resave: false,
  saveUninitialized: true,
  store
}));

// Logging response time
app.use(responseTime());

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

// Security headers
app.use(cors());
app.use(helmet());

// Proxying
// Test with /search?q=x&format=json
app.use("/search", createProxyMiddleware({
  target: "http://api.duckduckgo.com/",
  changeOrigin: true,
  pathRewrite: {
    ["^/search"]: ""
  }
}));

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
