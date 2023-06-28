// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IStakeRepository {
    function withdrawStakedAmount(uint128 _amount) external;
    function addStakedBalance(uint128 _amount) external;
    function withdrawReward(uint128 _amount) external;
    function getStakedAmount() external view returns (uint128);
    function getRewardBalance() external view returns (uint128);
}