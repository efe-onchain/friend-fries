// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {FriendFries} from "../src/FriendFries.sol";

contract BountyDeploy is Script {
    function setUp() public {}

    function run() public {
        vm.startBroadcast();
        FriendFries bounty = new FriendFries();
        vm.stopBroadcast();
    }
}
