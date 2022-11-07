const hexConverter = require('../utils/hexConverter');
const { getBlockByNumber, getLastBlock } = require('./getTransactionsData');

const getTransactionsBundle = async () => {
  const lastBlock = await getLastBlock();
  console.log(lastBlock);

  const lastBlockNumber = hexConverter.hexToDec(lastBlock);
  console.log(lastBlockNumber);
  const startBlockNumber = hexConverter.decToHex(lastBlock - 1000);
  console.log(startBlockNumber);

  return;
};

module.exports = getTransactionsBundle;
