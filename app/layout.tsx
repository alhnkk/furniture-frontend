import { Poppins } from "next/font/google";
import type { Metadata } from "next";

import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  display: "swap",
  variable: "--font-family-poppins",
});

export const metadata: Metadata = {
  title: "Derya Tasarım Mimarlık",
  description: "Derya Tasarım Mimarlık",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        suppressHydrationWarning={true}
        className={`${poppins.variable} antialiased`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
