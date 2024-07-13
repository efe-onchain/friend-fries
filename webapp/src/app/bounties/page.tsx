"use client";
import { useEffect, useState } from "react";
// @ts-ignore
import { execHaloCmdWeb } from "@arx-research/libhalo/api/web.js";
import { BountyCard } from "../components/Bounty";
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import Link from "next/link";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

export default function Home() {
  const [bounty, setBounty] = useState<any[]>([]);
  const [mine, setMine] = useState(false);
  const friendFriesClient = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_SUBGRAPH_URL!,
    cache: new InMemoryCache(),
  });
  useEffect(() => {
    friendFriesClient
      .query({
        query: gql`
          query {
            bounties(first: 15, orderBy: blockTimestamp, orderDirection: desc) {
              id
              blockTimestamp
              title
              description
              image
              individualReward
              maxParticipants
              numParticipants
              participants
              owner
              rewarded
              status
              deadline
            }
          }
        `,
      })
      .then((result) => {
        setBounty(result.data.bounties);
      });
  }, []);
  return (
    <main>
      <div className="flex justify-between items-center font-bold text-xl pt-12">
        <p>FriendFries🍟</p>
        <DynamicWidget />
      </div>
      <div className="flex text-md justify-between items-center  py-4">
        <Link href="/bounties/create" className="font-normal  hover:underline">
          Create Bounty
        </Link>
        <span className="h-[20px] w-[1px] bg-black" />

        <div className="hover:underline" onClick={() => setMine(false)}>
          Available Bounties
        </div>
        <span className="h-[20px] w-[1px] bg-black" />

        <Link href="/leaderboard" className="hover:underline">
          Leaderboard
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center">
        {bounty.length > 0 ? (
          bounty.map((bounty) => <BountyCard key={bounty.id} bounty={bounty} />)
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </main>
  );
}
