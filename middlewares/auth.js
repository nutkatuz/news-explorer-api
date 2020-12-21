const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const errors = require('../errors/errors');
const { devJWT } = require('../helpers/devConsts');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(errors.unauthorized);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : `${devJWT}`);
  } catch (err) {
    throw new UnauthorizedError(errors.unauthorized);
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  next();
};
