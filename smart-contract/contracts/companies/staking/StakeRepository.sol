// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./StakeModel.sol";
import "../../Whitelisted.sol";
import "./IStakeRepository.sol";
import "../Generic/Company.sol";

contract StakeRepository is StakeModel, Whitelisted, IStakeRepository {

    Counters public counters;
    Company private company;

    constructor(address _companyContract) Whitelisted(_companyContract){
        counters.placeholder = 0;
        company = Company(_companyContract);
    }

    function withdrawStakedAmount(uint128 _amount) external {
        stakedBalance -= _amount;
    }

    function addStakedBalance(uint128 _amount) external {
        uint128 stakedAmount = _amount * 90 / 100;
        uint128 rewardAmount = _amount - stakedAmount;

        stakedBalance += stakedAmount;
        rewardBalance += rewardAmount;
    }

    function withdrawReward(uint128 _amount) external{
        // ??
    }

    function getStakedAmount() external view returns(uint128){
        return stakedBalance;
    }

    function getRewardBalance() external view returns(uint128){
        return rewardBalance;
    }

}