const NotFoundError = require('../errors/NotFoundError');

const notFound = () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
};

module.exports = {
  notFound,
};
