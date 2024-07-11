// require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config(); // Load environment variables

module.exports = {
  solidity: "0.8.24", // Adjust Solidity version based on your contract's requirements
  networks: {
    sepolia: {
      url: process.env.ALCHEMY_API_URL || 'https://eth-sepolia.g.alchemy.com/v2/6Pl-daQfyQ54PDPmdEzY9XJqNdybcgt_', 
      accounts: [process.env.PRIVATE_KEY || '2b9d9ca705077cb5c96aa42132887a4931fb879e40279a2918d7fc24694aacb9'],
      chainId: 11155111, // Sepolia chain ID
    },
  },
  
  
};
