const { Router } = require('express');
const validate = require('express-validation');
const { authJwt } = require('../services/auth');

const wrap = require('../utils/wrapController');
const RoomController = require('../controllers/room.controller');

const routes = new Router();

routes.post(
  '/',
  authJwt,
  validate(RoomController.validation.create),
  wrap(RoomController.create),
);

routes.get(
  '/',
  authJwt,
  wrap(RoomController.getList),
);


module.exports = routes;
