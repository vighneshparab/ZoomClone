import MeetingTypeList from "@/components/MeetingTypeList";
import React from "react";

// Server-side logic (runs once per request)
const getCurrentDateTime = () => {
  const now = new Date();

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const currentTime = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const currentDate = now.toLocaleDateString("en-US", dateOptions);

  return { currentTime, currentDate };
};

const Home = () => {
  const { currentTime, currentDate } = getCurrentDateTime();

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal">
            Upcoming meeting at 12:30 PM
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">
              {currentTime}
            </h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">
              {currentDate}
            </p>
          </div>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  );
};

export default Home;
