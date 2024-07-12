// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract FriendFries {
    event BountyCreated(
        uint256 id,
        string title,
        string description,
        string image,
        uint256 individualReward,
        uint256 maxParticipants,
        uint256 numParticipants,
        uint256 rewarded,
        string status,
        address owner,
        address[] participants,
        uint256 deadline
    );
    event BountyClaimed(
        uint256 bountyId,
        address indexed hunter,
        uint256 reward
    );

    event BountyCancelled(uint256 bountyId);

    uint256 public nextId = 0;
    enum Status {
        Open,
        Completed,
        Cancelled
    }
    struct Bounty {
        uint256 id;
        string title;
        string description;
        string image;
        uint256 individualReward;
        uint256 maxParticipants;
        uint256 numParticipants;
        uint256 rewarded;
        Status status;
        address owner;
        address[] participants;
        uint256 deadline;
    }

    mapping(uint256 => Bounty) public bounties;
    mapping(address => uint256) public userEarnings;

    //write a function for creating a bounty
    function createBounty(
        string memory _title,
        string memory _description,
        string memory _image,
        uint256 _individualReward,
        uint256 _maxParticipants,
        uint256 _deadline
    ) public payable {
        require(
            msg.value == _individualReward * _maxParticipants,
            "Insufficient funds"
        );
        nextId = nextId + 1;
        uint256 id = nextId;
        Bounty memory newBounty = Bounty(
            id,
            _title,
            _description,
            _image,
            _individualReward,
            _maxParticipants,
            0,
            0,
            Status.Open,
            msg.sender,
            new address[](0),
            _deadline
        );
        bounties[id] = newBounty;
    }

    // write a function to claim a bounty
    function claimBountyForHunter(uint256 _id, address hunter) public {
        Bounty storage bounty = bounties[_id];
        require(
            bounty.owner == msg.sender,
            "Only bounty owner can claim for hunter"
        );
        require(bounty.status == Status.Open, "Bounty is not open");
        require(hunter != msg.sender, "Owner cannot claim their own bounty");
        require(
            bounty.numParticipants < bounty.maxParticipants,
            "Bounty is full"
        );

        require(
            block.timestamp < bounty.deadline,
            "Bounty deadline has passed"
        );
        bounty.participants.push(hunter);
        bounty.numParticipants = bounty.numParticipants + 1;
        // if the bounty is full, close it
        if (bounty.numParticipants == bounty.maxParticipants) {
            bounty.status = Status.Completed;
        }
        //pay the participant
        userEarnings[hunter] = userEarnings[hunter] + bounty.individualReward;
        // update the rewarded amount
        bounty.rewarded = bounty.rewarded + bounty.individualReward;
        payable(hunter).transfer(bounty.individualReward);
    }

    function cancelBounty(uint256 _id) public {
        Bounty storage bounty = bounties[_id];
        require(bounty.owner == msg.sender, "Only the owner can cancel bounty");
        require(bounty.status == Status.Open, "Bounty is not open");
        bounty.status = Status.Cancelled;
        uint256 remainingfunds = bounty.individualReward *
            (bounty.maxParticipants - bounty.numParticipants);
        if (remainingfunds > 0) {
            payable(msg.sender).transfer(remainingfunds);
        }
    }
}
