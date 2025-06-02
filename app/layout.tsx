import type { Metadata } from "next";
import "./globals.css";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "../node_modules/react-datepicker/dist/react-datepicker.css";
import { Providers } from "@/providers/providers";

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
    <html lang="en">
      <body className="bg-[#161925] text-amber-100">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
