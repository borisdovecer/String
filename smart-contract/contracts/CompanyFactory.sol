// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "./companies/Generic/Company.sol";
import "./companies/Generic/Repository.sol";
import "./Minter.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CompanyFactory is Ownable {
    address[] private companies;
    uint64 private companyCounter = 0;
    address private registry;
    Minter private minter;

    constructor() {}

    // This is used to initialize the factory when it is first run. This functionality will be moved to the constructor in an real environment.
    function initialize(address _registry) external onlyOwner {
        registry = _registry;
        minter = new Minter();
    }

    //address _model, address _minter, string memory _name, uint64 _id
    function createCompany(string memory _companyName) public onlyOwner {
        Repository repository = new Repository();
        Company newCompany = new Company(
            address(repository),
            address(minter),
            _companyName,
            companyCounter
        );
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
