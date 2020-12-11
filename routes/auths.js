const authRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  login,
  createUser,
} = require('../controllers/users.js');

authRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

authRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

module.exports = authRouter;
