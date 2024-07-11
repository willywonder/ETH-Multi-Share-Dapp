// scripts/interact.js

require('dotenv').config();
const { ethers } = require('hardhat');

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_API_URL);
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const contractAddress = '0x7714b0Aa400Ea4CAf82a1E6b4A712Af67B39e3c7';
  const abi = [
    // Copy the ABI from the generated artifacts
    {
      "inputs": [
        {
          "internalType": "address payable[]",
          "name": "_addresses",
          "type": "address[]"
        },
        {
          "internalType": "uint256[]",
          "name": "_amounts",
          "type": "uint256[]"
        }
      ],
      "name": "sendETH",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    }
  ];

  const contract = new ethers.Contract(contractAddress, abi, signer);

  // Example addresses and amounts
  const addresses = ['0xAddress1', '0xAddress2'];
  const amounts = [ethers.utils.parseEther('0.1'), ethers.utils.parseEther('0.2')];

  // Calculate the total amount to send
  const totalAmount = amounts.reduce((acc, amount) => acc.add(amount), ethers.BigNumber.from(0));

  const tx = await contract.sendETH(addresses, amounts, { value: totalAmount });
  console.log('Transaction hash:', tx.hash);

  const receipt = await tx.wait();
  console.log('Transaction was mined in block:', receipt.blockNumber);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
