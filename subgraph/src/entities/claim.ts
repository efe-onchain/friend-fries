import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import { Bounty, Claim } from "../../generated/schema";
import { ADDRESS_ZERO, BIG_INT_ONE, BIG_INT_ZERO } from "../lib/constants";

export function buildClaim(id: BigInt, blockTimestamp: BigInt, bountyId: BigInt, hunter: Bytes, reward: BigInt): Claim {
  let claim = new Claim(id.toString());
  claim.blockTimestamp = blockTimestamp;
  claim.rewarded = reward;
  claim.participant = hunter;
  claim.bountyId = bountyId.toString();

  return claim as Claim;
}

export function getClaim(id: BigInt): Claim {
  let claim = Claim.load(id.toString());
  if (claim == null) {
    claim = new Claim(id.toString());
    claim.blockTimestamp = BIG_INT_ZERO;
    claim.bountyId = "";
    claim.participant = ADDRESS_ZERO;
    claim.rewarded = BIG_INT_ZERO;
  }
  return claim as Claim;
}
