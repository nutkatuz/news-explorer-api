const ValidationError = require('../errors/ValidationError');
const errors = require('../errors/errors');

const checkPassword = (req, res, next) => {
  const { password } = req.body;

  if (!password || !password.trim() || !password.trim().length < 8) {
    throw new ValidationError(errors.noPassword);
  } else {
    next();
  }
};

module.exports = checkPassword;
