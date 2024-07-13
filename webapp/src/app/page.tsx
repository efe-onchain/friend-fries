"use client";
import { useEffect, useState } from "react";
// @ts-ignore
import { execHaloCmdWeb } from "@arx-research/libhalo/api/web.js";
import {
  DynamicWidget,
  useDynamicContext,
  useIsLoggedIn,
} from "@dynamic-labs/sdk-react-core";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [auth, setAuth] = useState(
    null as { jwt?: string; publicKey: string } | null
  );

  async function authenticate() {
    const nonce = (await axios.get("https://friend-fries.vercel.app/login"))
      .data.nonce;
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
        params: { signature, nonce, publicKey, wallet: primaryWallet?.address },
      })
    ).data.jwt;

    // TODO: verify jwt I guess
    if (jwt) return { jwt, publicKey };

    throw new Error("authentication failed");
  }

  async function signIn() {
    const auth = await authenticate();

    setAuth(auth);

    // doesn't work
    // signInWithExternalJwt({
    //   externalUserId: publicKey,
    //   externalJwt: jwt,
    // }).then(async (u) => {
    //   setUser(u);
    // });
  }

  async function lookupUser() {
    const auth = await authenticate();

    const wallet = (
      await axios.get(
        `https://friend-fries.vercel.app/lookup_wallet/${auth.publicKey}`
      )
    ).data.wallet;

    return wallet;
  }

  const { primaryWallet, sdkHasLoaded } = useDynamicContext();
  const loggedIn = useIsLoggedIn();
  useEffect(() => {
    const wallet = primaryWallet?.address;
    if (wallet) {
      axios
        .get(`https://friend-fries.vercel.app/lookup_pk/${wallet}`)
        .then((response) => {
          if (response.status === 200) {
            setAuth({ publicKey: response.data.publicKey });
          }
        })
        .catch(console.error)
        .finally(() => setIsLoading(false));
    } else if (sdkHasLoaded) {
      setIsLoading(false);
    }
  }, [loggedIn, primaryWallet, sdkHasLoaded]);

  const router = useRouter();
  useEffect(() => {
    if (auth) {
      router.replace("/bounties");
    }
  }, [auth, router]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <DynamicWidget />
          <div>Hello</div>
          {loggedIn && !auth ? (
            <button onClick={signIn}>Connect bracelet</button>
          ) : null}
        </div>
      )}
    </main>
  );
}
