"use client";
import { useEffect, useState } from "react";
import { BountyCard } from "../components/Bounty";
import Link from "next/link";
import { ProfileDetails } from "@/app/components/ProfileDetails";
import { ProfileStatCard } from "../components/ProfileStatCard";
import { convertEthToHumanReadable } from "../helpers";

import { DynamicWidget, useDynamicContext, useSocialAccounts, useUserWallets } from "@dynamic-labs/sdk-react-core";
import { execute, ProfileBountiesDocument, ProfileDetailsDocument } from "../../../.graphclient";

import { WagmiProvider } from "wagmi";
import { QueryClientProvider } from "@tanstack/react-query";
import { config, queryClient } from "../config";

export default function Home() {
  const { primaryWallet } = useDynamicContext();
  const { getLinkedAccountInformation } = useSocialAccounts();
  const account = getLinkedAccountInformation("farcaster" as any);
  const [participant, setParticipant] = useState<any>([]);
  const [bounty, setBounty] = useState<any[]>([]);
  useEffect(() => {
    const addy = primaryWallet?.address;
    console.log("ADDY", addy);
    if (addy) {
      console.log("HERE", addy);
      execute(ProfileDetailsDocument, { address: addy }).then((result) => {
        console.log(result.data.participant);
        setParticipant(result.data.participant);
      });

      execute(ProfileBountiesDocument, { address: addy }).then((result) => {
        setBounty(result.data.bounties);
      });
    }
  }, [primaryWallet]);
  return (
    <main>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <div className="flex flex-col">
            <Link href="/bounties" className="font-normal hover:underline pt-10">
              Back
            </Link>
            <div className="flex justify-between items-center font-bold text-xl pt-2">
              <p>FriendFries🍟</p>
              <DynamicWidget />
            </div>
          </div>
          <ProfileDetails profile={account} />
          {participant && (
            <div className="grid grid-cols-2 gap-4">
              <ProfileStatCard
                name="Total Rewards"
                value={`${convertEthToHumanReadable(participant.totalRewards)} ETH`}
              />
              {participant.participated && (
                <ProfileStatCard name="Bounties Completed" value={participant.participated.length} />
              )}
              <ProfileStatCard name="Bounties Offered" value={bounty.length.toString()} />
            </div>
          )}
          <div className="flex justify-between font-bold text-xl pt-12">
            <p>My Bounties</p>
          </div>
          {bounty.length > 0 ? (
            bounty.map((bounty) => <BountyCard key={bounty.id} bounty={bounty} />)
          ) : (
            <div>Loading...</div>
          )}
        </QueryClientProvider>
      </WagmiProvider>
    </main>
  );
}
