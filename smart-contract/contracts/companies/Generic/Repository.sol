// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./Model.sol";

contract Repository is Model {

    Counters public counters;

    constructor(){
        counters.companyCount = 0;
        counters.productCount = 0;
        counters.employeeCount = 0;
        counters.tokenIdCount = 0;
    }

   function addEmployee(address _employee, uint64 _companyId) external{
        employees[_employee] = Employee(_employee, _companyId);
        counters.employeeCount++;
   }
}