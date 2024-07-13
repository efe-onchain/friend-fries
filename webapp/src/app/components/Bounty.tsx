"use client";

import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { convertEthToHumanReadable, convertUnixTimestampToDateTime } from "../helpers";

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

export function BountyCard({ bounty }: { bounty: any }) {
  return (
    <div>
      {bounty ? (
        <div className="flex flex-col justify-center items-center p-4">
          <Image className="rounded-xl" src={bounty.image} alt={bounty?.title} width={300} height={300} />
          <div className="py-4">
            <div>
              <p className="text-gray-500">
                from: {`${bounty.owner.substring(0, 6)}...${bounty.owner.substring(bounty.owner.length - 4)}`}
              </p>
            </div>

            <div className="flex justify-between">
              <p>Bounty: {convertEthToHumanReadable(bounty.individualReward)} ETH</p>
              <p>
                Completed By: {bounty.numParticipants}/{bounty.maxParticipants}
              </p>
            </div>
            <p className="pb-4">Deadline: {convertUnixTimestampToDateTime(bounty.deadline)}</p>
            <h3 className="text-black text-lg text-left font-semibold">{bounty.title}</h3>
            <p className="text-gray-500">{bounty.description}</p>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
