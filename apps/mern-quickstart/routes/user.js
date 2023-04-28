const express = require('express');
const router = express.Router();

const { registerNewUser, testUserRoute } = require('../controllers/user');

// @route GET api/users/test
// @description tests users route
// @access Public
router.get('/test', testUserRoute);

// @route POST api/users/register
// @description Register user
// @access Public
router.post('/register', registerNewUser);

module.exports = router;
