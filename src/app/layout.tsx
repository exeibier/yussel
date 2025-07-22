import type { Metadata } from "next";
import { Bebas_Neue, Noto_Sans_Sundanese } from "next/font/google";
import "./globals.css";

const bebasNeu = Bebas_Neue({
  variable: "--font-bebas-neu",
  subsets: ["latin"],
  weight: '400',
});

const nonoSans = Noto_Sans_Sundanese({
  variable: "--font-nono-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Yussel Estrada",
  description: "Photography",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bebasNeu.variable} ${nonoSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
