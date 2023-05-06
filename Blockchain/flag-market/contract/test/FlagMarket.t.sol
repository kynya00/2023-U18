// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/FlagMarket.sol";

contract FlagMarketTest is Test {
    FlagMarket public flagMarket;

    function setUp() public {
        flagMarket = new FlagMarket();
    }

    function testBuyFlag_directCall() public {
        address user = address(1);
        vm.deal(user, 100 ether);

        vm.expectRevert();
        vm.prank(user);
        flagMarket.buyFlag();
        assertFalse(flagMarket.hasBoughtFlag(address(1)));
    }

    function testBuyFlag_insuffientFunds() public {
        address user = address(2);
        vm.deal(user, 100 ether);

        vm.expectRevert();
        vm.prank(user);
        flagMarket.buyFlag{value: 1 ether}();
        assertFalse(flagMarket.hasBoughtFlag(user));
    }

    function testBuyFlag_correctAmount() public {
        address user = address(3);
        vm.deal(user, 100 ether);

        vm.prank(user);
        flagMarket.buyFlag{value: 2.5 ether}();
        assertTrue(flagMarket.hasBoughtFlag(user));
    }
}
