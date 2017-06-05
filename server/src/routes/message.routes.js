import { Router } from 'express';
import validate from 'express-validation';

import * as MessageController from '../controllers/message.controller';
import { authJwt } from '../services/auth';

const routes = new Router();

routes.post(
  '/',
  authJwt,
  validate(MessageController.validation.create),
  MessageController.create,
);

export default routes;
