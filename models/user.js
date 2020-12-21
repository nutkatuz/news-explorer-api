const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const mongoose = require('mongoose');
const UnauthorizedError = require('../errors/UnauthorizedError');
const errors = require('../errors/errors');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Обязательно введите почту'],
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
    },
  },

  password: {
    type: String,
    required: [true, 'Не установлен пароль'],
    select: false,
  },

  name: {
    type: String,
    minlength: [2, 'Минимальная длина имени - 2 символа'],
    maxlength: [30, 'Максимельная длина имени - 30 символов'],
  },
});

// Собственные методы моделей Mongoose для контроллера логина, 401
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(errors.unauthorizedEmail));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(errors.mismatch));
          }
          return user; // теперь user доступен
        });
    });
};

module.exports = mongoose.model('user', userSchema);
