import Link from "next/link";
import { CheckCircle, Shield, Star, Users, ArrowRight } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Licensed & Insured",
    desc: "All our cleaners are fully insured, background-checked, and trained professionals.",
  },
  {
    icon: Star,
    title: "Quality Guaranteed",
    desc: "We're not satisfied until you are. We'll return and re-clean at no extra charge.",
  },
  {
    icon: Users,
    title: "Experienced Team",
    desc: "Our cleaners bring years of experience in residential and commercial cleaning.",
  },
  {
    icon: CheckCircle,
    title: "Eco-Friendly",
    desc: "We use safe, environmentally friendly products that are great for families and pets.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-700 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-4">About Mo&apos;s Cleaning Service</h1>
          <p className="text-blue-100 text-xl max-w-2xl mx-auto">
            Professional, reliable, and community-focused cleaning services in Edmonton, Alberta.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  Mo&apos;s Cleaning Service was founded with a simple belief: everyone deserves to live and
                  work in a clean, healthy environment — without the stress of doing it themselves.
                </p>
                <p>
                  Started right here in Edmonton, Alberta, we&apos;ve grown from a small local operation to
                  one of the most trusted cleaning companies in the city. Our reputation is built on
                  punctuality, attention to detail, and genuine care for every client we serve.
                </p>
                <p>
                  Whether it&apos;s a cozy apartment, a busy office, or a post-construction site,
                  we treat every space with the same level of professionalism and care.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: "200+", label: "Happy Customers" },
                { number: "5★", label: "Average Rating" },
                { number: "3+", label: "Years in Edmonton" },
                { number: "100%", label: "Satisfaction Rate" },
              ].map((stat) => (
                <div key={stat.label} className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-6 text-center">
                  <div className="text-4xl font-extrabold text-blue-600">{stat.number}</div>
                  <div className="text-gray-600 font-medium mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-4">
              Why Choose Mo&apos;s Cleaning?
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              We&apos;re not just cleaners — we&apos;re your partners in creating a healthier, happier space.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-6 shadow-sm text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <v.icon size={28} className="text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">{v.title}</h3>
                <p className="text-gray-500 text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promise */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-600 to-green-600 rounded-3xl p-10 text-white text-center">
            <h2 className="text-3xl font-extrabold mb-4">Our Promise to You</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              We guarantee that every cleaning we perform meets our high standards. If you&apos;re not
              completely satisfied, we&apos;ll come back within 24 hours and re-clean the area at no charge.
            </p>
            <ul className="text-left max-w-md mx-auto space-y-3 mb-8">
              {[
                "Punctual and professional cleaners",
                "All supplies and equipment provided",
                "Background-checked team members",
                "Fully insured for your protection",
                "No contracts — book when you need us",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-blue-100">
                  <CheckCircle size={18} className="text-green-300 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 bg-white text-blue-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors"
            >
              Book Your Cleaning <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
