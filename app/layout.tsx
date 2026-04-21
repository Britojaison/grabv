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

const bomstadDisplay = localFont({
  src: [
    {
      path: "../public/fonts/bomstad-display/BomstadDisplay-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/bomstad-display/BomstadDisplay-ExtraLight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/bomstad-display/BomstadDisplay-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/bomstad-display/BomstadDisplay-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/bomstad-display/BomstadDisplay-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/bomstad-display/BomstadDisplay-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/bomstad-display/BomstadDisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/bomstad-display/BomstadDisplay-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/bomstad-display/BomstadDisplay-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-bomstad",
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
    <html lang="en" className={`h-full antialiased ${kuraDisplay.variable} ${bomstadDisplay.variable}`}>
      <body className="min-h-full flex flex-col font-bomstad">{children}</body>
    </html>
  );
}
