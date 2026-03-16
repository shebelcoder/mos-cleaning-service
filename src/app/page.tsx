import Link from "next/link";
import {
  Star, CheckCircle, Shield, Clock, Sparkles, Home, Building2, ArrowRight, Phone,
} from "lucide-react";

const services = [
  { icon: Home, title: "Residential Cleaning", desc: "Regular home cleaning tailored to your schedule.", price: "From $120", href: "/services#residential" },
  { icon: Building2, title: "Commercial Cleaning", desc: "Keep your office spotless for your team and clients.", price: "From $180", href: "/services#commercial" },
  { icon: Sparkles, title: "Deep Cleaning", desc: "Thorough top-to-bottom cleaning for a truly fresh start.", price: "From $160", href: "/services#deep" },
  { icon: ArrowRight, title: "Move-In / Move-Out", desc: "Perfect cleaning for moving transitions.", price: "From $200", href: "/services#moveinout" },
];

const testimonials = [
  { name: "Sarah M.", rating: 5, comment: "Mo's team did an amazing job with our move-out clean. We got our full deposit back! Professional and thorough." },
  { name: "James T.", rating: 5, comment: "We've been using Mo's Cleaning for our office for 6 months. Always on time, always perfect. Highly recommend!" },
  { name: "Priya K.", rating: 5, comment: "The deep clean they did was incredible. My house has never looked this good. Worth every penny!" },
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
      {/* ── Hero ── */}
      <section className="relative text-white overflow-hidden" style={{ backgroundColor: "#003d54" }}>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#00adee]" style={{ transform: "translate(30%, -30%)" }} />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#00adee]" style={{ transform: "translate(-30%, 30%)" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 text-sm font-medium border border-[#00adee]/40" style={{ backgroundColor: "#00adee18", color: "#00adee" }}>
              <Sparkles size={15} />
              Edmonton&apos;s Trusted Cleaning Service
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Make Your Home<br />
              <span style={{ color: "#00adee" }}>Shine Again</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed">
              Professional residential and commercial cleaning in Edmonton, Alberta.
              Reliable, affordable, and always spotless.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center gap-2 text-white font-bold px-8 py-4 rounded-full text-base transition-opacity hover:opacity-90 shadow-lg"
                style={{ backgroundColor: "#00adee" }}
              >
                Book Your Cleaning <ArrowRight size={18} />
              </Link>
              <a
                href="tel:+15872221440"
                className="inline-flex items-center justify-center gap-2 font-bold px-8 py-4 rounded-full text-base border-2 transition-colors hover:bg-white/10"
                style={{ borderColor: "#00adee", color: "#00adee" }}
              >
                <Phone size={18} /> (587) 222-1440
              </a>
            </div>
            <div className="mt-10 flex items-center gap-5">
              <div className="flex -space-x-2">
                {["S", "J", "P", "A"].map((l, i) => (
                  <div key={i} className="w-9 h-9 rounded-full border-2 border-[#003d54] flex items-center justify-center text-sm font-bold text-white" style={{ backgroundColor: "#00adee" }}>
                    {l}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={15} fill="currentColor" />)}
                </div>
                <span className="text-sm text-gray-400">200+ happy customers in Edmonton</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Us strip ── */}
      <section className="py-14" style={{ backgroundColor: "#f1f4f4" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyUs.map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: "#00adee1a" }}>
                  <item.icon size={22} style={{ color: "#00adee" }} />
                </div>
                <h3 className="font-bold mb-1.5 text-sm" style={{ color: "#003d54" }}>{item.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-4" style={{ color: "#003d54" }}>
              Our Cleaning Services
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              From regular home cleaning to deep commercial cleaning — we handle it all.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all hover:border-[#00adee]/40"
                style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110" style={{ backgroundColor: "#00adee1a" }}>
                  <service.icon size={22} style={{ color: "#00adee" }} />
                </div>
                <h3 className="font-bold mb-2 text-sm" style={{ color: "#003d54" }}>{service.title}</h3>
                <p className="text-gray-500 text-xs mb-4 leading-relaxed">{service.desc}</p>
                <span className="text-sm font-bold" style={{ color: "#00adee" }}>{service.price}</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/services" className="inline-flex items-center gap-2 font-semibold text-sm transition-colors hover:opacity-80" style={{ color: "#00adee" }}>
              View All Services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-20 text-white" style={{ backgroundColor: "#003d54" }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-4">
            Ready for a Spotlessly Clean Space?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
            Book online in minutes. Get an instant price estimate. Serving all of Edmonton and surrounding areas.
          </p>
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 font-bold text-lg text-white px-10 py-4 rounded-full transition-opacity hover:opacity-90 shadow-lg"
            style={{ backgroundColor: "#00adee" }}
          >
            Book Now — It&apos;s Easy! <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20" style={{ backgroundColor: "#f1f4f4" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-extrabold mb-3" style={{ color: "#003d54" }}>
              What Our Customers Say
            </h2>
            <p className="text-gray-500 text-lg">Trusted by hundreds of Edmonton families and businesses.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex text-yellow-400 mb-3">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-gray-600 text-sm italic mb-5 leading-relaxed">&ldquo;{t.comment}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0" style={{ backgroundColor: "#00adee" }}>
                    {t.name[0]}
                  </div>
                  <span className="font-semibold text-sm" style={{ color: "#003d54" }}>{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service Area ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-extrabold mb-4" style={{ color: "#003d54" }}>
                Serving Edmonton &amp; Surrounding Areas
              </h2>
              <p className="text-gray-500 text-lg mb-6">
                We proudly serve Edmonton and all surrounding communities in Alberta.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {["Downtown Edmonton", "West Edmonton", "South Edmonton", "North Edmonton", "St. Albert", "Sherwood Park", "Spruce Grove", "Leduc"].map((area) => (
                  <div key={area} className="flex items-center gap-2 text-gray-700 text-sm">
                    <CheckCircle size={15} className="shrink-0" style={{ color: "#00adee" }} />
                    {area}
                  </div>
                ))}
              </div>
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 text-white font-bold px-7 py-3.5 rounded-full transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#00adee" }}
              >
                Book in Your Area <ArrowRight size={16} />
              </Link>
            </div>
            <div className="rounded-2xl overflow-hidden h-80 bg-gray-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d154344.07!2d-113.7229!3d53.5461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53a0224580deff23%3A0x411fa00c0b605681!2sEdmonton%2C+AB!5e0!3m2!1sen!2sca!4v1"
                width="100%" height="100%" style={{ border: 0 }}
                allowFullScreen loading="lazy" title="Edmonton Service Area Map"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
