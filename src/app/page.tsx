import Link from "next/link";
import {
  Star,
  CheckCircle,
  Shield,
  Clock,
  Sparkles,
  Home,
  Building2,
  ArrowRight,
  Phone,
} from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Residential Cleaning",
    desc: "Regular home cleaning tailored to your schedule and needs.",
    price: "From $120",
    href: "/services#residential",
  },
  {
    icon: Building2,
    title: "Commercial Cleaning",
    desc: "Keep your office spotlessly clean for your team and clients.",
    price: "From $180",
    href: "/services#commercial",
  },
  {
    icon: Sparkles,
    title: "Deep Cleaning",
    desc: "Thorough top-to-bottom cleaning for a truly fresh start.",
    price: "From $160",
    href: "/services#deep",
  },
  {
    icon: ArrowRight,
    title: "Move-In / Move-Out",
    desc: "Perfect cleaning for moving transitions and getting deposits back.",
    price: "From $200",
    href: "/services#moveinout",
  },
];

const testimonials = [
  {
    name: "Sarah M.",
    rating: 5,
    comment:
      "Mo's team did an amazing job with our move-out clean. We got our full deposit back! Professional and thorough.",
  },
  {
    name: "James T.",
    rating: 5,
    comment:
      "We've been using Mo's Cleaning for our office for 6 months. Always on time, always perfect. Highly recommend!",
  },
  {
    name: "Priya K.",
    rating: 5,
    comment:
      "The deep clean they did was incredible. My house has never looked this good. Worth every penny!",
  },
];

const whyUs = [
  { icon: Shield, title: "Fully Insured", desc: "Licensed and insured cleaners for your peace of mind." },
  { icon: Clock, title: "Reliable & On Time", desc: "We show up when scheduled. Every time." },
  { icon: CheckCircle, title: "Satisfaction Guaranteed", desc: "Not happy? We'll come back and make it right." },
  { icon: Sparkles, title: "Eco-Friendly Products", desc: "Safe, green cleaning products for your family and pets." },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-green-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-white" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-6 text-sm font-medium">
              <Sparkles size={16} />
              Edmonton&apos;s Trusted Cleaning Service
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold mb-6 leading-tight">
              A Cleaner Home,{" "}
              <span className="text-green-300">A Happier Life</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Professional residential and commercial cleaning in Edmonton, Alberta.
              Reliable, affordable, and always spotless.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg"
              >
                Book Cleaning Now
                <ArrowRight size={20} />
              </Link>
              <a
                href="tel:+17805550100"
                className="inline-flex items-center justify-center gap-2 bg-white/20 border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/30 transition-colors"
              >
                <Phone size={20} />
                (780) 555-0100
              </a>
            </div>
            <div className="mt-8 flex items-center gap-6">
              <div className="flex -space-x-2">
                {["S", "J", "P", "A"].map((l, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full bg-green-400 border-2 border-white flex items-center justify-center text-sm font-bold text-white"
                  >
                    {l}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex text-yellow-300">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <span className="text-sm text-blue-100">200+ happy customers in Edmonton</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 shadow-sm text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon size={24} className="text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">
              Our Cleaning Services
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              From regular home cleaning to deep commercial cleaning — we handle it all
              with professional care.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-blue-300 transition-all"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <service.icon size={24} className="text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{service.desc}</p>
                <span className="text-blue-600 font-semibold text-sm">{service.price}</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700"
            >
              View All Services <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-4">
            Ready for a Spotlessly Clean Space?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Book online in minutes. Get an instant price estimate. Serving all of Edmonton and surrounding areas.
          </p>
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg"
          >
            Book Now — It&apos;s Easy! <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-500 text-lg">Trusted by hundreds of Edmonton families and businesses.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex text-yellow-400 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-4">&ldquo;{t.comment}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold">
                    {t.name[0]}
                  </div>
                  <span className="font-semibold text-gray-900">{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">
                Serving Edmonton & Surrounding Areas
              </h2>
              <p className="text-gray-500 text-lg mb-6">
                We proudly serve Edmonton and all surrounding communities in Alberta.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Downtown Edmonton",
                  "West Edmonton",
                  "South Edmonton",
                  "North Edmonton",
                  "St. Albert",
                  "Sherwood Park",
                  "Spruce Grove",
                  "Leduc",
                ].map((area) => (
                  <div key={area} className="flex items-center gap-2 text-gray-700">
                    <CheckCircle size={16} className="text-green-500 shrink-0" />
                    {area}
                  </div>
                ))}
              </div>
              <Link
                href="/booking"
                className="mt-8 inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Book in Your Area <ArrowRight size={18} />
              </Link>
            </div>
            <div className="bg-gray-100 rounded-2xl overflow-hidden h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d154344.07!2d-113.7229!3d53.5461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53a0224580deff23%3A0x411fa00c0b605681!2sEdmonton%2C+AB!5e0!3m2!1sen!2sca!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Edmonton Service Area Map"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
