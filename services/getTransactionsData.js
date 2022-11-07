const axios = require('axios');
const rateLimit = require('axios-rate-limit');
require('dotenv').config();
const { API_KEY } = process.env.API_KEY;
const BASE_URL = 'https://api.etherscan.io/api';

const http = rateLimit(axios.create({ baseURL: BASE_URL }), {
  maxRPS: 1,
});

const getLastBlock = async () => {
  //   await sleep(200);
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
  //   await sleep(200);
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
