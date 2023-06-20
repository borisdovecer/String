// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./Registry.sol";

contract Proxy {
    address public registry;
    string public name;

    constructor() {}

    function setRegistry(address _registry, string memory _name) external {
        registry = _registry;
        name = _name;
    }

    fallback() external payable {
        address companyContract = Registry(registry).getCompanyForEmployee(msg.sender);
        bytes4 functionSignature = msg.sig;
        bytes4 addEmployeeSignature = bytes4(keccak256("addEmployee(address)"));
        bool success;
        bytes memory returnData;

        // Currently non-functional. Missing default delegate. Finish ASAP
        // If the function call was addEmployee, update the registry
        if (functionSignature == addEmployeeSignature) {
            (success, returnData) = companyContract.delegatecall(msg.data);
            require(success, "Delegate call failed");
            address newEmployeeAddress = abi.decode(returnData, (address)); // Assuming the return data is the employee's address
            Registry(registry).addEmployee(newEmployeeAddress, 0); 
        // call registry contract method to add the new employee
        }
}

    receive() external payable {}
}
/*
    TODO:
    Fetch the company ID of the msg.sender and pass it to addEmployee
*/