const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const { rateLimit } = require('express-rate-limit');
const rateLimitConfig = require('./config/rateLimitConfig');

const fs = require('fs');
const path = require('path');
const { getAllTransactions } = require('./controllers/transactionsController');
const { ErrorHandler } = require('./helpers/errorHandler');
const { HttpCode } = require('./helpers/constants');
const getTransactionsBundle = require('./services/getTransactionsBundle');
require('dotenv').config();

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

const limiter = rateLimit({
  ...rateLimitConfig,
  handler: (req, res, next) => {
    next(new ErrorHandler(HttpCode.BAD_REQUEST, 'API access limit exceeded'));
  },
});

app.use(limiter);
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// app.use(getTransactionsBundle);

app.use('/api/getAllTransactions', getAllTransactions);

// app.use(express.static(path.join(__dirname, '/public')));

// app.use('*', (req, res) => {
//   let indexHTML = fs.readFileSync(path.join(__dirname, '/public/index.html'), {
//     encoding: 'utf8',
//   });

//   res.contentType('text/html');
//   res.status(200);

//   return res.send(indexHTML);
// });

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
  });
});

module.exports = app;
