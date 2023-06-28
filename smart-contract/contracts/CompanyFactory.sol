// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "./companies/Generic/Company.sol";
import "./companies/Generic/Repository.sol";
import "./companies/staking/StakeRepository.sol";
import "./StringNFT.sol";
import "./StringCoin.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CompanyFactory is Ownable {
    address[] private companies;
    uint64 private companyCounter = 0;
    address private registry;
    StringCoin private stringCoin;
    address private stringNFT;
    address private rewardContract;
    bool private isInitialized;

    constructor(address _registry, address _coinContractAddress, address _rewardContract, address _stringNFT) {
        stringCoin = StringCoin(_coinContractAddress);
        registry = _registry;
        stringNFT = _stringNFT;
        rewardContract = _rewardContract;
    }

    //address _model, address _minter, string memory _name, uint64 _id
    function createCompany(string memory _companyName, address _adminAddress) public onlyOwner {
        Repository repository = new Repository();
        Company newCompany = new Company(
            address(repository),
            stringNFT,
            address(stringCoin),
            rewardContract,
            _companyName,
            companyCounter
        );
        newCompany.addEmployee(_adminAddress, companyCounter, "", 10);
        stringCoin.approve(address(newCompany), 1000*10**18);
        StakeRepository stakeRepo = new StakeRepository(address(newCompany));
        newCompany.initializeStakeRepository(address(stakeRepo));
        (bool success, ) = registry.call(
            abi.encodeWithSignature(
                "createCompany(address,address)",
                address(newCompany),
                msg.sender
            )
        );
        require(success, "Failed to add company to the registry");
        companyCounter++;
    }

    function updateCompanyImplementation(
        address _oldAddress,
        address _newAddress
    ) external onlyOwner {
        // 1. get the company whose contract you are swapping
        // 2. extract its model address87
        // 3. The upgraded company contract should already be deployed. Take its address and swap it in place of the old one
    }

    function getCompanies() public view returns (address[] memory) {
        return companies;
    }

    // questionable if this will be used at all.
    // function getNumOfCompanies() public view returns (uint64) {
    //     return companyCounter;
    // }

}
