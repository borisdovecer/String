// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./Model.sol";
import "./IRepository.sol";
import "../../Permissible.sol";

contract Repository is IRepository, Model, Permissible {

    Counters public counters;

    constructor() Permissible(address(this)){
        counters.productCount = 0;
        counters.employeeCount = 0;
        counters.tokenIdCount = 0;
    }

   function addEmployee(address _employee, uint64 _companyId, string memory _metadata, uint8 _level) external{
        employees[_employee] = Employee(_employee, _companyId, _metadata, _level);
        counters.employeeCount++;
   }

   function addProduct(string memory _metadata) external {
       products[counters.productCount] = _metadata;
       counters.productCount++;
   }

   function addNewProductToken(uint128 _tokenId, uint128 _productId) external {
       tokensInProduct[_productId].push(_tokenId);
   }

   function getAuthorization(address _employee) external view returns(uint8){
       return employees[_employee].level;
   }

   function getProductTokensForProductId(uint128 _productId) external view returns(uint128[] memory){
       return tokensInProduct[_productId];
   }

   function getProductTokenById(uint128 _productTokenId) external view returns(uint128){
       return productTokenIds[_productTokenId];
   }

   function getProductById(uint64 _id) external view returns (string memory) {
        return products[_id];
   }
}