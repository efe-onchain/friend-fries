"use client";
import { useEffect, useState } from "react";
// @ts-ignore
import { execHaloCmdWeb } from "@arx-research/libhalo/api/web.js";

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
        setResponse(JSON.stringify(res));
      })
      .catch((e: any) => {
        // display error
        console.error(e);
        setResponse(JSON.stringify(e));
      });
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>Hello</div>
      <button onClick={signIn}>Login</button>
      {response}
    </main>
  );
}
