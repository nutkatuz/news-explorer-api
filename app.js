const express = require('express');
const helmet = require('helmet');

const PORT = 3000;
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const { errors } = require('celebrate');
const limiter = require('./middlewares/rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index.js');

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/news', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// подключаем мидлвары, роуты и всё остальное...
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(limiter);
app.use(cors());
app.use(requestLogger);

// все обработчики роутов
app.use('/', routes); // защита роутов - в общем файле для роутов
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // обработчик ошибок celebrate
// централизованный обработчик ошибок
app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ message: err.message });
    return;
  }
  res.status(500).send({ message: err.message });
  next();
}); // дальше нет ничего

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`App listening on port ${PORT}..`));
