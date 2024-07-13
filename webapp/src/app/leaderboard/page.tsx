"use client";
import { useEffect, useState } from "react";

import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { LeaderboardProfile } from "../components/LeaderboardProfile";
import Link from "next/link";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const friendFriesClient = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_SUBGRAPH_URL!,
    cache: new InMemoryCache(),
  });
  useEffect(() => {
    friendFriesClient
      .query({
        query: gql`
          query {
            participants(orderBy: totalRewards, orderDirection: desc) {
              id
              totalRewards
            }
          }
        `,
      })
      .then((result) => {
        setLeaderboard(result.data.participants);
      });
  }, []);
  return (
    <div>
      <Link href="/bounties" className="text-md font-normal">
        Back
      </Link>
      <div className="flex justify-between font-bold text-xl pt-2">
        <p>FriendFries🍟</p>
      </div>

      {leaderboard ? (
        <div className="flex flex-col items-center justify-center">
          {leaderboard.length > 0 ? (
            leaderboard.map((participant, index) => (
              <LeaderboardProfile
                ranking={index + 1}
                address={participant.id}
                totalRewards={participant.totalRewards}
              />
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
