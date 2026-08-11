import type { Metadata } from "next";
import { Google_Sans_Flex } from "next/font/google";
import "./globals.css";

// Google Sans Flex is a variable font; we cap rendered weight at 500 via CSS.
const googleSans = Google_Sans_Flex({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ImagineArt Enterprise — Create at the speed of your ambition",
  description:
    "The enterprise AI creative platform that turns ideas into production-ready images and video — securely, at scale, and without limits on who gets to create.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={googleSans.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
