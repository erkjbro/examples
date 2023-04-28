import express from 'express';

import { registerNewUser, testUserRoute } from '../controllers/user.js';

const userRouter = express.Router();

// @route GET api/users/test
// @description tests users route
// @access Public
userRouter.get('/test', testUserRoute);

// @route POST api/users/register
// @description Register user
// @access Public
userRouter.post('/register', registerNewUser);

export { userRouter };
