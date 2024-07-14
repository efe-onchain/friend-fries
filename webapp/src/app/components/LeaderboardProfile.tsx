import { ApolloClient, InMemoryCache } from "@apollo/client";
import { useIsLoggedIn, useSocialAccounts, useUserWallets } from "@dynamic-labs/sdk-react-core";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { convertEthToHumanReadable } from "../helpers";

export function LeaderboardProfile({
  ranking,
  address,
  totalRewards,
}: {
  ranking: number;
  address: string;
  totalRewards: string;
}) {
  const [profile, setProfile] = useState<any>(undefined);
  useEffect(() => {
    fetch(`https://api.web3.bio/profile/${address}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA", data);
        const filtered = data.filter((profile: any) => profile.platform === "farcaster");
        if (filtered.length > 0) setProfile(filtered[0]);
      });
  }, []);
  if (!profile) return <div></div>;
  return (
    <div className="flex justify-center items-center">
      <div className="flex justify-center items-center w-32 h-32 md:w-40 md:h-40">
        <p className="font-bold pr-8">{ranking}.</p>
        {profile && (
          <img src={profile.avatar} alt="Affiliate Profile Picture" className="rounded-full h-[50px] w-[50px]" />
        )}
        <div className="mx-4">
          {profile && <h2 className="text-lg font-bold">{profile.displayName}</h2>}
          {profile && <p className="text-md text-gray-500">{address}</p>}
          {profile && <p className="text-md text-gray-500">{convertEthToHumanReadable(Number(totalRewards))} ETH</p>}
        </div>
      </div>
    </div>
  );
}
