const Article = require('../models/article');
const errors = require('../errors/errors');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const ForbiddenError = require('../errors/ForbiddenError');

const getArticles = async (req, res, next) => {
  try {
    const articles = await Article.find({}).populate('user');
    if (!articles) {
      throw new ValidationError(errors.noArticles);
    }
    res.send(articles);
  } catch (err) {
    next(err);
  }
};

const postArticle = (req, res, next) => {
  const {
    keyword,
    title,
    description,
    publishedAt,
    source,
    url,
    urlToImage,
  } = req.body;
  Article.create({
    keyword,
    title,
    description,
    publishedAt,
    source,
    url,
    urlToImage,
    owner: req.user._id,
  }).then((article) => {
    const data = article.toJSON();
    delete data.owner;
    res.status(201).send(data);
  })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidationError(`${Object.values(err.errors).map((error) => error.message).join('!!! ')}`);
      } // не работает
    })
    .catch(next);
};

const deleteArticle = async (req, res, next) => {
  try {
    const currentUser = req.user._id;
    const article = await Article.findById(req.params._id).select('+owner');
    if (!article) {
      throw new NotFoundError(errors.noArticle);
    } else if (currentUser !== article.owner.toString()) {
      throw new ForbiddenError(article);
    }
    article.remove();
    res.send(article);
  } catch (err) {
    next(err);
  }
};

const getArticleById = (req, res, next) => {
  Article.findById(req.params._id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(errors.noArticle);
      }
      return res.send(card);
    })
    .catch(next);
};

const likeArticle = (req, res, next) => {
  Article.findByIdAndUpdate(req.params._id, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(new NotFoundError(errors.noArticle))
    .then((card) => {
      res.send(card);
    })
    .catch(next);
};

const dislikeArticle = (req, res, next) => {
  Article.findByIdAndUpdate(
    req.params._id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError(errors.noArticle))
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

module.exports = {
  getArticles,
  postArticle,
  deleteArticle,
  getArticleById,
  likeArticle,
  dislikeArticle,
};
