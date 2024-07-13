"use client";

import { Button } from "@/app/components/Button";
import { convertUnixTimestampToDateTime } from "@/app/helpers";
import Link from "next/link";
import { useState } from "react";

export default function Component() {
  const [title, setTitle] = useState("Coolest Looking Outfit");
  const [description, setDescription] = useState(
    "Find the person with the coolest looking outfit and take a picture with them."
  );
  const [image, setImage] = useState("URL of an image for your bounty");
  const [reward, setReward] = useState(0);
  const [maxParticipants, setMaxParticipants] = useState(0);
  const [deadline, setDeadline] = useState(1729318713);
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

  return (
    <div className="container mx-auto max-w-md px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 ">
        <div className="space-y-6">
          <Link href="/bounties">Back</Link>
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
                  onChange={handleDeadlineChange}
                  placeholder="Unix timestamp: 1729318713"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary  sm:text-sm"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Create Bounty</Button>
            </div>
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
                <span>10/{maxParticipants} participants</span>
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
