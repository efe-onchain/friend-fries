"use client";
import { useEffect, useState } from "react";
import { BountyCard } from "../components/Bounty";
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import Link from "next/link";
import { ProfileDetails } from "@/app/components/ProfileDetails";
import { ProfileStatCard } from "../components/ProfileStatCard";
import { convertEthToHumanReadable } from "../helpers";

import {
  useSocialAccounts,
  useUserWallets,
} from "@dynamic-labs/sdk-react-core";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider } from "@tanstack/react-query";
import { config, queryClient } from "../config";

export default function Home() {
  const wallets = useUserWallets();
  const { getLinkedAccountInformation } = useSocialAccounts();
  const account = getLinkedAccountInformation("farcaster" as any);
  const [participant, setParticipant] = useState<any>([]);
  const [bounty, setBounty] = useState<any[]>([]);
  const friendFriesClient = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_SUBGRAPH_URL!,
    cache: new InMemoryCache(),
  });
  useEffect(() => {
    if (wallets && wallets.length > 0) {
      friendFriesClient
        .query({
          query: gql`
            query {
              participant(id: "${wallets[0].address}") {
                id
                totalRewards
                participated(first: 50) {
                  id
                  image
                }
              }
            }
          `,
        })
        .then((result) => {
          console.log(result.data.participant);
          setParticipant(result.data.participant);
        });

      friendFriesClient
        .query({
          query: gql`
            query {
              bounties(
                first: 50
                orderBy: blockTimestamp
                orderDirection: desc
                where: { owner: "${wallets[0].address}" }
              ) {
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
    }
  }, []);
  return (
    <main>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <div className="flex justify-between font-bold text-xl pt-12">
            <p>FriendFries🍟</p>
          </div>
          <ProfileDetails profile={account} />
          {participant && (
            <div className="grid grid-cols-2 gap-4">
              <ProfileStatCard
                name="Total Rewards"
                value={`${convertEthToHumanReadable(
                  participant.totalRewards
                )} ETH`}
              />
              {participant.participated && (
                <ProfileStatCard
                  name="Bounties Completed"
                  value={participant.participated.length}
                />
              )}
              <ProfileStatCard
                name="Bounties Offered"
                value={bounty.length.toString()}
              />
            </div>
          )}
          <div className="flex justify-between font-bold text-xl pt-12">
            <p>My Bounties</p>
          </div>
          {bounty.length > 0 ? (
            bounty.map((bounty) => (
              <BountyCard key={bounty.id} bounty={bounty} />
            ))
          ) : (
            <div>Loading...</div>
          )}
        </QueryClientProvider>
      </WagmiProvider>
    </main>
  );
}
