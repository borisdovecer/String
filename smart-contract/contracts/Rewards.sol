// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./StringCoin.sol";
import "./CheckOwnership.sol";

contract Rewards is CheckOwnership {
    mapping(uint => uint) private tokenIdAmount;
    StringCoin private stringCoin;

    constructor(address _coinAddress, address _nftAddress) CheckOwnership(_nftAddress){
        stringCoin = StringCoin(_coinAddress);
        
    }

    function add(uint128 _tokenId, uint128 _amount) external {
        tokenIdAmount[_tokenId] = _amount;
        stringCoin.approve(msg.sender, _amount*10**18);
        stringCoin.approve(address(this), _amount*10**18);
        require(stringCoin.transferFrom(msg.sender, address(this), _amount), "Transfer failed");
    }

    function claim(uint128 _tokenId, uint128 _amount) external onlyOwnerOf(_tokenId) {
        require(tokenIdAmount[_tokenId] >= _amount, "Insufficient rewards to claim");
        tokenIdAmount[_tokenId] -= _amount;
        require(stringCoin.transfer(msg.sender, _amount), "Transfer failed");
    }

    function transferReward(uint128 _tokenId, uint128 _amount, address _to) external {
        require(tokenIdAmount[_tokenId] >= _amount, "Insufficient rewards to transfer");
        tokenIdAmount[_tokenId] -= _amount;
        require(stringCoin.transfer(_to, _amount), "Transfer failed");
    }

    // function approveAndTransferFrom(address _from, address _to, uint128 _tokenId, uint128 _amount) external {
    //     require(tokenIdAmount[_tokenId] >= _amount, "Insufficient rewards to transfer");
    //     tokenIdAmount[_tokenId] -= _amount;
    //     require(stringCoin.approve(address(this), _amount), "Approval failed");
    //     require(stringCoin.transferFrom(_from, _to, _amount), "Transfer failed");
    // }
}