// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "./companies/Generic/Company.sol";
import "./companies/Generic/Repository.sol";

contract CompanyFactory {
    address[] public companies;
    uint64 public companyCounter;
    address private registry;

    constructor( ) {
        
    }

    // This is used to initialize the factory when it is first run. This functionality will be moved to the constructor in an real environment.
    function setRegistry(address _registry) external{
        registry = _registry;
    }

    function createCompany(string memory companyName) external{
        Repository repository = new Repository();
        Company newCompany = new Company(address(repository), companyName, companyCounter + 1);
        (bool success, ) = registry.call(abi.encodeWithSignature("createCompany(address)", address(newCompany)));
        require(success, "Failed to add company to the registry");
        companyCounter++;
    } 

    function updateCompanyImplementation(address _oldAddress, address _newAddress) external{
        // 1. get the company whose contract you are swapping
        // 2. extract its model address
        // 3. The upgraded company contract should already be deployed. Take its address and swap it in place of the old one
    }

    function getCompanies() external view returns (address[] memory) {
        return companies;
    }  
}