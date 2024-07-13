import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import { BountyParticipant, Participant } from "../../generated/schema";
import { ADDRESS_ZERO, BIG_INT_ONE, BIG_INT_ZERO } from "../lib/constants";

export function buildBountyParticipant(
  id: Bytes,
  rewarded: BigInt,
  participant: Bytes,
  bounty: Bytes
): BountyParticipant {
  let bountyParticipant = BountyParticipant.load(id);
  if (bountyParticipant == null) {
    bountyParticipant = new BountyParticipant(id);
    bountyParticipant.rewarded = rewarded;
    bountyParticipant.participant = participant;
    bountyParticipant.bounty = bounty;
  }
  return bountyParticipant as BountyParticipant;
}
