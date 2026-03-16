import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AdminServicesPage() {
  const serviceList = [
    { id: "residential", name: "Residential Cleaning", base: 120 },
    { id: "commercial", name: "Commercial / Office Cleaning", base: 180 },
    { id: "move-in-out", name: "Move-In / Move-Out Cleaning", base: 200 },
    { id: "deep", name: "Deep Cleaning", base: 160 },
    { id: "post-construction", name: "Post-Construction Cleaning", base: 250 },
  ];

  const extras = [
    { name: "Inside Fridge Cleaning", price: 35 },
    { name: "Inside Oven Cleaning", price: 35 },
    { name: "Interior Window Cleaning", price: 50 },
    { name: "Laundry (Wash & Dry)", price: 25 },
    { name: "Dishes", price: 20 },
    { name: "Wall Washing", price: 60 },
    { name: "Garage Cleaning", price: 80 },
    { name: "Basement Cleaning", price: 70 },
  ];

  return (
    <div className="p-6 lg:p-8">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">Services & Pricing</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-4">Main Services</h2>
          <div className="divide-y divide-gray-100">
            {serviceList.map((s) => (
              <div key={s.id} className="flex items-center justify-between py-3">
                <span className="text-gray-700">{s.name}</span>
                <span className="font-bold text-blue-600">From ${s.base}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-gray-900 mb-4">Add-On Services</h2>
          <div className="divide-y divide-gray-100">
            {extras.map((e) => (
              <div key={e.name} className="flex items-center justify-between py-3">
                <span className="text-gray-700">{e.name}</span>
                <span className="font-bold text-green-600">+${e.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 rounded-xl p-5 border border-blue-100">
        <p className="text-blue-700 text-sm">
          Pricing is calculated dynamically based on service type, number of bedrooms, and selected add-ons.
          To update prices, modify{" "}
          <code className="bg-blue-100 px-1 rounded">src/lib/pricing.ts</code>.
        </p>
        <Link href="/services" className="inline-flex items-center gap-1 text-blue-600 text-sm font-medium mt-2 hover:underline">
          View public services page <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
