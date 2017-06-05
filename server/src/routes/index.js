import { Router } from 'express';
import HTTPStatus from 'http-status';

import UserRoutes from './user.routes';
import MessageRoutes from './message.routes';

import APIError from '../services/error';
import logErrorService from '../services/log';

const routes = new Router();

routes.use('/users', UserRoutes);
routes.use('/messages', MessageRoutes);

routes.get('*', (req, res, next) =>
  next(new APIError('Not Found!', HTTPStatus.NOT_FOUND, true)),
);

routes.use(logErrorService);

export default routes;
