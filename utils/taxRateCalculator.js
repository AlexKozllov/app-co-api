const etherConverter = require('ether-converter');
const { hexToDec } = require('./hexConverter');

const taxRateCalculator = (gas, gasPrice) => {
  const taxRate = hexToDec(gasPrice) * hexToDec(gas);
  return Number(etherConverter(taxRate, 'wei', 'ether')).toFixed(10);
};

module.exports = taxRateCalculator;
