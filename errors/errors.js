const noUser = 'Нет пользователя с таким id';
const noResource = 'Запрашиваемый ресурс не найден';
const noData = 'Не заполнены одно или несколько полей формы';
const noName = 'Заполните графу "имя", пожалуйста';
const noPassword = 'Заполните пароль, пожалуйста (не менее 8 символов)';
const minPassword = 'Минимальная длина пароля - 8 символов';
const noEmail = 'Укажите почту, пожалуйста';
const conflictEmail = 'Пользователь с таким email уже зарегистрирован';
const mismatch = 'Неправильные почта или пароль, проверьте введённые данные';
const unauthorizedEmail = 'Не зарегистрирован пользователь с таким email';
const unauthorized = 'Нет прав доступа, пожалуйста, авторизуйтесь';
const noArticle = 'Нет заметки с таким id';
const forbidden = 'Нет прав на удаление';
const noArticles = 'Не найдено ни одной карточки';

module.exports = {
  noUser,
  noResource,
  noData,
  conflictEmail,
  mismatch,
  unauthorizedEmail,
  unauthorized,
  noArticle,
  forbidden,
  noArticles,
  noPassword,
  minPassword,
  noEmail,
  noName,
};
