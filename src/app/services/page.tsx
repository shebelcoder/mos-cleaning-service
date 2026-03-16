import Link from "next/link";
import { CheckCircle, ArrowRight, Home, Building2, Sparkles, PackageOpen, HardHat } from "lucide-react";

const services = [
  {
    id: "residential",
    icon: Home,
    title: "Residential Cleaning",
    subtitle: "Regular home cleaning you can count on",
    price: "From $120",
    description:
      "Our residential cleaning service is perfect for homeowners and renters who want a consistently clean home without the hassle. We bring all supplies and equipment.",
    includes: [
      "Kitchen cleaning (counters, stovetop, sink)",
      "Bathroom scrubbing and disinfecting",
      "Vacuuming all floors and carpets",
      "Mopping hard floors",
      "Dusting surfaces and furniture",
      "Emptying trash bins",
      "Making beds (linen change optional)",
    ],
    color: "blue",
  },
  {
    id: "commercial",
    icon: Building2,
    title: "Commercial / Office Cleaning",
    subtitle: "A clean workspace for a productive team",
    price: "From $180",
    description:
      "We offer flexible commercial cleaning schedules — daily, weekly, or bi-weekly — to keep your office or business premises looking professional at all times.",
    includes: [
      "Reception and common area cleaning",
      "Office desk and surface cleaning",
      "Boardroom and meeting room cleaning",
      "Kitchen and break room sanitizing",
      "Washroom cleaning and restocking",
      "Floor vacuuming and mopping",
      "Window sill and blind dusting",
    ],
    color: "green",
  },
  {
    id: "moveinout",
    icon: PackageOpen,
    title: "Move-In / Move-Out Cleaning",
    subtitle: "Leave the old place spotless. Start the new one fresh.",
    price: "From $200",
    description:
      "Designed for tenants and homeowners moving in or out. Our thorough move cleaning helps ensure you get your full deposit back and start fresh in your new home.",
    includes: [
      "Full kitchen deep clean including inside cabinets",
      "Oven, stove, and fridge cleaning",
      "All bathroom deep scrub",
      "All floors vacuumed and washed",
      "Windows cleaned (inside)",
      "Closets and storage areas wiped",
      "All baseboards and door frames",
    ],
    color: "blue",
  },
  {
    id: "deep",
    icon: Sparkles,
    title: "Deep Cleaning",
    subtitle: "When regular cleaning isn't enough",
    price: "From $160",
    description:
      "Our deep cleaning is a comprehensive, top-to-bottom cleaning for homes that haven't been cleaned in a while or need extra attention.",
    includes: [
      "Everything in residential cleaning",
      "Inside cabinets and drawers",
      "Light fixtures and ceiling fans",
      "Door handles and switch plates",
      "Baseboards and trim",
      "Behind and under appliances",
      "Detailed bathroom scrub including grout",
    ],
    color: "green",
  },
  {
    id: "post-construction",
    icon: HardHat,
    title: "Post-Construction Cleaning",
    subtitle: "Finishing touches after the builders leave",
    price: "From $250",
    description:
      "Construction leaves behind dust, debris, and residue. Our post-construction cleaning crew clears it all, making your newly built or renovated space move-in ready.",
    includes: [
      "Removal of construction dust and debris",
      "Window cleaning (inside and out)",
      "Cleaning all surfaces and fixtures",
      "Vacuuming and mopping all floors",
      "Bathroom and kitchen fixture cleaning",
      "Interior wall spot cleaning",
      "Final inspection walkthrough",
    ],
    color: "blue",
  },
];

export default function ServicesPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-700 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-4">Our Cleaning Services</h1>
          <p className="text-blue-100 text-xl max-w-2xl mx-auto">
            Professional cleaning solutions for every need — residential, commercial, move-in/out, and more.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {services.map((service, i) => (
            <div
              key={service.id}
              id={service.id}
              className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-10 items-center`}
            >
              <div className="flex-1">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${
                    service.color === "blue"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  <service.icon size={32} />
                </div>
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  {service.subtitle}
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-3">{service.title}</h2>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">{service.description}</p>
                <div className="text-2xl font-bold text-blue-600 mb-6">{service.price}</div>
                <Link
                  href={`/booking?service=${service.id}`}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Book This Service <ArrowRight size={18} />
                </Link>
              </div>
              <div className="flex-1 bg-gray-50 rounded-2xl p-8">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">What&apos;s Included:</h3>
                <ul className="space-y-3">
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-gray-700">
                      <CheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Add-Ons */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Extra Add-On Services</h2>
            <p className="text-gray-500 text-lg">Customize your clean with these optional extras.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Inside Fridge", price: "$35" },
              { label: "Inside Oven", price: "$35" },
              { label: "Interior Windows", price: "$50" },
              { label: "Laundry (Wash & Dry)", price: "$25" },
              { label: "Dishes", price: "$20" },
              { label: "Wall Washing", price: "$60" },
              { label: "Garage Cleaning", price: "$80" },
              { label: "Basement Cleaning", price: "$70" },
            ].map((extra) => (
              <div key={extra.label} className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                <div className="font-semibold text-gray-900">{extra.label}</div>
                <div className="text-blue-600 font-bold mt-1">{extra.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-extrabold mb-4">Ready to Book?</h2>
          <p className="text-blue-100 text-lg mb-8">
            Get an instant price estimate and book your cleaning in minutes.
          </p>
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg"
          >
            Book Now <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
