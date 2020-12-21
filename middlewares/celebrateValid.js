const { celebrate, Joi } = require('celebrate');
const errors = require('../errors/errors');

const signup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('Поле "email" должно быть валидным email-адресом')
      .messages({
        'any.required': errors.noEmail,
      }),
    password: Joi.string().required().min(8).messages({
      'any.required': errors.noPassword, // почему-то переопределяет только при null, а не ""
      'string.min': errors.minPassword,
    }),
    name: Joi.string().required().messages({
      'any.required': errors.noName,
    }),
  }),
});

const signin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'any.required': errors.noEmail,
    }),
    password: Joi.string().required().min(8).messages({
      'string.min': errors.minPassword,
      'any.required': 'errors.noPassword',
    }),
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
