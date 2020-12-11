const userRouter = require('express').Router();
// const { celebrate, Joi } = require('celebrate');
const {
  getCurrentUser,
} = require('../controllers/users.js');

 // возвращает информацию о пользователе (email и имя) - с валидацией

userRouter.get('/users/me', getCurrentUser);

module.exports = userRouter;
