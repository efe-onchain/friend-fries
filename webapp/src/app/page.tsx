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

export default function Home() {
  const [auth, setAuth] = useState(
    null as { jwt?: string; publicKey: string } | null
  );

  async function signIn() {
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
    setAuth({ jwt, publicKey });

    // doesn't work
    // signInWithExternalJwt({
    //   externalUserId: publicKey,
    //   externalJwt: jwt,
    // }).then(async (u) => {
    //   setUser(u);
    // });
  }

  const { primaryWallet } = useDynamicContext();
  useEffect(() => {
    const wallet = primaryWallet?.address;
    if (wallet) {
      axios
        .get("https://friend-fries.vercel.app/lookup_pk", {
          params: { wallet },
        })
        .then((response) => {
          if (response.status === 200) {
            setAuth({ publicKey: response.data.publicKey });
          }
        })
        .catch(console.error);
    }
  }, [primaryWallet]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DynamicWidget />
      <div>Hello</div>
      {useIsLoggedIn() && !auth ? (
        <button onClick={signIn}>Connect bracelet</button>
      ) : null}
    </main>
  );
}
