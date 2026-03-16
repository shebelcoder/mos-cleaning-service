"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "#003d54" }}>
              <span className="text-white font-extrabold text-lg" style={{ color: "#00adee" }}>M</span>
            </div>
            <div className="leading-tight">
              <div className="font-extrabold text-base" style={{ color: "#003d54" }}>
                Mo&apos;s <span style={{ color: "#00adee" }}>Cleaning</span>
              </div>
              <div className="text-xs text-gray-400">Edmonton, AB</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-[#00adee] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop right side */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+15872221440"
              className="flex items-center gap-1.5 text-sm font-semibold transition-colors"
              style={{ color: "#00adee" }}
            >
              <Phone size={16} />
              (587) 222-1440
            </a>
            <Link
              href="/booking"
              className="text-sm font-bold text-white px-5 py-2.5 rounded-full transition-colors"
              style={{ backgroundColor: "#32373c" }}
            >
              Book Now
            </Link>
          </div>

          {/* Mobile: phone + hamburger */}
          <div className="flex items-center gap-3 md:hidden">
            <a
              href="tel:+15872221440"
              className="text-sm font-semibold"
              style={{ color: "#00adee" }}
            >
              <Phone size={20} />
            </a>
            <button
              className="p-1.5 rounded-lg text-gray-600"
              style={{ color: "#003d54" }}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 pt-3 pb-5 space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-[#f1f4f4] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 pb-1 border-t border-gray-100 mt-2">
              <a
                href="tel:+15872221440"
                className="flex items-center gap-2 px-3 py-3 text-sm font-semibold rounded-xl hover:bg-[#f1f4f4] transition-colors"
                style={{ color: "#00adee" }}
              >
                <Phone size={16} />
                (587) 222-1440
              </a>
              <Link
                href="/booking"
                onClick={() => setIsOpen(false)}
                className="mt-2 flex items-center justify-center text-sm font-bold text-white py-3 rounded-full transition-colors"
                style={{ backgroundColor: "#32373c" }}
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
