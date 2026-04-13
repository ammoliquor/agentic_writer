import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CodeCrafter - AI Learning Companion",
  description: "An AI-native learning companion for coding tutorials with real-time code transcripts, concept explanations, and interactive challenges.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <body className="min-h-full flex flex-col bg-gray-950 text-white">{children}</body>
    </html>
  );
}
