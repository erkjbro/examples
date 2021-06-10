import express from 'express';
import { body } from 'express-validator';

import { CommonRoutesConfig } from '../common/common.routes.config';
import { PermissionFlag } from '../common/middleware/common.permissionflag.enum';
import permissionMiddleware from '../common/middleware/common.permission.middleware';
import BodyValidationMiddleware from '../common/middleware/body.validation.middleware';
import UsersController from './controllers/users.controller';
import UsersMiddleware from './middleware/users.middleware';
import jwtMiddleware from '../auth/middleware/jwt.middleware';

class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'UsersRoutes');
  }

  configureRoutes() {
    this.app
      .route(`/users`)
      .get(
        jwtMiddleware.validJWTNeeded,
        permissionMiddleware.permissionFlagRequired(
          PermissionFlag.ADMIN_PERMISSION
        ),
        UsersController.listUsers
      )
      .post(
        body('email').isEmail(),

        body('password')
          .isLength({ min: 5 })
          .withMessage('Must include password (5+ characters)'),

        BodyValidationMiddleware.verifyBodyFieldsErrors,
        UsersMiddleware.validatesSameEmailDoesntExist,
        UsersController.createUser
      );

    this.app.param(`userId`, UsersMiddleware.extractUserId);

    this.app
      .route(`/users/:userId`)
      .all(
        UsersMiddleware.validateUserExists,
        jwtMiddleware.validJWTNeeded,
        permissionMiddleware.onlySameUserOrAdminCanDoThisAction
      )
      .get(UsersController.getUserById)
      .delete(UsersController.removeUser);

    this.app.put(`/users/:userId`, [
      body('email').isEmail(),

      body('password')
        .isLength({ min: 5 })
        .withMessage('Must include password (5+ characters)'),

      body('firstName').isString(),
      body('lastName').isString(),
      body('permissionFlags').isInt(),

      BodyValidationMiddleware.verifyBodyFieldsErrors,
      UsersMiddleware.validateSameEmailBelongToSameUser,
      UsersMiddleware.userCantChangePermission,
      permissionMiddleware.permissionFlagRequired(
        PermissionFlag.PAID_PERMISSION
      ),
      UsersController.put,
    ]);

    this.app.patch(`/users/:userId`, [
      body('email').isEmail().optional(),

      body('password')
        .isLength({ min: 5 })
        .withMessage('Password must be 5+ characters')
        .optional(),

      body('firstName').isString().optional(),
      body('lastName').isString().optional(),
      body('permissionFlags').isInt().optional(),

      BodyValidationMiddleware.verifyBodyFieldsErrors,
      UsersMiddleware.validatePatchEmail,
      UsersMiddleware.userCantChangePermission,
      permissionMiddleware.permissionFlagRequired(
        PermissionFlag.PAID_PERMISSION
      ),
      UsersController.patch,
    ]);

    return this.app;
  }
}

export { UsersRoutes };
