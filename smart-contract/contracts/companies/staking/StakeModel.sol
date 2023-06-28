// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

abstract contract StakeModel {

    uint128 internal stakedBalance;
    uint128 internal rewardBalance;

    struct Counters {
        uint64 placeholder;
    }
}