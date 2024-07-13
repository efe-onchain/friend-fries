import { QueryClient } from "@tanstack/react-query";
import { baseSepolia } from "viem/chains";
import { createConfig, http } from "wagmi";

export const config = createConfig({
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http(),
  },
});
export const queryClient = new QueryClient();
