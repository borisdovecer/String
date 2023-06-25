// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./companies/Generic/IRepository.sol";

error NoTokenFound();
error NotYourToken();
error CompanyDoesNotExist();
error NotAuthorized();
error CallerDoesntHavePermissions();

error opNece();
error NeceNiOvo();

abstract contract Permissible {
    IRepository private repo;

    constructor(address _repository) {
        repo = IRepository(_repository);
    }

    modifier minimumLevel(uint8 _level) {
        if (repo.getAuthorization(msg.sender) < _level) {
            revert NotAuthorized();
        }
        _;
    }

    // modifier onlyOwnerOf(uint256 _tokenId) {
    //     if (ownerOf(_tokenId) != msg.sender)
    //         revert NotYourToken();
    //     if (!_exists(_tokenId))
    //         revert NoTokenFound();
    //     _;
    // }
}
