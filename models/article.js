const mongoose = require('mongoose');

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
    validate: {
      validator(v) {
        return /^https?:\/\/(?:[-\w]+\.)?([-\w]+)\.\w+(?:\.\w+)?\/?.#?/i.test(v);
      },
    },
    message: (props) => `A ссылка ${props.value} - невалидна!`,
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator(v) {
        return /^https?:\/\/(?:[-\w]+\.)?([-\w]+)\.\w+(?:\.\w+)?\/?.#?/i.test(v);
      },
    },
    message: (props) => `A ссылка ${props.value} - невалидна!`,
    required: true,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('articleModel', articleSchema);
