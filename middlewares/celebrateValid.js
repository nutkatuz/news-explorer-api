const { celebrate, Joi } = require('celebrate');

const signup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const signin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const postArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.date().required(),
    source: Joi.string().required(),
    link: Joi.string().required().regex(/^http[s]?:\/\/\w+/),
    image: Joi.string().required().regex(/^http[s]?:\/\/\w+/),
  }),
});

const deleteArticle = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex(),
  }),
});

module.exports = {
  signup,
  signin,
  postArticle,
  deleteArticle,
};
