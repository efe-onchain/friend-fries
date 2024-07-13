"use client";
import { useEffect, useState } from "react";

import { LeaderboardProfile } from "../components/LeaderboardProfile";
import Link from "next/link";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { execute, LeaderboardDocument } from "../../../.graphclient";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  useEffect(() => {
    execute(LeaderboardDocument, {}).then((result) => {
      setLeaderboard(result.data.participants);
    });
  }, []);
  return (
    <div>
      <Link href="/bounties" className="text-md font-normal">
        Back
      </Link>
      <div className="flex justify-between items-center font-bold text-xl pt-2">
        <p>FriendFries🍟</p>
        <DynamicWidget />
      </div>

      {leaderboard ? (
        <div className="flex flex-col items-center justify-center">
          {leaderboard.length > 0 ? (
            leaderboard.map((participant, index) => (
              <LeaderboardProfile
                key={index}
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
