const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config');


module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next({ status: 401, message: 'Пожалуйста пройдите авторизацию' });
  }

  // const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next({ status: 401, message: 'Необходима авторизация' });
  }
  req.user = payload;
  return next();
};
