const axios = require('axios');
const rateLimit = require('axios-rate-limit');
require('dotenv').config();
const { API_KEY } = process.env;
const BASE_URL = 'https://api.etherscan.io/api';

const http = rateLimit(axios.create({}), {
  maxRequests: 5,
  perMilliseconds: 1000,
});

const getLastBlock = async () => {
  try {
    const { data } = await http.get('/', {
      baseURL: BASE_URL,
      params: {
        module: 'proxy',
        action: 'eth_blockNumber',
        apikey: API_KEY,
      },
    });
    console.log(data);
    return data.result;
  } catch (error) {
    console.log(error);
  }
};

const getBlockByNumber = async (blockNumber) => {
  try {
    const { data } = await http.get('/', {
      baseURL: BASE_URL,
      params: {
        module: 'proxy',
        action: 'eth_getBlockByNumber',
        tag: blockNumber,
        boolean: true,
        apikey: API_KEY,
      },
    });
    return data.result;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getLastBlock, getBlockByNumber };
