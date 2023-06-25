// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "../../Permissible.sol";
import "./IRepository.sol";
import "../../Minter.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract Company is Permissible {
    IRepository private repository;
    Minter private minter;
    string private companyName;
    uint64 private id;

    constructor(address _repository, address _minter, string memory _name, uint64 _id) Permissible(_repository) {
        repository = IRepository(_repository);
        companyName = _name;
        id = _id;
        minter = Minter(_minter);
    }

    function addEmployee(address _employee) minimumLevel(1) public returns (uint64)  {
        repository.addEmployee(_employee);
        return id;
    } 

   function addProduct(string memory _metadata) minimumLevel(1) external{
       repository.addProduct(_metadata);
   }

   function getProductById(uint64 _id) minimumLevel(1) external view returns (string memory) {
       return repository.getProductById(_id);
   }

   function mintNewProduct(uint128 _productId) minimumLevel(5) external {
       uint128 tokenId = minter.createToken(msg.sender);
       repository.addNewProductToken(tokenId, _productId);
   }

}
