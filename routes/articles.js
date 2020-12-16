const articleRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getArticles, // возвращает все сохранённые пользователем статьи
  postArticle, // создаёт статью с переданными в теле
  // keyword, title, text, date, source, link и image
  deleteArticle, // удаляет сохранённую статью  по _id
} = require('../controllers/articles.js');

articleRouter.get('/articles', getArticles);

articleRouter.post('/articles', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(/^http[s]?:\/\/\w+/),
  }),
}), postArticle);

articleRouter.delete('/articles/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex(),
  }),
}), deleteArticle);

module.exports = articleRouter;
