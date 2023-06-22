// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract StringStake is ReentrancyGuard {
    IERC20 public stakingToken;
    mapping(address => uint256) private _balances;

    constructor(IERC20 _stakingToken) {
        stakingToken = _stakingToken;
    }

    function stake(uint256 amount) public nonReentrant {
        stakingToken.transferFrom(msg.sender, address(this), amount);
        _balances[msg.sender] += amount;
    }

    function withdraw(uint256 amount) public nonReentrant {
        require(_balances[msg.sender] >= amount, "Withdrawal amount exceeds staked balance");

        _balances[msg.sender] -= amount;
        stakingToken.transfer(msg.sender, amount);
    }

    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }
}