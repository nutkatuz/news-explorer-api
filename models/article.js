const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: [true, 'Не указаны ключевые слова'],
  },
  title: {
    type: String,
    required: [true, 'Нет заголовка статьи'],
  },
  text: {
    type: String,
    required: [true, 'Нет текста статьи'],
  },
  date: {
    type: Date,
    default: Date.now(),
    required: [true, 'Нет даты создания статьи'],
  },
  source: {
    type: String,
    required: [true, 'Не указан источник статьи'],
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (url) => validator.isURL(url),
      message: (props) => `запрос не соответствует схеме: Неправильная ссылка на статью: ${props.value}`,
    },
  },
  image: {
    type: String,
    required: [true, 'Нет ссылки на иллюстрацию к статье'],
    validate: {
      validator: (url) => validator.isURL(url),
      message: (props) => `запрос не соответствует схеме: Неправильная ссылка на иллюстрацию: ${props.value}`,
    },
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: [true, 'Нет данных пользователя, сохранившего статью'],
    select: false,
  },
}, { versionKey: false }); // строка с вебинара Сергей Буртылёв

module.exports = mongoose.model('article', articleSchema);
