const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

// Why wouldn't this work if using the regular require statements?
import { getSecret } from './secrets';
import Comment from './models/comment';

const app = express();
const router = express.Router();

const API_PORT = process.env.API_PORT || 3001;

mongoose.connect(getSecret('dbUri'), { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

router.get('/', (req, res, next) => {
  res.json({ message: 'Hello, World! '});
});

router.get('/comments', (req, res, next) => {
  Comment.find((err, comments) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: comments });
  });
});

router.post('/comments', (req, res, next) => {
  const comment = new Comment();

  const { author, text } = req.body;
  if (!author || !text) {
    // We should throw an error. We can do this check on the frontend.
    return res.json({
      success: false,
      error: 'You must provide an author and comment'
    });
  }
  comment.author = author;
  comment.text = text;
  comment.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

app.use('/api', router);

app.use('/', (req, res, next) => {
  res.send('<h1>Use the API routes!</h1>');
});

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));