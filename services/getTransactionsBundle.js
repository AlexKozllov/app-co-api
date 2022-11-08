const etherConverter = require('ether-converter');
const dayjs = require('dayjs');

const TransactionsModel = require('../models/transactions');
const { getBlockByNumber, getLastBlock } = require('./getTransactionsData');
const taxRateCalculator = require('../utils/taxRateCalculator');
const { hexToDec, decToHex } = require('../utils/hexConverter');

const getTransactions = async (lastBlockNumber, endBlockNumber) => {
  await TransactionsModel.deleteMany({
    blockNumber: { $lt: endBlockNumber },
  });

  for (let i = lastBlockNumber; i > endBlockNumber; i--) {
    const currentBlock = await getBlockByNumber(decToHex(i));
    // console.log(currentBlock);

    await Promise.all(
      currentBlock.transactions.map(async (item) => {
        // console.log(item);
        if (item.to) {
          try {
            await TransactionsModel.create({
              blockNumber: hexToDec(item.blockNumber),
              transactionId: item.hash,
              senderAdress: item.from,
              recipAdress: item.to,
              blockConfirmations: hexToDec(item.transactionIndex),
              date: dayjs
                .unix(hexToDec(currentBlock.timestamp))
                .format('MMM-DD-YYYY'),
              value: Number(
                etherConverter(hexToDec(item.value), 'wei', 'ether')
              ).toFixed(10),
              transactionFee: taxRateCalculator(item.gas, item.gasPrice),
            });
          } catch (error) {
            console.log(error);
          }
        }
      })
    );
    if (i === endBlockNumber + 1) {
      return endBlockNumber;
    }
  }
};

const getTransactionsBundle = async (lastAddedBlock = 1) => {
  const lastBlock = await getLastBlock();
  const lastBlockNumber = hexToDec(lastBlock);
  const endBlockNumber = lastBlockNumber - 1000;
  console.log('endBlockNumber: ', endBlockNumber);
  console.log('lastAddedBlock: ', lastAddedBlock);

  const endHexBlockNumber = decToHex(endBlockNumber);
  let lastAddedToDBBlock;
  if (endBlockNumber !== lastAddedBlock) {
    lastAddedToDBBlock = await getTransactions(lastBlockNumber, endBlockNumber);
    console.log('lastAddedToDBBlock: ', lastAddedToDBBlock);
    await getTransactionsBundle(lastAddedToDBBlock);
  } else {
    // if (lastAddedToDBBlock) {
    await getTransactionsBundle(lastAddedToDBBlock || endBlockNumber);
    // }
  }
};

const transactionsLoop = () => {};

module.exports = getTransactionsBundle;
