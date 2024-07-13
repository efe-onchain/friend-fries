import axios from "axios";
// @ts-ignore
import { execHaloCmdWeb } from "@arx-research/libhalo/api/web.js";

export async function authenticate(wallet?: string) {
  const nonce = (await axios.get("https://friend-fries.vercel.app/login")).data
    .nonce;
  let command = {
    name: "sign",
    keyNo: 1,
    message: nonce,
    format: "text",
  };
  const response = await execHaloCmdWeb(command);
  const signature = response.signature.der;
  const publicKey = response.publicKey;

  const jwt = (
    await axios.get("https://friend-fries.vercel.app/login", {
      params: { signature, nonce, publicKey, wallet },
    })
  ).data.jwt;

  // TODO: verify jwt I guess
  if (jwt) return { jwt, publicKey };

  throw new Error("authentication failed");
}
