const { Router } = require('express');
const validate = require('express-validation');
const { authJwt } = require('../services/auth');

const RoomController = require('../controllers/room.controller');

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


module.exports = routes;
