import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "uniSSH Admin Dash",
  description: "uniSSH dashboard for stats and other data",
};

import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SpeedInsights></SpeedInsights>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
