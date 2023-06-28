// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./Model.sol";
import "./IRepository.sol";
import "../../Permissible.sol";

contract Repository is IRepository, Model, Permissible {
    Counters public counters;

    constructor() Permissible(address(this)) {
        counters.productCount = 0;
        counters.employeeCount = 0;
        counters.tokenIdCount = 0;
    }

    function addEmployee(
        address _employee,
        uint64 _companyId,
        string memory _metadata,
        uint8 _level
    ) external {
        employees[_employee] = Employee(
            _employee,
            _companyId,
            _metadata,
            _level
        );
        employeeKeys.push(_employee);
        counters.employeeCount++;
    }

    function getAllEmployees()
        public
        view
        returns (
            address[] memory,
            string[] memory,
            uint8[] memory
        )
    {
        string[] memory metaDatas = new string[](employeeKeys.length);
        uint8[] memory levels = new uint8[](employeeKeys.length);

        for (uint128 i = 0; i < employeeKeys.length; i++) {
            metaDatas[i] = employees[employeeKeys[i]].metadata;
            levels[i] = employees[employeeKeys[i]].level;
        }

        return (employeeKeys, metaDatas, levels);
    }

    function addProduct(string memory _metadata) external {
        products[counters.productCount] = _metadata;
        productIds.push(counters.productCount);
        counters.productCount++;
    }

    function addNewProductToken(uint128 _tokenId, uint128 _productId) external {
        tokensInProduct[_productId].push(_tokenId);
    }

    function getAllProducts()
        external
        view
        returns (uint128[] memory, string[] memory){
        string[] memory metaData = new string[](productIds.length);
        for (uint128 i = 0; i < productIds.length; i++) {
            metaData[i] = products[productIds[i]];
        }
        return (productIds, metaData);
    }

    function getAuthorization(address _employee) external view returns (uint8) {
        return employees[_employee].level;
    }

    //this doesn't work.
    function getProductTokensForProductId(uint128 _productId)
        external
        view
        returns (uint128[] memory)
    {
        return tokensInProduct[_productId];
    }

    function getProductTokenById(uint128 _productTokenId)
        external
        view
        returns (uint128)
    {
        return productTokenIds[_productTokenId];
    }

    function getProductById(uint64 _id) external view returns (string memory) {
        return products[_id];
    }
}
