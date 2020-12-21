const authRouter = require('express').Router();
const celebrateValid = require('../middlewares/celebrateValid');

const {
  createUser,
  login,
} = require('../controllers/users.js');

authRouter.post('/signup', celebrateValid.signup, createUser);
authRouter.post('/signin', celebrateValid.signin, login);

module.exports = authRouter;
