import Link from "next/link";
import { CheckCircle, ArrowRight, Home, Building2, Sparkles, PackageOpen, HardHat, Star } from "lucide-react";
import { prisma } from "@/lib/prisma";

const iconMap: Record<string, React.ElementType> = {
  "Residential Cleaning": Home,
  "Commercial / Office Cleaning": Building2,
  "Move-In / Move-Out Cleaning": PackageOpen,
  "Deep Cleaning": Sparkles,
  "Post-Construction Cleaning": HardHat,
};

const subtitleMap: Record<string, string> = {
  "Residential Cleaning": "Regular home cleaning you can count on",
  "Commercial / Office Cleaning": "A clean workspace for a productive team",
  "Move-In / Move-Out Cleaning": "Leave the old place spotless. Start the new one fresh.",
  "Deep Cleaning": "When regular cleaning isn't enough",
  "Post-Construction Cleaning": "Finishing touches after the builders leave",
};

const slugMap: Record<string, string> = {
  "Residential Cleaning": "residential",
  "Commercial / Office Cleaning": "commercial",
  "Move-In / Move-Out Cleaning": "moveinout",
  "Deep Cleaning": "deep",
  "Post-Construction Cleaning": "post-construction",
};

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const [dbServices, dbAddons] = await Promise.all([
    prisma.service.findMany({ where: { isActive: true }, orderBy: { createdAt: "asc" } }),
    prisma.addon.findMany({ where: { isActive: true }, orderBy: { createdAt: "asc" } }),
  ]);

  const services = dbServices.map((s) => {
    let includes: string[] = [];
    try { includes = JSON.parse(s.includes); } catch { includes = []; }
    return {
      ...s,
      includes,
      Icon: iconMap[s.name] ?? Star,
      subtitle: subtitleMap[s.name] ?? "",
      slug: slugMap[s.name] ?? s.id,
    };
  });

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
              id={service.slug}
              className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-10 items-center`}
            >
              <div className="flex-1">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 bg-blue-100 text-blue-600">
                  <service.Icon size={32} />
                </div>
                {service.subtitle && (
                  <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    {service.subtitle}
                  </div>
                )}
                <h2 className="text-3xl font-extrabold text-gray-900 mb-3">{service.name}</h2>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">{service.description}</p>
                <div className="text-2xl font-bold text-blue-600 mb-6">From ${service.basePrice.toFixed(0)}</div>
                <Link
                  href={`/booking?service=${service.slug}`}
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Book This Service <ArrowRight size={18} />
                </Link>
              </div>

              {service.includes.length > 0 && (
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
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Add-Ons — live from DB */}
      {dbAddons.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Extra Add-On Services</h2>
              <p className="text-gray-500 text-lg">Customize your clean with these optional extras.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {dbAddons.map((addon) => (
                <div key={addon.id} className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                  <div className="font-semibold text-gray-900">{addon.name}</div>
                  <div className="text-blue-600 font-bold mt-1">+${addon.price.toFixed(0)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

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
