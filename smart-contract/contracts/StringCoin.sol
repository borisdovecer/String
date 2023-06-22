// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./StringStake.sol";

contract StringCoin is ERC20, Pausable, Ownable {
    uint256 public constant MAX_SUPPLY = 420000000 * (10 ** 18); // 420 million tokens, 18 decimal places
    StringStake public _stakeString;

    constructor() ERC20("String Coin", "STRC") {
        _mint(msg.sender, MAX_SUPPLY);
    }

    function setStakingContract(address _stringStake) public  {
        _stakeString = StringStake(_stringStake);
        _approve(msg.sender, _stringStake, MAX_SUPPLY);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal whenNotPaused override {
        super._beforeTokenTransfer(from, to, amount);
    }
}
