import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GeistMono } from "geist/font/mono";

import "./globals.css";
import { DynamicContextProvider, DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FriendFries🍟",
  description: "Chase bounties, make friends",
};
import { http, createConfig, WagmiProvider } from "wagmi";
import { baseSepolia, mainnet, sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!process.env.NEXT_PUBLIC_DYNAMIC_ENV_ID) {
    throw new Error("Set NEXT_PUBLIC_DYNAMIC_ENV_ID");
  }

  return (
    <html lang="en">
      <body
        className={`${GeistMono.className} min-h-screen max-w-md flex flex-col justify-center items-center mx-auto`}
      >
        <DynamicContextProvider
          settings={{
            environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENV_ID,
            walletConnectors: [EthereumWalletConnectors],
          }}
        >
          {children}
        </DynamicContextProvider>
      </body>
    </html>
  );
}
