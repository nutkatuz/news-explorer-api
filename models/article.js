const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (url) => validator.isURL(url),
      message: (props) => `Невалидная ссылка на картинку: ${props.value}`,
    },
  },
  image: {
    type: String,
    required: [true, 'Нет ссылки на иллюстрацию к статье'],
    validate: {
      validator: (url) => validator.isURL(url),
      message: (props) => `Невалидная ссылка на картинку: ${props.value}`,
    },
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: [true, 'Нет пользователя, сохранившего статью'],
    select: false,
  },
}, { versionKey: false }); // строка с вебинара

module.exports = mongoose.model('article', articleSchema);
