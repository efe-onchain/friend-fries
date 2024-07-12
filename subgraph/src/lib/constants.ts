import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts";

export let ADDRESS_ZERO = Address.zero();

export let ETHER = BigInt.fromString("1_000_000_000_000_000_000");

export let BIG_INT_ZERO = BigInt.fromI32(0);
export let BIG_INT_ONE = BigInt.fromI32(1);
export let BIG_INT_NEG_ONE = BigInt.fromI32(-1);

export let BYTES_EMPTY = Bytes.empty();
