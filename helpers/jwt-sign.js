const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const jwtSign = (user) => jwt.sign({ _id: user._id },
  NODE_ENV === 'production' ? JWT_SECRET : 'admin-secret', { expiresIn: '7d' });

module.exports = jwtSign;
