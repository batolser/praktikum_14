
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/index');

const { PORT = 3000 } = process.env;
const app = express();


const {
  createUser, login,
} = require('./controllers/users');

const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');

console.log(config);


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
// app.use((req, res, next) => {
//   req.user = {
//     _id: '5ea322fcd13b8b131679ad40',
//   };

//   next();
// });

app.post('/signup', createUser);
app.post('/signin', login);

app.use('/', cardsRouter);
app.use('/', usersRouter);

app.use('/', (req, res) => {
  res.status(404).json({ err: 'Запрашиваемый ресурс не найден' });
});

app.use('/', (err, req, res, next) => { // eslint-disable-line
  const status = err.status || 500;
  let { message } = err;
  if (err.name === 'ValidationError') {
    //  res.status(400).send(`Ошибка валидации:\n${err.message}`);
    return res.status(400).json({ err: `Ошибка валидации:\n${err.message}` });
  }

  if (status === 500) {
    console.error(err.stack || err);
    message = 'Приозошла ошибка';
  }

  // res.status(status).send(message); изменяю это на строку ниже
  res.status(status).json({ err: message });
  next();
});

app.listen(PORT, () => {
  console.log(`Server started in ${PORT}`);
});
