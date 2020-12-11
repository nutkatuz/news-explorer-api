// const bcrypt = require('bcryptjs');
// const UnauthorizedError = require('../errors/UnauthorizedError');
const isEmail = require('validator/lib/isEmail');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
    },
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },
});

// Собственные методы моделей Mongoose для контроллера логина, 401
// eslint-disable-next-line func-names
// userSchema.statics.findUserByCredentials = function (email, password) {
//   return this.findOne({ email }).select('+password')
//     .then((user) => {
//       if (!user) {
//         return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
//       }
//       return bcrypt.compare(password, user.password)
//         .then((matched) => {
//           if (!matched) {
//             return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
//           }
//           return user; // теперь user доступен
//         });
//     });
// };

module.exports = mongoose.model('userModel', userSchema);
