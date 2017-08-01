const { Router } = require('express');
const validate = require('express-validation');

const wrap = require('../utils/wrapController');
const UserController = require('../controllers/user.controller');
const AuthenticationController = require('../controllers/authentication.controller');
const { authLocal } = require('../services/auth');

const routes = new Router();

routes.post(
  '/signup',
  validate(UserController.validation.create),
  wrap(UserController.create),
);
routes.post(
  '/login',
  validate(AuthenticationController.validation.login),
  authLocal,
  wrap(AuthenticationController.login),
);

module.exports = routes;
