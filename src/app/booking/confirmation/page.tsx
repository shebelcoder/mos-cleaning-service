import { Suspense } from "react";
import Link from "next/link";
import { CheckCircle, Phone, Mail, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/utils";

const SERVICE_NAMES: Record<string, string> = {
  residential: "Residential Cleaning",
  commercial: "Commercial / Office Cleaning",
  "move-in-out": "Move-In / Move-Out Cleaning",
  deep: "Deep Cleaning",
  "post-construction": "Post-Construction Cleaning",
};

async function ConfirmationContent({ id }: { id: string }) {
  const booking = await prisma.booking.findUnique({ where: { id } });

  if (!booking) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Booking Not Found</h1>
        <Link href="/booking" className="text-blue-600 hover:underline">
          Make a new booking
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={48} className="text-green-500" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Booking Received!</h1>
        <p className="text-gray-500 text-lg">
          Thank you, <strong>{booking.customerName}</strong>! We&apos;ll confirm your booking shortly.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm">
        <div className="text-sm text-gray-500 mb-4">
          Booking Reference: <span className="font-bold text-gray-900">#{booking.id.slice(-8).toUpperCase()}</span>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-500 text-sm">Service</span>
            <span className="font-semibold text-sm">{SERVICE_NAMES[booking.serviceType] || booking.serviceType}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-500 text-sm">Date</span>
            <span className="font-semibold text-sm">{formatDate(booking.scheduledDate)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-500 text-sm">Time</span>
            <span className="font-semibold text-sm">{booking.scheduledTime}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-gray-500 text-sm">Address</span>
            <span className="font-semibold text-sm text-right max-w-[60%]">{booking.address}, {booking.city}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-500 text-sm">Estimated Price</span>
            <span className="font-extrabold text-blue-600 text-lg">{formatCurrency(booking.estimatedPrice)}</span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-xl p-5 mb-6">
        <h3 className="font-bold text-gray-900 mb-2">What happens next?</h3>
        <ul className="space-y-2 text-gray-600 text-sm">
          <li>✅ We&apos;ll review your booking and confirm within a few hours</li>
          <li>📧 A confirmation email has been sent to <strong>{booking.customerEmail}</strong></li>
          <li>📞 We may call you to confirm details at <strong>{booking.customerPhone}</strong></li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href="tel:+15872221440"
          className="flex items-center justify-center gap-2 border border-gray-300 px-5 py-3 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 flex-1"
        >
          <Phone size={18} /> Call Us
        </a>
        <a
          href="mailto:info@moscleaning.ca"
          className="flex items-center justify-center gap-2 border border-gray-300 px-5 py-3 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 flex-1"
        >
          <Mail size={18} /> Email Us
        </a>
        <Link
          href="/"
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-blue-700 flex-1"
        >
          Home <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
        <ConfirmationContent id={id || ""} />
      </Suspense>
    </div>
  );
}
