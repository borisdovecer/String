// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Minter is ERC721 {
    uint128 private _tokenCounter = 0;

    constructor() ERC721("MyERC721Token", "MET") {

    }   

    function createToken(address _sender) public returns (uint128) {
        _tokenCounter += 1;
        _mint(_sender, _tokenCounter);

        return _tokenCounter;
    }

    function buy() external{

    }

}
