"use client";

import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Bounty {
  id: number;
  title: string;
  description: string;
  image: string;
  individualReward: number;
  maxParticipants: number;
  numParticipants: number;
  rewarded: number;
  status: Status;
  owner: string;
  deadline: number;
}

enum Status {
  Active,
  Inactive,
  Completed,
  Cancelled,
}

export function BountyCard({ bountyId }: { bountyId: string }) {
  const [bounty, setBounty] = useState<Bounty | null>(null);
  const farReachClient = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_SUBGRAPH_URL!,
    cache: new InMemoryCache(),
  });
  useEffect(() => {
    farReachClient
      .query({
        query: gql`
          query {
            bounties(first: 1) {
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
        setBounty(result.data.bounties[0] as Bounty);
      });
  });
  return (
    <div>
      {bounty ? (
        <div className="flex flex-col justify-center items-center p-4">
          <Image className="rounded-xl" src={bounty.image} alt={bounty?.title} width={200} height={200} />
          <h3>{bounty.title}</h3>
          <p>{bounty.description}</p>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
