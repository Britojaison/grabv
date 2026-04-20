import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const tropicalHorizon = localFont({
  src: "../public/fonts/tropical-horizon/Tropical Horizon.otf",
  variable: "--font-kura",
});

const bomstadDisplay = localFont({
  src: [
    {
      path: "../public/fonts/bomstad-display/Bomstad Display/OTF/BomstadDisplay-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/bomstad-display/Bomstad Display/OTF/BomstadDisplay-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/bomstad-display/Bomstad Display/OTF/BomstadDisplay-Bold.otf",
      weight: "700",
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
    <html lang="en" className={`h-full antialiased ${tropicalHorizon.variable} ${bomstadDisplay.variable}`}>
      <body className="min-h-full flex flex-col font-bomstad">{children}</body>
    </html>
  );
}
