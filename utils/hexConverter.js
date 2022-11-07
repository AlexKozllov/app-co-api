const hexConverter = {
  decToHex: (dec) => dec.toString(16),

  hexToDec: (hex) => parseInt(hex, 16),
};

module.exports = hexConverter;
