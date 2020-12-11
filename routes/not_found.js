const notFoundRouter = require('express').Router();
const {
  notFound,
} = require('../controllers/not_found.js');

notFoundRouter.all('*', notFound);

module.exports = notFoundRouter;
