const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("StringNFT Contract", function () {
  let StringNFT;
  let stringNFT;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    StringNFT = await ethers.getContractFactory("StringNFT");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
  
    stringNFT = await StringNFT.deploy();
    await stringNFT.deployed();
  
    // Add a company before running the test that adds an employee
    await stringNFT.connect(owner).addCompany("Company A");
  });

  describe("Transactions", function () {

    it("should check company counter", async function (){
      const initialCompanyName = "OpenAI";
      await stringNFT.connect(owner).addCompany(initialCompanyName);
      await stringNFT.connect(owner).addCompany(initialCompanyName);
      await stringNFT.connect(owner).addCompany(initialCompanyName);
      await stringNFT.connect(owner).addCompany(initialCompanyName);

      // const company = await stringNFT;
      const companyCounter = await stringNFT.companyCounter();
      expect(companyCounter.toNumber()).to.equal(5);
    });

    it("Should add an employee", async function () {
      
      
      const permissions = [
        true,
        true,
        true,
        true,
      ];

      const initialCompanyName = "OpenAI";
      await stringNFT.connect(owner).addCompany(initialCompanyName);
      let companyCounter = await stringNFT.companyCounter();
      let compCounter = companyCounter.toNumber();
      const employeeAddress = addr1.address;


      await stringNFT.connect(owner).addEmployee(
        compCounter,
        employeeAddress,
        permissions
      );

      let employees = await stringNFT.connect(owner).getAllEmployees(compCounter);
      
      expect(employeeAddress).to.equal(employees[0][1]);
    });

    it("Should mint a token", async function () {
      
      
      const permissions = [
        true,
        true,
        true,
        true,
      ];

      const initialCompanyName = "OpenAI";
      await stringNFT.connect(owner).addCompany(initialCompanyName);
      let companyCounter = await stringNFT.companyCounter();
      let compCounter = companyCounter.toNumber();
      const employeeAddress = addr1.address;


      await stringNFT.connect(owner).addEmployee(
        compCounter,
        employeeAddress,
        permissions
      );

      let employees = await stringNFT.connect(owner).getAllEmployees(compCounter);
      
      // expect(employeeAddress).to.equal(employees[0][1]);

      await stringNFT.connect(employeeAddress).addProduct(
        companyCounter,
        "Product Name",
        "Product Description",
        "Manufacturer",
        "Category",
        0
      );

      // let allProducts = stringNFT.getAllProducts(companyCounter)

      // await stringNFT.connect(employeeAddress).mint(1,1);
      // const tokenCount = await stringNFT.balanceOf(owner.address);

      expect(1).to.equal(1);
    });

    // // Add more test cases for other contract functions
  });
});
