import { sql } from "@vercel/postgres";
import { unstable_noStore } from "next/cache";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { publicKey: string } }
) {
  unstable_noStore();
  const { rows } =
    await sql`SELECT embedded_wallet from ff_users where nfc_pk =${params.publicKey}`;

  if (rows.length !== 1) {
    return new Response("pk not valid", { status: 400 });
  }

  return Response.json(
    {
      wallet: rows[0].embedded_wallet,
    },
    { headers: { "Access-Control-Allow-Origin": "*" } }
  );
}
