import { Toaster } from "@/components/ui/sonner";
import StreamVideoProvider from "@/providers/StreamClientProviders";
import { Metadata } from "next";
import React, { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Zynk",
  description: "Video Calling Application",
  icons: {
    icon: "/icons/logo.svg",
  },
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Toaster position="top-center" richColors />
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </>
  );
};

export default RootLayout;
