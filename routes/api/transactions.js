const express = require('express');
// const { ctrlWrapper } = require('../../middlewares');
// const { transactions: ctrl } = require('../../controllers');
const router = express.Router();

// router.get('/', ctrlWrapper(ctrl.getTransactions));
router.get('/', (req, res, next) => {
  console.log('sucsses');
});

module.exports = router;
