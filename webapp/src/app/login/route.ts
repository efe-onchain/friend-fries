import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { ethers } from "ethers";
import { NextRequest } from "next/server";
import randomstring from "randomstring";
import { sql } from "@vercel/postgres";

function generateJwt(id: string, nonce: string): string {
  const privateKey = fs.readFileSync(
    path.join(process.cwd(), "private_key.pem"),
    "utf8"
  );
  const token = jwt.sign({ id, sid: nonce }, privateKey, {
    issuer: "friend-fries",
    expiresIn: "1h",
    algorithm: "RS256",
    subject: id,
  });

  return token;
}

// helper functions taken from https://github.com/arx-research/halo-bulk-web/blob/master/src/js/helpers
function buf2hex(buffer: Uint8Array) {
  // buffer is an ArrayBuffer
  return Array.from(new Uint8Array(buffer))
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
}

function unpackDERSignature(sig: string) {
  let header0 = sig.slice(0, 2);
  if (parseInt("0x" + header0) !== 0x30) {
    throw Error("Invalid header.");
  }

  let header_r0 = sig.slice(4, 6);
  let header_r1 = sig.slice(6, 8);

  if (parseInt("0x" + header_r0) !== 0x02) {
    throw Error("Invalid header (2).");
  }

  let length_r = parseInt("0x" + header_r1) * 2;
  let r = sig.slice(8, length_r + 8);

  let header_s0 = sig.slice(length_r + 8, length_r + 10);
  let header_s1 = sig.slice(length_r + 10, length_r + 12);

  // console.log(header_s1);

  if (parseInt("0x" + header_s0) !== 0x02) {
    throw Error("Invalid header (2).");
  }

  // console.log(length_r + 12);
  // console.log(parseInt("0x" + header_s1) * 2);
  let s = sig.slice(
    length_r + 12,
    length_r + 12 + parseInt("0x" + header_s1) * 2
  );

  // console.log(s.length);

  if (r.length == 66) {
    r = r.slice(2, 130);
  }

  if (s.length == 66) {
    s = s.slice(2, 130);
  }

  return {
    r: r,
    s: s,
  };
}

// Verify the DER encoded signature against the input message and uncompressed public key.
function verifySignature(
  message: string,
  signature: string,
  publicKey: string
) {
  console.log(`digest: ${message}`);
  console.log(`signature: ${signature}`);
  console.log(`publicKey: ${publicKey}`);

  // Compute the Ethereum address from the publicKey.
  const computedAddress = ethers.computeAddress("0x" + publicKey);

  // Strip out DER formatting to get r and s.
  const sigRaw = unpackDERSignature(signature);

  // We generate DER signatures, not RLP. As such we do not have the v parameter and must ascertain it.
  let vByte = new Uint8Array(1);
  vByte[0] = 27;
  const vByte0 = buf2hex(vByte);
  vByte[0] = 28;
  const vByte1 = buf2hex(vByte);

  // Test which byte was used in the message.
  switch (computedAddress) {
    case ethers.verifyMessage(message, "0x" + sigRaw.r + sigRaw.s + vByte0):
      return true;
    case ethers.verifyMessage(message, "0x" + sigRaw.r + sigRaw.s + vByte1):
      return true;
    default:
      return false;
  }
}

/*
{
  "input":
    {
      "keyNo": 1,
      "digest": "fde5801ef9eef404545a26c956df912cd692f869e65b0963c1e6aa72bde92700",
      "message": "72616e646f6d206e6f6e6365",
    },
  "signature":
    {
      "raw":
        {
          "r": "8103ee0247ca48677699600645bce5ced2d636c003cca27e51accc94885a1919",
          "s": "5222b10c34f5a01bda61eaffdd61cd378b46ae0af308ac220ee27f65f3519dca",
          "v": 27,
        },
      "der": "30450221008103ee0247ca48677699600645bce5ced2d636c003cca27e51accc94885a191902205222b10c34f5a01bda61eaffdd61cd378b46ae0af308ac220ee27f65f3519dca",
      "ether": "0x8103ee0247ca48677699600645bce5ced2d636c003cca27e51accc94885a19195222b10c34f5a01bda61eaffdd61cd378b46ae0af308ac220ee27f65f3519dca1b",
    },
  "publicKey": "043586cc04dcd58fba829832a1972c3fe6c23cb6ca12a43c43a888cc42d7a4be74fe2ed05b0de9934bab33a6e22e2470dcbab672b2ea2f2032f640ba5de5cc2c73",
  "etherAddress": "0x71679d9a268560f29314F6D3a43Fc99d4AF15F09",
}
*/
const nonces = new Set();
export async function GET(request: NextRequest) {
  let nonce = request.nextUrl.searchParams.get("nonce");
  if (!nonce || !nonces.has(nonce)) {
    nonce = randomstring.generate("20");
    nonces.add(nonce);
    return Response.json(
      {
        nonce,
      },
      { headers: { "Access-Control-Allow-Origin": "*" } }
    );
  }

  if (!request.nextUrl.searchParams.get("wallet")) {
    return new Response("wallet", { status: 400 });
  }

  if (
    !verifySignature(
      nonce,
      request.nextUrl.searchParams.get("signature")!,
      request.nextUrl.searchParams.get("publicKey")!
    )
  ) {
    return new Response("signature verification failed", { status: 400 });
  }

  nonces.delete(nonce);

  await sql.query(
    `INSERT INTO FF_USERS (nfc_pk, embedded_wallet)
     SELECT nfc_pk, embedded_wallet FROM json_populate_recordset(NULL::FF_USERS, $1)
     ON CONFLICT (nfc_pk, embedded_wallet) DO NOTHING`,
    [
      JSON.stringify([
        {
          nfc_pk: request.nextUrl.searchParams.get("publicKey"),
          embedded_wallet: request.nextUrl.searchParams.get("wallet"),
        },
      ]),
    ]
  );

  return Response.json(
    {
      jwt: generateJwt("the id generated by signature", nonce),
    },
    { headers: { "Access-Control-Allow-Origin": "*" } }
  );
}
