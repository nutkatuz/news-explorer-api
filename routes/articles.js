const articleRouter = require('express').Router();
const celebrateValid = require('../middlewares/celebrateValid');

const {
  getArticles, // возвращает все сохранённые пользователем статьи
  postArticle,
  deleteArticle,
} = require('../controllers/articles.js');

articleRouter.get('/articles', getArticles);
articleRouter.post('/articles', celebrateValid.postArticle, postArticle);
articleRouter.delete('/articles/:_id', celebrateValid.deleteArticle, deleteArticle);

module.exports = articleRouter;
