import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import { Bounty, Claim } from "../../generated/schema";
import { ADDRESS_ZERO, BIG_INT_ONE, BIG_INT_ZERO } from "../lib/constants";

export function buildClaim(
  id: BigInt,
  txHash: Bytes,
  blockTimestamp: BigInt,
  bountyId: BigInt,
  hunter: Bytes,
  reward: BigInt
): Claim {
  let claim = new Claim(txHash);
  claim.blockTimestamp = blockTimestamp;
  claim.rewarded = reward;
  claim.participant = hunter;
  claim.claimId = id.toString();
  claim.bountyId = bountyId.toString();

  return claim as Claim;
}
