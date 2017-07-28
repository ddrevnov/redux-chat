const Joi = require('joi');
const HTTPStatus = require('http-status');
const constants = require('../config/constants');
const { filteredBody } = require('../utils/filteredBody');
const Message = require('../models/message.model');

const validation = {
  create: {
    body: {
      text: Joi.string().required(),
      room: Joi.string().required(),
    },
  },
};

async function create(req, res, next) {
  const body = filteredBody(req.body, constants.WHITELIST.messages.create);
  try {
    const message = await Message.createMessage(body, req.user._id);
    const opts = [
      {model: 'User', path: 'sender'},
      {model: 'Room', path: 'room'},
    ];

    await Message.populate(message, opts);

    return res
      .status(HTTPStatus.CREATED)
      .json(message);
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
}

async function getByRoomId({ params: { id } }, res, next) {

  try {
    const messages = await Message.getByRoomId(id);

    return res
      .status(HTTPStatus.OK)
      .json(messages);
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
}

module.exports = {
  validation,
  create,
  getByRoomId,
};

