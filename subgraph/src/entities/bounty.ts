import { BigInt, Bytes, Int8 } from "@graphprotocol/graph-ts";
import { Bounty } from "../../generated/schema";
import { ADDRESS_ZERO, BIG_INT_ONE, BIG_INT_ZERO } from "../lib/constants";

export function buildBounty(
  id: BigInt,
  blockTimestamp: BigInt,
  title: string,
  description: string,
  image: string,
  individualReward: BigInt,
  maxParticipants: BigInt,
  numParticipants: BigInt,
  owner: Bytes,
  status: Int8,
  deadline: BigInt
): Bounty {
  let bounty = new Bounty(id.toString());
  bounty.blockTimestamp = blockTimestamp;
  bounty.title = title;
  bounty.description = description;
  bounty.image = image;
  bounty.individualReward = individualReward;
  bounty.maxParticipants = maxParticipants;
  bounty.numParticipants = numParticipants;
  bounty.owner = owner;
  bounty.deadline = deadline;
  bounty.rewarded = BIG_INT_ZERO;
  bounty.status = status;
  bounty.participants = [];

  return bounty as Bounty;
}

export function getBounty(id: BigInt): Bounty {
  let bounty = Bounty.load(id.toString());
  if (bounty == null) {
    bounty = new Bounty(id.toString());
    bounty.blockTimestamp = BIG_INT_ZERO;
    bounty.title = "";
    bounty.description = "";
    bounty.image = "";
    bounty.individualReward = BIG_INT_ZERO;
    bounty.maxParticipants = BIG_INT_ZERO;
    bounty.numParticipants = BIG_INT_ZERO;
    bounty.owner = ADDRESS_ZERO;
    bounty.deadline = BIG_INT_ZERO;
    bounty.rewarded = BIG_INT_ZERO;
    bounty.status = 0;
    bounty.participants = [];
  }
  return bounty as Bounty;
}
