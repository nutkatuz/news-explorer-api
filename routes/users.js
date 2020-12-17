const userRouter = require('express').Router();
const {
  getCurrentUser,
} = require('../controllers/users.js');

userRouter.get('/users/me', getCurrentUser);

module.exports = userRouter;
