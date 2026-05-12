import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const kuraDisplay = localFont({
  src: [
    {
      path: "../public/fonts/kura/Kura-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-kura",
});

const arponaSans = localFont({
  src: [
    {
      path: "../public/fonts/arpona-sans/fonts/fonnts.com-ArponaSans_Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/arpona-sans/fonts/fonnts.com-ArponaSans_Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/arpona-sans/fonts/fonnts.com-ArponaSans_SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/arpona-sans/fonts/fonnts.com-ArponaSans_Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-arpona",
});

export const metadata: Metadata = {
  title: "GrabV",
  description: "One Gravy Endless Possibilities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true} className={`h-full antialiased ${kuraDisplay.variable} ${arponaSans.variable}`}>
      <body suppressHydrationWarning={true} className="min-h-full flex flex-col font-arpona">{children}</body>
    </html>
  );
}
