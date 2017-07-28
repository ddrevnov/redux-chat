const Joi = require('joi');
const HTTPStatus = require('http-status');
const constants = require('../config/constants');
const { filteredBody } = require('../utils/filteredBody');
const Room = require('../models/room.model');

const validation = {
  create: {
    body: {
      name: Joi.string().required()
    },
  },
};

async function create(req, res, next) {
  const body = filteredBody(req.body, constants.WHITELIST.rooms.create);
  try {
    return res
      .status(HTTPStatus.CREATED)
      .json(await Room.createRoom(body, req.user._id));
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
}

async function getList(req, res, next) {
  const offset = +req.query.offset;
  const limit = +req.query.limit;

  try {
    const rooms = await Room.paginate({}, { offset, limit });

    return res.status(HTTPStatus.OK).json(rooms);
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
}

module.exports = {
  validation,
  create,
  getList,
};

