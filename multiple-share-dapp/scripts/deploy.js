// scripts/deploy.js

const hre = require("hardhat");

async function main() {
  // Get the contract to deploy
  const MultipleSend = await hre.ethers.getContractFactory("MultipleSend");
  const multipleSend = await MultipleSend.deploy();

  await multipleSend.deployed();

  console.log("MultipleSend deployed to:", multipleSend.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
