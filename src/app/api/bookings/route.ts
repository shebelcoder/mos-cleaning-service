import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendBookingConfirmation } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      serviceType,
      propertyType,
      bedrooms,
      extras,
      scheduledDate,
      scheduledTime,
      customerName,
      customerEmail,
      customerPhone,
      address,
      city,
      notes,
      estimatedPrice,
    } = body;

    // Basic validation
    if (!serviceType || !customerName || !customerEmail || !customerPhone || !address || !scheduledDate || !scheduledTime) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const booking = await prisma.booking.create({
      data: {
        customerName,
        customerEmail,
        customerPhone,
        address,
        city: city || "Edmonton",
        serviceType,
        propertyType,
        bedrooms: bedrooms ? parseInt(bedrooms) : null,
        extras: JSON.stringify(extras || []),
        scheduledDate: new Date(scheduledDate + "T12:00:00"),
        scheduledTime,
        estimatedPrice: estimatedPrice || 0,
        notes,
      },
    });

    // Send confirmation email (non-blocking)
    sendBookingConfirmation({
      customerName: booking.customerName,
      customerEmail: booking.customerEmail,
      serviceType: booking.serviceType,
      scheduledDate: booking.scheduledDate,
      scheduledTime: booking.scheduledTime,
      address: booking.address,
      estimatedPrice: booking.estimatedPrice,
      id: booking.id,
    });

    return NextResponse.json({ id: booking.id }, { status: 201 });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(bookings);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
