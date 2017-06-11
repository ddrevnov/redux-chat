import Joi from 'joi';
import HTTPStatus from 'http-status';
import contants from '../config/constants';

import { filteredBody } from '../utils/filteredBody';
import Room from '../models/room.model';

export const validation = {
  create: {
    body: {
      name: Joi.string().required(),
    },
  },
};

export async function create(req, res, next) {
  const body = filteredBody(req.body, contants.WHITELIST.rooms.create);
  try {
    return res
      .status(HTTPStatus.CREATED)
      .json(await Room.createRoom(body, req.user._id));
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
}

export async function getList(req, res, next) {
  try {
    return res
      .status(HTTPStatus.OK)
      .json(await Room.list());
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST;
    return next(err);
  }
}
