// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Registry {
    mapping(uint64 => address) public companies;
    mapping(address => uint64) public employeeToCompany;
    uint64 public numOfCompanies = 0;

    function addEmployee(address employee, uint64 companyId) public {
        employeeToCompany[employee] = companyId;
    }

    function getCompanyForEmployee(address employee) public view returns (address) {
        uint64 companyId = employeeToCompany[employee];
        return companies[companyId];
    }

    function getCompanyIdForEmployee(address employee) public view returns (uint64) {
        uint64 companyId = employeeToCompany[employee];
        return companyId;
    }

    function createCompany(address companyContract) external {
        companies[numOfCompanies] = companyContract;
        numOfCompanies++;
    }

    function upgradeCompanyContract(uint64 companyId, address newCompanyContract) external {
        companies[companyId] = newCompanyContract;
    }
}
