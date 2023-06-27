// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

interface IRepository {

    function addEmployee(address _employee, uint64 _companyId, string memory _metadata, uint8 _level) external;
    function addProduct(string memory _metadata) external;
    function addNewProductToken(uint128 _tokenId, uint128 _productId) external;
    function getAuthorization(address _employee) external view returns (uint8);
    function getProductTokensForProductId(uint128 _productId) external view returns (uint128[] memory);
    function getProductTokenById(uint128 _productTokenId) external view returns (uint128);
    function getProductById(uint64 _id) external view returns (string memory);
}
