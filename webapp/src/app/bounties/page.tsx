"use client";
import { useEffect, useState } from "react";
// @ts-ignore
import { execHaloCmdWeb } from "@arx-research/libhalo/api/web.js";
import { BountyCard } from "../components/Bounty";
import { LatestBountiesDocument, execute } from "../../../.graphclient";
import Link from "next/link";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

import { WagmiProvider } from "wagmi";
import { QueryClientProvider } from "@tanstack/react-query";
import { config, queryClient } from "../config";

export default function Home() {
  const [bounty, setBounty] = useState<any[]>([]);

  useEffect(() => {
    execute(LatestBountiesDocument, {}).then((result) => {
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

        <div className="hover:underline">Available Bounties</div>
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
