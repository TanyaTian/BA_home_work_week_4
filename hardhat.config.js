
require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-etherscan");

require("./tasks/task")
require('dotenv').config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.17",


    viaIR: true,
    settings: {
      optimizer: {

        enabled: true,
        runs: 200
      }, outputSelection: {
        "*": {
          "*": ["evm.assembly", "irOptimized"],
        }
      }
    }
  },

  defaultNetwork: "BSCTest",
  networks: {
    BSCTest: {
      url: "https://bsc-testnet.public.blastapi.io",
      accounts: [process.env.PRIVATE_KEY_0],

    },
  },
  etherscan: {
    apiKey: "BFXRGSFY8PAH1GY3S8N1A6CM7BVEG8S68J", // Your Etherscan API key
  }
};

// "*":{
//   "*":["evm.assembly","irOptimized"],
// }
