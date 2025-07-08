import { Poppins } from "next/font/google";
import type { Metadata } from "next";

import "./globals.css";
import Footer from "@/components/footer";
import WhatsAppFloat from "@/components/whatsapp-float";
import getSettings from "@/actions/get-settings";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  display: "swap",
  variable: "--font-family-poppins",
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await getSettings();
    return {
      title:
        settings.metaData?.title ||
        settings.siteName ||
        "Derya Mimarlık Tasarım",
      description:
        settings.metaData?.description ||
        "Derya Mimarlık Tasarım - Profesyonel mimarlık ve tasarım hizmetleri",
      keywords: settings.metaData?.keywords?.join(", "),
    };
  } catch (error) {
    return {
      title: "Derya Mimarlık Tasarım",
      description: "Derya Mimarlık Tasarım",
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* Critical CSS for LCP */
              .group { position: relative; }
              .aspect-\\[2\\.4\\/1\\] { aspect-ratio: 2.4 / 1; }
              .object-cover { object-fit: cover; }
              .bg-gradient-to-t { background-image: linear-gradient(to top, var(--tw-gradient-stops)); }
              .from-black\\/40 { --tw-gradient-from: rgb(0 0 0 / 0.4); }
              .via-transparent { --tw-gradient-via: transparent; }
              .to-black\\/20 { --tw-gradient-to: rgb(0 0 0 / 0.2); }
              .absolute { position: absolute; }
              .inset-0 { inset: 0px; }
              .z-10 { z-index: 10; }
              .z-20 { z-index: 20; }
              .h-\\[360px\\] { height: 360px; }
              @media (min-width: 1024px) {
                .lg\\:h-\\[768px\\] { height: 768px; }
              }
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning={true}
        className={`${poppins.variable} antialiased`}
      >
        {children}
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
