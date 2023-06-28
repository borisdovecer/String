// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract StringNFT is ERC721 {
    uint128 private _tokenCounter = 0;

    constructor() ERC721("StringNFT", "STRNFT") {}

    function createToken(address _sender) public returns (uint128) {
        _tokenCounter += 1;
        _mint(_sender, _tokenCounter);

        return _tokenCounter;
    }

    function buy() external {}

    function exists(uint256 tokenId) public view returns (bool) {
        return _exists(tokenId);
    }
}
