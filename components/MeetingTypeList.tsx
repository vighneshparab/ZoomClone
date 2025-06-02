"use client";

import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModel from "./MeetingModel";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { toast } from "sonner";
import { Textarea } from "./ui/textarea";
import ReactDatePicker from "react-datepicker";

type MeetingState =
  | "isScheduleMeeting"
  | "isJoiningMeeting"
  | "isInstantMeeting"
  | undefined;

const MeetingTypeList = () => {
  const router = useRouter();
  const { user } = useUser();
  const client = useStreamVideoClient();

  const [meetingState, setMeetingState] = useState<MeetingState>();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });

  const [callDetails, setCallDetails] = useState<Call>();

  const createMeeting = async () => {
    if (!user || !client) {
      toast.error("User or video client not found. Please login again.");
      return;
    }

    try {
      const id = crypto.randomUUID();
      const call = client.call("default", id);

      if (!call) {
        throw new Error("Failed to create call instance.");
      }

      const startsAt =
        values.dateTime?.toISOString() || new Date().toISOString();

      const description = values.description || "Instant meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description: description,
            link: values.link || "",
          },
        },
      });

      setCallDetails(call);
      toast.success("Meeting created successfully!");

      // For instant meetings (no description provided by user), redirect immediately
      if (!values.description.trim()) {
        router.push(`/meeting/${call.id}`);
      }
      // For scheduled meetings (with description), the modal will show the link
    } catch (error: any) {
      console.error("Error creating meeting:", error);
      toast.error("Something went wrong while creating the meeting.");
    }
  };

  const handleScheduleMeeting = () => {
    // Reset callDetails when starting to schedule a new meeting
    setCallDetails(undefined);
    setValues({
      dateTime: new Date(),
      description: "",
      link: "",
    });
    setMeetingState("isScheduleMeeting");
  };

  const handleJoinMeeting = () => {
    if (!values.link.trim()) {
      toast.error("Please enter a meeting link");
      return;
    }

    // Extract meeting ID from the link or use the link directly
    const meetingId = values.link.split("/").pop();
    if (meetingId) {
      router.push(`/meeting/${meetingId}`);
    } else {
      toast.error("Invalid meeting link");
    }
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

  return (
    <>
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        <HomeCard
          img="/icons/add-meeting.svg"
          title="New Meeting"
          description="Start an instant meeting"
          handleClick={() => setMeetingState("isInstantMeeting")}
          className="bg-orange-1"
        />
        <HomeCard
          img="/icons/schedule.svg"
          title="Schedule Meeting"
          description="Plan a meeting for later"
          handleClick={handleScheduleMeeting}
          className="bg-blue-1"
        />
        <HomeCard
          img="/icons/recordings.svg"
          title="View Recordings"
          description="Check out your recordings"
          handleClick={() => router.push("/recordings")}
          className="bg-purple-1"
        />
        <HomeCard
          img="/icons/join-meeting.svg"
          title="Join Meeting"
          description="via invitation link"
          handleClick={() => setMeetingState("isJoiningMeeting")}
          className="bg-yellow-1"
        />

        {/* Schedule Meeting Modal */}
        {!callDetails ? (
          <MeetingModel
            isOpen={meetingState === "isScheduleMeeting"}
            onClose={() => setMeetingState(undefined)}
            title="Create Meeting"
            handelClick={createMeeting}
          >
            <div className="flex flex-col gap-2.5">
              <label className="text-base text-normal leading-[22px]">
                Add a description
              </label>
              <Textarea
                className="border-none bg-gray-600 focus-visible:ring-0 focus-visible:ring-offset-0"
                value={values.description}
                onChange={(e) => {
                  setValues({ ...values, description: e.target.value });
                }}
                placeholder="Enter meeting description..."
              />
            </div>
            <div className="flex w-full flex-col gap-2.5">
              <label className="text-base text-normal leading-[22px]">
                Select Date and Time
              </label>
              <ReactDatePicker
                selected={values.dateTime}
                onChange={(date) => {
                  setValues({ ...values, dateTime: date! });
                }}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full rounded bg-gray-600 p-2 focus:outline-none"
                minDate={new Date()}
                placeholderText="Select date and time"
              />
            </div>
          </MeetingModel>
        ) : (
          <MeetingModel
            isOpen={meetingState === "isScheduleMeeting"}
            onClose={() => {
              setMeetingState(undefined);
              setCallDetails(undefined);
            }}
            title="Meeting Created"
            className="text-center"
            handelClick={() => {
              navigator.clipboard.writeText(meetingLink);
              toast.success("Link Copied");
            }}
            image="/icons/checked.svg"
            buttonIcon="/icons/copy.svg"
            buttonText="Copy Meeting Link"
          />
        )}

        {/* Instant Meeting Modal */}
        <MeetingModel
          isOpen={meetingState === "isInstantMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Start an Instant Meeting"
          className="text-center"
          buttonText="Start Meeting"
          handelClick={createMeeting}
        />

        {/* Join Meeting Modal */}
        <MeetingModel
          isOpen={meetingState === "isJoiningMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Join Meeting"
          className="text-center"
          buttonText="Join Meeting"
          handelClick={handleJoinMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base text-normal leading-[22px]">
              Paste the link here
            </label>
            <input
              type="text"
              placeholder="Meeting link"
              className="border-none bg-gray-600 focus-visible:ring-0 focus-visible:ring-offset-0 rounded p-2 focus:outline-none"
              value={values.link}
              onChange={(e) => setValues({ ...values, link: e.target.value })}
            />
          </div>
        </MeetingModel>
      </section>
    </>
  );
};

export default MeetingTypeList;
