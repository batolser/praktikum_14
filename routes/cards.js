
const cardsRouter = require('express').Router(); // создали роутер
const {
  getCards, createCard, getCardMiddleware, deleteCard,
} = require('../controllers/card');
const auth = require('../middlewares/auth');

cardsRouter.get('/cards', auth, getCards);
cardsRouter.post('/cards', auth, createCard);
cardsRouter.delete('/cards/:cardId', auth, getCardMiddleware, deleteCard);

module.exports = cardsRouter;
