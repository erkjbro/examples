const path = require('path');

const express = require('express');
const generatePassword = require('password-generator');

const app = express();

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('/api/passwords', (req, res, next) => {
  const count = 5;

  // Generate some passwords
  const passwords = Array.from(Array(count).keys()).map(i =>
    generatePassword(12, false)
  );

  res.json(passwords);

  console.log(`Sent ${count} passwords`);
});

// A "catchall" handler: Return's the frontend's index.html.
app.get('*', (req, res, next) => {
  res.status(404).json('I do not have that.');
  // res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Password generator listening on ${PORT}`);
});