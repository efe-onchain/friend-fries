"use client";
import { useEffect, useState } from "react";
// @ts-ignore
import { execHaloCmdWeb } from "@arx-research/libhalo/api/web.js";
import {
  DynamicContextProvider,
  DynamicWidget,
  useDynamicContext,
  useEmbeddedWallet,
  useIsLoggedIn,
  UserProfile,
  useUserWallets,
} from "@dynamic-labs/sdk-react-core";
import axios from "axios";
import { createConfig, http, WagmiProvider } from "wagmi";
import { baseSepolia } from "viem/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config, queryClient } from "./config";

export default function Home() {
  const [response, setResponse] = useState("{}");
  // const [otc, setOtc] = useState("");
  const [auth, setAuth] = useState(null as { jwt: string; publicKey: string } | null);
  // const [user, setUser] = useState<UserProfile | undefined>();

  // const { signInWithExternalJwt } = useExternalAuth();
  async function signIn() {
    // console.log(isSessionActive);
    // if (!isSessionActive) {
    //   try {
    //     setOtc(await sendOneTimeCode());
    //     // do whatever you want with that Id
    //   } catch (e) {
    //     // handle error
    //     console.error(e);
    //   }
    // }

    // try {
    //   if (!primaryWallet || !userHasEmbeddedWallet()) return;

    //   console.log(await createOrRestoreSession({ oneTimeCode: otc }));
    // } catch (err) {
    //   console.error(err);
    // }

    console.log(primaryWallet);
    const nonce = (await axios.get("https://friend-fries.vercel.app/login")).data.nonce;
    let command = {
      name: "sign",
      keyNo: 1,
      message: nonce,
      format: "text",
    };
    const response = await execHaloCmdWeb(command);
    const signature = response.signature.der;
    const publicKey = response.publicKey;

    const jwt = (
      await axios.get("https://friend-fries.vercel.app/login", {
        params: { signature, nonce, publicKey },
      })
    ).data.jwt;
    setResponse(jwt);
    setAuth({ jwt, publicKey });

    // doesn't work
    // signInWithExternalJwt({
    //   externalUserId: publicKey,
    //   externalJwt: jwt,
    // }).then(async (u) => {
    //   setUser(u);
    // });
  }

  const { primaryWallet, isAuthenticated } = useDynamicContext();
  useEffect(() => {
    console.log("wallet: " + primaryWallet?.address);
  }, [primaryWallet]);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <DynamicWidget />
          <div>Hello</div>
          {!useIsLoggedIn() || !auth ? <button onClick={signIn}>Connect bracelet</button> : null}
          <div className="w-full">{response}</div>
        </main>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
