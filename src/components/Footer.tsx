import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#003d54" }} className="text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#00adee]/20">
                <span className="font-extrabold text-lg" style={{ color: "#00adee" }}>M</span>
              </div>
              <span className="text-white font-extrabold text-lg">Mo&apos;s Cleaning Service</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5 max-w-xs">
              Professional, reliable, and insured cleaning services for homes and businesses in Edmonton, Alberta.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-[#00adee] transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-[#00adee] transition-colors"><Instagram size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { href: "/", label: "Home" },
                { href: "/services", label: "Services" },
                { href: "/booking", label: "Book Now" },
                { href: "/about", label: "About Us" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-[#00adee] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone size={15} className="mt-0.5 shrink-0" style={{ color: "#00adee" }} />
                <a href="tel:+15872221440" className="text-sm text-gray-400 hover:text-white transition-colors">
                  (587) 222-1440
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={15} className="mt-0.5 shrink-0" style={{ color: "#00adee" }} />
                <a href="mailto:info@moscleaning.ca" className="text-sm text-gray-400 hover:text-white transition-colors">
                  info@moscleaning.ca
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={15} className="mt-0.5 shrink-0" style={{ color: "#00adee" }} />
                <span className="text-sm text-gray-400">Edmonton, Alberta, Canada</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Mo&apos;s Cleaning Service. All rights reserved.</p>
          <p className="text-gray-500 text-sm">Serving Edmonton and surrounding areas</p>
        </div>
      </div>
    </footer>
  );
}
