const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwtSign = require('../helpers/jwt-sign');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

const getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  return User.findOne({ _id })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.status(200).send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ConflictError({ message: 'не заполнены поля формы регистрации' });
  }
  User
    .findOne({ email })
    .then((user) => {
      if (user) {
        return next(new ConflictError('Пользователь с таким email уже зарегистрирован'));
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({ email, password: hash })
      .then(({ _id }) => res.status(200).send({ email, _id })))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => { // +проверка в модели
      const token = jwtSign(user);
      res.send({ token });
    })
    .catch(next);
};

module.exports = {
  getCurrentUser,
  createUser,
  login,
};
