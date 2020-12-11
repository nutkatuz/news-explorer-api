const router = require('express').Router();
const articleRouter = require('./articles');
const authsRouter = require('./auths');
const notFoundRouter = require('./not_found');
const userRouter = require('./users');
const auth = require('../middlewares/auth');

router.use(authsRouter);
router.use('/', auth, userRouter);
router.use('/', auth, articleRouter);
router.use(notFoundRouter);

module.exports = router;
