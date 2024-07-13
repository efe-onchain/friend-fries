import { BigInt } from "@graphprotocol/graph-ts";
import { FriendFries, BountyCancelled, BountyClaimed, BountyCreated } from "../../generated/FriendFries/FriendFries";
import { Bounty, Participant, Claim } from "../../generated/schema";
import { buildBounty, getBounty } from "../entities/bounty";
import { buildOrGetParticipant } from "../entities/participant";
import { buildClaim } from "../entities/claim";

export function handleBountyCancelled(event: BountyCancelled): void {
  let bounty = getBounty(event.params.bountyId);
  bounty.status = 2;

  bounty.save();
}

export function handleBountyClaimed(event: BountyClaimed): void {
  let bounty = getBounty(event.params.bountyId);
  let participant = buildOrGetParticipant(event.params.hunter);

  let bountyParticipants = bounty.participants;
  bountyParticipants.push(event.params.hunter);
  bounty.participants = bountyParticipants;

  bounty.numParticipants = bounty.numParticipants.plus(BigInt.fromI32(1));
  bounty.rewarded = bounty.rewarded.plus(bounty.individualReward);
  bounty.save();

  participant.totalRewards = participant.totalRewards.plus(bounty.individualReward);
  participant.participated.push(event.params.bountyId.toString());
  participant.save();
}

export function handleBountyCreated(event: BountyCreated): void {
  let bounty = buildBounty(
    event.params.id,
    event.block.timestamp,
    event.params.title,
    event.params.description,
    event.params.image,
    event.params.individualReward,
    event.params.maxParticipants,
    BigInt.fromI32(0),
    event.params.owner,
    event.params.status,
    event.params.deadline
  );
  bounty.save();
}
