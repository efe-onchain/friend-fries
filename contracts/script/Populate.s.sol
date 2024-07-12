// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {FriendFries} from "../src/FriendFries.sol";

contract Populate is Script {
    FriendFries fries = FriendFries(0x3a28B4fd35491ea51f42dab77828f5f73fFe43C8);
    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        fries.createBounty{value: 225}(
            "Find the following Easter eggs",
            "We're looking for researchers to provide an in-depth analysis of the benefits and challenges of using blockchain technology in supply chain management. Please provide a 5-page report in PDF format.",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Bg-easter-eggs.jpg/1200px-Bg-easter-eggs.jpg",
            15, // 2 ETH reward per participant
            15, // max 15 participants
            1720818526
        );
        fries.createBounty{value: 120}(
            "Help NXS find the bug in his contract",
            "We're looking for researchers to provide an in-depth analysis of the benefits and challenges of using blockchain technology in supply chain management. Please provide a 5-page report in PDF format.",
            "https://www.treehugger.com/thmb/8he5rIw5n2ukJ44XXOHK7L-6PIc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__mnn__images__2017__05__lady-bug-on-leaf-e3cd36cdc3024129b61926ddf6ef386e.jpg",
            30, // 2 ETH reward per participant
            4, // max 15 participants
            1720832526
        );
        fries.createBounty{value: 10}(
            "First one to find and capture a koala",
            "We're looking for researchers to provide an in-depth analysis of the benefits and challenges of using blockchain technology in supply chain management. Please provide a 5-page report in PDF format.",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNr1KNX_F0co7_o23YbK0NE3vbFLXfXb6uRA&s",
            10, // 2 ETH reward per participant
            1, // max 15 participants
            1720832126
        );

        vm.stopBroadcast();
    }
}
