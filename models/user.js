const mongoose = require('mongoose');

const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
    validate: {
      validator: (value) => validator.isEmail(value),

    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8,
  },
  name: {
    type: String, // имя — это строка
    required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value),
    },
  },
});

module.exports = mongoose.model('user', userSchema);
