const authRouter = require('express').Router();
const checkPassword = require('../middlewares/checkPassword');
const celebrateValid = require('../middlewares/celebrateValid');

const {
  createUser,
  login,
} = require('../controllers/users.js');

authRouter.post('/signup', checkPassword, celebrateValid.signup, createUser);
authRouter.post('/signin', checkPassword, celebrateValid.signin, login);

module.exports = authRouter;
