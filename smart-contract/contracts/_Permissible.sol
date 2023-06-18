// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "./_Base.sol";

error NoTokenFound();
error NotYourToken();
error CompanyDoesNotExist();
error NotAuthorized();
error CallerDoesntHavePermissions();

error opNece();
error NeceNiOvo();

abstract contract Permissible is BaseContract, Ownable, ERC721Enumerable {

    constructor(){}

    modifier minimumLevel(uint8 _level){

        if(msg.sender == owner()){
            _;
        }else {
            Employee memory employeeMinter = employees[msg.sender];
            if(employeeMinter.companyId == 0 || employeeMinter.level < _level){
                revert NotAuthorized();
            }
        
            Company memory companyOfMinter = companies[employeeMinter.companyId];
            if(!companyOfMinter.exists){
                revert NeceNiOvo();
            }
        }
        _;
    }

    modifier onlyOwnerOf(uint256 _tokenId) {
        if (ownerOf(_tokenId) != msg.sender)
            revert NotYourToken();
        if (!_exists(_tokenId))
            revert NoTokenFound();
        _;
    }
}