import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stitchy Fashion | Premium Coat Cutting & Stitching",
  description:
    "Stitchy Fashion — 30 Years Experienced Master Tailor specializing in Coat Cutting & Stitching.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}