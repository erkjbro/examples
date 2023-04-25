/**
 * @fileoverview Snyk API Gateway
 *
 *
 */

import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const secret = process.env.SESSION_SECRET;
const store = new session.MemoryStore();

const protect = (req, res, next) => {
  const { authenticated } = req.session;

  if (!authenticated) {
    return res.status(401).send('You are not authenticated');
  } else {
    next();
  }
};

app.use(session({
  secret,
  resave: false,
  saveUninitialized: true,
  store
}));

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

app.get("/protected", protect, (req, res) => {
  const { name = "user" } = req.query;
  res.send(`Hello ${name}!`);
});

app.get("/", (req, res) => {
  const { name = "user" } = req.query;
  res.send(`Hello ${name}!`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Navigate to http://localhost:3000/?name=King to see the result.
