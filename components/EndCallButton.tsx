"use client";

import { useCall, useCallStateHooks } from "@stream-io/video-react-sdk";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const EndCallButton = () => {
  const call = useCall();
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();
  const isMeetingOnwer =
    localParticipant &&
    call?.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

  const router = useRouter();

  if (!isMeetingOnwer) return null;
  return (
    <>
      <Button
        onClick={async () => {
          await call.endCall();
          router.push("/");
        }}
        className="bg-red-500 hover:bg-red-400"
      >
        End Call For Everyone
      </Button>
    </>
  );
};

export default EndCallButton;
