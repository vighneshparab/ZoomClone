"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { avatarImages } from "@/constants";
import { toast } from "sonner";

interface MeetingCardProps {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
  link: string;
}

const MeetingCard = ({
  icon,
  title,
  date,
  isPreviousMeeting,
  buttonIcon1,
  handleClick,
  link,
  buttonText,
}: MeetingCardProps) => {
  return (
    <section className="group relative flex min-h-[280px] w-full flex-col justify-between rounded-2xl bg-gradient-to-br from-dark-1 to-dark-2/50 p-6 shadow-xl border border-dark-3/20 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-1/10 hover:-translate-y-2 xl:max-w-[568px]">
      {/* Subtle animated background glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-1/10 via-transparent to-purple-1/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />

      <article className="relative z-10 flex flex-col gap-6">
        {/* Enhanced icon container */}
        <div className="flex items-start justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-1/20 to-purple-1/20 border border-blue-1/30 shadow-lg backdrop-blur-sm">
            <Image
              src={icon}
              alt="upcoming"
              width={32}
              height={32}
              className="opacity-90 group-hover:opacity-100 transition-opacity duration-300"
            />
          </div>

          {/* Status badge for previous meetings */}
          {isPreviousMeeting && (
            <span className="px-3 py-1.5 text-xs font-semibold text-orange-300 bg-orange-500/20 rounded-full border border-orange-500/30 backdrop-blur-sm">
              Completed
            </span>
          )}
        </div>

        {/* Enhanced typography */}
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold text-white leading-tight tracking-tight group-hover:text-blue-1/95 transition-colors duration-300">
            {title}
          </h1>
          <div className="flex items-center gap-2 text-gray-300">
            <div className="w-2 h-2 bg-blue-1/70 rounded-full animate-pulse"></div>
            <p className="text-base font-medium">{date}</p>
          </div>
        </div>
      </article>

      {/* Enhanced bottom section */}
      <article className="relative z-10 flex items-center justify-between pt-4 border-t border-dark-3/30">
        {/* Improved avatar stack */}
        <div className="flex items-center max-sm:hidden">
          <div className="flex items-center -space-x-3">
            {avatarImages.map((img, index) => (
              <div key={index} className="relative group/avatar">
                <Image
                  src={img}
                  alt="attendees"
                  width={44}
                  height={44}
                  className="rounded-full border-3 border-dark-1 shadow-lg hover:scale-110 hover:z-10 transition-all duration-200 group-hover/avatar:border-blue-1/50"
                />
              </div>
            ))}
            <div className="flex items-center justify-center ml-2 w-11 h-11 text-sm font-bold text-gray-200 bg-gradient-to-br from-dark-3 to-dark-4 rounded-full border-3 border-dark-1 shadow-lg hover:scale-110 transition-all duration-200">
              +5
            </div>
          </div>
        </div>

        {/* Enhanced action buttons */}
        {!isPreviousMeeting && (
          <div className="flex gap-3">
            <Button
              onClick={handleClick}
              className="group/btn relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-1 to-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:shadow-blue-1/30 hover:scale-105 transition-all duration-300 border-0 min-w-[120px]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center justify-center gap-2">
                {buttonIcon1 && (
                  <Image
                    src={buttonIcon1}
                    alt="feature"
                    width={18}
                    height={18}
                    className="group-hover/btn:scale-110 transition-transform duration-200"
                  />
                )}
                {buttonText}
              </div>
            </Button>

            <Button
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast.success("Link Copied");
              }}
              className="group/copy relative overflow-hidden rounded-xl bg-dark-3/80 hover:bg-dark-2 px-6 py-3 text-sm font-semibold text-gray-200 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 border border-dark-3/50 min-w-[120px]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover/copy:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center justify-center gap-2">
                <Image
                  src="/icons/copy.svg"
                  alt="copy link"
                  width={16}
                  height={16}
                  className="opacity-80 group-hover/copy:opacity-100 group-hover/copy:scale-110 transition-all duration-200"
                />
                Copy Link
              </div>
            </Button>
          </div>
        )}
      </article>
    </section>
  );
};

export default MeetingCard;
