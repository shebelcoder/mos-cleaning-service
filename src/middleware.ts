import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/admin/login",
  },
});

export const config = {
  matcher: [
    "/admin/dashboard/:path*",
    "/admin/bookings/:path*",
    "/admin/messages/:path*",
    "/admin/services/:path*",
  ],
};
