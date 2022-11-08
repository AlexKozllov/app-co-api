const app = require('../app');
const db = require('../db');
const getTransactionsBundle = require('../services/getTransactionsBundle');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

db.then(() => {
  app.listen(PORT, async () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
    getTransactionsBundle();
  });
}).catch((err) => {
  console.log(`Server not running. Erroe message: ${err.message}`);
});
