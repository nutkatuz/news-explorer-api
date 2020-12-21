# Бэкенд для проекта News explorer

### Описание проекта

К API можно обратиться по доменному имени:
```
api.tesla.students.nomoredomains.icu
www.api.tesla.students.nomoredomains.icu
```
фронт:
```
http://tesla.students.nomoredomains.icu/
https://tesla.students.nomoredomains.icu/
```
Это API отвечает только за сохранение статей и авторизацию. Для поиска статей будет использовано стороннее API. 

### Используемые технологии

REST API
Node.js
Express
MongoDB (название БД - "news")

### Запуск

```
npm install
npm start
```

<!-- 178.154.228.91
myfifthattempt.students.nomoredomains.icu www.myfifthattempt.students.nomoredomains.icu
api.myfifthattempt.students.nomoredomains.icu www.api.myfifthattempt.students.nomoredomains.icu
nomore.students.nomoredomains.icu www.nomore.students.nomoredomains.icu
api.nomore.students.nomoredomains.icu www.api.nomore.students.nomoredomains.icu


// не используется
.regex(/^http[s]?:\/\/\w+/)

const ValidationError = require('../errors/ValidationError');
const errors = require('../errors/errors');

const checkPassword = (req, res, next) => {
  const { password } = req.body;

  if (!password.trim() || password.trim().length < 8) {
    throw new ValidationError(errors.noPassword);
  } else {
    next();
  }
};

module.exports = checkPassword;

 -->
