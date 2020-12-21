const jwt = require('jsonwebtoken');
const { devJWT } = require('./devConsts');

const { NODE_ENV, JWT_SECRET } = process.env;

const jwtSign = (user) => jwt.sign({ _id: user._id },
  NODE_ENV === 'production' ? JWT_SECRET : devJWT, { expiresIn: '7d' });

module.exports = jwtSign;
