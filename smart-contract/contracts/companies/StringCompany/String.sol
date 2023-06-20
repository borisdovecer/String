// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "./StringModel.sol";

contract String {
    StringModel private model;

    constructor(address _model) {
        model = StringModel(_model);
    }
} 