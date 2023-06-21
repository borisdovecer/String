const hre = require("hardhat");
const { ethers } = hre;

async function main() {
  // Get the Contract Factory
  const Proxy = await ethers.getContractFactory('Proxy');
    const Registry = await ethers.getContractFactory('Registry');
    const CompanyFactory = await ethers.getContractFactory('CompanyFactory');

  // Signers represent Ethereum accounts
  // When running hardhat locally, the accounts will be local and unlocked
  const accounts = await ethers.getSigners()
  const deployer = accounts[0]

  console.log('Deploying the contract with the account:', deployer.address)

  // We get the contract to deploy
  const proxy = await Proxy.deploy()
  await proxy.deployed()

  console.log('Proxy contract deployed to:', proxy.address)

    const registry = await Registry.deploy()
    await registry.deployed()

    console.log('Registry contract deployed to:', registry.address)

    const companyFactory = await CompanyFactory.deploy()
    await companyFactory.deployed()

    console.log('CompanyFactory contract deployed to:', companyFactory.address)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
