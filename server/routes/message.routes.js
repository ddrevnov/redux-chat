const { Router } = require('express');
const validate = require('express-validation');
const { authJwt } = require('../services/auth');

const MessageController = require('../controllers/message.controller');

const routes = new Router();

routes.post(
  '/',
  authJwt,
  validate(MessageController.validation.create),
  MessageController.create,
);

routes.get(
  '/room/:id',
  authJwt,
  MessageController.getByRoomId,
);

module.exports = routes;
