import Joi from 'joi';
import HTTPStatus from 'http-status';
import contants from '../config/constants';

import { filteredBody } from '../utils/filteredBody';
import Message from '../models/message.model';

export const validation = {
  create: {
    body: {
      text: Joi.string().required(),
      room: Joi.string().required(),
    },
  },
};

export async function create(req, res, next) {
  const body = filteredBody(req.body, contants.WHITELIST.messages.create);
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

export async function getByRoomId({ params: { id } }, res, next) {

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

