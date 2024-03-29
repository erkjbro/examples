import bcrypt from 'bcryptjs';

import { User } from '../models/User.js';

export const testUserRoute = (req, res) => {
  console.log('(GET) Test user route');
  return res.json({
    message: 'Route Tested Successfully',
    error: false,
    payload: null
  });
};

export const registerNewUser = async (req, res) => {
  console.log('(POST) Register new user route');

  const { name, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({
      message: 'Email already exists',
      error: true,
      payload: { email }
    });
  }

  try {
    const hash = await bcrypt.hash(password, 12);

    const newUser = new User({
      name,
      email,
      password: hash
    });

    await newUser.save();

    return res.status(201).json({
      message: 'Signup completed successfully!',
      error: false,
      payload: newUser
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Something went wrong.',
      error: true,
      payload: err
    });
  }
  // Original code from article, for reference.
  // bcrypt.genSalt(10, 1,(err, salt) => {
  //   bcrypt.hash(newUser.password, salt, (err, hash) => {
  //     if (err) throw err;
  //     newUser.password = hash;
  //     newUser
  //       .save()
  //       .then(user => res.json(user))
  //       .catch(err => console.error(err));
  //   });
  // });
};
