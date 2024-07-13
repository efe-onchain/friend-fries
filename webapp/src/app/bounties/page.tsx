"use client";
import { useEffect, useState } from "react";
// @ts-ignore
import { execHaloCmdWeb } from "@arx-research/libhalo/api/web.js";
import { BountyCard } from "../components/Bounty";

export default function Home() {
  return (
    <main>
      <div className="font-bold text-xl">FriendFries🍟</div>
      <div className="flex flex-col items-center justify-center">
        <BountyCard bountyId="1" />
      </div>
    </main>
  );
}
