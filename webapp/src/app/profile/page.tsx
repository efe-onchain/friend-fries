"use client";
import { useEffect, useState } from "react";
import { BountyCard } from "../components/Bounty";
import Link from "next/link";
import { ProfileDetails } from "@/app/components/ProfileDetails";
import { ProfileStatCard } from "../components/ProfileStatCard";
import { convertEthToHumanReadable } from "../helpers";
import "react-responsive-modal/styles.css";

import { DynamicWidget, useSocialAccounts, useUserWallets } from "@dynamic-labs/sdk-react-core";
import { execute, ProfileBountiesDocument, ProfileDetailsDocument } from "../../../.graphclient";

export default function Home() {
  const wallets = useUserWallets();
  const { getLinkedAccountInformation } = useSocialAccounts();
  const account = getLinkedAccountInformation("farcaster" as any);
  const [participant, setParticipant] = useState<any>([]);
  const [bounty, setBounty] = useState<any[]>([]);
  useEffect(() => {
    if (wallets && wallets.length > 0) {
      execute(ProfileDetailsDocument, { address: wallets[0].address }).then((result) => {
        console.log(result.data.participant);
        setParticipant(result.data.participant);
      });

      execute(ProfileBountiesDocument, { address: wallets[0].address }).then((result) => {
        setBounty(result.data.bounties);
      });
    }
  }, []);
  return (
    <main>
      <div className="flex justify-between items-center font-bold text-xl pt-12">
        <p>FriendFries🍟</p>
        <DynamicWidget />
      </div>
      <ProfileDetails profile={account} />
      {participant && (
        <div className="grid grid-cols-2 gap-4">
          <ProfileStatCard name="Total Rewards" value={`${convertEthToHumanReadable(participant.totalRewards)} ETH`} />
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
    </main>
  );
}
