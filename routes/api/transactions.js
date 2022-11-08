const express = require('express');
const {
  getAllTransactions,
} = require('../../controllers/transactionsController');
const { validateGetTransactions } = require('../../validation/requesValidator');

const router = express.Router();

router.get('/', validateGetTransactions, getAllTransactions);

module.exports = router;
