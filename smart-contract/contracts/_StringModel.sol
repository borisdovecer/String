
// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

abstract contract StringModel {

    // map company id and employee address
    mapping(uint16 => address) companyEmployees;
    // map company id and product id
    mapping(uint16 => uint64) companyProducts;
    // map product id and token id
    mapping(uint128 => uint128) productTokenIds;

    struct Company {
        uint16 id;
        string name;
        string metadata;
    }

    struct Employee {
        address employeeAddress;
        string metadata;
        uint8 level;
    }

    struct Product {
        uint64 id;
        string name;
        string metadata;
    }

    struct Counters {
        uint16 companyCount;
        uint32 productCount;
        uint16 employeeCount;
        uint64 tokenIdCount;
    }

}