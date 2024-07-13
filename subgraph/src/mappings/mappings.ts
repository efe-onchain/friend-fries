import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import { FriendFries, BountyCancelled, BountyClaimed, BountyCreated } from "../../generated/FriendFries/FriendFries";
import { buildBounty, getBounty } from "../entities/bounty";
import { buildOrGetParticipant } from "../entities/participant";
import { buildBountyParticipant } from "../entities/bountyParticipants";

export function handleBountyCancelled(event: BountyCancelled): void {
  //convert this bigint bounty id to bytes object

  let bounty = getBounty(Bytes.fromHexString(event.params.bountyId.toHexString()));
  bounty.status = 2;

  bounty.save();
}

export function handleBountyClaimed(event: BountyClaimed): void {
  let bounty = getBounty(Bytes.fromI32(event.params.bountyId.toI32()));
  let participant = buildOrGetParticipant(event.params.hunter);

  bounty.numParticipants = bounty.numParticipants.plus(BigInt.fromI32(1));
  bounty.rewarded = bounty.rewarded.plus(bounty.individualReward);
  bounty.save();

  participant.totalRewards = participant.totalRewards.plus(bounty.individualReward);
  participant.save();

  let bountyParticipant = buildBountyParticipant(
    event.transaction.hash,
    bounty.individualReward,
    event.params.hunter,
    Bytes.fromI32(event.params.bountyId.toI32())
  );
  bountyParticipant.save();
}

export function handleBountyCreated(event: BountyCreated): void {
  let bounty = buildBounty(
    Bytes.fromI32(event.params.id.toI32()),
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
