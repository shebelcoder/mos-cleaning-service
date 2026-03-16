"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/booking", label: "Book Now" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <div>
              <span className="font-bold text-gray-900 text-lg">Mo&apos;s</span>
              <span className="text-blue-600 font-bold text-lg"> Cleaning</span>
              <div className="text-xs text-gray-500 leading-none">Edmonton, AB</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-gray-700 hover:text-blue-600 font-medium transition-colors ${
                  link.href === "/booking"
                    ? "bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 hover:text-white"
                    : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Phone CTA */}
          <a
            href="tel:+15872221440"
            className="hidden md:flex items-center gap-2 text-green-600 font-semibold hover:text-green-700"
          >
            <Phone size={18} />
            (587) 222-1440
          </a>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-gray-700 hover:text-blue-600 font-medium py-2"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="tel:+15872221440"
            className="flex items-center gap-2 text-green-600 font-semibold py-2"
          >
            <Phone size={18} />
            (587) 222-1440
          </a>
        </div>
      )}
    </nav>
  );
}
