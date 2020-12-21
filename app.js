const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/rateLimiter');
const errorHandler = require('./middlewares/handleErrors');
const routes = require('./routes/index.js');
const mongoUrl = require('./helpers/devConsts');
require('dotenv').config();

const app = express();
const { PORT = 3000, MONGO_URL = mongoUrl } = process.env;

// подключаемся к серверу mongo
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// подключаем мидлвары, роуты и всё остальное...
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(requestLogger); // Запросы, отклонённые лимитером, будут добавлены в лог запросов
app.use(limiter);
app.use('/', routes); // защита роутов - в общем файле для роутов
app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler); // централизованный обработчик ошибок. дальше нет ничего

app.listen(PORT, () => console.log(`App listening on port ${PORT}..`));
