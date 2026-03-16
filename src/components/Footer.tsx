import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-400 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-white font-bold text-xl">Mo&apos;s Cleaning Service</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-sm">
              Professional, reliable, and insured cleaning services for homes and businesses in Edmonton, Alberta.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/services", label: "Services" },
                { href: "/booking", label: "Book Now" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-green-400 mt-1 shrink-0" />
                <a href="tel:+17805550100" className="hover:text-white transition-colors">
                  (780) 555-0100
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-green-400 mt-1 shrink-0" />
                <a href="mailto:info@moscleaning.ca" className="hover:text-white transition-colors">
                  info@moscleaning.ca
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-green-400 mt-1 shrink-0" />
                <span>Edmonton, Alberta, Canada</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Mo&apos;s Cleaning Service. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm">
            Serving Edmonton and surrounding areas
          </p>
        </div>
      </div>
    </footer>
  );
}
