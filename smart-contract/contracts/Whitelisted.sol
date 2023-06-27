// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract Whitelisted {
    mapping(address => bool) private whitelisted;

    constructor(address _companyContract) {
        whitelisted[_companyContract] = true;
    }

    modifier onlyWhitelisted() {
        require(whitelisted[msg.sender], "Only whitelisted addresses can call this function");
        _;
    }
}
