"use client";
import { useEffect, useState } from "react";
// @ts-ignore
import { execHaloCmdWeb } from "@arx-research/libhalo/api/web.js";
import { BountyCard } from "../components/Bounty";

export default function Home() {
  return (
    <main className="flex justify-center">
      <div className="flex flex-col items-center justify-center min-h-screen max-w-md fle">
        <BountyCard bountyId="1" />
      </div>
    </main>
  );
}
