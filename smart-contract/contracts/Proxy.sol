// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./Registry.sol";

contract Proxy {
    address public registry;
    string public name;
    uint64 waste;

    constructor() {}

    function setRegistry(address _registry, string memory _name) external {
        registry = _registry;
        name = _name;
    }

    function getWaste() view external returns(uint64) {
        return waste;
    }

    fallback() external payable {
        address companyContract = Registry(registry).getCompanyForEmployee(
            msg.sender
        );
        require(
            companyContract != address(0),
            "Company contract address not found in Registry"
        );

        bytes4 functionSignature = msg.sig;
        bytes4 addEmployeeSignature = bytes4(keccak256("addEmployee(address)"));
        bool success;
        bytes memory returnData;

        // If the function call was addEmployee, update the registry
        if (functionSignature == addEmployeeSignature) {
            (success, returnData) = companyContract.delegatecall(msg.data);
            require(success, "Delegate call failed");
            address newEmployeeAddress = abi.decode(returnData, (address)); // Assuming the return data is the employee's address
            Registry(registry).addEmployee(newEmployeeAddress, 0);
        } else {
            // For any other function, delegate the call to the Company contract
            (success, returnData) = companyContract.delegatecall(msg.data);
            require(success, "Delegate call to Company contract failed");
        }
    }

    receive() external payable {}
}
/*
    TODO:
    Fetch the company ID of the msg.sender and pass it to addEmployee
*/
