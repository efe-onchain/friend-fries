"use client";

import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  convertEthToHumanReadable,
  convertUnixTimestampToDateTime,
} from "../helpers";
import { Button } from "./Button";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import axios from "axios";
import { authenticate } from "../utils";
import { CustomModal } from "./CustomModal";

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

async function lookupUser() {
  const auth = await authenticate();

  const wallet: string = (
    await axios.get(
      `https://friend-fries.vercel.app/lookup_wallet/${auth.publicKey}`
    )
  ).data.wallet;

  return wallet;
}

async function completeBounty() {
  const wallet = await lookupUser();
  // TODO: trx
}

export function BountyCard({ bounty }: { bounty: any }) {
  const address = "0x30d38078d6117285d6730f971d3f50a9004a575b";
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      {bounty ? (
        <div className="flex flex-col justify-center items-center p-4">
          <Image
            className="rounded-xl"
            src={bounty.image}
            alt={bounty?.title}
            width={300}
            height={300}
          />
          <div className="py-4">
            <div>
              <p className="text-gray-500">
                from:{" "}
                {`${bounty.owner.substring(0, 6)}...${bounty.owner.substring(
                  bounty.owner.length - 4
                )}`}
              </p>
            </div>

            <div className="flex justify-between">
              <p>
                Bounty: {convertEthToHumanReadable(bounty.individualReward)} ETH
              </p>
              <p>
                Completed By: {bounty.numParticipants}/{bounty.maxParticipants}
              </p>
            </div>
            <p className="pb-4">
              Deadline: {convertUnixTimestampToDateTime(bounty.deadline)}
            </p>
            <h3 className="text-black text-lg text-left font-semibold">
              {bounty.title}
            </h3>
            <p className="text-gray-500">{bounty.description}</p>
            <div className="flex justify-end">
              {address === bounty.owner && (
                <Button
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => setOpenModal(true)}
                >
                  Accept Submission
                </Button>
              )}
            </div>
          </div>
          <CustomModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            onClick={completeBounty}
          />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
