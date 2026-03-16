"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { CheckCircle, XCircle, ChevronDown, Phone, Mail, MapPin } from "lucide-react";

type Booking = {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  city: string;
  serviceType: string;
  propertyType: string;
  bedrooms: number | null;
  extras: string;
  scheduledDate: Date;
  scheduledTime: string;
  estimatedPrice: number;
  status: string;
  notes: string | null;
  adminNotes: string | null;
  createdAt: Date;
};

const SERVICE_NAMES: Record<string, string> = {
  residential: "Residential",
  commercial: "Commercial",
  "move-in-out": "Move In/Out",
  deep: "Deep Clean",
  "post-construction": "Post-Construction",
};

const STATUS_COLORS: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700 border-yellow-200",
  CONFIRMED: "bg-green-100 text-green-700 border-green-200",
  DECLINED: "bg-red-100 text-red-700 border-red-200",
  COMPLETED: "bg-blue-100 text-blue-700 border-blue-200",
  CANCELLED: "bg-gray-100 text-gray-700 border-gray-200",
};

export default function BookingsTable({ bookings: initial }: { bookings: Booking[] }) {
  const [bookings, setBookings] = useState(initial);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState("ALL");

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    }
  };

  const filtered = filter === "ALL" ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <div>
      {/* Filter Tabs */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {["ALL", "PENDING", "CONFIRMED", "COMPLETED", "DECLINED", "CANCELLED"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              filter === s
                ? "bg-blue-600 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {s} {s === "ALL" ? `(${bookings.length})` : `(${bookings.filter(b => b.status === s).length})`}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-400">No bookings found</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filtered.map((booking) => {
              const extras = JSON.parse(booking.extras || "[]") as string[];
              const isExpanded = expanded === booking.id;

              return (
                <div key={booking.id}>
                  {/* Row Summary */}
                  <div
                    className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setExpanded(isExpanded ? null : booking.id)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 truncate">{booking.customerName}</div>
                      <div className="text-xs text-gray-500">
                        {SERVICE_NAMES[booking.serviceType] || booking.serviceType} •{" "}
                        {new Date(booking.scheduledDate).toLocaleDateString("en-CA")} at {booking.scheduledTime}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-bold text-blue-600">{formatCurrency(booking.estimatedPrice)}</div>
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-semibold ${STATUS_COLORS[booking.status]}`}>
                        {booking.status}
                      </span>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`text-gray-400 shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="bg-gray-50 px-5 py-5 border-t border-gray-100">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Contact</div>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-2 text-gray-700">
                              <Phone size={14} className="text-gray-400" />
                              <a href={`tel:${booking.customerPhone}`} className="hover:text-blue-600">
                                {booking.customerPhone}
                              </a>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                              <Mail size={14} className="text-gray-400" />
                              <a href={`mailto:${booking.customerEmail}`} className="hover:text-blue-600">
                                {booking.customerEmail}
                              </a>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                              <MapPin size={14} className="text-gray-400" />
                              {booking.address}, {booking.city}
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-gray-500 uppercase mb-2">Details</div>
                          <div className="space-y-1 text-sm text-gray-700">
                            <div>Property: <span className="font-medium capitalize">{booking.propertyType}</span></div>
                            {booking.bedrooms && <div>Bedrooms: <span className="font-medium">{booking.bedrooms}</span></div>}
                            {extras.length > 0 && (
                              <div>Add-ons: <span className="font-medium">{extras.join(", ")}</span></div>
                            )}
                            {booking.notes && <div>Notes: <span className="italic text-gray-500">{booking.notes}</span></div>}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      {booking.status === "PENDING" && (
                        <div className="flex gap-3 mt-2">
                          <button
                            onClick={() => updateStatus(booking.id, "CONFIRMED")}
                            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors"
                          >
                            <CheckCircle size={16} /> Confirm
                          </button>
                          <button
                            onClick={() => updateStatus(booking.id, "DECLINED")}
                            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors"
                          >
                            <XCircle size={16} /> Decline
                          </button>
                        </div>
                      )}
                      {booking.status === "CONFIRMED" && (
                        <button
                          onClick={() => updateStatus(booking.id, "COMPLETED")}
                          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
                        >
                          <CheckCircle size={16} /> Mark Completed
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
