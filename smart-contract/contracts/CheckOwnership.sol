// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "./StringNFT.sol";

error NotYourToken();
error NoTokenFound();

abstract contract CheckOwnership {
    StringNFT private stringNFT;

    constructor(address _nftAddress){ 
       stringNFT = StringNFT(_nftAddress);
    }

    modifier onlyOwnerOf(uint256 _tokenId) {
        if (stringNFT.ownerOf(_tokenId) != msg.sender) revert NotYourToken();
        if (!stringNFT.exists(_tokenId)) revert NoTokenFound();
        _;
    }

}
