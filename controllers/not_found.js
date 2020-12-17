const errors = require('../errors/errors');
const NotFoundError = require('../errors/NotFoundError');

const notFound = () => {
  throw new NotFoundError(errors.noResource);
};

module.exports = {
  notFound,
};
