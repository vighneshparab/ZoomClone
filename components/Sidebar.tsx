"use client";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-[#262626] p-6 pt-28 text-white max-sm:hidden lg:w-[264px]">
      <div className="flex flex-col gap-6">
        {sidebarLinks.map((link) => {
          const isActive =
            pathname === link.route || pathname.startsWith(link.route + "/");

          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn(
                "group flex gap-4 items-center p-4 rounded-lg justify-start transition-all duration-300 ease-in-out transform hover:scale-[1.03]",
                {
                  "bg-[#0400ff] shadow-md border-l-4 border-white": isActive,
                  "hover:bg-[#6092ff]/80": !isActive,
                }
              )}
            >
              <img
                src={link.imgUrl}
                alt={link.label}
                className={cn("w-6 h-6 transition-transform duration-300", {
                  "scale-110": isActive,
                  "group-hover:scale-110": !isActive,
                })}
              />
              <span className="text-lg font-semibold max-lg:hidden">
                {link.label}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;
