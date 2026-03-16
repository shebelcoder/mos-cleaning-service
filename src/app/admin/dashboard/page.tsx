import { prisma } from "@/lib/prisma";
import { CalendarCheck, Clock, CheckCircle, XCircle, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [bookings, pending, confirmed, totalRevenue] = await Promise.all([
    prisma.booking.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.booking.count({ where: { status: "PENDING" } }),
    prisma.booking.count({ where: { status: "CONFIRMED" } }),
    prisma.booking.aggregate({
      where: { status: { in: ["CONFIRMED", "COMPLETED"] } },
      _sum: { estimatedPrice: true },
    }),
  ]);

  const total = await prisma.booking.count();

  const stats = [
    { label: "Total Bookings", value: total, icon: CalendarCheck, color: "blue" },
    { label: "Pending", value: pending, icon: Clock, color: "yellow" },
    { label: "Confirmed", value: confirmed, icon: CheckCircle, color: "green" },
    {
      label: "Est. Revenue",
      value: formatCurrency(totalRevenue._sum.estimatedPrice || 0),
      icon: TrendingUp,
      color: "purple",
    },
  ];

  const statusColors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-700",
    CONFIRMED: "bg-green-100 text-green-700",
    DECLINED: "bg-red-100 text-red-700",
    COMPLETED: "bg-blue-100 text-blue-700",
    CANCELLED: "bg-gray-100 text-gray-700",
  };

  return (
    <div className="p-6 lg:p-8">
      <h1 className="text-2xl font-extrabold text-gray-900 mb-6">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-500 text-sm font-medium">{stat.label}</span>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center bg-${stat.color}-100`}>
                <stat.icon size={18} className={`text-${stat.color}-600`} />
              </div>
            </div>
            <div className="text-2xl font-extrabold text-gray-900">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">Recent Bookings</h2>
          <Link href="/admin/bookings" className="text-blue-600 text-sm font-medium hover:underline">
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="px-6 py-3 text-left">Customer</th>
                <th className="px-6 py-3 text-left">Service</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Price</th>
                <th className="px-6 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{b.customerName}</td>
                  <td className="px-6 py-4 text-gray-500 capitalize">{b.serviceType.replace(/-/g, " ")}</td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(b.scheduledDate).toLocaleDateString("en-CA")} {b.scheduledTime}
                  </td>
                  <td className="px-6 py-4 font-semibold text-blue-600">{formatCurrency(b.estimatedPrice)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[b.status]}`}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                    No bookings yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
