"use client";

import Loader from "@/components/Loader";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import React, { useState } from "react";

const Meeting = ({ params }: { params: { id: string } }) => {
  const { isLoaded } = useUser();
  const [isSetUpCompleted, setisSetUpCompleted] = useState(false);
  const { call, isCallLoading } = useGetCallById(params.id); // also make sure to use `params.id`

  // ✅ Corrected conditional:
  if (isCallLoading || !isLoaded) return <Loader />;

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetUpCompleted ? (
            <MeetingSetup setisSetUpCompleted={setisSetUpCompleted} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;
