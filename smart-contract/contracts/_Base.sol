// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./_StringModel.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

abstract contract BaseContract is StringModel {

    uint16 public constant MAX_MINT_AMOUNT = 1000;
    Counters public counters;

    constructor(){
        counters.companyCount = 0;
        counters.productCount = 0;
        counters.employeeCount = 0;
        counters.tokenIdCount = 0;
    }
}