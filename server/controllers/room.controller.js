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

async function create(req, res) {
  const body = filteredBody(req.body, constants.WHITELIST.rooms.create);
  return res
    .status(HTTPStatus.CREATED)
    .json(await Room.createRoom(body, req.user._id));
}

async function getList(req, res) {
  const offset = +req.query.offset;
  const limit = +req.query.limit;

  const rooms = await Room.paginate({}, { offset, limit });

  return res.status(HTTPStatus.OK).json(rooms);
}

module.exports = {
  validation,
  create,
  getList,
};

