const { celebrate, Joi } = require('celebrate');
const { default: validator } = require('validator');
const errors = require('../errors/errors');

const signup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().trim().email()
      .message(errors.invalEmail)
      .messages({
        'string.empty': errors.noEmail,
        'any.required': errors.noEmail,
      }),
    password: Joi.string().required().trim().min(8)
      .messages({
        'string.empty': errors.noPassword,
        'any.required': errors.noPassword,
        'string.min': errors.minPassword,
      }),
    name: Joi.string().required().trim().messages({
      'string.empty': errors.noName,
      'any.required': errors.noName,
    }),
  }),
});

const signin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'string.empty': errors.noEmail,
      'any.required': errors.noEmail,
      // 'valid': 'jq',
    }),
    password: Joi.string().required().trim().min(8)
      .messages({
        'string.empty': errors.noPassword,
        'any.required': errors.noPassword,
        'string.min': errors.minPassword,
      }),
  }),
}, { abortEarly: false });

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
    description: Joi.string().required().trim().messages({
      'string.empty': errors.joiMsg('текст статьи'),
      'any.required': errors.joiMsg('текст статьи'),
    }),
    publishedAt: Joi.date().required().messages({
      'string.empty': errors.joiMsg('дата создания статьи'),
      'any.required': errors.joiMsg('дата создания статьи'),
    }),
    source: Joi.string().required().trim().messages({
      'string.empty': errors.joiMsg('источник статьи'),
      'any.required': errors.joiMsg('источник статьи'),
    }),
    url: Joi.string().required().trim().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(errors.invalUrl('статью'));
    })
      .messages({
        'string.empty': errors.joiMsg('ссылка на статью'),
        'any.required': errors.joiMsg('ссылка на статью'),
      }),
    urlToImage: Joi.string().required().trim().custom((value, helpers) => {
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
}, { abortEarly: false });

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
