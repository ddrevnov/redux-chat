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

async function create(req, res) {
  const body = filteredBody(req.body, constants.WHITELIST.messages.create);
  const message = await Message.createMessage(body, req.user._id);
  const opts = [
    {model: 'User', path: 'sender'},
    {model: 'Room', path: 'room'},
  ];

  await Message.populate(message, opts);

  return res
    .status(HTTPStatus.CREATED)
    .json(message);
}

async function getByRoomId(req, res) {
  return res
    .status(HTTPStatus.OK)
    .json(req.messages);
}

async function loadRoom(req, res, next, id) {
  const messages = await Message.getByRoomId(id);

  if (!messages) return res.status(HTTPStatus.NOT_FOUND).send();

  req.messages = messages;
  next();
}

module.exports = {
  validation,
  create,
  getByRoomId,
  loadRoom,
};

