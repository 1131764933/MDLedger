// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// 自定义 ERC20 代币合约，继承自 OpenZeppelin 的 ERC20
contract MDLCoin is ERC20, Ownable {
    constructor() ERC20("MDLCoin", "MDL") Ownable(msg.sender) {
        _mint(msg.sender, 10000000000 * 10**decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}