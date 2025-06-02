import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "../node_modules/react-datepicker/dist/react-datepicker.css";

export const metadata: Metadata = {
  title: "Zynk",
  description: "Video Calling Application",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          socialButtonsVariant: "iconButton",
        },
        variables: {
          colorPrimary: "#0E78F9", // Tailwind's amber-500
          colorText: "#fff", // Tailwind's amber-500
          colorBackground: "#1c1f2e",
          colorInputBackground: "#252a41",
          colorInputText: "#fff",
        },
      }}
    >
      <html lang="en">
        <body className="bg-[#161925] text-amber-100">
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
