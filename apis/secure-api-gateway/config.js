import dotenv from 'dotenv';
import winston from 'winston';
import session from 'express-session';

const dotenvResult = dotenv.config();

if (dotenvResult.error) {
  console.error('Issue with .env file');
  throw dotenvResult.error;
}

const store = new session.MemoryStore();

export const serverPort = process.env.PORT || 3000;
export const sessionSecret = process.env.SESSION_SECRET || 'super_secret_string';

export const rate = {
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5, // 5 requests,
};

export const loggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.json(),
  statusLevels: true,
  meta: false,
  msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
  expressFormat: true,
  colorize: false,
  ignoreRoute: (req, res) => false,
};

export const sessionOptions = {
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
  store,
}

export const proxies = {
  '/search': {
    isProtected: true,
    target: 'http://api.duckduckgo.com/',
    changeOrigin: true,
    pathRewrite: {
      ['^/search']: '',
    },
  },
  '/public-search': {
    isProtected: false,
    target: 'http://api.duckduckgo.com/',
    changeOrigin: true,
    pathRewrite: {
      ['^/public-search']: '',
    },
  },
};
