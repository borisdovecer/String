// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

abstract contract Model {
    // mapping companies by name name
    // mapping employee addresses
    mapping(address => Employee) internal employees;
    address[] internal employeeKeys;

    // Employee[] internal employees;
    // Relation for Products and Companies
    mapping(uint16 => uint64) internal productOfCompany;
    // map product name and company name
    mapping(uint128 => string) internal products;
    uint128[] internal productIds;
    // map product id and token id
    mapping(uint128 => uint128) internal productTokenIds;

    // mapping(uint64 => address[]) internal employeesInCompany;

    mapping(uint128 => uint128[]) internal 3;

    // productId to tokenId


    struct Employee {
        address employeeAddress;
        uint64 companyId;
        string metadata;
        uint8 level;
    }

    struct Counters {
        uint16 companyCount;
        uint32 productCount;
        uint16 employeeCount;
        uint64 tokenIdCount;
    }
}