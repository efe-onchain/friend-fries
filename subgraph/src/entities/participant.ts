import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import { Participant, Claim } from "../../generated/schema";
import { ADDRESS_ZERO, BIG_INT_ONE, BIG_INT_ZERO } from "../lib/constants";

export function buildOrGetParticipant(id: Bytes): Participant {
  let participant = Participant.load(id.toHexString());
  if (participant == null) {
    participant = new Participant(id.toHexString());
    participant.participated = [];
    participant.totalRewards = BIG_INT_ZERO;
  }
  return participant as Participant;
}
