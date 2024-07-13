"use client";
import { useEffect, useState } from "react";
// @ts-ignore
import { execHaloCmdWeb } from "@arx-research/libhalo/api/web.js";
import { BountyCard } from "./components/Bounty";

export default function Home() {
  const [response, setResponse] = useState("{}");
  function signIn() {
    let command = {
      name: "sign",
      keyNo: 1,
      message: "random nonce",
      format: "text",
    };
    execHaloCmdWeb(command)
      .then((res: any) => {
        console.log(res);
        setResponse(JSON.stringify(res, null, 4));
      })
      .catch((e: any) => {
        // display error
        console.error(e);
        setResponse(JSON.stringify(e, null, 2));
      });
  }

  return (
    <main className="flex justify-center">
      <div className="flex flex-col items-center justify-center ">
        <div>Hello</div>
        <button onClick={signIn}>Login</button>
        <div className="w-full">{response}</div>
      </div>
    </main>
  );
}
