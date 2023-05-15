// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Notebin.sol";

contract NotebinTest is Test {
    Notebin public notebin;

    function setUp() public {
        notebin = new Notebin();
    }

    function testSetAndDeleteNote() public {
        address user = address(1);
        vm.prank(user);
        notebin.setNote("test-set-note");
        assertEq(notebin.getNote(user), "test-set-note");
        vm.prank(user);
        notebin.deleteNote();
        assertEq(notebin.getNote(user), "");
    }
}
