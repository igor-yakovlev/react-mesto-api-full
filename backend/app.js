const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const NotFoundError = require('./errors/not-found-err');
const error = require('./middlewares/error');
const { errorLogger, requestLogger } = require('./middlewares/logger');
require('dotenv').config();

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(cors({ origin: ['http://localhost:3001'], credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(requestLogger);

app.use(userRouter);
app.use(cardRouter);

app.use(errorLogger);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Такого запроса нет'));
});

app.use(errors());
app.use(error);

app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT} порту`);
});
