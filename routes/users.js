const userRouter = require('express').Router();
const {
  getCurrentUser, // возвращает информацию о пользователе (email и имя) - с валидацией
} = require('../controllers/users.js');

userRouter.get('/users/me', getCurrentUser);

module.exports = userRouter;
