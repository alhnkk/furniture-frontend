import { Poppins } from "next/font/google";
import ProductsNavbar from "@/components/products-navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  display: "swap",
  variable: "--font-poppins",
});

export default function ProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${poppins.variable} antialiased bg-[var(--background-color)`}
    >
      <ProductsNavbar />
      {children}
    </div>
  );
}
