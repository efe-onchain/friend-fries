"use client";
import { useEffect, useState } from "react";
import {
  DynamicWidget,
  useDynamicContext,
  useIsLoggedIn,
} from "@dynamic-labs/sdk-react-core";
import axios from "axios";
import { useRouter } from "next/navigation";
import { authenticate } from "./utils";
import { CustomModal } from "./components/CustomModal";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [auth, setAuth] = useState(
    null as { jwt?: string; publicKey: string } | null
  );

  async function signIn() {
    const auth = await authenticate(primaryWallet?.address);

    setAuth(auth);

    // doesn't work
    // signInWithExternalJwt({
    //   externalUserId: publicKey,
    //   externalJwt: jwt,
    // }).then(async (u) => {
    //   setUser(u);
    // });
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
            <button onClick={() => setOpenModal(true)}>Connect bracelet</button>
          ) : null}
          <CustomModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            friend={false}
            onClick={() => {
              signIn().then(() => {
                setOpenModal(false);
              });
            }}
          />
        </div>
      )}
    </main>
  );
}
