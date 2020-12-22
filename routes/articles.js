const articleRouter = require('express').Router();
const { isCelebrateError } = require('celebrate');
const celebrateValid = require('../middlewares/celebrateValid');

const {
  getArticles, // возвращает все сохранённые пользователем статьи
  postArticle,
  deleteArticle,
} = require('../controllers/articles.js');

articleRouter.get('/articles', getArticles);
articleRouter.post('/articles',
  celebrateValid.postArticle,
  (err, req, res, next) => {
    if (!isCelebrateError(err)) return next(err);
    const errorBody = err.details.get('body');
    return res.status(400).send({ message: errorBody.message });
  }, postArticle);

articleRouter.delete('/articles/:_id', celebrateValid.deleteArticle, deleteArticle);

module.exports = articleRouter;
