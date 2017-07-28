const Joi = require('joi');
const HTTPStatus = require('http-status');

const { filteredBody } = require('../utils/filteredBody');
const constants = require('../config/constants');
const User = require('../models/user.model');

const validation = {
  create: {
    body: {
      email: Joi.string().email().required(),
      password: Joi.string()
        .min(6)
        .regex(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)
        .required(),
      username: Joi.string().min(3).max(20).required(),
    },
  },
};

async function create(req, res, next) {
  const body = filteredBody(req.body, constants.WHITELIST.users.create);

  try {
    const user = await User.create(body);
    return res.status(HTTPStatus.CREATED).json(user.toAuthJSON());
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST;
    return next(e);
  }
}

module.exports = {
  validation,
  create,
};
