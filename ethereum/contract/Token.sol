// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SimpleToken is ERC20 {
    address public owner;

    constructor(string memory name, string memory symbol, uint256 initialSupply) ERC20(name, symbol) {
        // Set the deployer as the owner
        owner = msg.sender;

        // Mint the initial supply of tokens to the deployer's address
        _mint(owner, initialSupply * (10 ** decimals()));
    }
    
    // Optional: Allow the owner to mint more tokens
    function mint(address to, uint256 amount) external {
        require(msg.sender == owner, "Only the owner can mint tokens");
        _mint(to, amount * (10 ** decimals()));
    }

    // Optional: Allow the owner to burn tokens
    function burn(uint256 amount) external {
        require(msg.sender == owner, "Only the owner can burn tokens");
        _burn(owner, amount * (10 ** decimals()));
    }
}
