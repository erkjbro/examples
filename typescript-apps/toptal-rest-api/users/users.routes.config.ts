import { CommonRoutesConfig } from '../common/common.routes.config';
import express from 'express';

class UserRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'UsersRoutes');
  }

  configureRoutes() {
    return this.app;
  }
}

export { UserRoutes };
