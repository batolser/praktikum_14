/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */

const usersRouter = require('express').Router(); // создали роутер
const { getUsers, getUserById, createUser } = require('../controllers/users');

usersRouter.get('/users', getUsers);
usersRouter.get('/users/:userId', getUserById);
usersRouter.post('/users', createUser);

module.exports = usersRouter; // экспортировали роутер
