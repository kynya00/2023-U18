// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract BakeDanuki {
    mapping(address => bool) found_trail;

    function hasFoundTrail(address user) public view returns (bool) {
        return found_trail[user];
    }

    function follow() public {
        found_trail[msg.sender] = true;
    }
}
