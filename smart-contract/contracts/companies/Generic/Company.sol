// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "../../Permissible.sol";
import "./IRepository.sol";
import "../staking/IStakeRepository.sol";
import "../../StringNFT.sol";
import "../../StringCoin.sol";
import "../../Rewards.sol";

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Company is Permissible, ReentrancyGuard {
    IRepository private repository;
    IStakeRepository private stakeRepository;
    IERC20 public stringCoin;
    Rewards private rewardContract;

    StringNFT private stringNFT;
    string private companyName;
    uint64 private companyId;
    bool private isInitialized;

    mapping(address => uint256) private _balances;

    constructor(
        address _repository,
        address _stringNFT,
        IERC20 _coinContractAddress,
        address _rewardContract,
        string memory _name,
        uint64 _companyId
    ) Permissible(_repository) {
        repository = IRepository(_repository);
        companyName = _name;
        companyId = _companyId;
        stringNFT = StringNFT(_stringNFT);
        stringCoin = _coinContractAddress;
        rewardContract = Rewards(_rewardContract);
    }

    function stake(uint256 amount) public nonReentrant {
        stringCoin.transferFrom(msg.sender, address(this), amount);
        _balances[msg.sender] += amount;
    }

    function withdraw(uint256 amount) public nonReentrant {
        require(_balances[msg.sender] >= amount, "Withdrawal amount exceeds staked balance");

        _balances[msg.sender] -= amount;
        stringCoin.transfer(msg.sender, amount);
    }

    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }

    function getStakedBalance() external view returns (uint256) {
        return stakeRepository.getStakedAmount();
    }

    function getRewardBalance() external view returns (uint256) {
        return stakeRepository.getRewardBalance();
    }

    function addEmployee(address _employee, uint64 _companyId, string memory _metadata, uint8 _level)
        public
        returns (uint64)
    {
        repository.addEmployee(_employee, _companyId, _metadata, _level);
        return companyId;
    }

    function getAllEmployees() external view returns(address[] memory, string[] memory, uint8[] memory){
        return repository.getAllEmployees();
    }

    function addProduct(string memory _metadata) external {
        repository.addProduct(_metadata);
    }

    function getProductById(uint64 _id)
        external
        view
        returns (string memory)
    {
        return repository.getProductById(_id);
    }

    function getAllProducts() external view returns(uint128[] memory, string[] memory) {
        return repository.getAllProducts();
    }

    function mintNewProduct(uint128 _productId, uint128 _amount) external {
        uint128 tokenId = stringNFT.createToken(msg.sender);
        repository.addNewProductToken(tokenId, _productId);
        rewardContract.add(tokenId, _amount);
    }

    function initializeStakeRepository(address _stakeRepository) external {
        require(!isInitialized, "This function can only be called once");
        stakeRepository = IStakeRepository(_stakeRepository);
        isInitialized = true;
    }
}
