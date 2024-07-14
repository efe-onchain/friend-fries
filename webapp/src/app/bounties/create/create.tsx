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

import { useDynamicContext, DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { Client, WalletClient } from "viem";

export default function CreateComponent() {
  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const { primaryWallet } = useDynamicContext();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [reward, setReward] = useState(0);
  const [maxParticipants, setMaxParticipants] = useState(0);
  const [deadline, setDeadline] = useState(0);
  const handleTitleChange = (event: any) => {
    const newValue = event.target.value;
    setTitle(newValue);
  };
  const handleDescChange = (event: any) => {
    const newValue = event.target.value;
    setDescription(newValue);
  };
  const handleImageChange = (event: any) => {
    const newValue = event.target.value;
    setImage(newValue);
  };
  const handleRewardChange = (event: any) => {
    const newValue = event.target.value;
    setReward(newValue);
  };
  const handleMaxParticipantsChange = (event: any) => {
    const newValue = event.target.value;
    setMaxParticipants(newValue);
  };
  const handleDeadlineChange = (event: any) => {
    const newValue = event.target.value;
    setDeadline(newValue);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault(); // Prevent default form submission
    const walletClient = (await primaryWallet?.connector?.getWalletClient()) as WalletClient;
    const [account] = await walletClient.getAddresses();
    await walletClient.writeContract({
      address: contractAddress,
      abi: friendFries,
      functionName: "createBounty",
      chain: baseSepolia,
      args: [title, description, image, reward * 10 ** 18, maxParticipants, deadline],
      value: BigInt(maxParticipants) * BigInt(reward * 10 ** 18),
      account,
    });
    console.log("Form submitted:", title);
    // Do not reset the title state here
  };

  return (
    <div className="container mx-auto max-w-md px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 ">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <Link href="/bounties">Back</Link>
            <DynamicWidget />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Create a Bounty</h1>
            <p className="mt-3 text-lg text-gray-500 ">Fill out the form below to create a new bounty.</p>
          </div>
          <form className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Bounty Title
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  onChange={handleTitleChange}
                  id="title"
                  value={title}
                  name="title"
                  placeholder="Coolest Looking Outfit"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary  sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 ">
                Bounty Description
              </label>
              <div className="mt-1">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={description}
                  onChange={handleDescChange}
                  placeholder="Find the person with the coolest looking outfit and take a picture with them."
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Bounty Image URL
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="image"
                  onChange={handleImageChange}
                  value={image}
                  name="image"
                  placeholder="URL of an image for your bounty"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label htmlFor="reward" className="block text-sm font-medium text-gray-700 ">
                Reward per Person (ETH)
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  id="reward"
                  name="reward"
                  min={0}
                  step={0.01}
                  onChange={handleRewardChange}
                  placeholder="Reward that each participant will receive upon completion"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label htmlFor="max-participants" className="block text-sm font-medium text-gray-700">
                Maximum Participants
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  id="max-participants"
                  name="max-participants"
                  min={1}
                  value={maxParticipants > 0 ? maxParticipants : "Maximum number of participants"}
                  onChange={handleMaxParticipantsChange}
                  placeholder="Maximum number of participants"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary  sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label htmlFor="max-participants" className="block text-sm font-medium text-gray-700">
                Deadline
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  id="max-participants"
                  name="max-participants"
                  min={1}
                  value={deadline > 0 ? deadline : "Unix timestamp: 1729318713"}
                  onChange={handleDeadlineChange}
                  placeholder="Unix timestamp: 1729318713"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary  sm:text-sm"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                onClick={handleSubmit}
                className="bg-primary text-primary-foreground hover:bg-primary/90 bg-black text-white px-4 py-2 rounded-xl"
              >
                Create Bounty
              </button>
            </div>
            {hash && <div>Transaction Hash: {hash}</div>}
            {isConfirming && <div>Waiting for confirmation...</div>}
            {isConfirmed && <div>Transaction confirmed.</div>}
            {error && <div>Error: {(error as BaseError).shortMessage || error.message}</div>}
          </form>
        </div>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Preview</h2>
            <p className="mt-3 text-lg text-gray-500 ">This is how your bounty will look.</p>
          </div>
          <div className="rounded-lg border border-gray-300 bg-white p-6 shadow-sm ">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900 ">{title}</h3>
              <div className="inline-flex items-center rounded-md bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
                {reward} ETH
              </div>
            </div>
            <p className="mt-3 text-gray-500 ">{description}</p>
            <div className="mt-4 flex items-center justify-between">
              <div className="inline-flex items-center space-x-2 text-sm text-gray-500 ">
                <UsersIcon className="h-5 w-5" />
                <span>0/{maxParticipants} participants</span>
              </div>
              <div className="inline-flex items-center space-x-2 text-sm text-gray-500 ">
                <CalendarIcon className="h-5 w-5" />
                <span>Ends on {convertUnixTimestampToDateTime(deadline)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CalendarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function UsersIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
