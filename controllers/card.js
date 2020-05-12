const Card = require('../models/card');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      next(err);
    });
};

module.exports.createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      next(err);
    });
};

module.exports.getCardMiddleware = (req, res, next) => { // eslint-disable-line
  return Card.findById({
    _id: req.params.cardId,
  })
    .then((card) => { // eslint-disable-line
      if (!card) {
        return next({ status: 404, message: 'Карточка не найдена' });
      }

      // req.card = card;
      next();
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      next(err);
    });
};
