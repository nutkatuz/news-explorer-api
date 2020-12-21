const Article = require('../models/article');
const errors = require('../errors/errors');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const ForbiddenError = require('../errors/ForbiddenError');

const getArticles = async (req, res, next) => {
  try {
    const articles = await Article.find({});
    if (!articles) {
      throw new ValidationError('Ошибка на сервере при поиске карточек');
    }
    res.status(200).send(articles);
  } catch (err) {
    next(err);
  }
};

const postArticle = (req, res, next) => {
  const ownerId = req.user._id;
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: ownerId,
  }).then((card) => res.status(201).send(card))
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
    const cardToCompare = await Article.findById(req.params._id);
    if (!cardToCompare) {
      throw new NotFoundError(errors.noArticle);
    } else if (currentUser !== cardToCompare.owner.toString()) {
      throw new ForbiddenError(errors.forbidden);
    }
    const newCard = await Article.findByIdAndRemove(req.params._id);
    res.status(200).send(newCard);
  } catch (err) {
    next(err);
  }
};

const getArticleById = (req, res, next) => {
  Article.findById(req.params._id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Нет карточки с таким id');
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
