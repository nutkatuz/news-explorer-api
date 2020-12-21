const { celebrate, Joi } = require('celebrate');
const { default: validator } = require('validator');
const errors = require('../errors/errors');
// const isURL = require('validator/lib/isURL');

const signup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message(errors.invalEmail)
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
    password: Joi.string().required().trim().min(8)
      .messages({
        'string.min': errors.minPassword,
        'any.required': 'errors.noPassword',
      }),
  }),
});

const postArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().trim().messages({
      'string.empty': errors.joiMsg('ключевые слова'),
      'any.required': errors.joiMsg('ключевые слова'),
    }),
    title: Joi.string().required().trim().messages({
      'string.empty': errors.joiMsg('заголовок'),
      'any.required': errors.joiMsg('заголовок'),
    }),
    text: Joi.string().required().trim().messages({
      'string.empty': errors.joiMsg('текст статьи'),
      'any.required': errors.joiMsg('текст статьи'),
    }),
    date: Joi.date().required().messages({
      'string.empty': errors.joiMsg('дата создания статьи'),
      'any.required': errors.joiMsg('дата создания статьи'),
    }),
    source: Joi.string().required().trim().messages({
      'string.empty': errors.joiMsg('источник статьи'),
      'any.required': errors.joiMsg('источник статьи'),
    }),
    link: Joi.string().required().trim().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(errors.invalUrl('статью'));
    })
      .messages({
        'string.empty': errors.joiMsg('ссылка на статью'),
        'any.required': errors.joiMsg('ссылка на статью'),
      }),
    image: Joi.string().required().trim().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(errors.invalUrl('иллюстрацию'));
    })
      .messages({
        'string.empty': errors.joiMsg('ссылка на иллюстрацию'),
        'any.required': errors.joiMsg('ссылка на иллюстрацию'),
      }),
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
