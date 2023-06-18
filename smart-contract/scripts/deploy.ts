const hre = require("hardhat");
const { ethers } = hre;

async function main() {
  // Get the Contract Factory
  const StringNFT = await ethers.getContractFactory('StringNFT')

  // Signers represent Ethereum accounts
  // When running hardhat locally, the accounts will be local and unlocked
  const accounts = await ethers.getSigners()
  const deployer = accounts[0]

  console.log('Deploying the contract with the account:', deployer.address)

  // We get the contract to deploy
  const contract = await StringNFT.deploy()
  await contract.deployed()

  console.log('Contract deployed to:', contract.address)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
