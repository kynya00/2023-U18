// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/BakeDanuki.sol";

contract BakeDanukiTest is Test {
    BakeDanuki public instance;

    function setUp() public {
        instance = new BakeDanuki();
    }

    function testHasFoundTrail() public {
        address user = address(1);
        assertFalse(instance.hasFoundTrail(user));
        vm.prank(user);
        instance.follow();
        assertTrue(instance.hasFoundTrail(user));
    }
}
