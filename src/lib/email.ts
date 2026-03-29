import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: parseInt(process.env.EMAIL_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendBookingConfirmation(booking: {
  customerName: string;
  customerEmail: string;
  serviceType: string;
  scheduledDate: Date;
  scheduledTime: string;
  address: string;
  estimatedPrice: number;
  
  id: string;
}) {
  const serviceNames: Record<string, string> = {
    residential: "Residential Cleaning",
    commercial: "Commercial / Office Cleaning",
    "move-in-out": "Move-In / Move-Out Cleaning",
    deep: "Deep Cleaning",
    "post-construction": "Post-Construction Cleaning",
  };

  const serviceName = serviceNames[booking.serviceType] || booking.serviceType;
  const dateStr = new Date(booking.scheduledDate).toLocaleDateString("en-CA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; color: #333; }
        .header { background: linear-gradient(135deg, #1e40af, #059669); color: white; padding: 30px; text-align: center; }
        .content { padding: 30px; }
        .booking-details { background: #f0f9ff; border-left: 4px solid #1e40af; padding: 20px; margin: 20px 0; border-radius: 4px; }
        .detail-row { display: flex; margin: 8px 0; }
        .label { font-weight: bold; width: 150px; color: #1e40af; }
        .price { font-size: 24px; font-weight: bold; color: #059669; }
        .footer { background: #f8f8f8; padding: 20px; text-align: center; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>✓ Booking Confirmed!</h1>
        <p>Mo's Cleaning Service</p>
      </div>
      <div class="content">
        <p>Dear ${booking.customerName},</p>
        <p>Thank you for booking with Mo's Cleaning Service! We've received your booking request and will confirm it shortly.</p>

        <div class="booking-details">
          <h3>Booking Details</h3>
          <div class="detail-row"><span class="label">Booking ID:</span><span>#${booking.id.slice(-8).toUpperCase()}</span></div>
          <div class="detail-row"><span class="label">Service:</span><span>${serviceName}</span></div>
          <div class="detail-row"><span class="label">Date:</span><span>${dateStr}</span></div>
          <div class="detail-row"><span class="label">Time:</span><span>${booking.scheduledTime}</span></div>
          <div class="detail-row"><span class="label">Address:</span><span>${booking.address}</span></div>
          <div class="detail-row"><span class="label">Estimated Price:</span><span class="price">$${booking.estimatedPrice} CAD</span></div>
        </div>

        <p><strong>What's next?</strong> Our team will review your booking and send a final confirmation. If you need to make any changes, please contact us.</p>

        <p>📞 Call or text: (587) 222-1440<br>
        📧 Email: info@moscleaning.ca</p>

        <p>Thank you for choosing Mo's Cleaning Service!</p>
      </div>
      <div class="footer">
        <p>Mo's Cleaning Service | Edmonton, Alberta | moscleaning.ca</p>
        <p>Professional, Reliable, and Insured Cleaners</p>
      </div>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || "Mo's Cleaning Service <info@moscleaning.ca>",
      to: booking.customerEmail,
      subject: `Booking Confirmation - Mo's Cleaning Service (#${booking.id.slice(-8).toUpperCase()})`,
      html,
    });
  } catch (error) {
    console.error("Failed to send confirmation email:", error);
  }
}
