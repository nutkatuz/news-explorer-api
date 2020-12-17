const router = require('express').Router();
const auth = require('../middlewares/auth');
const articleRouter = require('./articles');
const authsRouter = require('./auths');
const notFoundRouter = require('./not_found');
const userRouter = require('./users');

router.use(authsRouter);
router.use(auth);
router.use('/', userRouter);
router.use('/', articleRouter);
router.use('/', notFoundRouter);

module.exports = router;
