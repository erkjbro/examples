import express from 'express';
import { body } from 'express-validator';

import authController from './controllers/auth.controller';
import authMiddleware from './middleware/auth.middleware';
import jwtMiddleware from './middleware/jwt.middleware';
import BodyValidationMiddleware from '../common/middleware/body.validation.middleware';
import { CommonRoutesConfig } from '../common/common.routes.config';

class AuthRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'AuthRoutes');
  }

  configureRoutes(): express.Application {
    this.app.post(`/auth`, [
      body('email').isEmail(),
      body('password').isString(),

      BodyValidationMiddleware.verifyBodyFieldsErrors,
      authMiddleware.verifyUserPassword,
      authController.createJWT,
    ]);

    this.app.post(`/auth/refresh-token`, [
      jwtMiddleware.validJWTNeeded,
      jwtMiddleware.verifyRefreshBodyField,
      jwtMiddleware.validRefreshNeeded,
      authController.createJWT,
    ]);

    return this.app;
  }
}

export { AuthRoutes };
