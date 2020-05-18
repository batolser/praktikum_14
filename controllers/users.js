const bcrypt = require('bcryptjs'); // импортируем bcrypt
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { JWT_SECRET } = process.env;

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      next(err);
    });
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => { // eslint-disable-line
      if (!user) {
        return next({ status: 404, message: 'Пользователь с таким  id не найден' });
      }

      res.send({ data: user });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;
  bcrypt.hash(password, 10)

    .then((hash) => User.create({

      email,
      password: hash,
      name,
      about,
      avatar,

    })
      .then((user) => {
        User.findOne({ _id: user._id });
      }))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      next(err);
    });
};


module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  let user;
  User.findOne({ email }).select('+password')
    .then((u) => {
      user = u;
      if (!u) {
        return next({ status: 401, message: 'Неправильные почта или пароль' });
      }

      return bcrypt.compare(password, u.password);
    })
    .then((matched) => {
      if (!matched) {
        return next({ status: 401, message: 'Неправильные почта или пароль' });
      }
      // аутентификация успешна
      return jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    })
    .then((token) => {
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      });
      return res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};
