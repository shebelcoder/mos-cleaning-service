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
      <section className="text-white py-20" style={{ backgroundColor: "#003d54" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-4">Our Cleaning Services</h1>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto">
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
              className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-10 items-start`}
            >
              <div className="flex-1 w-full">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: "#00adee1a" }}>
                  <service.Icon size={28} style={{ color: "#00adee" }} />
                </div>
                {service.subtitle && (
                  <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#00adee" }}>
                    {service.subtitle}
                  </div>
                )}
                <h2 className="text-2xl sm:text-3xl font-extrabold mb-3" style={{ color: "#003d54" }}>{service.name}</h2>
                <p className="text-gray-600 mb-5 text-base leading-relaxed">{service.description}</p>
                <div className="text-2xl font-extrabold mb-6" style={{ color: "#00adee" }}>From ${service.basePrice.toFixed(0)}</div>
                <Link
                  href={`/booking?service=${service.slug}`}
                  className="inline-flex items-center gap-2 text-white font-bold px-7 py-3.5 rounded-full transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#32373c" }}
                >
                  Book This Service <ArrowRight size={16} />
                </Link>
              </div>

              {service.includes.length > 0 && (
                <div className="flex-1 w-full rounded-2xl p-7" style={{ backgroundColor: "#f1f4f4" }}>
                  <h3 className="font-bold mb-4 text-base" style={{ color: "#003d54" }}>What&apos;s Included:</h3>
                  <ul className="space-y-2.5">
                    {service.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-gray-700 text-sm">
                        <CheckCircle size={16} className="mt-0.5 shrink-0" style={{ color: "#00adee" }} />
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
        <section className="py-16" style={{ backgroundColor: "#f1f4f4" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold mb-3" style={{ color: "#003d54" }}>Extra Add-On Services</h2>
              <p className="text-gray-500 text-lg">Customize your clean with these optional extras.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {dbAddons.map((addon) => (
                <div key={addon.id} className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
                  <div className="font-semibold text-sm" style={{ color: "#003d54" }}>{addon.name}</div>
                  <div className="font-bold mt-1" style={{ color: "#00adee" }}>+${addon.price.toFixed(0)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 text-white" style={{ backgroundColor: "#003d54" }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold mb-4">Ready to Book?</h2>
          <p className="text-gray-300 text-lg mb-8">
            Get an instant price estimate and book your cleaning in minutes.
          </p>
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 text-white font-bold px-10 py-4 rounded-full transition-opacity hover:opacity-90 shadow-lg"
            style={{ backgroundColor: "#00adee" }}
          >
            Book Now <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
