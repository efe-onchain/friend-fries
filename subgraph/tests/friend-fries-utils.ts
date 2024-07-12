import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  BountyCancelled,
  BountyClaimed,
  BountyCreated
} from "../generated/FriendFries/FriendFries"

export function createBountyCancelledEvent(bountyId: BigInt): BountyCancelled {
  let bountyCancelledEvent = changetype<BountyCancelled>(newMockEvent())

  bountyCancelledEvent.parameters = new Array()

  bountyCancelledEvent.parameters.push(
    new ethereum.EventParam(
      "bountyId",
      ethereum.Value.fromUnsignedBigInt(bountyId)
    )
  )

  return bountyCancelledEvent
}

export function createBountyClaimedEvent(
  bountyId: BigInt,
  hunter: Address,
  reward: BigInt
): BountyClaimed {
  let bountyClaimedEvent = changetype<BountyClaimed>(newMockEvent())

  bountyClaimedEvent.parameters = new Array()

  bountyClaimedEvent.parameters.push(
    new ethereum.EventParam(
      "bountyId",
      ethereum.Value.fromUnsignedBigInt(bountyId)
    )
  )
  bountyClaimedEvent.parameters.push(
    new ethereum.EventParam("hunter", ethereum.Value.fromAddress(hunter))
  )
  bountyClaimedEvent.parameters.push(
    new ethereum.EventParam("reward", ethereum.Value.fromUnsignedBigInt(reward))
  )

  return bountyClaimedEvent
}

export function createBountyCreatedEvent(
  id: BigInt,
  title: string,
  description: string,
  image: string,
  individualReward: BigInt,
  maxParticipants: BigInt,
  numParticipants: BigInt,
  rewarded: BigInt,
  status: string,
  owner: Address,
  participants: Array<Address>,
  deadline: BigInt
): BountyCreated {
  let bountyCreatedEvent = changetype<BountyCreated>(newMockEvent())

  bountyCreatedEvent.parameters = new Array()

  bountyCreatedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  bountyCreatedEvent.parameters.push(
    new ethereum.EventParam("title", ethereum.Value.fromString(title))
  )
  bountyCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )
  bountyCreatedEvent.parameters.push(
    new ethereum.EventParam("image", ethereum.Value.fromString(image))
  )
  bountyCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "individualReward",
      ethereum.Value.fromUnsignedBigInt(individualReward)
    )
  )
  bountyCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "maxParticipants",
      ethereum.Value.fromUnsignedBigInt(maxParticipants)
    )
  )
  bountyCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "numParticipants",
      ethereum.Value.fromUnsignedBigInt(numParticipants)
    )
  )
  bountyCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "rewarded",
      ethereum.Value.fromUnsignedBigInt(rewarded)
    )
  )
  bountyCreatedEvent.parameters.push(
    new ethereum.EventParam("status", ethereum.Value.fromString(status))
  )
  bountyCreatedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  bountyCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "participants",
      ethereum.Value.fromAddressArray(participants)
    )
  )
  bountyCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "deadline",
      ethereum.Value.fromUnsignedBigInt(deadline)
    )
  )

  return bountyCreatedEvent
}
