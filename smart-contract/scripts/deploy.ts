const hre = require("hardhat");
const { ethers } = hre;

async function main(): Promise<void> {

    const accounts = await ethers.getSigners()
    const deployer = accounts[0]

    console.log('Deploying the contract with the account:', deployer.address)

    const StringCoin = await ethers.getContractFactory('StringCoin');
    const StringNFT = await ethers.getContractFactory('StringNFT');
    const Rewards = await ethers.getContractFactory('Rewards');
    const Registry = await ethers.getContractFactory('Registry');
    const CompanyFactory = await ethers.getContractFactory('CompanyFactory');

    const stringCoin = await StringCoin.deploy()
    await stringCoin.deployed()
    console.log('StringCoin contract deployed to:', stringCoin.address)

    const stringNft = await StringNFT.deploy()
    await stringNft.deployed()
    console.log('StringNFT contract deployed to:', stringNft.address)

    const rewards = await Rewards.deploy(stringCoin.address, stringNft.address)
    await rewards.deployed()
    console.log('Rewards contract deployed to:', rewards.address)

    const registry = await Registry.deploy()
    await registry.deployed()
    console.log('Registry contract deployed to:', registry.address)

    const companyFactory = await CompanyFactory.deploy(registry.address, stringCoin.address, rewards.address, stringNft.address)
    await companyFactory.deployed()
    console.log('CompanyFactory contract deployed to:', companyFactory.address)
  
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
