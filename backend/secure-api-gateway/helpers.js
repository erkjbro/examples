// Route protection helpers
export const alwaysAllow = (req, res, next) => {
  next();
};

export const mustProtect = (req, res, next) => {
  const { authenticated } = req.session;

  if (!authenticated) {
    return res.status(401).send('You are not authenticated');
  } else {
    next();
  }
};

// Authentication helpers
export const login = (req, res) => {
  const { authenticated } = req.session;

  if (!authenticated) {
    req.session.authenticated = true;
    res.send('You are now authenticated');
  } else {
    res.send('You are already authenticated');
  }
};

export const logout = (req, res) => {
  req.session.destroy(() => {
    res.send('Successfully logged out');
  });
};

// Used for route protection demo
export const nameQuery = (req, res, next) => {
  const { name = "user" } = req.query;
  res.send(`Hello ${name}!`);
};
