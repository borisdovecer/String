// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "./Repository.sol";

contract Company {
    Repository private repository;
    string name;
    uint64 id;

    constructor(address _model, string memory _name, uint64 _id) {
        repository = Repository(_model);
        name = _name;
        id = _id;
    }

    function addEmployee(address _employee, uint64 _companyId) public returns (uint64) {
        repository.addEmployee(_employee, _companyId);
        return id;
    }

    function incrementNumber() public{
    }

    function getNumber() public view returns (uint64) {
    }
} 