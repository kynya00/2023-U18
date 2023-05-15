// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Notebin {
    mapping(address => string) notes;

    function getNote(address user) public view returns (string memory) {
        return notes[user];
    }

    function setNote(string memory newNote) public {
        notes[msg.sender] = newNote;
    }

    function deleteNote() public {
        delete notes[msg.sender];
    }
}
