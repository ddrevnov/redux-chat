import { Router } from 'express';
import validate from 'express-validation';

import * as RoomController from '../controllers/room.controller';
import { authJwt } from '../services/auth';

const routes = new Router();

routes.post(
  '/',
  authJwt,
  validate(RoomController.validation.create),
  RoomController.create,
);

routes.get(
  '/',
  authJwt,
  RoomController.getList,
);


export default routes;
