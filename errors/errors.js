const noUser = 'Нет пользователя с таким id';
const noResource = 'Запрашиваемый ресурс не найден';
const noName = 'Заполните графу "имя", пожалуйста';
const noPassword = 'Заполните пароль, пожалуйста (не менее 8 символов)';
const minPassword = 'Минимальная длина пароля - 8 символов';
const noEmail = 'Укажите почту верно, пожалуйста';
const conflictEmail = 'Пользователь с таким email уже зарегистрирован';
const mismatch = 'Неправильные почта или пароль, проверьте введённые данные';
const unauthorizedEmail = 'Не зарегистрирован пользователь с таким email';
const unauthorized = 'Нет прав доступа, пожалуйста, авторизуйтесь';
const noArticle = 'Нет заметки с таким id';
const forbiddenDel = 'Нет прав на удаление';
const noArticles = 'Не найдено ни одной карточки';
const invalEmail = 'Поле "email" должно быть валидным email-адресом';
const invalUrl = (value) => `Некорректная ссылка на "${value}"`;
const joiMsg = (value) => `Не заполнено поле "${value}"`;

module.exports = {
  conflictEmail,
  forbiddenDel,
  invalEmail,
  invalUrl,
  joiMsg,
  mismatch,
  noUser,
  noName,
  noEmail,
  noResource,
  noArticle,
  noArticles,
  noPassword,
  minPassword,
  unauthorizedEmail,
  unauthorized,
};
