const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// initializing routes
const users = require('./routes/user');

const app = express();

const PORT = process.env.PORT || 8082;

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
};

// Connect to MongoDB
mongoose
  .connect(db, mongooseOptions)
  .then(() => console.log('Quickstart MongoDB Connected'))
  .catch((err) => console.error(err));

// Configure Routes
app.use('/api/users', users);
app.use((req, res, next) => res.status(404).send('Not a valid route...'));

app.listen(PORT, () => console.log(`Quickstart Server is running on port ${PORT}`));
