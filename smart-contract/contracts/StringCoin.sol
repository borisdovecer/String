// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./StakeString.sol"; // Import StakeString contract

contract StringCoin is ERC20, Pausable, Ownable {
    uint256 public constant MAX_SUPPLY = 420000000 * (10 ** 18); // 420 million tokens, 18 decimal places
    StakeString public stakeStringContract; // Instance of the StakeString contract

    constructor(StakeString _stakeStringContract) ERC20("String Coin", "STRC") {

        stakeStringContract = _stakeStringContract; // Initialize StakeString contract

        // Distribution percentages
        uint8 developmentPercent = 20;
        uint8 marketingPercent = 15;
        uint8 liquidityPercent = 20;
        uint8 presalePercent = 15;
        uint8 stakingRewardsPercent = 20;
        uint8 reservesPercent = 10;

        // Wallet addresses for distribution
        address developmentWallet = msg.sender;
        address marketingWallet = 0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c;
        address liquidityWallet = 0x4B0897b0513fdC7C541B6d9D7E929C4e5364D2dB;
        address presaleWallet = 0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB;
        address stakingRewardsWallet = 0x617F2E2fD72FD9D5503197092aC168c91465E7f2;
        address reservesWallet = 0x17F6AD8Ef982297579C203069C1DbfFE4348c372;

        // Distribute tokens
        _mint(developmentWallet, (MAX_SUPPLY * developmentPercent) / 100);
        _mint(marketingWallet, (MAX_SUPPLY * marketingPercent) / 100);
        _mint(liquidityWallet, (MAX_SUPPLY * liquidityPercent) / 100);
        _mint(presaleWallet, (MAX_SUPPLY * presalePercent) / 100);
        _mint(stakingRewardsWallet, (MAX_SUPPLY * stakingRewardsPercent) / 100);
        _mint(reservesWallet, (MAX_SUPPLY * reservesPercent) / 100);
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
