// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Model {
    // mapping companies by name name
    // mapping employee addresses
    mapping(address => Employee) employees;
    // Relation Employee address to Company name
    mapping(address => uint64) companyOfEmployee;
    // Relation for Products and Companies
    mapping(uint16 => uint64) productOfCompany;
    // map product name and company name
    mapping(string => Product) products;
    // map product id and token id
    mapping(uint128 => uint128) productTokenIds;

    mapping(uint64 => address[]) employeesInCompany;

    struct Employee {
        address employeeAddress;
        uint64 companyId;
        // string metadata;
        // uint8 level;
    }

    struct Product {
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