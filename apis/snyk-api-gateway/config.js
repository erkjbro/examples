import dotenv from 'dotenv';

dotenv.config();

export const serverPort = process.env.PORT || 3000;
export const sessionSecret = process.env.SESSION_SECRET;
export const rate = {
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5, // 5 requests,
};
export const proxies = {
  '/search': {
    isProtected: true,
    target: 'http://api.duckduckgo.com/',
    changeOrigin: true,
    pathRewrite: {
      ['^/search']: '',
    },
  },
};
