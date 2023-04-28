import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import { userRouter } from './routes/user.js';
import { keys } from './config/keys.js';

const app = express();

app.set('port', Number(process.env.PORT || 8082));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db_uri = keys.mongoURI;

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  connectTimeoutMS: 1000
};

// Connect to MongoDB
try {
  await mongoose.connect(db_uri, mongooseOptions);
  console.log('Quickstart MongoDB connected.');
} catch (err) {
  console.log(err);
  process.exit(1);
}

// Configure Routes
app.use('/api/users', userRouter);
app.use((req, res, next) => res.status(404).send('Not a valid route...'));

app.listen(app.get('port'), () => (
  console.log(
    `Quickstart Server is running on port %d in %s mode.`,
    app.get('port'),
    app.get('env')
  )
));
