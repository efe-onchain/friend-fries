"use client";

import { Button } from "@/app/components/Button";
import { convertUnixTimestampToDateTime } from "@/app/helpers";
import Link from "next/link";
import { useState } from "react";
import { BaseError, createConfig, http, useWaitForTransactionReceipt, useWriteContract, WagmiProvider } from "wagmi";
import { friendFries } from "../../../../abi/FriendFries";
import { contractAddress } from "@/app/constants";
import { baseSepolia } from "viem/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config, queryClient } from "@/app/config";
import CreateComponent from "./create";

export default function Component() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <CreateComponent />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
