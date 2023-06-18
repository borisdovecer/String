require("@nomiclabs/hardhat-waffle");
require('dotenv').config({ path: __dirname + '/.env' })

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const API_URL = process.env.API_URL;
const POLYGON_TESTNET_URL = process.env.POLYGON_TESTNET_URL; // Add this line

module.exports = {
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    },
  },
  networks: {
    sepolia: {
      url: API_URL,
      accounts: [PRIVATE_KEY],
      gasPrice: 20000000000
    },
    mumbai: { // Add this configuration for Polygon's Mumbai testnet
      url: POLYGON_TESTNET_URL,
      accounts: [PRIVATE_KEY],
      gasPrice: 20000000000
    }
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};