const { Router } = require('express');
const validate = require('express-validation');
const { authJwt } = require('../services/auth');

const wrap = require('../utils/wrapController');
const MessageController = require('../controllers/message.controller');

const routes = new Router();

routes.post(
  '/',
  authJwt,
  validate(MessageController.validation.create),
  wrap(MessageController.create),
);

routes.get(
  '/room/:roomId',
  authJwt,
  wrap(MessageController.getByRoomId),
);

routes.param('roomId', wrap(MessageController.loadRoom));

module.exports = routes;
