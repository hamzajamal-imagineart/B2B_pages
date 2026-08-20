import type { Metadata } from "next";
import { Google_Sans_Flex } from "next/font/google";
import "./globals.css";

// Google Sans Flex is the only typeface (§2). The kit's tokens read it as
// --font-google-sans and re-export it as --font-sans.
const googleSans = Google_Sans_Flex({
  variable: "--font-google-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ImagineArt Enterprise, On Brand at Enterprise Scale",
  description:
    "The enterprise AI creative platform that turns ideas into production-ready images and video, securely, at scale, and without limits on who gets to create.",
  // Next emits app/favicon.ico at the export root, which the host proxy 404s.
  // Point at a nested copy instead (§7).
  icons: { icon: "/media/footer/logo-icon.svg" },
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
