// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract FlagMarket {
    mapping(address => bool) flag_bought;

    function hasBoughtFlag(address user) public view returns (bool) {
        return flag_bought[user];
    }

    function buyFlag() public payable {
        require(msg.value >= 2.5 ether, "You must prove your worthiness! Work as a team");
        flag_bought[msg.sender] = true;
    }
}
