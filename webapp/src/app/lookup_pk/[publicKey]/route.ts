import { sql } from "@vercel/postgres";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { wallet: string } }
) {
  const { rows } =
    await sql`SELECT nfc_pk from ff_users where embedded_wallet =${params.wallet}`;

  if (rows.length !== 1) {
    return new Response("wallet not valid", { status: 400 });
  }

  return Response.json(
    {
      publicKey: rows[0].nfc_pk,
    },
    { headers: { "Access-Control-Allow-Origin": "*" } }
  );
}
