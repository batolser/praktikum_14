
const cardsRouter = require('express').Router(); // создали роутер
const {
  getCards, createCard, getCardMiddleware, deleteCard,
} = require('../controllers/card');

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', createCard);
cardsRouter.delete('/cards/:cardId', getCardMiddleware, deleteCard);

module.exports = cardsRouter;
