import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import { Participant } from "../../generated/schema";
import { ADDRESS_ZERO, BIG_INT_ONE, BIG_INT_ZERO } from "../lib/constants";

export function buildOrGetParticipant(id: Bytes): Participant {
  let participant = Participant.load(id);
  if (participant == null) {
    participant = new Participant(id);
    participant.totalRewards = BIG_INT_ZERO;
  }
  return participant as Participant;
}
