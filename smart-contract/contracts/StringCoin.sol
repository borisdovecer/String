// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StringCoin is ERC20, Pausable, Ownable {
    uint256 public constant MAX_SUPPLY = 420000000 * (10 ** 18);

    constructor() ERC20("String Coin", "STRC") Ownable() {
        _mint(msg.sender, MAX_SUPPLY);
    }

    function pause() public {
        _pause();
    }

    function unpause() public {
        _unpause();
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal whenNotPaused override {
        super._beforeTokenTransfer(from, to, amount);
    }
}