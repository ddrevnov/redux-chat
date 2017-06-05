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
    return res
      .status(HTTPStatus.CREATED)
      .json(await Message.createMessage(body, req.user._id));
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
}

