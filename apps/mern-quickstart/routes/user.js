// users.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Load User Model
const User = require('../models/User');

// @route GET api/users/test
// @description tests users route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'users route works' }));

// @route GET api/users/register
// @description Register user
// @access Public
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        return res.status(400).json({ email: 'Email already exists' });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.error(err));
          });
        });

        return res.status(201).json({
          message: 'Signup completed successfully!',
          email
        });
      }
  });
});

module.exports = router;
