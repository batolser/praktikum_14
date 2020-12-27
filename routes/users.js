/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

const usersRouter = require('express').Router(); // создали роутер
const {
  getUsers, getUserById,
} = require('../controllers/users');

const auth = require('../middlewares/auth');


usersRouter.get('/users', auth, getUsers);
usersRouter.get('/users/:userId', auth, getUserById);


module.exports = usersRouter; // экспортировали роутер
