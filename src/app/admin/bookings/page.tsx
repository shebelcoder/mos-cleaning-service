import { prisma } from "@/lib/prisma";
import BookingsTable from "@/components/BookingsTable";

export const dynamic = "force-dynamic";

export default async function AdminBookingsPage() {
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900">All Bookings</h1>
        <span className="text-gray-500 text-sm">{bookings.length} total</span>
      </div>
      <BookingsTable bookings={bookings} />
    </div>
  );
}
