"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "ANA SAYFA", href: "#" },
    { name: "HAKKIMIZDA", href: "#about" },
    { name: "HİZMETLER", href: "#services" },
    { name: "ÜRÜNLER", href: "/products" },
    { name: "İLETİŞİM", href: "#contact" },
  ];

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();

    // Handle special case for home page (scroll to top)
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setIsOpen(false);
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav className="sticky w-full bg-[#f5f3ef] shadow-xs z-50 border border-gray-300 !top-0">
      <div className="max-w-[1728px] mx-auto px-4 sm:px-6 lg:px-8 my-1">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link id="home" href="/" onClick={(e) => scrollToSection(e, "#")}>
              <Image
                src="/logo.png"
                alt="Logo"
                width={128}
                height={128}
                className="cursor-pointer"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="text-gray-800 transition-colors duration-200 font-poppins text-lg font-medium tracking-widest
                hover:bg-gradient-to-r hover:from-amber-950 hover:via-amber-900 hover:to-amber-800 bg-clip-text hover:text-transparent
                "
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="block px-3 py-2 rounded-md text-gray-700 hover:text-[#2c5530] hover:bg-gray-50 transition-colors duration-200 font-poppins"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
