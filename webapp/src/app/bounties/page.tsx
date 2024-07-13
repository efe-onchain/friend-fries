"use client";
import { useEffect, useState } from "react";
// @ts-ignore
import { execHaloCmdWeb } from "@arx-research/libhalo/api/web.js";
import { BountyCard } from "../components/Bounty";
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";

export default function Home() {
  const [bounty, setBounty] = useState<any[]>([]);
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
  });
  return (
    <main>
      <div className="font-bold text-xl">FriendFries🍟</div>
      <div className="flex flex-col items-center justify-center">
        {bounty.length > 0 ? (
          bounty.map((bounty) => <BountyCard key={bounty.id} bounty={bounty} />)
        ) : (
          <div>"Loading..."</div>
        )}
      </div>
    </main>
  );
}
