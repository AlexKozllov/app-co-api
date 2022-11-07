const hexConverter = {
  decToHex: (dec) => `0x${dec.toString(16)}`,

  hexToDec: (hex) => parseInt(hex, 16),
};

module.exports = hexConverter;
