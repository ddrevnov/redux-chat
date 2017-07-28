const { Router } = require('express');
const HTTPStatus = require('http-status');

const UserRoutes = require('./user.routes');
const MessageRoutes = require('./message.routes');
const RoomRoutes = require('./room.routes');
const APIError = require('../services/error');
const logErrorService = require('../services/log');

const routes = new Router();

routes.use('/users', UserRoutes);
routes.use('/messages', MessageRoutes);
routes.use('/rooms', RoomRoutes);

routes.get('*', (req, res, next) =>
  next(new APIError('Not Found!', HTTPStatus.NOT_FOUND, true)),
);

routes.use(logErrorService);

module.exports = routes;
