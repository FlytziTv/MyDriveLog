import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My DriveLog",
  description:
    "My DriveLog est une application de journal de bord pour les conducteurs.",
  icons: {
    icon: "/sz-icon.svg",
    apple: "/sz-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} antialiased`}>
      <body>
        <main className="w-full max-w-[430px] mx-auto min-h-screen relative overflow-hidden flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
